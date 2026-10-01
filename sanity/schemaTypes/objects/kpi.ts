import { defineType, defineField } from 'sanity';

/**
 * KPI shown next to a testimonial quote. Testimonials allow up to 2.
 */
export const kpi = defineType({
  name: 'kpi',
  title: 'KPI',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      description: 'The headline metric, e.g. "$700M+" or "3x".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'The short line explaining the metric, e.g. "Raised in Series B".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'description',
    },
  },
});
