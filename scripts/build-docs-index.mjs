/**
 * Generates app/docs/docs-index.generated.ts from content/docs/*.mdx.
 *
 * Why a standalone script rather than a remark plugin in next.config.ts:
 * Turbopack runs the MDX pipeline in Rust and can only accept plugins named as
 * strings with serializable options, so a custom JS plugin cannot be injected
 * there. Parsing the sources separately sidesteps that entirely.
 *
 * Three things come out of here:
 *   PAGES           -- one entry per page, from its YAML frontmatter; this is
 *                      what the sidebar, routing, search and llms.txt use
 *   TOC_BY_SECTION  -- the right-hand "On this page" list
 *   SECTION_RECORDS -- heading and body search records, in document order
 *
 * Frontmatter fields (see AGENTS.md):
 *   title        required  sidebar label and page <h1>
 *   description  required  subtitle under the title, meta description
 *   group        required  sidebar group label; ordered by docs.config.ts
 *   order        optional  position inside the group (lower first)
 *   tag          optional  small chip next to the sidebar label, e.g. "new"
 *   draft        optional  true hides the page everywhere
 *
 * Invalid frontmatter stops the build with a message naming the file, so a
 * mistake surfaces at `npm run dev` rather than as a missing page.
 *
 * Heading ids use github-slugger, the same slugger rehype-slug uses in the
 * render pipeline, so TOC anchors match the rendered DOM by construction.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import GithubSlugger from "github-slugger";
import { toString as mdastToString } from "mdast-util-to-string";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { parse as parseYaml } from "yaml";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const CONTENT_DIR = join(ROOT, "content", "docs");
const OUT_FILE = join(ROOT, "app", "docs", "docs-index.generated.ts");

// JSX attributes worth indexing. Card/Step/Callout titles are real prose and
// users search for them; layout props (min, tone, href) are not, and neither is
// `label`, which is an aria-label rather than visible copy.
const TITLE_ATTRS = ["title"];
const EXTRA_TEXT_ATTRS = ["kicker", "meta", "items"];

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkMdx);

const KNOWN_KEYS = new Set(["title", "description", "group", "order", "tag", "draft"]);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const problems = [];

/** Validated page metadata from a file's frontmatter, or null if invalid. */
function pageMeta(file, tree) {
  const id = file.replace(/\.mdx$/, "");
  const fail = (msg) => {
    problems.push(`content/docs/${file}: ${msg}`);
    return null;
  };

  if (!SLUG.test(id)) {
    return fail("file name must be lowercase letters, digits and dashes (it becomes the URL)");
  }

  const yamlNode = tree.children.find((n) => n.type === "yaml");
  if (!yamlNode) return fail("missing frontmatter (--- title/description/group --- at the top)");

  let data;
  try {
    data = parseYaml(yamlNode.value) ?? {};
  } catch (err) {
    return fail(`frontmatter is not valid YAML: ${err.message}`);
  }
  if (typeof data !== "object" || Array.isArray(data)) return fail("frontmatter must be key: value pairs");

  for (const key of Object.keys(data)) {
    if (!KNOWN_KEYS.has(key)) {
      return fail(`unknown frontmatter key "${key}" (allowed: ${[...KNOWN_KEYS].join(", ")})`);
    }
  }
  for (const key of ["title", "description", "group"]) {
    if (typeof data[key] !== "string" || !data[key].trim()) return fail(`"${key}" is required and must be text`);
  }
  if (data.order !== undefined && typeof data.order !== "number") return fail(`"order" must be a number`);
  if (data.tag !== undefined && typeof data.tag !== "string") return fail(`"tag" must be text`);
  if (data.draft !== undefined && typeof data.draft !== "boolean") return fail(`"draft" must be true or false`);

  if (data.draft) return null;

  return {
    id,
    title: data.title.trim(),
    desc: data.description.trim(),
    group: data.group.trim(),
    ...(data.order !== undefined ? { order: data.order } : {}),
    ...(data.tag ? { tag: data.tag.trim() } : {}),
  };
}

/** Attribute value as a plain string, or null when it is an expression we skip. */
function attrText(node, name) {
  const attr = node.attributes?.find((a) => a.type === "mdxJsxAttribute" && a.name === name);
  if (!attr) return null;
  if (typeof attr.value === "string") return attr.value;
  // Expression container, e.g. items={["v1.0", "MIT"]}. Pull the string
  // literals out rather than evaluating arbitrary JS.
  const raw = attr.value?.value;
  if (typeof raw !== "string") return null;
  const literals = raw.match(/(["'])(?:(?!\1|\\).|\\.)*\1/g);
  if (!literals) return null;
  return literals.map((l) => l.slice(1, -1)).join(" ");
}

function jsxExtraText(node) {
  return EXTRA_TEXT_ATTRS.map((name) => attrText(node, name))
    .filter(Boolean)
    .join(" ");
}

function clean(text) {
  return text.replace(/\s+/g, " ").trim();
}

/** One table row -> { title: first cell, body: remaining cells }. */
function tableBlocks(node) {
  const [, ...rows] = node.children ?? [];
  return rows
    .map((row) => {
      const cells = (row.children ?? []).map((c) => clean(mdastToString(c))).filter(Boolean);
      if (!cells.length) return null;
      const [title, ...rest] = cells;
      return { title, body: rest.join(" ") };
    })
    .filter(Boolean);
}

/**
 * Flattens a block node into searchable { title, body } pairs.
 *
 * JSX elements carrying a `title` become one record each and are not descended
 * into -- that keeps a Card or Step as one coherent hit. Containers without a
 * title (CardGrid, Steps, CodeTabs) are transparent and recursed through, so
 * their children stay individually findable.
 */
function blocksFrom(node) {
  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    const title = TITLE_ATTRS.map((n) => attrText(node, n)).find(Boolean);
    const extra = jsxExtraText(node);
    if (title) {
      return [{ title: clean(title), body: clean([mdastToString(node), extra].join(" ")) }];
    }
    const nested = (node.children ?? []).flatMap(blocksFrom);
    if (nested.length) return extra ? [{ title: "", body: clean(extra) }, ...nested] : nested;
    const own = clean([mdastToString(node), extra].join(" "));
    return own ? [{ title: "", body: own }] : [];
  }

  if (node.type === "table") return tableBlocks(node);
  if (node.type === "code") {
    const body = clean(node.value ?? "");
    return body ? [{ title: "", body }] : [];
  }
  if (node.type === "list") {
    return (node.children ?? [])
      .map((item) => clean(mdastToString(item)))
      .filter(Boolean)
      .map((body) => ({ title: "", body }));
  }

  const body = clean(mdastToString(node));
  return body ? [{ title: "", body }] : [];
}

function parseSection(sectionId, tree) {
  const slugger = new GithubSlugger();

  const toc = [];
  const records = [];
  let current = null; // null while still in the lead, above the first heading.

  const push = (kind, title, body, headingId) => {
    records.push({
      key: `${kind}:${sectionId}:${headingId ?? "lead"}:${records.length}`,
      sectionId,
      ...(headingId ? { headingId } : {}),
      kind,
      title,
      body,
    });
  };

  for (const node of tree.children) {
    // Frontmatter is page metadata, not searchable prose.
    if (node.type === "yaml") continue;

    // Only h2 gets an anchor in the TOC -- deeper headings are indexed as
    // content so they stay searchable without crowding the sidebar.
    if (node.type === "heading" && node.depth === 2) {
      const label = clean(mdastToString(node));
      if (!label) continue;
      const id = slugger.slug(label);
      toc.push({ id, label });
      current = { id, label };
      push("heading", label, "", id);
      continue;
    }

    if (node.type === "heading") {
      const label = clean(mdastToString(node));
      if (label) push("content", current?.label ?? "", label, current?.id);
      continue;
    }

    for (const block of blocksFrom(node)) {
      const body = block.title ? clean(`${block.title} ${block.body}`) : block.body;
      if (!body) continue;
      push("content", current?.label ?? "", body, current?.id);
    }
  }

  return { toc, records };
}

// Files starting with "_" are ignored, so partials and drafts can live beside
// real pages.
const files = readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
  .sort();

const pages = [];
const tocBySection = {};
const recordsBySection = {};

for (const file of files) {
  const source = readFileSync(join(CONTENT_DIR, file), "utf8");
  let tree;
  try {
    tree = processor.parse(source);
  } catch (err) {
    problems.push(`content/docs/${file}: MDX does not parse: ${err.message}`);
    continue;
  }
  const meta = pageMeta(file, tree);
  if (!meta) continue;

  pages.push(meta);
  const { toc, records } = parseSection(meta.id, tree);
  if (toc.length) tocBySection[meta.id] = toc;
  if (records.length) recordsBySection[meta.id] = records;
}

if (!pages.length && !problems.length) {
  problems.push("content/docs/ has no pages. Add at least one .mdx file with frontmatter.");
}

if (problems.length) {
  console.error(`docs index: ${problems.length} problem(s)\n  ${problems.join("\n  ")}`);
  process.exit(1);
}

const banner = `// GENERATED FILE -- do not edit.
// Run \`node scripts/build-docs-index.mjs\` (or npm run dev / npm run build) to
// regenerate from content/docs/*.mdx.
`;

const out = `${banner}
import type { PageMeta, SearchRecord, TocItem } from "./search-types";

/** Every published page, from frontmatter, in file-name order. docs-data.ts sorts them. */
export const PAGES: PageMeta[] = ${JSON.stringify(pages, null, 2)};

/** Right-hand "On this page" anchors. Sections with no h2 are absent. */
export const TOC_BY_SECTION: Record<string, TocItem[]> = ${JSON.stringify(tocBySection, null, 2)};

/** Heading and body records per section, in document order. */
export const SECTION_RECORDS: Record<string, SearchRecord[]> = ${JSON.stringify(recordsBySection, null, 2)};
`;

writeFileSync(OUT_FILE, out, "utf8");

const sections = Object.keys(recordsBySection).length;
const total = Object.values(recordsBySection).reduce((n, r) => n + r.length, 0);
console.log(
  `docs index: ${pages.length} pages, ${sections} with content, ${total} records -> ${relative(ROOT, OUT_FILE)}`,
);
