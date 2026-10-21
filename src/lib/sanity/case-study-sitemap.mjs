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

const PUBLISHED_CASE_STUDY = '_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))';
const QUERY = `*[${PUBLISHED_CASE_STUDY}]{ "slug": slug.current, publishedAt, "noIndex": seo.noIndex == true }`;

/**
 * @param {{ projectId: string, dataset: string, apiVersion: string, failHard?: boolean }} config
 * @returns {Promise<{ hasPublished: boolean, lastmod: Record<string, string>, noIndexPaths: Set<string> }>}
 */
export async function caseStudySitemapInfo({ projectId, dataset, apiVersion, failHard = true }) {
  /** @type {Record<string, string>} */
  const lastmod = {};
  /** @type {Set<string>} */
  const noIndexPaths = new Set();
  const empty = { hasPublished: false, lastmod, noIndexPaths };
  if (!projectId || !dataset) {
    console.warn('[case-studies] sitemap: no Sanity project id or dataset; no case studies listed, /case-studies left out');
    return empty;
  }

  /** @type {{ slug?: string, publishedAt?: string, noIndex?: boolean }[]} */
  let rows;
  try {
    const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
    url.searchParams.set('query', QUERY);
    url.searchParams.set('perspective', 'published');
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Sanity answered HTTP ${res.status} ${res.statusText}`.trim());
    /** @type {{ result?: unknown }} */
    let body;
    try {
      body = await res.json();
    } catch {
      throw new Error('Sanity answered with something that is not JSON');
    }
    if (!body || !Array.isArray(body.result)) throw new Error('Sanity answer has no `result` list');
    rows = body.result;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    if (!failHard) {
      console.warn(`[case-studies] sitemap: could not read published case studies (${reason}); /case-studies left out of the sitemap for this dev session`);
      return empty;
    }
    throw new Error(
      [
        `[case-studies] Build stopped on purpose: could not read the published case studies from Sanity for the sitemap (${reason}).`,
        'Without them the sitemap could leave out live case studies or list the wrong ones, so this build is not deployed.',
        'Check that Sanity is reachable (status.sanity.io) and that PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET are right, then redeploy. The live site keeps its previous deploy.',
      ].join('\n'),
      { cause: error },
    );
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
      // The index lastmod follows the indexable case studies only.
      if (!row.noIndex) dates.push(date);
    }
  }
  const hasPublished = rows.some((row) => !!row.slug && !row.noIndex);
  if (dates.length > 0) lastmod['/case-studies'] = /** @type {string} */ (dates.sort().at(-1));
  return { hasPublished, lastmod, noIndexPaths };
}
