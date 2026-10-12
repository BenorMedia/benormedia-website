// @ts-check
/**
 * New pages: the pack files, the families and the build modes, in plain
 * JavaScript so `astro.config.mjs` (sitemap), the Astro loader and the check
 * scripts all read them the same way. Docs: `docs/new-pages.md`.
 *
 * Source of truth: `content-pack/content/*.md`, parsed with the pack's own
 * parser (`readContentFile`), so the site and the checker cannot disagree.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { readContentFile } from "../../../content-pack/scripts/lib/frontmatter.mjs";

/** Repo root: `process.cwd()` for every command (Astro, Vercel, the scripts). */
export const ROOT = resolve(process.cwd());
export const PACK_DIR = join(ROOT, "content-pack");
export const CONTENT_DIR = join(PACK_DIR, "content");
export const DEFAULTED_DIR = join(PACK_DIR, "defaulted");
export const CHECKER = join(PACK_DIR, "scripts", "check-content.mjs");
export const APPLY_DEFAULTS = join(PACK_DIR, "scripts", "apply-defaults.mjs");
export const PLAN_FILE = join(PACK_DIR, "data", "plan.json");

/** `pageType` → family (brief 5.2). Any other type is skipped. */
export const FAMILY = /** @type {const} */ ({
  service: "commercial",
  industry: "commercial",
  regional: "commercial",
  guide: "article",
  comparison: "article",
  "data-study": "article",
});

/**
 * @typedef {"commercial" | "article"} Family
 * @typedef {{ slug: string, url: string, pageType: string, family: Family | null,
 *   draft: boolean, updatedAt: string | undefined, file: string }} PackEntry
 */

/**
 * Build mode (brief 5.3). `env` is the merged environment: process env plus
 * the Vite env (`.env`), so `PUBLIC_SITE_ENV` is seen in both.
 *
 * Production = `VERCEL_ENV=production`, or `PUBLIC_SITE_ENV=production` (the
 * site's own production switch, DECISIONS 2026-09-25), or any build outside
 * Vercel without `PAGES_INCLUDE_DRAFTS=1`. `PAGES_INCLUDE_DRAFTS` is never
 * honoured in production.
 *
 * @param {Record<string, string | undefined>} env
 * @param {boolean} isDev `astro dev`
 */
export function resolveMode(env, isDev) {
  const production = env["VERCEL_ENV"] === "production" || env["PUBLIC_SITE_ENV"] === "production";
  const includeDrafts =
    !production && (isDev || env["VERCEL_ENV"] === "preview" || env["PAGES_INCLUDE_DRAFTS"] === "1");
  /** @type {"review" | "defaults"} */
  const view = includeDrafts && env["PAGES_VIEW"] === "defaults" ? "defaults" : "review";
  return { production, includeDrafts, view };
}

/** Every pack file, parsed. Front matter errors are left to the checker. */
export function readPackFiles() {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const file = join(CONTENT_DIR, f);
      const parsed = readContentFile(readFileSync(file, "utf8"));
      return { file, parsed };
    });
}

/** @returns {PackEntry[]} */
export function readPackEntries() {
  return readPackFiles().map(({ file, parsed }) => {
    const d = /** @type {Record<string, any>} */ (parsed.data);
    const pageType = String(d["pageType"] ?? "");
    return {
      slug: String(d["slug"] ?? ""),
      url: String(d["url"] ?? ""),
      pageType,
      family: /** @type {Record<string, Family>} */ (FAMILY)[pageType] ?? null,
      draft: d["draft"] !== false,
      updatedAt: d["updatedAt"] ? String(d["updatedAt"]) : undefined,
      file,
    };
  });
}

/**
 * What the sitemap needs (`astro.config.mjs`, brief 5.7): the URLs of draft
 * pages (kept out of the preview sitemap) and `lastmod` = `updatedAt` for
 * released pages.
 */
export function sitemapInfo() {
  const draftPaths = new Set();
  /** @type {Record<string, string>} */
  const lastmod = {};
  for (const e of readPackEntries()) {
    if (!e.family || !e.url) continue;
    if (e.draft) draftPaths.add(e.url);
    else if (e.updatedAt) lastmod[e.url] = e.updatedAt;
  }
  return { draftPaths, lastmod };
}
