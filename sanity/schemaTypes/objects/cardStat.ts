import { defineType, defineField } from 'sanity';

/**
 * One stat on the case-study card (SCHEMAS.md v0.11): a value and a short
 * label. `caseStudy.cardStats` allows up to 2.
 */
export const cardStat = defineType({
  name: 'cardStat',
  title: 'Card stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      description: 'The big number or figure shown on the card, e.g. "+40%" or "3x".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description:
        'A few words under the value explaining it, e.g. "More demo requests". Keep it short: the card is narrow.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      value: 'value',
      label: 'label',
    },
    prepare({ value, label }) {
      return {
        title: [value, label].filter(Boolean).join(' · ') || '(empty stat)',
      };
    },
  },
});
