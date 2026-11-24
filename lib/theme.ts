import { docsConfig } from "@/docs.config";

// Single source of truth for the brand accent, referenced anywhere a
// component needs the color outside a Tailwind class (inline `style`, an SVG
// prop) since those sites can't take a `dark:` variant. Points at the CSS
// custom property so the value still flips with the theme.
export const ACCENT = "var(--od-accent)";

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

function hex(name: string, value: string): string {
  if (!HEX.test(value)) {
    throw new Error(`docs.config.ts: theme.palette.${name} must be a hex color, got "${value}"`);
  }
  return value;
}

/**
 * The :root rule that feeds docs.config.ts's palette into the CSS. Every accent
 * token in app/globals.css derives from these four variables. Values are
 * validated as hex so nothing else can reach the stylesheet.
 */
export function brandCss(): string {
  const p = docsConfig.theme.palette;
  return `:root{--od-brand-deep:${hex("deep", p.deep)};--od-brand:${hex("brand", p.brand)};--od-brand-bright:${hex("bright", p.bright)};--od-brand-neutral:${hex("neutral", p.neutral)};}`;
}
