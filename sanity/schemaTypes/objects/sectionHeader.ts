import { defineType, defineField } from 'sanity';

/**
 * Reusable section header (eyebrow + title + description) used across the site.
 */
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Section header',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'The small pill of text shown above the title, e.g. "Our Work" or "Testimonials".',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The main heading for this section.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'The short paragraph shown under the title.',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
    },
  },
});
