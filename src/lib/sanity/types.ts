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
 * Internal reference target as projected inside a `link`. Only `post` carries
 * a slug (blog routes are dynamic); page singletons render at fixed routes
 * and the app maps `_type` → path.
 */
export interface LinkInternalRef {
  _id: string;
  _type:
    | 'homePage'
    | 'workPage'
    | 'pricingPage'
    | 'testimonialsPage'
    | 'blogPage'
    | 'post';
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
