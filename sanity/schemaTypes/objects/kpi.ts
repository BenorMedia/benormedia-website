import { defineType, defineField } from 'sanity';

/**
 * KPI shown next to a testimonial quote. Testimonials allow up to 2.
 * Also the case study results (`caseStudy.results`, max 3), where the
 * optional `label` (SCHEMAS v0.12) is the first line under the value; it is
 * hidden everywhere else.
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
      name: 'label',
      title: 'Label',
      description:
        'Optional. A short name for the metric, shown on its own line under the value, above the description, e.g. "Booked demo requests".',
      type: 'string',
      // Case study results only (SCHEMAS v0.12): testimonials don't show it.
      hidden: ({ path }) => path[0] !== 'results',
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
