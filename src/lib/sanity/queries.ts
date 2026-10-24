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
  CaseStudy,
  CaseStudyCard,
  Client,
  Comparison,
  ComparisonCard,
  HomePage,
  PageSeoDoc,
  PageSingletonType,
  Service,
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

/** A video `file` field with its asset URL (played directly from the Sanity CDN). */
const VIDEO = /* groq */ `{
  "asset": asset->{ _id, url, mimeType }
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
  "title": coalesce(title, name)
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
 * tag, website link, hover screenshot) + `sector` (Work page filters). Shared by CLIENTS_BY_IDS and
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
  sector,
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
  "websiteVideo": websiteVideo${VIDEO},
  "websiteVideoPoster": websiteVideoPoster${IMAGE},
  "testimonial": select(testimonial->quote match "lorem ipsum*" => null, testimonial->{
    _id,
    _type,
    quote,
    authorName,
    authorRole,
    "authorPhoto": authorPhoto${IMAGE},
    "companyLogo": companyLogo${IMAGE},
    kpis[]{ value, description }
  })
}
`;

// ---------------------------------------------------------------------------
// ALL_CLIENTS — the Work page listing. Every published client that has a
// name (incomplete clients are skipped at query time, SCHEMAS.md), with only
// the fields `ClientList` renders. Ordered by the Studio drag-and-drop order
// (`orderRank`, @sanity/orderable-document-list; lead 2026-09-29, W-5), name
// as tie-break. Only the Work page uses this order: CLIENTS_BY_IDS (Home,
// Pricing, service pages) and ALL_CLIENTS_WITH_LOGO keep their own.
// ---------------------------------------------------------------------------

export const ALL_CLIENTS = /* groq */ `
*[_type == "client" && defined(name) && !(_id in path("drafts.**"))]
  | order(orderRank asc, name asc){
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
// ALL_CLIENTS_WITH_ICON — the Home hero physics pile: every published client
// with an icon asset (name + icon only).
// ---------------------------------------------------------------------------

export const ALL_CLIENTS_WITH_ICON = /* groq */ `
*[_type == "client" && defined(icon.asset) && !(_id in path("drafts.**"))] | order(name asc){
  _id,
  _type,
  name,
  "icon": icon${IMAGE}
}
`;

// ---------------------------------------------------------------------------
// CLIENTS_WITH_ICON_BY_RANK — the `/case-studies` hero orbit: the same
// clients and fields as ALL_CLIENTS_WITH_ICON, in the Studio drag-and-drop
// order (`orderRank`, the Work page order), then name, so the hero shows the
// first clients editors rank (lead 2026-10-22, round 5). Home keeps its own.
// ---------------------------------------------------------------------------

export const CLIENTS_WITH_ICON_BY_RANK = /* groq */ `
*[_type == "client" && defined(icon.asset) && !(_id in path("drafts.**"))]
  | order(orderRank asc, name asc){
  _id,
  _type,
  name,
  "icon": icon${IMAGE}
}
`;

// ---------------------------------------------------------------------------
// TESTIMONIALS — every published testimonial, oldest first, with the client
// that references it (`client.testimonial`) so cards can show that client's
// logo. Used by the shared TestimonialMarquee (Home + other pages).
// Placeholder quotes ("Lorem ipsum…") are skipped until the real ones are in
// (SEO quick changes, lead 2026-10-06); CLIENTS_BY_IDS drops them the same way.
// ---------------------------------------------------------------------------

export const TESTIMONIALS = /* groq */ `
*[_type == "testimonial" && !(_id in path("drafts.**")) && !(quote match "lorem ipsum*")] | order(_createdAt asc){
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
// SERVICE_SLUGS / SERVICE_BY_SLUG — the service template (`src/pages/[service].astro`)
// ---------------------------------------------------------------------------

/** A one-block `accentTitle` (spans may carry `marks: ["accent"]`; `\n` = line break). */
const ACCENT_TITLE = /* groq */ `[]{
  _key,
  _type,
  style,
  children[]{ _key, _type, text, marks }
}`;

export const SERVICE_SLUGS = /* groq */ `
*[_type == "service" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current
`;

/**
 * Home Services cards (lead 2026-09-30): name + slug + subtitle of the
 * published services whose slug is in `$slugs` (order restored by the
 * fetcher).
 */
export const SERVICE_CARDS = /* groq */ `
*[_type == "service" && slug.current in $slugs && !(_id in path("drafts.**"))]{
  _id,
  _type,
  name,
  "slug": slug.current,
  subtitle
}
`;

/**
 * One published service. Related clients only project what the Problem
 * carousels render (name + website screenshot). FAQ answers are Portable
 * Text (same shape as `post` FAQs).
 */
export const SERVICE_BY_SLUG = /* groq */ `
*[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id,
  _type,
  name,
  "slug": slug.current,
  "clients": clients[]->{
    _id,
    _type,
    name,
    "websiteScreenshot": websiteScreenshot${IMAGE}
  },
  "headline": headline${ACCENT_TITLE},
  subtitle,
  "problemTitle": problemTitle${ACCENT_TITLE},
  problemDescription,
  "processTitle": processTitle${ACCENT_TITLE},
  processDescription,
  steps[]{
    _key,
    name,
    description,
    note,
    features,
    "image": image${IMAGE}
  },
  faqSections[]{
    _key,
    title,
    faqs[]{ _key, question, answer }
  },
  "seo": seo${SEO}
}
`;

// ---------------------------------------------------------------------------
// Case studies (SCHEMAS.md v0.10) — `/case-studies` index, the
// `/case-studies/[slug]` template and the "Read the case study" link on
// `/work` rows. Only published documents with a slug are ever returned.
// ---------------------------------------------------------------------------

/**
 * Card fields: the index cards and the "Resources" cards at the end of a case
 * study. Shared by ALL_CASE_STUDIES and CASE_STUDY_BY_SLUG (`related`,
 * `latest`) so the card projection is defined once. `cardStats` (max 2) and
 * `client.logoOnDark` are optional (SCHEMAS v0.11); so are
 * `client.brandColor` / `brandGlowColor` (hex strings, SCHEMAS v0.13).
 */
const CASE_STUDY_CARD_FIELDS = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  cardStats[]{ _key, value, label },
  "client": client->{
    _id,
    name,
    "logo": logo${IMAGE},
    "logoOnDark": logoOnDark${IMAGE},
    brandColor,
    brandGlowColor
  }
`;

/** Testimonial fields for the case study quote block. */
const CASE_STUDY_TESTIMONIAL_FIELDS = /* groq */ `
  _id,
  _type,
  quote,
  authorName,
  authorRole,
  "authorPhoto": authorPhoto${IMAGE},
  "companyLogo": companyLogo${IMAGE},
  kpis[]{ value, description }
`;

/** Published case studies with a slug (shared filter). */
const PUBLISHED_CASE_STUDY = /* groq */ `_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))`;

/** Every published case study, newest first (`publishedAt` is a `YYYY-MM-DD` date). */
export const ALL_CASE_STUDIES = /* groq */ `
*[${PUBLISHED_CASE_STUDY}] | order(publishedAt desc, title asc){
  ${CASE_STUDY_CARD_FIELDS},
  "noIndex": seo.noIndex == true
}
`;

export const CASE_STUDY_SLUGS = /* groq */ `
*[${PUBLISHED_CASE_STUDY}].slug.current
`;

/**
 * One published case study.
 *   - `testimonial`: the case study's own, else the client's; a placeholder
 *     quote ("Lorem ipsum…", the CLIENTS_BY_IDS rule) is skipped, so a
 *     placeholder on the case study falls back to the client's quote
 *     (lead 2026-10-20). Null when neither has a real quote.
 *   - `body`: Portable Text, `link` markDefs kept as stored
 *     (`{ _type: "link", href, openInNewTab? }`, `href` may be relative).
 *   - `_updatedAt`: last edit of the published document (Article
 *     `dateModified` in the JSON-LD).
 *   - `related`: the editor's picks, dangling / unpublished references
 *     filtered out. `latest`: the 3 newest other published case studies, the
 *     "Resources" fallback when `related` is empty (`caseStudyResources`).
 */
export const CASE_STUDY_BY_SLUG = /* groq */ `
*[${PUBLISHED_CASE_STUDY} && slug.current == $slug][0]{
  _id,
  _type,
  _updatedAt,
  title,
  "slug": slug.current,
  publishedAt,
  readTime,
  intro,
  industry,
  challenge,
  solution,
  timeline,
  stack,
  "client": client->{
    _id,
    _type,
    name,
    "logo": logo${IMAGE},
    "websiteScreenshot": websiteScreenshot${IMAGE},
    websiteUrl
  },
  "services": services[defined(@->_id)]->{
    _id,
    name,
    "slug": slug.current
  },
  "testimonial": select(
    defined(testimonial->quote) && !(testimonial->quote match "lorem ipsum*") => testimonial->{
      ${CASE_STUDY_TESTIMONIAL_FIELDS}
    },
    defined(client->testimonial->quote) && !(client->testimonial->quote match "lorem ipsum*") => client->testimonial->{
      ${CASE_STUDY_TESTIMONIAL_FIELDS}
    }
  ),
  body[]{
    _key,
    _type,
    style,
    listItem,
    level,
    children[]{ _key, _type, text, marks },
    markDefs[]{ _key, _type, href, openInNewTab },
    title,
    items
  },
  resultsIntro,
  results[]{ _key, value, label, description },
  resultsSummary,
  "related": related[defined(@->slug.current) && !(@->_id in path("drafts.**"))]->{
    ${CASE_STUDY_CARD_FIELDS}
  },
  "latest": *[${PUBLISHED_CASE_STUDY} && _id != ^._id] | order(publishedAt desc, title asc)[0...3]{
    ${CASE_STUDY_CARD_FIELDS}
  },
  "seo": seo${SEO}
}
`;

/**
 * Client id → case study slug, newest case study first (the fetcher keeps the
 * newest one per client). Feeds the "Read the case study" link on `/work` rows.
 */
export const CASE_STUDY_SLUG_BY_CLIENT = /* groq */ `
*[${PUBLISHED_CASE_STUDY} && defined(client._ref)] | order(publishedAt desc){
  "clientId": client._ref,
  "slug": slug.current
}
`;

// ---------------------------------------------------------------------------
// Comparisons (SCHEMAS.md v0.14 "GROQ: comparison") — `/comparison` index and
// the `/comparison/[slug]` template. Only published documents with a slug.
// ---------------------------------------------------------------------------

/** Published comparisons with a slug (shared filter; keep in sync with `comparison-sitemap.mjs`). */
const PUBLISHED_COMPARISON = /* groq */ `_type == "comparison" && defined(slug.current) && !(_id in path("drafts.**"))`;

/** `accentSectionHeader`: eyebrow + gradient title + paragraph. */
const ACCENT_SECTION_HEADER = /* groq */ `{ eyebrow, "title": title${ACCENT_TITLE}, description }`;

/**
 * Every published comparison, newest first. `noIndex` (not in the SCHEMAS
 * projection, derived from the existing `seo` field) keeps the index's
 * robots tag in line with the sitemap, as `ALL_CASE_STUDIES` does.
 */
export const ALL_COMPARISONS = /* groq */ `
*[${PUBLISHED_COMPARISON}] | order(publishedAt desc, title asc){
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  competitorName,
  "competitorLogo": competitorLogo${IMAGE},
  cardTitle,
  cardDescription,
  "noIndex": seo.noIndex == true
}
`;

export const COMPARISON_SLUGS = /* groq */ `
*[${PUBLISHED_COMPARISON}].slug.current
`;

/**
 * One published comparison (`$slug`). `otherComparisons`: every other
 * published comparison, in the index order, for the hero pill dropdown
 * (lead 2026-10-22).
 */
export const COMPARISON_BY_SLUG = /* groq */ `
*[${PUBLISHED_COMPARISON} && slug.current == $slug][0]{
  _id,
  _type,
  _updatedAt,
  title,
  "slug": slug.current,
  publishedAt,
  competitorName,
  "competitorLogo": competitorLogo${IMAGE},
  "competitorLogoOnDark": competitorLogoOnDark${IMAGE},
  "headline": headline${ACCENT_TITLE},
  subtitle,
  primaryButtonLabel,
  secondaryButtonLabel,
  "chooseHeader": chooseHeader${ACCENT_SECTION_HEADER},
  "webflowChoice": webflowChoice{ "title": title${ACCENT_TITLE}, reasons },
  "competitorChoice": competitorChoice{ "image": image${IMAGE}, "title": title${ACCENT_TITLE}, reasons },
  "tableHeader": tableHeader${ACCENT_SECTION_HEADER},
  tableGroups[]{ _key, label, rows[]{ _key, feature, webflow, competitor } },
  "reasonsHeader": reasonsHeader${ACCENT_SECTION_HEADER},
  reasons[]{
    _key,
    "image": image${IMAGE},
    title,
    text,
    stats[]{ _key, value, label, source, sourceUrl }
  },
  "migrationHeader": migrationHeader${ACCENT_SECTION_HEADER},
  migrationSteps[]{ _key, name, description, "image": image${IMAGE} },
  "caseStudiesHeader": caseStudiesHeader${ACCENT_SECTION_HEADER},
  "caseStudies": caseStudies[defined(@->slug.current) && !(@->_id in path("drafts.**"))]->{
    ${CASE_STUDY_CARD_FIELDS}
  },
  "latestCaseStudies": *[${PUBLISHED_CASE_STUDY}] | order(publishedAt desc, title asc)[0...3]{
    ${CASE_STUDY_CARD_FIELDS}
  },
  faqSections[]{ _key, title, faqs[]{ _key, question, answer } },
  "otherComparisons": *[${PUBLISHED_COMPARISON} && _id != ^._id] | order(publishedAt desc, title asc){
    _id,
    title,
    "slug": slug.current,
    competitorName,
    "competitorLogo": competitorLogo${IMAGE}
  },
  "seo": seo${SEO}
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
export async function getClientsByIds(ids: readonly string[]): Promise<Client[]> {
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
 * Fetch every published client that has an icon asset, alphabetical by name.
 * Consumed by the Home hero physics pile.
 */
export async function getAllClientsWithIcon(): Promise<Client[]> {
  return await sanityClient.fetch<Client[]>(ALL_CLIENTS_WITH_ICON);
}

/**
 * Fetch every published client that has an icon asset, in the Studio order
 * (`orderRank`), then name. Consumed by the `/case-studies` hero orbit.
 */
export async function getClientsWithIconByRank(): Promise<Client[]> {
  return await sanityClient.fetch<Client[]>(CLIENTS_WITH_ICON_BY_RANK);
}

/**
 * Fetch every published, named client for the Work page listing, in the
 * Studio drag-and-drop order (`orderRank`), then name.
 */
export async function getAllClients(): Promise<Client[]> {
  return await sanityClient.fetch<Client[]>(ALL_CLIENTS);
}

/** Slugs of every published service (the template's `getStaticPaths`). */
export async function getServiceSlugs(): Promise<string[]> {
  const result = await sanityClient.fetch<(string | null)[]>(SERVICE_SLUGS);
  return result.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
}

export type ServiceCard = Pick<Service, '_id' | '_type' | 'name' | 'slug' | 'subtitle'>;

/** Services by slug, in the order of `slugs`; unpublished / missing slugs are dropped. */
export async function getServiceCards(slugs: readonly string[]): Promise<ServiceCard[]> {
  if (slugs.length === 0) return [];
  const result = await sanityClient.fetch<ServiceCard[]>(SERVICE_CARDS, { slugs: [...slugs] });
  const bySlug = new Map(result.map((service) => [service.slug, service]));
  return slugs.flatMap((slug) => bySlug.get(slug) ?? []);
}

/** One published service by slug, or `null`. */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const result = await sanityClient.fetch<Service | null>(SERVICE_BY_SLUG, { slug });
  return result ?? null;
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

/** Every published case study, newest first (index cards). */
export async function getAllCaseStudies(): Promise<CaseStudyCard[]> {
  return await sanityClient.fetch<CaseStudyCard[]>(ALL_CASE_STUDIES);
}

/** Slugs of every published case study (the template's `getStaticPaths`). */
export async function getCaseStudySlugs(): Promise<string[]> {
  const result = await sanityClient.fetch<(string | null)[]>(CASE_STUDY_SLUGS);
  return result.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
}

/** One published case study by slug, or `null`. */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const result = await sanityClient.fetch<CaseStudy | null>(CASE_STUDY_BY_SLUG, { slug });
  return result ?? null;
}

/**
 * Client `_id` → slug of that client's newest published case study. Clients
 * without one are absent from the map.
 */
export async function getCaseStudySlugsByClient(): Promise<Map<string, string>> {
  const result = await sanityClient.fetch<{ clientId: string; slug: string }[]>(
    CASE_STUDY_SLUG_BY_CLIENT,
  );
  const byClient = new Map<string, string>();
  for (const { clientId, slug } of result) {
    if (!byClient.has(clientId)) byClient.set(clientId, slug);
  }
  return byClient;
}

/** Every published comparison, newest first (index cards). */
export async function getAllComparisons(): Promise<ComparisonCard[]> {
  return await sanityClient.fetch<ComparisonCard[]>(ALL_COMPARISONS);
}

/** Slugs of every published comparison (the template's `getStaticPaths`). */
export async function getComparisonSlugs(): Promise<string[]> {
  const result = await sanityClient.fetch<(string | null)[]>(COMPARISON_SLUGS);
  return result.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
}

/** One published comparison by slug, or `null`. */
export async function getComparisonBySlug(slug: string): Promise<Comparison | null> {
  const result = await sanityClient.fetch<Comparison | null>(COMPARISON_BY_SLUG, { slug });
  return result ?? null;
}
