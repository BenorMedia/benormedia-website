import { defineType, defineField } from 'sanity';
import { ACCENT_TITLE_MAX_MESSAGE } from './accentTitle';

/**
 * Section header whose title can carry gradient words (SCHEMAS.md v0.13):
 * eyebrow pill + `accentTitle` + paragraph. `sectionHeader` has a plain
 * string title, so it can't render "side by side" in the brand gradient.
 * First used by `comparison` (5 sections).
 */
export const ACCENT_TITLE_HELP =
  'Select words and click "Gradient" (G) in the toolbar to show them with the brand gradient. Press Shift+Enter for a line break. Keep it to one paragraph.';

export const accentSectionHeader = defineType({
  name: 'accentSectionHeader',
  title: 'Section header',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Optional. The small pill of text above the title, e.g. "What to choose". Shown in capitals.',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: `The section heading. ${ACCENT_TITLE_HELP}`,
      type: 'accentTitle',
      validation: (Rule) => [
        Rule.required().error('Add a title.'),
        Rule.max(1).error(ACCENT_TITLE_MAX_MESSAGE),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Optional. The short paragraph under the title. Left empty, nothing is shown.',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare({ title, eyebrow }) {
      const blocks = Array.isArray(title) ? (title as Array<{ children?: Array<{ text?: string }> }>) : [];
      const text = blocks
        .flatMap((block) => block.children ?? [])
        .map((span) => span.text ?? '')
        .join('')
        .replace(/\n/g, ' ')
        .trim();
      return {
        title: text || '(no title yet)',
        ...(eyebrow ? { subtitle: eyebrow } : {}),
      };
    },
  },
});
