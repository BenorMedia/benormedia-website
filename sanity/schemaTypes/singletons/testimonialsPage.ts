import { defineType, defineField } from 'sanity';

/**
 * testimonialsPage — singleton for `/testimonials`.
 *
 * SEO-only per Lead decision 2026-09-25: page copy is authored directly in
 * the Astro components; the CMS only owns SEO metadata for this page.
 */
export const testimonialsPage = defineType({
  name: 'testimonialsPage',
  title: 'Testimonials Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social preview settings for the Testimonials page.',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Testimonials Page' };
    },
  },
});
