import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docsConfig } from "@/docs.config";
import { SITE_URL } from "@/lib/site";
import { docsHref, findNavGroup, findNavItem, flatNav } from "../docs-data";
import { DocsPageActions } from "../components/docs-page-actions";
import { DocsPageFooter } from "../components/docs-page-footer";
import { ThemedGrainient } from "@/components/grainient-theme";

type Props = { params: Promise<{ slug: string }> };

const { grainient } = docsConfig.theme;

export function generateStaticParams() {
  return flatNav().map((item) => ({ slug: item.id }));
}

// Nothing outside NAV_GROUPS exists, so every page can be prerendered.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findNavItem(slug);
  if (!item) return {};

  const url = `${SITE_URL}${docsHref(slug)}`;
  return {
    title: item.title,
    description: item.desc,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: docsConfig.title,
      title: `${item.title} — ${docsConfig.title}`,
      description: item.desc,
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} — ${docsConfig.title}`,
      description: item.desc,
    },
  };
}

export default async function DocsSlugPage({ params }: Props) {
  const { slug } = await params;
  const item = findNavItem(slug);
  // Guard before the dynamic import so the slug can only ever name a known page.
  if (!item) notFound();

  const group = findNavGroup(slug);
  const { default: Content } = await import(`@/content/docs/${slug}.mdx`);

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2">
        <nav aria-label="Breadcrumb">
          <ol className="flex list-none items-center gap-2 p-0 text-[12px] text-od-fg-quaternary">
            <li>{group?.label}</li>
            <li aria-hidden="true" className="text-od-fg-faint">
              /
            </li>
            <li className="text-muted-foreground">{item.title}</li>
          </ol>
        </nav>
        <DocsPageActions title={item.title} desc={item.desc} slug={slug} />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-od-accent-line">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* Colors come from docs.config.ts (theme.grainient); the shape
              and grain settings below are the template's look. */}
          <ThemedGrainient
            className="h-full w-full"
            color1={grainient.color1}
            color2={grainient.color2}
            color3={grainient.color3}
            dark={grainient.dark}
            timeSpeed={0}
            colorBalance={-0.15}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={180}
            blendSoftness={0.05}
            rotationAmount={180}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={grainient.contrast ?? 1.5}
            gamma={1}
            saturation={grainient.saturation ?? 1}
            centerX={0}
            centerY={0}
            zoom={1.05}
            cloudAmount={grainient.clouds?.amount ?? 0}
            cloudScale={grainient.clouds?.scale}
            cloudSeed={grainient.clouds?.seed}
          />
        </div>
        <div className="relative z-10 px-5 pt-9 pb-6 sm:px-8 sm:pt-11">
          <h1
            className="m-0 text-[32px] leading-[1.08] font-medium tracking-[-0.03em] text-white sm:text-[42px]"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35), 0 1px 12px rgba(0,0,0,0.2)" }}
          >
            {item.title}
          </h1>
          <p
            className="mt-2.5 text-[15px] leading-[1.6] text-white/85 sm:text-[16.5px]"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
          >
            {item.desc}
          </p>
        </div>
      </div>

      {/* Marked so "Copy page" can lift the real prose out of the DOM. */}
      <div data-docs-prose>
        <Content />
      </div>

      <DocsPageFooter active={slug} />

      <div className="mt-[26px] flex flex-wrap justify-between gap-5 border-t border-od-hairline-strong pt-[18px] font-mono text-[10.5px] text-od-fg-quaternary">
        <span>{docsConfig.footer.left}</span>
        <span>{docsConfig.footer.right}</span>
      </div>
    </>
  );
}
