import { createElement } from 'react';
import { defineType, defineArrayMember } from 'sanity';
import type { BlockDecoratorProps } from 'sanity';

/**
 * Accent title — a one-line Portable Text title where editors mark words
 * with the brand gradient ("Gradient" decorator, value `accent`).
 *
 * Shape: exactly ONE block, style `normal`, no lists, no annotations, no
 * inline objects. Line breaks are `\n` inside span text (Shift+Enter in the
 * editor); the Astro renderer turns them into `<br />` and wraps `accent`
 * spans in `.c-section-header__accent`.
 *
 * Used by `service` (headline, problemTitle, processTitle). Each field sets
 * its own `validation` (required or not) and must keep `.max(1)`: field
 * validation replaces the type-level rule below.
 */

/** Validation message shared by every `accentTitle` field. */
export const ACCENT_TITLE_MAX_MESSAGE =
  'Keep the title on one paragraph. Use Shift+Enter (not Enter) for a line break.';

// Studio can't read the site tokens, so this copies `--gradient-primary`
// from src/styles/tokens.css for the editor preview only.
const STUDIO_GRADIENT = 'linear-gradient(106deg, #6275F6 2.88%, #6BB0F7 96.84%)';

const gradientTextStyle = {
  backgroundImage: STUDIO_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  caretColor: '#6275F6',
} as const;

/** Toolbar icon: a gradient "G". */
const GradientIcon = () =>
  createElement('span', { style: { ...gradientTextStyle, fontWeight: 700 } }, 'G');

/** Renders gradient-marked text with the gradient inside the editor. */
const GradientDecorator = (props: BlockDecoratorProps) =>
  createElement('span', { style: gradientTextStyle }, props.children);

export const accentTitle = defineType({
  name: 'accentTitle',
  title: 'Title with gradient words',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Title', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          {
            title: 'Gradient',
            value: 'accent',
            icon: GradientIcon,
            component: GradientDecorator,
          },
        ],
        annotations: [],
      },
      of: [],
    }),
  ],
  validation: (Rule) =>
    Rule.max(1).error(ACCENT_TITLE_MAX_MESSAGE),
});
