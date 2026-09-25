import { defineType, defineField } from 'sanity';

/**
 * Client — a customer showcased across the site.
 *
 * Not a routable document; no detail pages (see DECISIONS 2026-09-25).
 * Referenced from Home (featured work, work cards/list, logo strip) and
 * from the Work page.
 */
export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The client\'s company name.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'The full logo. SVG strongly preferred so it stays sharp at any size.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the logo for screen readers. If left blank, the client name is used automatically.',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description:
        'Small square icon used in the Home work list rows. SVG strongly preferred.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the icon for screen readers. If left blank, the client name is used automatically.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'cardThumbnail',
      title: 'Card thumbnail',
      description: 'Image used in the Home work cards. Drag the dot to control the crop.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the image for screen readers. Required.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'websiteScreenshot',
      title: 'Website screenshot',
      description:
        'A screenshot of the client\'s website. Used in several places across the site.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the screenshot for screen readers. Required.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      description:
        'Optional. Pick a testimonial from this client. Required if you plan to feature this client in the Home "Featured Work" section.',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'fundsRaised',
      title: 'Funds raised',
      description: 'Amount raised, formatted as it should appear, e.g. "$25.0M". The word "Raised" is added automatically.',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'The industry this client belongs to. Pick exactly one.',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      description: 'Full URL to the client\'s live website. Optional.',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title',
      media: 'logo',
    },
  },
});
