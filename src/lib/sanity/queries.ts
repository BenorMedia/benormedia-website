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
import type {
  Client,
  HomePage,
  PageSeoDoc,
  PageSingletonType,
  SiteSettings,
  Testimonial,
} from './types';

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
// PAGE_SEO — SEO-only page singletons (Work, Pricing, Testimonials, Blog)
// ---------------------------------------------------------------------------

/**
 * Singletons are pinned to `_id == <type name>` by the desk structure
 * (`sanity/structure.ts` → `S.editor().documentId(typeName)`), so matching the
 * exact `_id` also excludes drafts (`drafts.<type>`). `_type` is matched too so
 * a stray document with that id can never leak in.
 */
export const PAGE_SEO = /* groq */ `
*[_id == $type && _type == $type][0]{
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
// CLIENTS_BY_IDS
// ---------------------------------------------------------------------------

/**
 * Fields the shared `ClientList` rows render (icon, name, funds tag, category
 * tag, website link, hover screenshot). Shared by CLIENTS_BY_IDS and
 * ALL_CLIENTS so the list projection is defined once.
 */
const CLIENT_LIST_FIELDS = /* groq */ `
  _id,
  _type,
  name,
  "icon": icon${IMAGE},
  "websiteScreenshot": websiteScreenshot${IMAGE},
  fundsRaised,
  websiteUrl,
  "category": category->{
    _id,
    _type,
    title,
    "slug": slug
  }
`;

/**
 * Returns published clients whose `_id` is in `$ids`. Used by Home sections
 * (FeaturedWork, OurWork) which pin the clients they render by hardcoded
 * document IDs — see `getClientsByIds` below for the order-preserving fetcher.
 *
 * Client documents are seeded with deterministic IDs of the form
 * `client-<slug>` (see `scripts/seed-categories.mjs` and
 * `scripts/sanity/import-client-assets.ts`). The client schema has no `slug`
 * field, so `_id` is the stable handle.
 *
 * Note: GROQ does not preserve the order of `$ids` in the result — the
 * fetcher re-orders client-side.
 */
export const CLIENTS_BY_IDS = /* groq */ `
*[_type == "client" && _id in $ids]{
  ${CLIENT_LIST_FIELDS},
  "logo": logo${IMAGE},
  "cardThumbnail": cardThumbnail${IMAGE},
  "testimonial": testimonial->{
    _id,
    _type,
    quote,
    authorName,
    authorRole,
    "authorPhoto": authorPhoto${IMAGE},
    "companyLogo": companyLogo${IMAGE},
    kpis[]{ value, description }
  }
}
`;

// ---------------------------------------------------------------------------
// ALL_CLIENTS — the Work page listing. Every published client that has a
// name (incomplete clients are skipped at query time, SCHEMAS.md), with only
// the fields `ClientList` renders. Ordered by category title, then name
// (Proposed default; the lead may prefer a pinned order).
// ---------------------------------------------------------------------------

export const ALL_CLIENTS = /* groq */ `
*[_type == "client" && defined(name) && !(_id in path("drafts.**"))]
  | order(category->title asc, name asc){
  ${CLIENT_LIST_FIELDS}
}
`;

// ---------------------------------------------------------------------------
// ALL_CLIENTS_WITH_LOGO — the LogoStrip marquee (Home) reads the entire
// roster, filtered to clients that have a logo asset. Sorted alphabetically
// so the loop looks deliberate rather than random.
// ---------------------------------------------------------------------------

export const ALL_CLIENTS_WITH_LOGO = /* groq */ `
*[_type == "client" && defined(logo.asset)] | order(name asc){
  _id,
  _type,
  name,
  "logo": logo${IMAGE}
}
`;

// ---------------------------------------------------------------------------
// TESTIMONIALS — every published testimonial, oldest first, with the client
// that references it (`client.testimonial`) so cards can show that client's
// logo. Used by the shared TestimonialMarquee (Home + other pages).
// ---------------------------------------------------------------------------

export const TESTIMONIALS = /* groq */ `
*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(_createdAt asc){
  _id,
  _type,
  quote,
  authorName,
  authorRole,
  "authorPhoto": authorPhoto${IMAGE},
  "companyLogo": companyLogo${IMAGE},
  kpis[]{ value, description },
  "client": *[_type == "client" && references(^._id)][0]{
    _id,
    name,
    "logo": logo${IMAGE}
  }
}
`;

// ---------------------------------------------------------------------------
// CLIENT_BADGES — every published client with a circular `badge` image.
// Feeds the rotating badge group in the global CTA banner (every page).
// ---------------------------------------------------------------------------

export const CLIENT_BADGES = /* groq */ `
*[_type == "client" && defined(badge.asset) && !(_id in path("drafts.**"))] | order(name asc){
  _id,
  name,
  "badge": badge${IMAGE}
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

/**
 * Fetch clients by their document `_id` and return them in the same order as
 * `ids`. Missing IDs (unpublished, typo'd, or deleted) are dropped and logged
 * so a broken pin surfaces in build logs rather than silently reordering the
 * remaining clients.
 *
 * Returns `[]` immediately when called with no IDs so callers can safely
 * forward variables that may be empty in early development.
 */
export async function getClientsByIds(ids: string[]): Promise<Client[]> {
  if (ids.length === 0) return [];

  const result = await sanityClient.fetch<Client[]>(CLIENTS_BY_IDS, { ids });

  const byId = new Map<string, Client>();
  for (const client of result) {
    byId.set(client._id, client);
  }

  const ordered: Client[] = [];
  const missing: string[] = [];
  for (const id of ids) {
    const client = byId.get(id);
    if (client) {
      ordered.push(client);
    } else {
      missing.push(id);
    }
  }

  if (missing.length > 0) {
    console.warn(
      `[sanity] getClientsByIds: ${missing.length} client(s) not found: ${missing.join(', ')}`,
    );
  }

  return ordered;
}

/**
 * Fetch every published client that has a badge image, alphabetical by name.
 */
export async function getClientBadges(): Promise<Client[]> {
  return await sanityClient.fetch<Client[]>(CLIENT_BADGES);
}

/**
 * Fetch every published testimonial (oldest first) with its related client.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return await sanityClient.fetch<Testimonial[]>(TESTIMONIALS);
}

/**
 * Fetch every published client that has a logo asset, alphabetical by name.
 * Consumed by the Home LogoStrip marquee.
 */
export async function getAllClientsWithLogo(): Promise<Client[]> {
  return await sanityClient.fetch<Client[]>(ALL_CLIENTS_WITH_LOGO);
}

/**
 * Fetch every published, named client for the Work page listing, ordered by
 * category title then name.
 */
export async function getAllClients(): Promise<Client[]> {
  return await sanityClient.fetch<Client[]>(ALL_CLIENTS);
}

/**
 * Fetch an SEO-only page singleton. Returns `null` when the document hasn't
 * been created in Sanity yet; callers fall back to their own title/description
 * props, then to siteSettings defaults.
 */
export async function getPageSeo<T extends PageSingletonType>(
  type: T,
): Promise<PageSeoDoc<T> | null> {
  const result = await sanityClient.fetch<PageSeoDoc<T> | null>(PAGE_SEO, {
    type,
  });
  return result ?? null;
}
