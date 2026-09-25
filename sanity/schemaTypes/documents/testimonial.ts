import { defineType, defineField } from 'sanity';

/**
 * Testimonial — reusable quote block with author, company and KPIs.
 * Referenced from clients and the Home / Testimonials pages.
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      description: 'The quote itself. Do not include curly quotes — they are added automatically.',
      type: 'text',
      rows: 5,
      // TODO: SCHEMAS — confirm max length once design is finalized (see docs/SCHEMAS.md testimonial).
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author name',
      description: 'The person who said the quote, e.g. "Jane Doe".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author role and company',
      description: 'Combined role and company, e.g. "VP of Digital, Verifone".',
      type: 'string',
    }),
    defineField({
      name: 'authorPhoto',
      title: 'Author photo',
      description: 'Square headshot. Drag the dot to control the crop.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the image for screen readers. If left blank, the author\'s name is used automatically.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company logo',
      description: 'The company\'s logo. SVG preferred so it stays sharp at any size.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the logo for screen readers. If left blank, the company from the author role is used automatically.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'kpis',
      title: 'KPIs',
      description: 'Up to 2 headline metrics shown next to the quote.',
      type: 'array',
      of: [{ type: 'kpi' }],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'authorRole',
      media: 'authorPhoto',
    },
  },
});
