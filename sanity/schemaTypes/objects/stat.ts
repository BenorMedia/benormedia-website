import { defineType, defineField } from 'sanity';

/**
 * A single stat (value + label). Used in the Home hero social proof and
 * similar callouts.
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
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
});
