// @ts-check
/**
 * Case studies in the sitemap (`astro.config.mjs`), read once at build time.
 *
 * Lead 2026-10-20: `/case-studies` stays out of the sitemap (and noindex,
 * `src/pages/case-studies/index.astro`) until a case study is published. The
 * config is plain JavaScript and runs before the Astro pages, so it asks the
 * Sanity HTTP API directly (no client import, no dependency), with the same
 * filter as `PUBLISHED_CASE_STUDY` in `queries.ts`: keep the two in sync.
 *
 * Returns:
 *   - `hasPublished`: at least one published case study that is NOT set to
 *     noindex → the index is listed (lead 2026-10-21, QA nit 6);
 *   - `lastmod`: `/case-studies/<slug>` → `publishedAt` (a `YYYY-MM-DD`
 *     date), and `/case-studies` → the newest one among the indexable ones;
 *   - `noIndexPaths`: detail pages whose `seo.noIndex` is on (kept out).
 *
 * Fails closed (QA should-fix 2, lead 2026-10-21): with a project id set,
 * a failed request (network error, non-2xx answer, unreadable JSON) STOPS
 * the build with an error, so a sitemap built from wrong data ("nothing
 * published" while case studies are live) can never be deployed. Pass
 * `failHard: false` (the `astro dev` server) to only warn instead.
 * Without a project id there is no Sanity to ask: it warns and returns
 * "nothing published" (the index stays out of the sitemap).
 */

import { publishedSitemapInfo } from './published-sitemap.mjs';

/**
 * Same filter as `PUBLISHED_CASE_STUDY` in `queries.ts` (built in
 * `published-sitemap.mjs`, shared with comparisons).
 *
 * @param {{ projectId: string, dataset: string, apiVersion: string, failHard?: boolean }} config
 * @returns {Promise<{ hasPublished: boolean, lastmod: Record<string, string>, noIndexPaths: Set<string> }>}
 */
export function caseStudySitemapInfo(config) {
  return publishedSitemapInfo({ ...config, type: 'caseStudy', basePath: '/case-studies', tag: 'case-studies', noun: 'case studies' });
}
