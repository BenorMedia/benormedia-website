import { defineType, defineField } from 'sanity';

/**
 * A single FAQ entry (question + Portable Text answer).
 *
 * Answer supports paragraphs, bold, italic and links only — no headings,
 * lists or images. FAQs are grouped inside `faqSection`.
 */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      description: 'The question exactly as it should appear on the page.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      description: 'The answer. You can use bold, italic and links inside a paragraph.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Paragraph', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in a new tab',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
    prepare({ title }) {
      return {
        title: title || '(no question)',
      };
    },
  },
});
