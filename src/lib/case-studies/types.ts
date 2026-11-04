/**
 * Case study data model (`/work/[slug]`, Figma 4225:11810 "Case study
 * template", lead 2026-11-04). One typed module per case study in
 * `entries/`, registered in `index.ts`. Content lives in code, not Sanity
 * (lead 2026-11-04); Sanity only flags the client (`client.caseStudy` +
 * `client.slug`) so `/work` links its row here.
 *
 * Every visible word of a page sits in its entry; components hold no copy
 * except shared labels passed in from the entry. Images are imported assets
 * (`src/assets/case-studies/`), so they go through `astro:assets`.
 */
import type { ImageMetadata } from "astro";

export interface CsImage {
  src: ImageMetadata;
  /** Plain description; "" only for decorative images. */
  alt: string;
}

/** A figure in the body: an image and its caption (optional). */
export interface CsFigure {
  image: CsImage;
  caption?: string | undefined;
  /** Labels laid over the image's top corners (Figma's before / after
   *  chips), kept out of the image file so no text is baked in. */
  chips?: { before: string; after: string } | undefined;
}

export interface CsQuote {
  text: string;
  name: string;
  role: string;
  photo: CsImage;
}

export interface CsStat {
  value: string;
  label: string;
}

export interface CsFact {
  label: string;
  value: string;
  /** 52px icon box, Figma crop baked in. Decorative. */
  icon: ImageMetadata;
}

export interface CsGoal {
  label: string;
  text: string;
  icon: ImageMetadata;
}

export interface CsQuestion {
  /** `<h3>`, also the table of contents label (cut with an ellipsis). */
  heading: string;
  paragraphs: readonly string[];
  figure: CsFigure;
}

export interface CsTable {
  /** `<caption>`, visually hidden. */
  caption: string;
  columns: readonly [string, string, string, string];
  rows: readonly (readonly [string, string, string, string])[];
}

export interface CsStackCore {
  chip: string;
  name: string;
  text: string;
  image: CsImage;
}

export interface CsStackItem {
  chip: string;
  name: string;
  text: string;
  logo: CsImage;
}

export interface CsPhase {
  title: string;
  dates: string;
  text: string;
  /** Icon in the glass tile, decorative. */
  icon: ImageMetadata;
}

export interface CsMember {
  /** `src/lib/new-pages/authors.ts` slug: photo and author page link. */
  author: string;
  role: string;
}

export interface CsTakeaway {
  title: string;
  text: string;
}

export interface CsFaqItem {
  question: string;
  answer: string;
}

export interface CaseStudy {
  slug: string;
  /** Build switch: drafts are built only where drafts are (previews,
   *  `astro dev`, `PAGES_INCLUDE_DRAFTS=1`), with noindex, out of the
   *  sitemap. */
  draft: boolean;
  publishedAt: string;
  updatedAt: string;
  /** `ogImage`: a 1200 x 630 file in `public/` (site path). */
  seo: { title: string; description: string; ogImage: string };
  client: { name: string; url: string; logo: CsImage };
  hero: {
    tag: string;
    h1: string;
    intro: string;
    screenshot: CsImage;
    /** Address shown in the browser frame. */
    address: string;
    liveLabel: string;
  };
  stats: readonly [CsStat, CsStat, CsStat];
  toc: { label: string; getInTouch: string; share: string };
  glance: { heading: string; summary: string; facts: readonly CsFact[] };
  about: { heading: string; paragraphs: readonly string[] };
  challenge: {
    heading: string;
    paragraphs: readonly string[];
    quote: CsQuote;
    goalsIntro: string;
    goals: readonly CsGoal[];
    figure: CsFigure;
  };
  work: { heading: string; intro: string; questions: readonly CsQuestion[] };
  results: { heading: string; paragraphs: readonly string[]; table: CsTable; figure: CsFigure };
  clientQuote: { heading: string; quote: CsQuote };
  stack: { heading: string; intro: string; core: CsStackCore; items: readonly CsStackItem[] };
  team: {
    heading: string;
    intro: string;
    /** Label over one timeline point (0-based phase index). */
    milestone: { label: string; date: string; at: number };
    phases: readonly CsPhase[];
    summary: string;
    members: readonly CsMember[];
  };
  takeaways: { heading: string; items: readonly CsTakeaway[] };
  cta: { tocLabel: string; eyebrow: string; heading: string; button: string; trusted: string };
  /** Visible FAQ and FAQPage JSON-LD (one array). Empty → no section. */
  faq: { heading: string; items: readonly CsFaqItem[] };
  /** Other case studies. Renders nothing when there are none. */
  related: { eyebrow: string; heading: string; cardTag: string; published: string; more: string };
  /** Card in other case studies' "related" row. */
  card: { cover: CsImage; stats: readonly [CsStat, CsStat] };
}
