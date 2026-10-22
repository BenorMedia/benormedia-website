import { defineType, defineField } from 'sanity';

/**
 * A single stat (value + label). Used in the Home hero social proof and
 * similar callouts. In `comparison.reasons[].stats` (SCHEMAS v0.13) it also
 * shows an optional `source` and `sourceUrl`; they are hidden elsewhere.
 * `value` is free text so a `[FACT NEEDED: …]` marker fits.
 */
export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      description: 'The big number or figure, e.g. "$700M+" or "150+".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'The short line under the value, e.g. "Raised by our clients".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // SCHEMAS v0.13: comparison reasons only (`comparison.reasons[].stats`).
    defineField({
      name: 'source',
      title: 'Source',
      description:
        'Optional. Where the figure comes from, e.g. the study or report name. Shown next to the label.',
      type: 'string',
      hidden: ({ path }) => path[0] !== 'reasons',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source link',
      description: 'Optional. The full address of the source, starting with https://.',
      type: 'url',
      hidden: ({ path }) => path[0] !== 'reasons',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
});
