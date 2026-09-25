import { defineType, defineField } from 'sanity';

/**
 * FAQ section (title + its questions). A post can have many sections;
 * each section groups its own questions.
 */
export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      description: 'The group name shown above these questions, e.g. "Pricing" or "Process".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'Questions',
      description: 'Add at least one question in this section.',
      type: 'array',
      of: [{ type: 'faq' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqs: 'faqs',
    },
    prepare({ title, faqs }) {
      const count = Array.isArray(faqs) ? faqs.length : 0;
      return {
        title: title || '(untitled section)',
        subtitle: `${count} question${count === 1 ? '' : 's'}`,
      };
    },
  },
});
