import { createElement } from 'react';
import { defineType, defineField, defineArrayMember } from 'sanity';
import type { ObjectItemProps } from 'sanity';

/**
 * One step of a service page's Process section.
 *
 * There is no position field: the step number (01, 02…) is the step's
 * order in `service.steps[]`. Editors drag items to reorder, and the
 * numbers follow. The list item shows that number next to the preview
 * (a preview `prepare` can't know the array index, the item component can).
 */

/** Wraps the default array item with its 2-digit step number on the left. */
const NumberedStepItem = (props: ObjectItemProps) =>
  createElement(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' } },
    createElement(
      'span',
      {
        'aria-hidden': true,
        style: {
          flex: 'none',
          width: '2rem',
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 600,
          opacity: 0.7,
        },
      },
      String(props.index + 1).padStart(2, '0'),
    ),
    createElement('div', { style: { flex: '1 1 auto', minWidth: 0 } }, props.renderDefault(props)),
  );

export const processStep = defineType({
  name: 'processStep',
  title: 'Process step',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Step name',
      description:
        'Short name of the step, e.g. "Website strategy plan". Shown on the step tab and as the step heading.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'The paragraph that explains this step.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      description:
        'Short labels shown as tags under the description, e.g. "Technical audit". Type a label and press Enter to add it. Order does not matter.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Illustration shown next to this step. Drag the dot to control the crop.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the image for screen readers. Required only if the image is set.',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((alt, ctx) => {
              const parent = ctx.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt) return 'Alt text is required when an image is set.';
              return true;
            }),
        }),
      ],
    }),
  ],
  components: {
    item: NumberedStepItem,
  },
  preview: {
    select: {
      title: 'name',
      features: 'features',
      description: 'description',
      media: 'image',
    },
    prepare({ title, features, description, media }) {
      const list = Array.isArray(features) ? (features as string[]) : [];
      const subtitle = list.length > 0 ? list.slice(0, 3).join(' · ') : description;
      return {
        title: title || '(unnamed step)',
        ...(subtitle ? { subtitle } : {}),
        media,
      };
    },
  },
});
