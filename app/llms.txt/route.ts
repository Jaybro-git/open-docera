import { docsConfig } from "@/docs.config";
import { NAV_GROUPS, docsHref } from "@/app/docs/docs-data";
import { SITE_URL } from "@/lib/site";

// /llms.txt (https://llmstxt.org): a plain-text map of the docs for AI
// assistants. Built once at build time from the same sidebar data the site
// uses, so it can never list a page that does not exist.
export const dynamic = "force-static";

export function GET() {
  const lines = [`# ${docsConfig.title}`, "", `> ${docsConfig.description}`, ""];

  for (const group of NAV_GROUPS) {
    lines.push(`## ${group.label}`, "");
    for (const item of group.items) {
      lines.push(`- [${item.title}](${SITE_URL}${docsHref(item.id)}): ${item.desc}`);
    }
    lines.push("");
  }

  lines.push("## Optional", "", `- [Full text](${SITE_URL}/llms-full.txt): every page in one file`, "");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
