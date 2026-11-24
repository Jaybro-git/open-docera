"use client";

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import { CopyButton } from "./copy-button";

/**
 * rehype-pretty-code retags the fence's own <pre> as <figure> and nests a fresh
 * shiki <pre> inside it. So the element that carries the block is `figure`, and
 * `pre` is the highlighted body. Both are mapped in mdx-components.tsx.
 */

/** False inside CodeTabs, where the tab bar owns the frame and copy button. */
export const CodeChromeContext = createContext(true);

/** True between <pre> and its <code>, so inline code can style itself apart. */
const InsidePreContext = createContext(false);

/**
 * A fence written as ```ts title="src/index.ts" makes rehype-pretty-code emit a
 * <figcaption data-rehype-pretty-code-title> before the <pre>. Pull it out so
 * the title can sit in the header bar instead of floating above the code.
 */
function splitTitle(children: ReactNode): { title: ReactNode; body: ReactNode[] } {
  let title: ReactNode = null;
  const body: ReactNode[] = [];
  for (const child of Children.toArray(children)) {
    if (
      isValidElement<{ children?: ReactNode; "data-rehype-pretty-code-title"?: string }>(child) &&
      child.props["data-rehype-pretty-code-title"] !== undefined
    ) {
      title = child.props.children;
    } else {
      body.push(child);
    }
  }
  return { title, body };
}

export function CodeFigure({ children, ...props }: ComponentProps<"figure">) {
  const chrome = useContext(CodeChromeContext);
  const ref = useRef<HTMLElement>(null);
  const { title, body } = splitTitle(children);

  // Inside CodeTabs the tab label already names the block, so a title is dropped.
  if (!chrome) {
    return (
      <figure ref={ref} {...props} className="m-0">
        {body}
      </figure>
    );
  }

  return (
    <figure
      ref={ref}
      {...props}
      className="mt-[18px] overflow-hidden rounded-[9px] border border-od-code-border bg-card"
      style={{ boxShadow: "0 1px 2px var(--od-shadow-sm)" }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-od-hairline-strong bg-od-surface-2 py-1.5 pr-2 pl-[18px]">
        {/* Empty span keeps the copy button right-aligned when there is no title. */}
        <span className="min-w-0 truncate font-mono text-[11.5px] text-od-fg-tertiary">{title}</span>
        <CopyButton getText={() => ref.current?.querySelector("pre")?.textContent ?? ""} />
      </div>
      {body}
    </figure>
  );
}

export function CodePre({ children, ...props }: ComponentProps<"pre">) {
  return (
    <InsidePreContext.Provider value={true}>
      <pre
        {...props}
        className="m-0 overflow-x-auto px-[18px] pt-[18px] pb-5 font-mono text-[12.5px] leading-[1.75] whitespace-pre text-od-code-fg"
      >
        {children}
      </pre>
    </InsidePreContext.Provider>
  );
}

export function CodeInline({ children, ...props }: ComponentProps<"code">) {
  const insidePre = useContext(InsidePreContext);
  if (insidePre) return <code {...props}>{children}</code>;

  // No tint and no box: monospace at a muted grey is enough to mark a literal.
  // A highlighted background here reads as a link and fights the real ones.
  return (
    <code {...props} className="font-mono text-[12px] text-muted-foreground">
      {children}
    </code>
  );
}
