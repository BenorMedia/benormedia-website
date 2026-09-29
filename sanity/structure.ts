import type { StructureResolver } from 'sanity/structure';
import { SINGLETON_TYPES } from './schemaTypes';

/**
 * Desk structure per docs/SCHEMAS.md v0.6:
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
 *   Clients
 *   Testimonials
 *   Blog (posts)
 *   Authors
 *   Categories
 *
 * Singletons and `service` are filtered out of the generic document type list
 * below the dividers so they never appear twice.
 */
export const structure: StructureResolver = (S) => {
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

  const collection = (typeName: string, title: string, orderBy: string) =>
    S.listItem()
      .title(title)
      .id(typeName)
      .schemaType(typeName)
      .child(
        S.documentTypeList(typeName)
          .title(title)
          .defaultOrdering([{ field: orderBy, direction: 'asc' }]),
      );

  // Types with their own list item above; excluded from the generic list.
  const customListTypes = new Set<string>(['service']);

  const collectionOrder = [
    'client',
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
      ...documentTypeItems,
    ]);
};
