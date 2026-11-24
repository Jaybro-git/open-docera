import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { docsConfig } from "@/docs.config";
import { docsHref, flatNav } from "@/app/docs/docs-data";
import { SITE_URL } from "@/lib/site";

// /llms-full.txt: every page's source in sidebar order, so an AI assistant can
// read the whole documentation in one request. Frontmatter is replaced by a
// heading and the page URL; the MDX body is kept as written.
export const dynamic = "force-static";

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;

export async function GET() {
  const parts = [`# ${docsConfig.title}`, "", `> ${docsConfig.description}`];

  for (const item of flatNav()) {
    const source = await readFile(join(process.cwd(), "content", "docs", `${item.id}.mdx`), "utf8");
    parts.push(
      "",
      "---",
      "",
      `# ${item.title}`,
      "",
      `URL: ${SITE_URL}${docsHref(item.id)}`,
      "",
      `> ${item.desc}`,
      "",
      source.replace(FRONTMATTER, "").trim(),
    );
  }

  return new Response(parts.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
