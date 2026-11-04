/**
 * Card categories for the article pages (guides and blog posts), by slug
 * (lead 2026-10-17: "generate a category for each article"), kept in
 * `copy.json` → `categories`. Shown as the accent tag on the cards. A page
 * without an entry falls back to its family's tag ("Guides" or "Blog"), so
 * add new articles there.
 */
import copy from "./copy.json";
import type { Family } from "./loader";

/** Category by slug, in `copy.json` (every string the templates add). */
export const CATEGORIES: Record<string, string> = copy.categories;

const FALLBACK: Record<Family, string> = {
  article: copy.articleEyebrow.guide,
  blog: copy.articleEyebrow.blog,
  commercial: copy.resources.serviceTag,
};

/** A card's accent tag: services keep "Services"; articles their category. */
export const categoryOf = (slug: string | undefined, family: Family): string =>
  family === "commercial" ? FALLBACK.commercial : ((slug && CATEGORIES[slug]) ?? FALLBACK[family]);
