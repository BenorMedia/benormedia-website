import { defineType, defineField } from 'sanity';

/**
 * pricingPage — singleton for `/pricing`.
 *
 * SEO-only per Lead decision 2026-09-25: page copy is authored directly in
 * the Astro components; the CMS only owns SEO metadata for this page.
 */
export const pricingPage = defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social preview settings for the Pricing page.',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Pricing Page' };
    },
  },
});
