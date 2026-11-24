import type { ReactNode } from "react";

const TONES = {
  note: {
    border: "var(--od-note-border)",
    bg: "var(--od-note-bg)",
    bar: "var(--od-note-bar)",
    title: "var(--od-note-title)",
  },
  warn: {
    border: "var(--od-warn-border)",
    bg: "var(--od-warn-bg)",
    bar: "var(--od-warn-bar)",
    title: "var(--od-warn-title)",
  },
} as const;

export function Callout({
  title,
  tone = "note",
  children,
}: {
  title?: string;
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <aside
      className="mt-8 flex gap-3 rounded-lg border px-4 py-3.5"
      style={{ borderColor: t.border, background: t.bg }}
    >
      <div className="w-[3px] flex-none rounded-sm" style={{ background: t.bar }} aria-hidden="true" />
      <div className="min-w-0">
        {title && (
          <div className="text-[13px] font-semibold" style={{ color: t.title }}>
            {title}
          </div>
        )}
        {/* MDX wraps the body in <p>, which would otherwise take the global
            14.5px paragraph size -- set it on the paragraph, not the box. */}
        <div className="text-od-fg-body [&_p]:mt-[5px] [&_p]:text-[13px] [&_p]:leading-[1.6]">
          {children}
        </div>
      </div>
    </aside>
  );
}
