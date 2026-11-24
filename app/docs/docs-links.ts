/**
 * Site-level links in the docs header and mobile drawer. Configured in
 * docs.config.ts; re-exported here so the components keep one import site.
 */
import { docsConfig } from "@/docs.config";

export const SITE_LINKS = docsConfig.links;

export const CTA = docsConfig.cta;
