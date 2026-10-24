// @ts-check
/**
 * Comparisons in the sitemap (`astro.config.mjs`, DECISIONS → Comparison
 * 2026-10-22): `/comparison` is listed only once an indexable comparison is
 * published; detail pages take `lastmod` = `publishedAt`. Same filter as
 * `PUBLISHED_COMPARISON` in `queries.ts`. See `published-sitemap.mjs`.
 */
import { publishedSitemapInfo } from './published-sitemap.mjs';

/**
 * @param {{ projectId: string, dataset: string, apiVersion: string, failHard?: boolean }} config
 */
export function comparisonSitemapInfo(config) {
  return publishedSitemapInfo({ ...config, type: 'comparison', basePath: '/comparison', tag: 'comparison', noun: 'comparisons' });
}
