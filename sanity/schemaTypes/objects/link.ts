import { defineType, defineField } from 'sanity';

/**
 * Link object used by buttons.
 *
 * Three types:
 *   - internal: reference to a page or post document
 *   - external: any URL
 *   - contact:  opens the site-wide contact popup (no href needed)
 */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'The text shown to visitors, e.g. "Get in Touch" or "Read the article".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Link type',
      description:
        'Internal = another page on this site. External = any other website. Contact = opens the contact popup.',
      type: 'string',
      options: {
        list: [
          { title: 'Internal page', value: 'internal' },
          { title: 'External URL', value: 'external' },
          { title: 'Open contact popup', value: 'contact' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internalRef',
      title: 'Internal page',
      description: 'Pick the page or blog post you want to link to.',
      type: 'reference',
      to: [
        { type: 'homePage' },
        { type: 'workPage' },
        { type: 'pricingPage' },
        { type: 'testimonialsPage' },
        { type: 'blogPage' },
        { type: 'post' },
      ],
      hidden: ({ parent }) => parent?.type !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string } | undefined;
          if (parent?.type === 'internal' && !value) {
            return 'Pick an internal page.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description: 'Full URL including https://, e.g. https://example.com/page.',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string } | undefined;
          if (parent?.type === 'external' && !value) {
            return 'Enter the full URL.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in a new tab',
      description: 'Recommended for external links. Ignored by the contact popup.',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.type === 'contact',
    }),
  ],
});
