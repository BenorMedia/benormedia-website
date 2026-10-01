import { defineType, defineField } from 'sanity';

/**
 * SEO metadata object.
 *
 * Attached to `post` (the sole routable document) and to every page
 * singleton. Empty fields fall back to `siteSettings` defaults per
 * docs/SCHEMAS.md.
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      description:
        'Shown in Google results and browser tabs. Keep under 60 characters so it does not get cut off. If empty, uses the page title.',
      type: 'string',
      validation: (Rule) =>
        Rule.max(60).warning('Meta titles longer than 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      description:
        'The short paragraph shown under the title in Google. Keep under 160 characters. If empty, uses the page excerpt or the site default.',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning('Meta descriptions longer than 160 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      description:
        'Image shown when the page is shared on social media or messaging apps. Recommended size: 1200 x 630 pixels.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the image for screen readers and when the image fails to load.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      description:
        'Turn this on to ask Google and other search engines not to include this page in their results.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description:
        'Optional. Only fill this in if the same content lives at another URL and you want search engines to treat that one as the original.',
      type: 'url',
    }),
  ],
});
