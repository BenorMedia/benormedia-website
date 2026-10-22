import { defineType, defineField, defineArrayMember } from 'sanity';
import { ACCENT_TITLE_MAX_MESSAGE } from './accentTitle';
import { ACCENT_TITLE_HELP } from './accentSectionHeader';
import { altField } from './imageAlt';

/**
 * One card of a comparison's "What to choose" section (SCHEMAS.md v0.13,
 * Figma 3790:37367): illustration, "Choose X if…" title and a short list of
 * reasons. Used twice on `comparison`: `webflowChoice` (the illustration is
 * fixed in code, so the image field is hidden there; list items show a
 * check) and `competitorChoice` (image editable; list items show a dash).
 */
export const comparisonChoice = defineType({
  name: 'comparisonChoice',
  title: 'Choice card',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Illustration',
      description:
        'The picture at the top of the card, e.g. a screenshot-style mockup of the competitor\'s admin. SVG preferred. Drag the dot to control the crop.',
      type: 'image',
      options: { hotspot: true },
      fields: [altField()],
      // The Webflow card's illustration is fixed in code.
      hidden: ({ path }) => path[0] === 'webflowChoice',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: `The card heading, e.g. "Choose Webflow if…". ${ACCENT_TITLE_HELP}`,
      type: 'accentTitle',
      validation: (Rule) => [
        Rule.required().error('Add a title.'),
        Rule.max(1).error(ACCENT_TITLE_MAX_MESSAGE),
      ],
    }),
    defineField({
      name: 'reasons',
      title: 'Reasons',
      description:
        'One short sentence per item, e.g. "You want a fast, secure site with no plugins to patch." The design shows 3.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) => [
        Rule.required().min(1).error('Add at least one reason.'),
        Rule.max(3).warning('The design shows 3 reasons. More will make this card taller than the other one.'),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      reasons: 'reasons',
      media: 'image',
    },
    prepare({ title, reasons, media }) {
      const blocks = Array.isArray(title) ? (title as Array<{ children?: Array<{ text?: string }> }>) : [];
      const text = blocks
        .flatMap((block) => block.children ?? [])
        .map((span) => span.text ?? '')
        .join('')
        .trim();
      const count = Array.isArray(reasons) ? reasons.length : 0;
      return {
        title: text || '(no title yet)',
        subtitle: `${count} ${count === 1 ? 'reason' : 'reasons'}`,
        media,
      };
    },
  },
});
