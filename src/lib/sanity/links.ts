/**
 * `link` object → href. Shared by every component that renders Sanity links
 * (CtaBanner today). Page singletons map by `_type` to their fixed route;
 * `post` → `/blog/<slug>`, `service` → `/<slug>`.
 */
import type { Link } from './types';

const PAGE_TYPE_TO_PATH: Record<string, string> = {
  homePage: '/',
  workPage: '/work',
  pricingPage: '/pricing',
  testimonialsPage: '/testimonials',
  blogPage: '/blog',
};

/** Every contact CTA goes to this page (lead 2026-10-22; was the popup). */
export const CONTACT_PATH = '/contact';

/**
 * `contact` links return `CONTACT_PATH`. `undefined` = nothing to link to.
 */
export function hrefFromLink(link: Link | undefined): string | undefined {
  if (!link) return undefined;
  if (link.type === 'external') return link.externalUrl;
  if (link.type === 'contact') return CONTACT_PATH;
  if (link.type === 'internal' && link.internalRef) {
    const ref = link.internalRef;
    const slug = ref.slug?.current;
    if (ref._type === 'post') return slug ? `/blog/${slug}` : undefined;
    if (ref._type === 'service') return slug ? `/${slug}` : undefined;
    return PAGE_TYPE_TO_PATH[ref._type];
  }
  return undefined;
}
