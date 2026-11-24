<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# OpenDocera: guide for AI assistants

This repo is a documentation site template. People use it by asking an AI
assistant to write their pages and set their branding. Most requests touch
only two places, and nothing else needs to change for them:

| Task | Edit |
|---|---|
| Add, edit, reorder or remove a page | `content/docs/*.mdx` |
| Name, logo, links, header button, footer, group order, colors, header gradient | `docs.config.ts` |

Do not edit components, `app/globals.css` or the build script unless the user
explicitly asks for a design or behavior change.

## Pages

One `.mdx` file per page in `content/docs/`. The file name is the URL:
`content/docs/getting-started.mdx` → `/docs/getting-started`. Use lowercase
letters, digits and dashes only. Files starting with `_` are ignored.

Every page starts with frontmatter:

```mdx
---
title: Getting started
description: One sentence shown under the title and used as the meta description.
group: Get started
order: 1
---

## First section

Body text...
```

| Key | Required | Meaning |
|---|---|---|
| `title` | yes | Sidebar label and the page's big heading |
| `description` | yes | One sentence under the heading; also the search and SEO summary |
| `group` | yes | Sidebar group. Should match a label in `docsConfig.groups` |
| `order` | no | Position inside the group, lower first. Pages without it sort last, by title |
| `tag` | no | Small chip after the sidebar label, e.g. `new`, `beta` |
| `draft` | no | `true` hides the page everywhere |

Rules:

- **Never write a `#` heading.** The page heading comes from `title`. Start at `##`.
- `##` headings become the "On this page" list. Use `###` for sub-sections.
- The first page in the first group is where `/` and `/docs` land.
- A new group label must also be added to `docsConfig.groups` to control its
  position; otherwise it is appended after the listed groups.
- Link between pages with `/docs/<file-name>`, and to a section with
  `/docs/<file-name>#<heading-slug>`.
- Put images in `public/` and reference them as `/my-image.png`.

The sidebar, search index, table of contents, `/llms.txt` and the sitemap are
all generated from these files. There is no page list to update by hand.

## Components available in MDX

No imports needed. `content/docs/components.mdx` shows each one rendered.

| Component | Use | Example |
|---|---|---|
| `<Lead>` | Larger opening paragraph, right after the first `##` | `<Lead>Acme is ...</Lead>` |
| `<Badges>` | Small chips (version, license, stack) | `<Badges items={["v1.0", "MIT"]} />` |
| `<Callout>` | Boxed note. `tone` is `note` (brand color) or `warn` (yellow) | `<Callout title="Heads up" tone="warn">...</Callout>` |
| `<Steps>` / `<Step>` | Numbered procedure | `<Steps><Step title="Install">...</Step></Steps>` |
| `<CardGrid>` / `<Card>` | Grid of cards; `href` makes a card a link | `<Card title="CLI" kicker="Reference" meta="All commands" href="/docs/cli" />` |
| `<CodeTabs>` | One code block per tab; `labels` count must match the fences inside | see below |
| `<Status>` | Muted status text in tables | `<Status>planned</Status>` |

Plain Markdown also works: tables (GFM), lists, blockquotes, images, links and
fenced code blocks with syntax highlighting. A fence can take a title:
` ```ts title="src/index.ts" `.

`<CodeTabs>` needs a blank line after the opening tag and before the closing
tag, or MDX will not see the fences:

````mdx
<CodeTabs labels={["npm", "pnpm"]}>

```bash
npm install acme
```

```bash
pnpm add acme
```

</CodeTabs>
````

MDX pitfalls: `{` and `<` in prose are parsed as code. Write them inside
backticks, or escape them as `\{` and `&lt;`. HTML comments do not work; use
`{/* comment */}`.

## Branding and theme (`docs.config.ts`)

- `name`, `title`, `description`, `footer`, `links`, `cta` (set `cta: null` to hide the header button).
- `logo`: a path in `public/`. It is shown at 28×28 and cropped to a square.
- `groups`: sidebar group order.
- `theme.palette`: four hex colors from which every accent in light and dark
  mode is derived:
  - `deep`: the darkest shade (hover text, callout titles, shadows)
  - `brand`: the main accent (buttons with white text, links on white). Must have at least 4.5:1 contrast with `#ffffff`.
  - `bright`: a lighter accent (links and highlights in dark mode). Must stay readable on `#0a0c11`.
  - `neutral`: a muted companion (soft background washes)
- `theme.grainient`: the grain gradient behind each page title. `color1` is
  the highlight, `color2` the body and `color3` the shadow. Usually these are
  `bright`, `brand` and `deep`. `contrast` and `saturation` tone it overall.
  `clouds` (`amount`, `scale`, `seed`) adds soft cloudy patches; leave it out
  for plain smooth bands. `dark` can override the colors and `contrast` in
  dark mode. The component is React Bits' Grainient (`components/Grainient.tsx`,
  WebGL via `ogl`) with the cloud option added.

Warnings stay yellow whatever the palette, so they never look like notes.

## Commands

```bash
npm run dev        # regenerates the index, then starts http://localhost:3000
npm run build      # production build; fails on invalid frontmatter
npm run docs:index # regenerate the sidebar/search/TOC index only
npm run lint
```

If `docs:index` fails, it prints the file and the problem: a missing
`title`/`description`/`group`, an unknown key, a bad file name or MDX that does
not parse. Fix that file and run it again.

After changing pages, run `npm run build` to verify them before you report
the work as done.

## How it works (for code changes)

- `scripts/build-docs-index.mjs` reads `content/docs/*.mdx` and writes
  `app/docs/docs-index.generated.ts` (`PAGES`, `TOC_BY_SECTION`,
  `SECTION_RECORDS`). Never edit the generated file by hand.
- `app/docs/docs-data.ts` turns `PAGES` into `NAV_GROUPS`, ordered by
  `docsConfig.groups` and then `order`.
- `app/docs/[slug]/page.tsx` renders one page. Its `generateStaticParams`
  comes from the nav, so every page is prerendered.
- `app/layout.tsx` writes `theme.palette` as `--od-brand-*` CSS variables;
  `app/globals.css` derives all `--od-*` tokens from them with `color-mix()`.
- Design tokens are Tailwind utilities with an `od-` prefix
  (`text-od-accent-text`, `border-od-hairline-strong`, ...).
- `mdx-components.tsx` maps Markdown elements and registers the MDX components.
