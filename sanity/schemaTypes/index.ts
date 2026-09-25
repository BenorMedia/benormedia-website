// Sanity schema types registry — flat list of every document, object and singleton.
// See docs/SCHEMAS.md v0.5 for the contract.

import { seo } from './objects/seo';
import { link } from './objects/link';
import { button } from './objects/button';
import { sectionHeader } from './objects/sectionHeader';
import { stat } from './objects/stat';
import { kpi } from './objects/kpi';
import { faq } from './objects/faq';
import { faqSection } from './objects/faqSection';

import { category } from './documents/category';
import { author } from './documents/author';
import { testimonial } from './documents/testimonial';
import { client } from './documents/client';
import { post } from './documents/post';

import { siteSettings } from './singletons/siteSettings';
import { homePage } from './singletons/homePage';
import { workPage } from './singletons/workPage';
import { pricingPage } from './singletons/pricingPage';
import { testimonialsPage } from './singletons/testimonialsPage';
import { blogPage } from './singletons/blogPage';

export const schemaTypes = [
  // Objects
  seo,
  link,
  button,
  sectionHeader,
  stat,
  kpi,
  faq,
  faqSection,

  // Documents
  category,
  author,
  testimonial,
  client,
  post,

  // Singletons (SEO-only per Lead decision 2026-09-25)
  siteSettings,
  homePage,
  workPage,
  pricingPage,
  testimonialsPage,
  blogPage,
];

// Document type names that are singletons — used by structure.ts and by the
// document actions filter in sanity.config.ts to block create/duplicate/delete.
export const SINGLETON_TYPES = new Set<string>([
  'siteSettings',
  'homePage',
  'workPage',
  'pricingPage',
  'testimonialsPage',
  'blogPage',
]);

// (singleton id === singleton type name — one document per type)
export const SINGLETON_IDS = new Set<string>([...SINGLETON_TYPES]);
