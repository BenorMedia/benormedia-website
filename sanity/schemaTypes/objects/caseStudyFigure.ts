import { defineType, defineField } from 'sanity';

/**
 * Image inside a case study article (SCHEMAS.md v0.14, lead 2026-10-23: "less
 * flat" article): a website, design system or product shot shown framed in
 * the article, with an optional caption. Only used in `caseStudy.body`.
 * Never bake text into the image (house rule): put it in the caption.
 */
export const caseStudyFigure = defineType({
  name: 'caseStudyFigure',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      description: 'A screenshot of the website, a design system or a product view. Wide images (about 16:9) look best.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'What the image shows, for screen readers.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Optional. One short line under the image.',
      type: 'string',
    }),
  ],
  preview: {
    select: { media: 'image', alt: 'image.alt', caption: 'caption' },
    prepare({ media, alt, caption }) {
      return { title: caption || alt || '(image)', subtitle: 'Image', media };
    },
  },
});
