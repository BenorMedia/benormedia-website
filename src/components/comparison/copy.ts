/**
 * Comparison index and template labels that live in code (DECISIONS →
 * Comparison, SCHEMAS v0.13: the index hero, the index SEO and the FAQ
 * heading are not stored in Sanity). Strings that already exist in
 * `src/lib/new-pages/copy.json` are reused from there. Figma placeholders
 * (index 3790:37967) are `TODO: COPY` and are checked by the production
 * guard (`src/lib/sanity/comparison-release.ts`).
 */
import copy from '../../lib/new-pages/copy.json';

/** Route of the index; detail pages are `/comparison/<slug>`. */
export const COMPARISON_PATH = '/comparison';

export const comparisonHref = (slug: string): string => `${COMPARISON_PATH}/${slug}`;

/** `id` of the table section: the hero's second button scrolls to it (SCHEMAS v0.13). */
export const COMPARISON_TABLE_ID = 'comparison-table';

/** Webflow side, fixed in code (DECISIONS → Comparison). */
export const WEBFLOW_NAME = 'Webflow';

export const COMPARISON_COPY = {
  learnMore: copy.resources.learnMore,
  // Figma pill text between the two logos (3790:37354), uppercased in CSS.
  vs: 'vs',
  // Visually hidden in place of "VS" for screen readers ("Webflow versus WordPress").
  versus: 'versus',
  // Same heading as the service pages (FAQ heading fixed in code, SCHEMAS v0.13).
  faqHeading: 'Frequently asked questions.',
  // Accessible name of the FAQ tabs.
  faqTabsLabel: 'FAQ topics',
  // Accessible name added to the hero pill's dropdown trigger (after the competitor logo alt).
  otherComparisons: 'Other comparisons',
  // Visually hidden header of the table's first column (row headers).
  tableFeature: 'Feature',
  // Accessible label of the "Why switch" stat row and the steps list.
  statsLabel: 'Key figures',
  breadcrumb: {
    home: copy.livePathNames['/'],
    // Figma index eyebrow (3790:37985) and H1 (3790:37989).
    index: 'Comparison',
  },
  indexHero: {
    // Figma index hero (3790:37982): eyebrow and H1 "Comparison".
    eyebrow: 'Comparison',
    title: 'Comparison',
    // TODO: COPY: Figma placeholder (3790:37990).
    description:
      'Lorem ipsum dolor sit amet consectetur. Senectus nec gravida blandit et ultricies donec eu orci. Scelerisque lectus tristique iaculis duis.',
  },
  indexMeta: {
    // TODO: COPY: meta title = the Figma H1 until the lead sends the index meta.
    title: 'Comparison',
    // TODO: COPY: meta description = the Figma hero placeholder.
    description:
      'Lorem ipsum dolor sit amet consectetur. Senectus nec gravida blandit et ultricies donec eu orci. Scelerisque lectus tristique iaculis duis.',
  },
} as const;
