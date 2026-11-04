/**
 * "Resources" sections outside the articles (lead 2026-10-26): Home, the
 * service pages and the solution pages show the three newest guides and blog
 * posts. A page with an entry in `RESOURCE_CATEGORIES` shows the newest of
 * those categories first (`copy.json` → `categories`), topped up with the
 * newest others when fewer than three match. Home shows the newest overall.
 */
import { categoryOf } from "./categories";
import { cardOf, pagesOf, type Card, type NpPage } from "./loader";

/** Categories relevant to each page, by page slug (Sanity services and pack pages). */
export const RESOURCE_CATEGORIES: Record<string, readonly string[]> = {
  // Services
  "custom-websites-migrations": ["Migration"],
  "website-redesign": ["Redesign"],
  "webflow-migration": ["Migration"],
  "headless-cms-agency": ["Migration", "Web Design"],
  growth: ["SEO", "CRO", "Analytics", "AI Search"],
  "webflow-seo-agency": ["SEO"],
  "aeo-agency": ["AI Search"],
  "ongoing-website-support": ["Webflow", "Analytics"],
  // Solutions
  "b2b-saas-web-design": ["Web Design", "CRO"],
  "cybersecurity-web-design": ["Web Design", "Webflow"],
  "webflow-enterprise-agency": ["Webflow"],
};

const newestFirst = (a: NpPage, b: NpPage): number =>
  b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug);

/** The newest guides and blog posts built in this mode, relevant ones first. */
export function latestResources(pageSlug?: string, limit = 3): Card[] {
  const all = [...pagesOf("article"), ...pagesOf("blog")].sort(newestFirst);
  const cats = pageSlug ? RESOURCE_CATEGORIES[pageSlug] : undefined;
  const match = cats ? all.filter((p) => cats.includes(categoryOf(p.slug, p.family))) : all;
  const rest = all.filter((p) => !match.includes(p));
  return [...match, ...rest].slice(0, limit).map(cardOf);
}

/** The newest blog posts, for the footer's BLOG column. */
export const latestPosts = (limit = 3): NpPage[] => pagesOf("blog").sort(newestFirst).slice(0, limit);
