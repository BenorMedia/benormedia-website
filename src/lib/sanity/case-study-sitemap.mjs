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
 *   - `hasPublished`: at least one published case study → the index is listed;
 *   - `lastmod`: `/case-studies/<slug>` → `publishedAt` (a `YYYY-MM-DD`
 *     date), and `/case-studies` → the newest one;
 *   - `noIndexPaths`: detail pages whose `seo.noIndex` is on (kept out).
 *
 * Without a project id, or when the request fails, it returns "nothing
 * published" and warns: the index then stays out of the sitemap (the safe
 * side). The pages themselves fail the build anyway if Sanity is down.
 */

const PUBLISHED_CASE_STUDY = '_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))';
const QUERY = `*[${PUBLISHED_CASE_STUDY}]{ "slug": slug.current, publishedAt, "noIndex": seo.noIndex == true }`;

/**
 * @param {{ projectId: string, dataset: string, apiVersion: string }} config
 * @returns {Promise<{ hasPublished: boolean, lastmod: Record<string, string>, noIndexPaths: Set<string> }>}
 */
export async function caseStudySitemapInfo({ projectId, dataset, apiVersion }) {
  /** @type {Record<string, string>} */
  const lastmod = {};
  /** @type {Set<string>} */
  const noIndexPaths = new Set();
  const empty = { hasPublished: false, lastmod, noIndexPaths };
  if (!projectId || !dataset) return empty;

  /** @type {{ slug?: string, publishedAt?: string, noIndex?: boolean }[]} */
  let rows;
  try {
    const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
    url.searchParams.set('query', QUERY);
    url.searchParams.set('perspective', 'published');
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = /** @type {{ result?: unknown }} */ (await res.json());
    rows = Array.isArray(body.result) ? body.result : [];
  } catch (error) {
    console.warn(`[case-studies] sitemap: could not read published case studies (${String(error)}); /case-studies left out`);
    return empty;
  }

  /** @type {string[]} */
  const dates = [];
  for (const row of rows) {
    if (!row.slug) continue;
    const path = `/case-studies/${row.slug}`;
    if (row.noIndex) noIndexPaths.add(path);
    if (row.publishedAt) {
      const date = String(row.publishedAt).slice(0, 10);
      lastmod[path] = date;
      dates.push(date);
    }
  }
  const hasPublished = rows.some((row) => !!row.slug);
  if (dates.length > 0) lastmod['/case-studies'] = /** @type {string} */ (dates.sort().at(-1));
  return { hasPublished, lastmod, noIndexPaths };
}
