// @ts-check
/**
 * Published Sanity documents in the sitemap (`astro.config.mjs`), read once
 * at build time. Shared by case studies (`case-study-sitemap.mjs`) and
 * comparisons (`comparison-sitemap.mjs`): an index page stays out of the
 * sitemap (and noindex) until a document of its type is published.
 *
 * The config is plain JavaScript and runs before the Astro pages, so it asks
 * the Sanity HTTP API directly (no client import, no dependency), with the
 * same filter as the matching `PUBLISHED_*` fragment in `queries.ts`: keep
 * them in sync.
 *
 * Returns:
 *   - `hasPublished`: at least one published document that is NOT set to
 *     noindex → the index is listed;
 *   - `lastmod`: `<basePath>/<slug>` → `publishedAt` (`YYYY-MM-DD`), and
 *     `<basePath>` → the newest one among the indexable ones;
 *   - `noIndexPaths`: detail pages whose `seo.noIndex` is on (kept out).
 *
 * Fails closed: with a project id set, a failed request (network error,
 * non-2xx answer, unreadable JSON) STOPS the build with an error, so a
 * sitemap built from wrong data can never be deployed. `failHard: false`
 * (the `astro dev` server) only warns. Without a project id there is no
 * Sanity to ask: it warns and returns "nothing published".
 */

/**
 * @param {{
 *   projectId: string, dataset: string, apiVersion: string, failHard?: boolean,
 *   type: string, basePath: string, tag: string, noun: string,
 * }} config `type` = Sanity `_type`; `basePath` e.g. "/comparison"; `tag` =
 *   log prefix; `noun` = plural for messages, e.g. "comparisons".
 * @returns {Promise<{ hasPublished: boolean, lastmod: Record<string, string>, noIndexPaths: Set<string> }>}
 */
export async function publishedSitemapInfo({ projectId, dataset, apiVersion, failHard = true, type, basePath, tag, noun }) {
  /** @type {Record<string, string>} */
  const lastmod = {};
  /** @type {Set<string>} */
  const noIndexPaths = new Set();
  const empty = { hasPublished: false, lastmod, noIndexPaths };
  if (!projectId || !dataset) {
    console.warn(`[${tag}] sitemap: no Sanity project id or dataset; no ${noun} listed, ${basePath} left out`);
    return empty;
  }

  const filter = `_type == "${type}" && defined(slug.current) && !(_id in path("drafts.**"))`;
  const query = `*[${filter}]{ "slug": slug.current, publishedAt, "noIndex": seo.noIndex == true }`;

  /** @type {{ slug?: string, publishedAt?: string, noIndex?: boolean }[]} */
  let rows;
  try {
    const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
    url.searchParams.set('query', query);
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
      console.warn(`[${tag}] sitemap: could not read published ${noun} (${reason}); ${basePath} left out of the sitemap for this dev session`);
      return empty;
    }
    throw new Error(
      [
        `[${tag}] Build stopped on purpose: could not read the published ${noun} from Sanity for the sitemap (${reason}).`,
        `Without them the sitemap could leave out live ${noun} or list the wrong ones, so this build is not deployed.`,
        'Check that Sanity is reachable (status.sanity.io) and that PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET are right, then redeploy. The live site keeps its previous deploy.',
      ].join('\n'),
      { cause: error },
    );
  }

  /** @type {string[]} */
  const dates = [];
  for (const row of rows) {
    if (!row.slug) continue;
    const path = `${basePath}/${row.slug}`;
    if (row.noIndex) noIndexPaths.add(path);
    if (row.publishedAt) {
      const date = String(row.publishedAt).slice(0, 10);
      lastmod[path] = date;
      // The index lastmod follows the indexable documents only.
      if (!row.noIndex) dates.push(date);
    }
  }
  const hasPublished = rows.some((row) => !!row.slug && !row.noIndex);
  if (dates.length > 0) lastmod[basePath] = /** @type {string} */ (dates.sort().at(-1));
  return { hasPublished, lastmod, noIndexPaths };
}
