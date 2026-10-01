import { defineType, defineField } from 'sanity';

/**
 * blogPage — singleton for `/blog`.
 *
 * SEO-only per Lead decision 2026-09-25: page copy is authored directly in
 * the Astro components; the CMS only owns SEO metadata for this page.
 */
export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social preview settings for the Blog page.',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Blog Page' };
    },
  },
});
