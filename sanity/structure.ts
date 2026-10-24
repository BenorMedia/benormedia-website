import type { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { SINGLETON_TYPES } from './schemaTypes';

/**
 * Desk structure per docs/SCHEMAS.md v0.14:
 *
 *   Site Settings   (singleton — SEO-only page metadata + globals)
 *   Home Page       (singleton — SEO only)
 *   Work Page       (singleton — SEO only)
 *   Pricing Page    (singleton — SEO only)
 *   Testimonials Page (singleton — SEO only)
 *   Blog Page       (singleton — SEO only)
 *   ── divider ──
 *   Services        (service pages, ordered by name)
 *   ── divider ──
 *   Clients         (drag-and-drop order → Work page listing, `orderRank`)
 *   Case studies    (ordered by publishedAt, newest first)
 *   Comparisons     (ordered by publishedAt, newest first)
 *   Testimonials
 *   Blog (posts)
 *   Authors
 *   Categories
 *
 * Singletons, `service`, `client`, `caseStudy` and `comparison` are filtered out of the
 * generic document type list below the dividers so they never appear twice.
 */
export const structure: StructureResolver = (S, context) => {
  const singleton = (typeName: string, title: string) =>
    S.listItem()
      .title(title)
      .id(typeName)
      .child(
        S.editor()
          .id(typeName)
          .schemaType(typeName)
          .documentId(typeName),
      );

  const collection = (
    typeName: string,
    title: string,
    orderBy: string,
    direction: 'asc' | 'desc' = 'asc',
  ) =>
    S.listItem()
      .title(title)
      .id(typeName)
      .schemaType(typeName)
      .child(
        S.documentTypeList(typeName)
          .title(title)
          .defaultOrdering([{ field: orderBy, direction }]),
      );

  // Types with their own list item; excluded from the generic list.
  const customListTypes = new Set<string>(['service', 'client', 'caseStudy', 'comparison']);

  const collectionOrder = [
    'testimonial',
    'post',
    'author',
    'category',
  ];

  const documentTypeItems = S.documentTypeListItems()
    .filter((item) => {
      const id = item.getId();
      return !!id && !SINGLETON_TYPES.has(id) && !customListTypes.has(id);
    })
    .sort((a, b) => {
      const ai = collectionOrder.indexOf(a.getId() ?? '');
      const bi = collectionOrder.indexOf(b.getId() ?? '');
      const av = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
      const bv = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
      return av - bv;
    });

  return S.list()
    .title('Content')
    .items([
      singleton('siteSettings', 'Site Settings'),
      singleton('homePage', 'Home Page'),
      singleton('workPage', 'Work Page'),
      singleton('pricingPage', 'Pricing Page'),
      singleton('testimonialsPage', 'Testimonials Page'),
      singleton('blogPage', 'Blog Page'),
      S.divider(),
      collection('service', 'Services', 'name'),
      S.divider(),
      orderableDocumentListDeskItem({ type: 'client', title: 'Clients', S, context }),
      collection('caseStudy', 'Case studies', 'publishedAt', 'desc'),
      collection('comparison', 'Comparisons', 'publishedAt', 'desc'),
      ...documentTypeItems,
    ]);
};
