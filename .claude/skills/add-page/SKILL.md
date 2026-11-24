---
name: add-page
description: Add a new page to this OpenDocera docs site, or rewrite an existing one. Use when the user asks to add, write, document or create a docs page, guide, reference or changelog entry.
---

# Add a docs page

Read `AGENTS.md` first for the frontmatter fields, the components and the MDX pitfalls.

1. **Pick the file name.** It becomes the URL (`/docs/<name>`): short,
   lowercase, dashes, e.g. `install.mdx`, `api-auth.mdx`. Check
   `content/docs/` so you don't overwrite an existing page unless asked to.
2. **Pick the group and order.** Read `docsConfig.groups` in
   `docs.config.ts` and the frontmatter of pages already in that group. Reuse
   an existing group when one fits. If the user wants a new group, add its
   label to `docsConfig.groups` in the right position.
3. **Write the file** at `content/docs/<name>.mdx`:
   - frontmatter with `title`, a one-sentence `description`, `group` and `order`
   - no `#` heading; open with a `##` section and a `<Lead>` paragraph
   - `##` per major section, `<Steps>` for procedures, `<CodeTabs>` for
     per-platform or per-package-manager commands, `<Callout tone="warn">`
     for anything that can break, tables for options and flags
   - link related pages with `/docs/<name>`
4. **If you renumbered pages**, update `order` on the neighbours too, so
   no two pages in a group share a number.
5. **Verify** with `npm run build`. If `docs:index` reports a problem, fix it
   and run the build again.
6. Report the new URL (`/docs/<name>`) and where it sits in the sidebar.

Write only what the user gave you or what you can confirm from their code or
files. When a fact is missing, such as a version, a command or a URL, ask
for it or leave a clearly marked `TODO:` rather than inventing one.
