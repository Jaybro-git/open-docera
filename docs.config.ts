/**
 * OpenDocera site configuration.
 *
 * Everything brand-specific lives here: name, logo, links, theme colors and
 * the page-header gradient. Edit this file (or ask your AI assistant to) to
 * rebrand the site. Components read from it and never hardcode a product name
 * or a color.
 *
 * Pages themselves are not listed here. Each page is a .mdx file in
 * content/docs/ whose frontmatter (title, description, group, order) puts it in
 * the sidebar. See AGENTS.md.
 */

/** A six-digit hex color, e.g. "#B4512F". */
type Hex = `#${string}`;

export type DocsConfig = {
  /** Product name shown in the header, page titles and search. */
  name: string;
  /** Default <title>, also used as the og:site_name. */
  title: string;
  /** Default meta description, and the summary line in /llms.txt. */
  description: string;
  /** Square logo in /public, shown next to the name in the header. */
  logo: string;
  /** Left and right text in the strip under every page. */
  footer: { left: string; right: string };
  /** Links in the header (desktop) and the mobile drawer. */
  links: { label: string; href: string; external: boolean }[];
  /** Accent button at the end of the header. null hides it. */
  cta: { label: string; href: string } | null;
  /**
   * Sidebar group order. A page's frontmatter `group` must match one of these
   * labels; groups not listed here are appended after them, in file order.
   */
  groups: string[];
  theme: {
    /**
     * Four brand colors. Every accent in the UI (buttons, links, focus rings,
     * callouts, selection, washes) is derived from these in both light and
     * dark mode -- see the top of the token block in app/globals.css.
     *
     * `brand` carries white button text and link text on white, so keep it
     * at least 4.5:1 against #ffffff. `bright` is the dark-mode link color,
     * so keep it light enough to read on near-black.
     */
    palette: { deep: Hex; brand: Hex; bright: Hex; neutral: Hex };
    /**
     * The grain gradient behind every page title. color1 is the highlight,
     * color2 the body, color3 the shadow. `dark` overrides any of these in
     * dark mode.
     */
    grainient: {
      color1: Hex;
      color2: Hex;
      color3: Hex;
      /** Overall contrast (default 1.5) and saturation (default 1). */
      contrast?: number;
      saturation?: number;
      /**
       * Soft cloudy patches instead of smooth bands. `amount` 0 (or leaving
       * this out) gives the plain React Bits bands; `scale` sets the cloud
       * size (higher = smaller); `seed` picks a different pattern.
       */
      clouds?: { amount: number; scale?: number; seed?: number };
      dark?: { color1?: Hex; color2?: Hex; color3?: Hex; contrast?: number };
    };
  };
};

export const docsConfig: DocsConfig = {
  name: "Acme",
  title: "Acme docs",
  description: "Documentation for Acme, a small toolkit for building and shipping widgets.",
  logo: "/OpenDocera.svg",
  footer: {
    left: "Acme docs · MIT License",
    right: "Built with OpenDocera",
  },
  links: [
    { label: "Home", href: "/", external: false },
    { label: "GitHub", href: "https://github.com/your-org/your-repo", external: true },
  ],
  cta: { label: "Get started", href: "/docs/quickstart" },
  groups: ["Get started", "Guides", "Reference"],
  theme: {
    palette: {
      deep: "#3A2116",
      brand: "#B4512F",
      bright: "#D97757",
      neutral: "#8A7A68",
    },
    grainient: {
      color1: "#D97757",
      color2: "#B4512F",
      color3: "#3A2116",
      clouds: { amount: 1.6, scale: 1.6, seed: 3 },
      // Same colors at lower contrast, so the header stays a backdrop instead
      // of glowing against the near-black page.
      dark: { contrast: 1.2 },
    },
  },
};
