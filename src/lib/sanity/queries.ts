/**
 * GROQ queries + thin typed fetchers for Home + siteSettings (Phase 2).
 *
 * Rules:
 *   - Every field the schema declares is projected, so components never
 *     need a follow-up fetch.
 *   - Every reference is dereferenced (`->`) with only the sub-fields the
 *     renderer needs.
 *   - Image fields are returned raw (asset ref + hotspot/crop + alt) so
 *     components can pass them straight to `urlFor`.
 *   - The `link` object is projected in full — including the dereferenced
 *     `internalRef` — so building an href never requires another fetch.
 *
 * Per Lead decision 2026-09-25 (SCHEMAS.md v0.5): page singletons hold only
 * SEO. Repeatable data (clients, testimonials, posts, authors, categories)
 * has its own queries when a page needs it — those live in later phases.
 */
import { sanityClient } from './client';
import type { HomePage, SiteSettings } from './types';

// ---------------------------------------------------------------------------
// Fragments — assembled into the full queries below.
// ---------------------------------------------------------------------------

/** Image with dereferenced asset + hotspot/crop + alt. */
const IMAGE = /* groq */ `{
  "asset": asset->{ _ref, _id },
  hotspot,
  crop,
  alt
}`;

/** The `seo` object. */
const SEO = /* groq */ `{
  metaTitle,
  metaDescription,
  "ogImage": ogImage${IMAGE},
  noIndex,
  canonicalUrl
}`;

/** A link's `internalRef` deref, with only the fields the renderer needs. */
const LINK_INTERNAL_REF = /* groq */ `internalRef->{
  _id,
  _type,
  "slug": slug,
  title
}`;

/** A `link` object in full (all three types: internal, external, contact). */
const LINK = /* groq */ `{
  label,
  type,
  ${LINK_INTERNAL_REF},
  externalUrl,
  openInNewTab
}`;

/** A `button` object — link + variant. */
const BUTTON = /* groq */ `{
  variant,
  link${LINK}
}`;

// ---------------------------------------------------------------------------
// HOME_QUERY
// ---------------------------------------------------------------------------

/**
 * Returns the single `homePage` document (there is only one — enforced by the
 * singleton structure). `[0]` narrows the array; the fetcher returns `null`
 * when the singleton hasn't been created yet in Sanity.
 *
 * The page holds only SEO — all Home page copy is authored directly in the
 * Astro components.
 */
export const HOME_QUERY = /* groq */ `
*[_type == "homePage"][0]{
  _id,
  _type,
  "seo": seo${SEO}
}
`;

// ---------------------------------------------------------------------------
// SITE_SETTINGS_QUERY
// ---------------------------------------------------------------------------

export const SITE_SETTINGS_QUERY = /* groq */ `
*[_type == "siteSettings"][0]{
  _id,
  _type,

  // General
  siteName,
  siteUrl,
  "logo": logo${IMAGE},
  contactEmail,

  // SEO & Meta
  titleTemplate,
  defaultMetaTitle,
  defaultMetaDescription,
  "defaultOgImage": defaultOgImage${IMAGE},
  twitterHandle,
  googleSiteVerification,

  // Organization
  legalName,
  orgDescription,
  "orgLogo": orgLogo${IMAGE},
  sameAs,
  foundingYear,
  address{ street, city, region, postalCode, country },

  // Global sections
  ctaBanner{
    eyebrow,
    title,
    buttons[]${BUTTON},
    socialProofText
  },
  contactModal{
    title,
    description,
    successMessage
  }
}
`;

// ---------------------------------------------------------------------------
// Fetchers
// ---------------------------------------------------------------------------

/**
 * Fetch the Home singleton. Returns `null` if the document hasn't been
 * created yet in Sanity (early builds against a fresh dataset). Pages that
 * use this should treat `null` as "no SEO override — use siteSettings defaults".
 */
export async function getHome(): Promise<HomePage | null> {
  const result = await sanityClient.fetch<HomePage | null>(HOME_QUERY);
  return result ?? null;
}

/**
 * Fetch the `siteSettings` singleton. Returns `null` if it doesn't exist
 * yet — callers should fall back to safe defaults so the site still renders
 * in a fresh-dataset scenario.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const result = await sanityClient.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
  );
  return result ?? null;
}
