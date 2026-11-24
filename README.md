# OpenDocera

An open-source documentation site template built on Next.js 16 and MDX. It
has sidebar navigation, ⌘K search, an "On this page" table of contents, light
and dark themes and a grain-gradient page header.

You can set it up without touching component code. Pages are MDX files with
a few lines of frontmatter, and everything brand-specific lives in one config
file. That makes it easy to hand to an AI assistant: "make docs for my
project" is a request it can complete on its own.

The pages in `content/docs/` describe a fictional product called **Acme**.
They are placeholders that demonstrate every building block. Replace them
with your own.

## Quick start

1. On GitHub, click **Use this template** (or clone the repo).
2. Install and run:

   ```bash
   npm install
   npm run dev
   ```

3. Open http://localhost:3000.

Node.js 20.9 or later is required.

## Set it up with AI

The repo includes instructions for AI coding assistants:

- `AGENTS.md`: the page format, components, config and commands. Claude
  Code, Codex, Cursor, Copilot and other agents read it automatically.
- `.claude/skills/`: ready-made workflows for Claude Code:
  - `/import-docs`: turn your README, Markdown folder or codebase into pages
  - `/add-page`: write a new page in the right group
  - `/rebrand`: set your name, logo, links and colors

Example prompts:

> Make docs for this project from my README and the `src/` folder.

> Rebrand the site for "Nimbus", logo is `nimbus.svg`, brand color #2F6FED.

> Add a page explaining how to deploy to Vercel, under Guides.

The deployed site also serves `/llms.txt` and `/llms-full.txt`, so AI tools
can read your documentation.

## Set it up by hand

### Add a page

Create `content/docs/my-page.mdx`:

```mdx
---
title: My page
description: One sentence shown under the title.
group: Guides
order: 4
---

## First section

Content starts at `##`. The page heading comes from `title`.
```

It appears in the sidebar, search and table of contents automatically. See
`/docs/components` for every component you can use, and `AGENTS.md` for all
frontmatter options.

### Brand it

Edit `docs.config.ts`:

| Setting | What it controls |
|---|---|
| `name`, `title`, `description` | Header name, page titles, SEO |
| `logo` | Square image in `public/` |
| `links`, `cta` | Header links and the accent button |
| `footer` | Text under every page |
| `groups` | Sidebar group order |
| `theme.palette` | Four colors that every accent in light and dark mode is derived from |
| `theme.grainient` | Colors of the gradient behind page titles |

The default theme is a warm terracotta palette:

```ts
palette: { deep: "#3A2116", brand: "#B4512F", bright: "#D97757", neutral: "#8A7A68" }
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build. Fails with a clear message on invalid frontmatter |
| `npm run start` | Serve the production build |
| `npm run docs:index` | Regenerate the sidebar, search and TOC index only |
| `npm run lint` | ESLint |

## Deploy

Any host that runs Next.js works. On Vercel, import the repo and deploy; no
settings are needed. For a custom domain, set `NEXT_PUBLIC_SITE_URL` (for
example `https://docs.example.com`) so canonical URLs, the sitemap and
`llms.txt` use it.

## Project structure

```
content/docs/          your pages (.mdx)
docs.config.ts         name, logo, links, colors
public/                logo and images
app/docs/              docs shell: header, sidebar, search, TOC, page layout
app/docs/components/   MDX components (Callout, Steps, Cards, ...)
app/globals.css        design tokens, derived from the palette
scripts/               builds the sidebar/search index from the MDX files
```

## License

MIT
