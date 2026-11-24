---
name: import-docs
description: Turn existing documentation (a README, a folder of Markdown files, a wiki export, or a codebase) into OpenDocera pages, replacing the Acme placeholder content. Use when the user asks to import, migrate or convert their docs, or to "make docs for my project".
---

# Import existing docs

Read `AGENTS.md` first for the page format and the components.

1. **Find the sources.** Ask for the path or URL if the user hasn't given
   one. Read all of it before writing anything. For a codebase with no docs,
   read the README, the package manifest, the CLI or API entry points and the
   config schema.
2. **Propose an outline before writing:** the groups (in order) and, for
   each page, its file name, title and one-line description. A good default
   is:
   - Get started: Introduction, Quickstart (install + first use), Core concepts
   - Guides: one page per real task
   - Reference: configuration, CLI and/or API, changelog
   Wait for the user's OK.
3. **Remove the placeholder content:** delete the Acme pages in
   `content/docs/`. Keep `components.mdx` only if the user wants the
   component showcase.
4. **Write the pages** following the add-page rules: frontmatter, no `#`
   headings, `##` sections, `<Lead>` first. Convert as you go:
   - `# Title` → frontmatter `title`; demote the remaining headings by one level if needed, so sections start at `##`
   - GitHub alerts (`> [!NOTE]`, `> [!WARNING]`) → `<Callout tone="note">` / `<Callout tone="warn">`
   - numbered setup instructions → `<Steps>`
   - the same command shown for several tools or platforms → `<CodeTabs>`
   - relative links to other Markdown files → `/docs/<file-name>`
   - images → copy them into `public/` and fix the paths
   - escape stray `{`, `}` and `<` in prose; replace HTML comments with `{/* */}`
5. **Update `docs.config.ts`:** `groups` to match the outline, plus the name,
   description and links (or run the rebrand skill).
6. **Verify** with `npm run build` and fix whatever `docs:index` or MDX reports.
7. Report what was created, and list any content you couldn't place or had
   to guess, marked `TODO:` in the pages.

Keep the user's facts exactly: commands, versions, flags, URLs. Rewrite
for clarity, but never invent behavior.
