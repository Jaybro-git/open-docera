import { docsConfig } from "@/docs.config";
import { PAGES } from "./docs-index.generated";

export type NavItem = { id: string; title: string; tag?: string; desc: string };
export type NavGroup = { label: string; items: NavItem[] };

/** Every page in sidebar order. Backs prev/next, routing and the sitemap. */
export function flatNav(): NavItem[] {
  return NAV_GROUPS.flatMap((g) => g.items);
}

export function findNavItem(id: string): NavItem | undefined {
  return flatNav().find((it) => it.id === id);
}

export function findNavGroup(id: string): NavGroup | undefined {
  return NAV_GROUPS.find((g) => g.items.some((it) => it.id === id));
}

export const docsHref = (id: string) => `/docs/${id}`;

/**
 * The sidebar, built from each page's frontmatter (content/docs/*.mdx).
 *
 * Groups follow docsConfig.groups; any group a page names that is not listed
 * there is appended afterwards, in the order it first appears. Inside a
 * group, pages sort by `order` (pages without one go last), then by title.
 */
function buildNav(): NavGroup[] {
  const labels = [...docsConfig.groups];
  for (const page of PAGES) if (!labels.includes(page.group)) labels.push(page.group);

  const rank = (order?: number) => order ?? Number.POSITIVE_INFINITY;

  return labels
    .map((label) => ({
      label,
      items: PAGES.filter((p) => p.group === label)
        .sort((a, b) => rank(a.order) - rank(b.order) || a.title.localeCompare(b.title))
        .map(({ id, title, desc, tag }) => ({ id, title, desc, ...(tag ? { tag } : {}) })),
    }))
    .filter((g) => g.items.length > 0);
}

export const NAV_GROUPS: NavGroup[] = buildNav();
