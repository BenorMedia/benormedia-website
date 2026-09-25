import { defineType, defineField } from 'sanity';

/**
 * Button = link + visual variant.
 *
 * Variants must mirror src/components/ui/Button.astro exactly:
 *   gradient | gradient-outline | white | glass
 */
export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      description: 'Where the button goes and what it says.',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      description:
        'Pick the visual style. "Gradient" is the primary call to action. "Glass" works on dark or gradient backgrounds.',
      type: 'string',
      options: {
        list: [
          { title: 'Gradient (primary)', value: 'gradient' },
          { title: 'Gradient outline', value: 'gradient-outline' },
          { title: 'White', value: 'white' },
          { title: 'Glass (for dark backgrounds)', value: 'glass' },
        ],
        layout: 'radio',
      },
      initialValue: 'gradient',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      label: 'link.label',
      variant: 'variant',
    },
    prepare({ label, variant }) {
      return {
        title: label || '(no label)',
        ...(variant ? { subtitle: `Style: ${variant}` } : {}),
      };
    },
  },
});
