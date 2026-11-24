---
name: rebrand
description: Change this OpenDocera site's branding - product name, logo, links, header button, footer, theme colors and the page-header gradient - in docs.config.ts. Use when the user asks to rebrand, rename, recolor, retheme or set up the docs for their product.
---

# Rebrand the docs site

All branding lives in `docs.config.ts`. Do not edit components or
`app/globals.css` for a rebrand.

1. **Collect what's needed**, and ask only for what you can't find in the
   repo or the conversation:
   - product name and a one-sentence description
   - logo file: copy it into `public/` and set `logo` to `/<file>`. A square
     image works best; it is shown at 28×28.
   - header links (GitHub, website, ...) and the header button (`cta`), or `null` to hide it
   - footer text
   - brand colors: a single color or a full palette
2. **Build the palette** (`theme.palette`):
   - `brand`: the main color. It needs at least 4.5:1 contrast with white,
     because it carries white button text and link text on white. If the
     user's color is lighter than that, use it as `bright` and darken it for
     `brand`.
   - `deep`: a much darker shade of `brand`, for hover text and callout titles.
   - `bright`: a lighter shade, for links in dark mode. It needs at least
     4.5:1 contrast with `#0a0c11`.
   - `neutral`: a desaturated companion (greige or slate) for soft washes.
   Check each contrast ratio with the WCAG formula rather than by eye, and
   tell the user if you had to adjust one of their colors.
3. **Set the gradient** (`theme.grainient`): usually `color1` = `bright`,
   `color2` = `brand`, `color3` = `deep`. Keep the existing `contrast`,
   `saturation`, `clouds` and `dark` values unless the user wants a different
   look. The title text on it is white, so `color2` should not be pale.
4. **Update `title`, `description` and `footer`** to use the new name.
5. **Verify** with `npm run build`. Then suggest `npm run dev` so the user can
   look at it in both light and dark mode (theme toggle in the header).
