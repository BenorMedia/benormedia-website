/**
 * `link` object → href. Shared by every component that renders Sanity links
 * (CtaBanner today). Page singletons map by `_type` to their fixed route;
 * `post` → `/blog/<slug>`, `service` → `/<slug>`. Client case studies →
 * `/work/<slug>` (`caseStudyHref`).
 */
import type { Client, Link } from './types';

const PAGE_TYPE_TO_PATH: Record<string, string> = {
  homePage: '/',
  workPage: '/work',
  pricingPage: '/pricing',
  testimonialsPage: '/testimonials',
  blogPage: '/blog',
};

/** Case study page of a client, or `undefined` when it has none (SCHEMAS v0.10). */
export function caseStudyHref(client: Pick<Client, 'caseStudySlug'>): string | undefined {
  return client.caseStudySlug ? `/work/${client.caseStudySlug}` : undefined;
}

/**
 * `contact` links return `"#"`: they are rendered as buttons that open the
 * contact modal, never followed. `undefined` = nothing to link to.
 */
export function hrefFromLink(link: Link | undefined): string | undefined {
  if (!link) return undefined;
  if (link.type === 'external') return link.externalUrl;
  if (link.type === 'contact') return '#';
  if (link.type === 'internal' && link.internalRef) {
    const ref = link.internalRef;
    const slug = ref.slug?.current;
    if (ref._type === 'post') return slug ? `/blog/${slug}` : undefined;
    if (ref._type === 'service') return slug ? `/${slug}` : undefined;
    return PAGE_TYPE_TO_PATH[ref._type];
  }
  return undefined;
}
