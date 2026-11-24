import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  IBM_Plex_Serif,
  Manrope,
  Google_Sans_Code,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { docsConfig } from "@/docs.config";
import { SITE_URL } from "@/lib/site";
import { brandCss } from "@/lib/theme";

// IBM Plex Sans is no longer the body face (--font-sans maps to Manrope), but
// Plex Mono/Serif still load below.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

// Display and code typefaces, exposed as the `font-display` / `font-code`
// utilities. Kept separate from the Plex tokens above so each can be swapped
// on its own.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Google Sans Code is newer than Next 16.3.3's precalculated capsize metrics
// table, so Next cannot build a metric-matched fallback face for it and logs
// an error about it on every compile. Opt out of that synthetic face and name
// a real mono stack instead -- same result, no noise.
const googleSansCode = Google_Sans_Code({
  variable: "--font-gs-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "Liberation Mono",
    "monospace",
  ],
});

export const metadata: Metadata = {
  // Lets Next resolve site-relative image paths into absolute og:image URLs.
  metadataBase: new URL(SITE_URL),
  title: docsConfig.title,
  description: docsConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        plexSans.variable,
        plexMono.variable,
        plexSerif.variable,
        manrope.variable,
        googleSansCode.variable,
      )}
    >
      <head>
        {/* Brand palette from docs.config.ts. Inline so the first paint is
            already in brand colors, with no flash of the fallback. */}
        <style dangerouslySetInnerHTML={{ __html: brandCss() }} />
      </head>
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
