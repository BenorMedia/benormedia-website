/**
 * Hand-written types for `HOME_QUERY` and `SITE_SETTINGS_QUERY`.
 *
 * These mirror the projections in `queries.ts` — every property here is a
 * field the query actually returns. If you change a projection, change the
 * type too (or vice versa). Field names track the schemas under
 * `sanity/schemaTypes/**` (see also `docs/SCHEMAS.md` v0.5).
 *
 * Optional markers reflect Sanity validation:
 *   - `required()` on the schema field → non-optional here
 *   - no required rule                 → optional here (`?`)
 *   - arrays that a schema does not mark required may be missing entirely
 *     from Sanity results (the field is simply not projected), so they are
 *     modelled as `T[] | undefined`.
 *
 * No `any`, no non-null assertions.
 */

// ---------------------------------------------------------------------------
// Sanity primitives
// ---------------------------------------------------------------------------

/**
 * A dereferenced image asset stub. We project `asset->{ _ref, _id }` because
 * `@sanity/image-url` accepts either — and `_id` is handy for keys.
 */
export interface SanityImageAsset {
  _ref?: string;
  _id?: string;
}

/**
 * An image field as it comes back from a GROQ projection when we dereference
 * the asset and keep the hotspot/crop for image-url. `alt` is stored inside
 * every image field per the schema convention.
 */
export interface SanityImage {
  asset?: SanityImageAsset;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
}

/**
 * Minimal shape of a resolved (`->`) reference. Real doc types below extend
 * this via `_type` narrowing on the consumer side.
 */
export interface SanityRef<TType extends string = string> {
  _id: string;
  _type: TType;
}

/**
 * Slug object as stored on documents.
 */
export interface SanitySlug {
  current: string;
}

// ---------------------------------------------------------------------------
// Shared objects (see `docs/SCHEMAS.md#shared-objects`)
// ---------------------------------------------------------------------------

export type LinkType = 'internal' | 'external' | 'contact';

/**
 * Internal reference target as projected inside a `link`. `post` and
 * `service` carry a slug (dynamic routes `/blog/<slug>` and `/<slug>`); page
 * singletons render at fixed routes and the app maps `_type` → path
 * (`hrefFromLink` in `src/lib/sanity/links.ts`). `title` is projected as
 * `coalesce(title, name)` because a service has `name`, not `title`.
 */
export interface LinkInternalRef {
  _id: string;
  _type:
    | 'homePage'
    | 'workPage'
    | 'pricingPage'
    | 'testimonialsPage'
    | 'blogPage'
    | 'post'
    | 'service';
  slug?: SanitySlug;
  title?: string;
}

export interface Link {
  label: string;
  type: LinkType;
  internalRef?: LinkInternalRef;
  externalUrl?: string;
  openInNewTab?: boolean;
}

export type ButtonVariant =
  | 'gradient'
  | 'gradient-outline'
  | 'white'
  | 'glass';

export interface Button {
  link: Link;
  variant: ButtonVariant;
}

export interface SectionHeader {
  eyebrow?: string;
  title: string;
  description?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Kpi {
  value: string;
  description: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
  canonicalUrl?: string;
}

// ---------------------------------------------------------------------------
// Documents (kept here so future queries can reuse the interfaces)
// ---------------------------------------------------------------------------

export interface Category extends SanityRef<'category'> {
  title: string;
  slug: SanitySlug;
}

export interface Author extends SanityRef<'author'> {
  name: string;
  position?: string;
  photo?: SanityImage;
  linkedinUrl?: string;
  bio?: string;
}

export interface Testimonial extends SanityRef<'testimonial'> {
  quote: string;
  authorName: string;
  authorRole?: string;
  authorPhoto?: SanityImage;
  companyLogo?: SanityImage;
  kpis?: Kpi[];
  /** Client whose `testimonial` references this one (TESTIMONIALS query only). */
  client?: { _id: string; name: string; logo?: SanityImage } | null;
}

/**
 * Client shape as returned when queried directly (not via a Home reference
 * array anymore — Home holds only SEO). Kept for future Work-page and
 * featured-work queries.
 */
export interface Client extends SanityRef<'client'> {
  name: string;
  logo?: SanityImage;
  icon?: SanityImage;
  cardThumbnail?: SanityImage;
  badge?: SanityImage;
  websiteScreenshot?: SanityImage;
  fundsRaised?: string;
  category?: Category;
  websiteUrl?: string;
  testimonial?: Testimonial;
}

// ---------------------------------------------------------------------------
// HomePage — result of `HOME_QUERY` (SEO only)
// ---------------------------------------------------------------------------

export interface HomePage {
  _id: string;
  _type: 'homePage';
  seo?: Seo;
}

// ---------------------------------------------------------------------------
// PageSeoDoc — result of `PAGE_SEO` (SEO-only page singletons)
// ---------------------------------------------------------------------------

export type PageSingletonType =
  | 'workPage'
  | 'pricingPage'
  | 'testimonialsPage'
  | 'blogPage';

export interface PageSeoDoc<T extends PageSingletonType = PageSingletonType> {
  _id: T;
  _type: T;
  /** `null` when the document exists but its `seo` object is empty. */
  seo?: Seo | null;
}

// ---------------------------------------------------------------------------
// SiteSettings — result of `SITE_SETTINGS_QUERY`
// ---------------------------------------------------------------------------

export interface Address {
  street?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

export interface CtaBanner {
  eyebrow?: string;
  title: string;
  buttons?: Button[];
  socialProofText?: string;
}

export interface ContactModal {
  title: string;
  description?: string;
  successMessage?: string;
}

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';

  // General
  siteName: string;
  siteUrl: string;
  logo?: SanityImage;
  contactEmail?: string;

  // SEO & Meta
  titleTemplate?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  defaultOgImage?: SanityImage;
  twitterHandle?: string;
  googleSiteVerification?: string;

  // Organization
  legalName?: string;
  orgDescription?: string;
  orgLogo?: SanityImage;
  sameAs?: string[];
  foundingYear?: number;
  address?: Address;

  // Global sections
  ctaBanner?: CtaBanner;
  contactModal?: ContactModal;
}

// ---------------------------------------------------------------------------
// FAQ types (exported for future blog use; not in this handoff's queries)
// ---------------------------------------------------------------------------

export interface Faq {
  question: string;
  /** Portable Text blocks (paragraph + inline marks). */
  answer: unknown[];
}

export interface FaqSection {
  title: string;
  faqs: Faq[];
}

// ---------------------------------------------------------------------------
// Service — result of `SERVICE_BY_SLUG` (SCHEMAS.md v0.6)
// ---------------------------------------------------------------------------

/** One span of an `accentTitle` block. `text` may contain `\n` (line break). */
export interface AccentTitleSpan {
  _key: string;
  _type: 'span';
  text: string;
  /** `accent` = brand gradient text. */
  marks?: string[] | null;
}

export interface AccentTitleBlock {
  _key: string;
  _type: 'block';
  style?: 'normal';
  children?: AccentTitleSpan[] | null;
}

/** `accentTitle`: one Portable Text block (schema max 1). */
export type AccentTitle = AccentTitleBlock[];

export interface ProcessStep {
  _key: string;
  name: string;
  description?: string | null;
  features?: string[] | null;
  image?: SanityImage | null;
}

/** Portable Text span / block as returned for FAQ answers (paragraphs + marks). */
export interface PortableTextSpan {
  _key?: string;
  _type: string;
  text?: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _key?: string;
  _type: string;
  style?: string;
  children?: PortableTextSpan[];
}

export interface ServiceFaq {
  _key: string;
  question?: string | null;
  answer?: PortableTextBlock[] | null;
}

export interface ServiceFaqSection {
  _key: string;
  title?: string | null;
  faqs?: ServiceFaq[] | null;
}

export interface Service {
  _id: string;
  _type: 'service';
  name: string;
  slug: string;
  /** `null` entries = dangling references (filter them out). */
  clients?: (Client | null)[] | null;
  headline?: AccentTitle | null;
  subtitle?: string | null;
  problemTitle?: AccentTitle | null;
  problemDescription?: string | null;
  processTitle?: AccentTitle | null;
  /** May contain `\n` (forced line break). */
  processDescription?: string | null;
  /** Step number = index + 1, zero-padded. */
  steps?: ProcessStep[] | null;
  faqSections?: ServiceFaqSection[] | null;
  seo?: Seo | null;
}
