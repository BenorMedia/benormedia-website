// Case study entries for astro.config.mjs (sitemap), read as text so the
// config never imports the entries' image modules. Each entry in
// `entries/*.ts` exports `SLUG` and `DRAFT` on lines of their own.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "entries");

/** @returns {{ draftPaths: Set<string> }} */
export function caseStudySitemapInfo() {
  const draftPaths = new Set();
  for (const f of readdirSync(DIR).filter((n) => n.endsWith(".ts"))) {
    const src = readFileSync(join(DIR, f), "utf8");
    const slug = src.match(/^export const SLUG = "([a-z0-9-]+)";$/m)?.[1];
    const draft = src.match(/^export const DRAFT = (true|false);$/m)?.[1];
    if (!slug || !draft) throw new Error(`case study ${f}: SLUG or DRAFT line not found`);
    if (draft === "true") draftPaths.add(`/work/${slug}`);
  }
  return { draftPaths };
}
