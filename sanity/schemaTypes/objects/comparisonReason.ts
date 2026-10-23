import { defineType, defineField, defineArrayMember } from 'sanity';
import { altField } from './imageAlt';

/**
 * One row of a comparison's "Why teams switch" section (SCHEMAS.md v0.14,
 * Figma 3790:39738): illustration, title, paragraph and 1 or 2 stats. Rows
 * alternate image left / image right in code.
 */
export const comparisonReason = defineType({
  name: 'comparisonReason',
  title: 'Reason',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Illustration',
      description: 'The picture next to the text. SVG preferred. Drag the dot to control the crop.',
      type: 'image',
      options: { hotspot: true },
      fields: [altField()],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The heading of this reason, e.g. "Built for SEO and AI search".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      description: 'The paragraph under the title.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      description:
        'Optional. 1 or 2 figures under the text. Only use figures someone has confirmed, with their source; while a figure is missing, type the [FACT NEEDED: …] marker as the value.',
      type: 'array',
      of: [defineArrayMember({ type: 'stat' })],
      validation: (Rule) => Rule.max(2).error('Add 2 stats at most: the design has room for 2.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || '(no title yet)',
        ...(subtitle ? { subtitle } : {}),
        media,
      };
    },
  },
});
