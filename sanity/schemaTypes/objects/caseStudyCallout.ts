import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Callout box inside a case study article (SCHEMAS.md v0.12, Figma
 * 3842:40220 "Deliverables — Design Phase"): a short uppercase title and a
 * list of short items. Only used in `caseStudy.body`.
 */
export const caseStudyCallout = defineType({
  name: 'caseStudyCallout',
  title: 'Callout box',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Short label at the top of the box, shown in capitals, e.g. "Deliverables: design phase".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      description: 'One short line per item.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) => Rule.required().min(1).error('Add at least one item.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || '(untitled callout)',
        subtitle: `Callout box · ${count} ${count === 1 ? 'item' : 'items'}`,
      };
    },
  },
});
