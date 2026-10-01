import { defineType, defineField } from 'sanity';

/**
 * homePage — singleton for `/`.
 *
 * SEO-only per Lead decision 2026-09-25: page copy is authored directly in
 * the Astro components; the CMS only owns SEO metadata for this page.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social preview settings for the Home page.',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
});
