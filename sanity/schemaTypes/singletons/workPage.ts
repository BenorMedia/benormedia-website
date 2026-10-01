import { defineType, defineField } from 'sanity';

/**
 * workPage — singleton for `/work`.
 *
 * SEO-only per Lead decision 2026-09-25: page copy is authored directly in
 * the Astro components; the CMS only owns SEO metadata for this page.
 */
export const workPage = defineType({
  name: 'workPage',
  title: 'Work Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social preview settings for the Work page.',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Work Page' };
    },
  },
});
