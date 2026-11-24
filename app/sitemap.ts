import type { MetadataRoute } from "next";
import { docsHref, flatNav } from "./docs/docs-data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return flatNav().map((item) => ({ url: `${SITE_URL}${docsHref(item.id)}` }));
}
