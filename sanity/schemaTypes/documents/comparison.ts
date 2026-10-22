import { defineType, defineField, defineArrayMember } from 'sanity';
import { KEBAB_CASE, slugify } from './service';
import { ACCENT_TITLE_MAX_MESSAGE } from '../objects/accentTitle';
import { ACCENT_TITLE_HELP } from '../objects/accentSectionHeader';
import { altField } from '../objects/imageAlt';

/**
 * Comparison — "Webflow vs <competitor>", routable at /comparison/<slug>
 * (SCHEMAS.md v0.13; DECISIONS → Comparison, lead 2026-10-22). Figma template
 * 3790:37245, index card 3790:37967.
 *
 * One Studio tab per page section, in page order, plus Card and SEO. Layout
 * is fixed by the approved design: no page builder. Fixed in code, not here:
 * the Webflow side of every logo pill and of the table header, the Webflow
 * "What to choose" illustration, the logo strip, testimonials, FAQ heading,
 * CTA banner, the index hero copy and the index SEO.
 */

const API_VERSION = '2026-09-25';

/** Published and draft ids of the document being edited. */
const ownIds = (id: string | undefined) => {
  const published = (id ?? '').replace(/^drafts\./, '');
  return { draft: `drafts.${published}`, published };
};

export const comparison = defineType({
  name: 'comparison',
  title: 'Comparison',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'choose', title: 'What to choose' },
    { name: 'table', title: 'Table' },
    { name: 'reasons', title: 'Why switch' },
    { name: 'migration', title: 'Migration' },
    { name: 'caseStudies', title: 'Case studies' },
    { name: 'faqs', title: 'FAQs' },
    { name: 'card', title: 'Card' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Overview
    defineField({
      name: 'title',
      title: 'Title',
      description:
        'The name of this comparison, e.g. "Webflow vs WordPress". Used in Studio, at the end of the breadcrumb and as the page title in search results when the SEO tab has none.',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'The page URL, e.g. /comparison/webflow-vs-wordpress. Click "Generate" to fill it from the title. Lowercase letters, numbers and dashes only. Changing it changes the page address, so avoid it once the page is live.',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'title',
        maxLength: 96,
        slugify,
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          const current = value?.current;
          if (!current) return true;
          if (!KEBAB_CASE.test(current)) {
            return 'Use lowercase letters, numbers and single dashes only, e.g. "webflow-vs-wordpress".';
          }
          const { document, getClient } = context;
          const client = getClient({ apiVersion: API_VERSION });
          const params = { ...ownIds(document?._id), slug: current };
          const query =
            '!defined(*[_type == "comparison" && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)';
          const isUnique = await client.fetch(query, params);
          return isUnique ? true : 'Another comparison already uses this slug.';
        }),
    }),
    defineField({
      name: 'competitorName',
      title: 'Competitor name',
      description:
        'The platform Webflow is compared with, e.g. "WordPress". Used for the logo\'s alt text and wherever the page names the competitor.',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'competitorLogo',
      title: 'Competitor logo',
      description:
        'The competitor\'s logo for light backgrounds, shown in the "Webflow VS …" pill at the top of the page and on the comparison card. SVG preferred. The Webflow logo is added automatically.',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
      fields: [altField('Describe the logo for screen readers, e.g. "WordPress". Required when a logo is set.')],
      validation: (Rule) => Rule.required().error('Add the competitor logo.'),
    }),
    defineField({
      name: 'competitorLogoOnDark',
      title: 'Competitor logo on dark',
      description:
        'Optional. A white version of the logo for the coloured header row of the comparison table. SVG preferred. If left empty, the logo above is turned white automatically (works for one-colour logos only).',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
      fields: [altField('Describe the logo for screen readers, e.g. "WordPress". Required when a logo is set.')],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published on',
      description: 'Comparisons are listed newest first on the comparison page. Defaults to today.',
      type: 'date',
      group: 'overview',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),

    // Hero
    defineField({
      name: 'headline',
      title: 'Headline',
      description: `The big title at the top of the page, e.g. "WordPress wasn't built for SaaS. Webflow was." ${ACCENT_TITLE_HELP}`,
      type: 'accentTitle',
      group: 'hero',
      validation: (Rule) => [
        Rule.required().error('Add a headline.'),
        Rule.max(1).error(ACCENT_TITLE_MAX_MESSAGE),
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'The paragraph under the headline. Also used as the search description if the SEO tab has none.',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'primaryButtonLabel',
      title: 'Main button text',
      description:
        'The text of the coloured button, e.g. "Let\'s talk about your migration". It always opens the contact form.',
      type: 'string',
      group: 'hero',
      validation: (Rule) => [
        Rule.required().error('Add the button text.'),
        Rule.max(40).warning('Long button text may wrap on phones.'),
      ],
    }),
    defineField({
      name: 'secondaryButtonLabel',
      title: 'Second button text',
      description:
        'The text of the outlined button, e.g. "View comparison". It always scrolls down to the comparison table.',
      type: 'string',
      group: 'hero',
      validation: (Rule) => [
        Rule.required().error('Add the button text.'),
        Rule.max(40).warning('Long button text may wrap on phones.'),
      ],
    }),

    // What to choose
    defineField({
      name: 'chooseHeader',
      title: 'Section header',
      description: 'Eyebrow, title and paragraph above the two cards, e.g. "Which one is right for your team?".',
      type: 'accentSectionHeader',
      group: 'choose',
    }),
    defineField({
      name: 'webflowChoice',
      title: 'Webflow card',
      description:
        'The left card. Its illustration is fixed; each reason is shown with a check mark. Mark "Webflow" in the title with Gradient to match the design.',
      type: 'comparisonChoice',
      group: 'choose',
    }),
    defineField({
      name: 'competitorChoice',
      title: 'Competitor card',
      description: 'The right card, with its own illustration. Each reason is shown with a dash.',
      type: 'comparisonChoice',
      group: 'choose',
    }),

    // Table
    defineField({
      name: 'tableHeader',
      title: 'Section header',
      description:
        'Eyebrow, title and paragraph above the table, e.g. "Webflow vs WordPress, side by side" with "side by side" in Gradient.',
      type: 'accentSectionHeader',
      group: 'table',
    }),
    defineField({
      name: 'tableGroups',
      title: 'Table groups',
      description:
        'The table, one group per topic (e.g. "Performance"), each with its rows. The header row with both logos is added automatically. Drag to reorder.',
      type: 'array',
      group: 'table',
      of: [defineArrayMember({ type: 'comparisonTableGroup' })],
    }),

    // Why switch
    defineField({
      name: 'reasonsHeader',
      title: 'Section header',
      description: 'Eyebrow, title and paragraph above the reasons, e.g. "Why SaaS teams switch".',
      type: 'accentSectionHeader',
      group: 'reasons',
    }),
    defineField({
      name: 'reasons',
      title: 'Reasons',
      description:
        'The rows of illustration + text. They alternate sides automatically (first one with the picture on the left). The design shows 4.',
      type: 'array',
      group: 'reasons',
      of: [defineArrayMember({ type: 'comparisonReason' })],
      validation: (Rule) => Rule.max(4).warning('The design shows 4 reasons.'),
    }),

    // Migration
    defineField({
      name: 'migrationHeader',
      title: 'Section header',
      description:
        'Eyebrow, title and paragraph above the steps, e.g. eyebrow "WordPress → Webflow" and title "How we migrate you without losing a ranking".',
      type: 'accentSectionHeader',
      group: 'migration',
    }),
    defineField({
      name: 'migrationSteps',
      title: 'Migration steps',
      description:
        'The numbered step cards: an icon, a name and a short paragraph each. The number (1, 2…) comes from the order in this list: drag a step to change its number.',
      type: 'array',
      group: 'migration',
      of: [defineArrayMember({ type: 'processStep' })],
      validation: (Rule) => Rule.max(4).error('Add 4 steps at most: the design has room for 4.'),
    }),

    // Case studies
    defineField({
      name: 'caseStudiesHeader',
      title: 'Section header',
      description: 'Eyebrow, title and paragraph above the case study cards.',
      type: 'accentSectionHeader',
      group: 'caseStudies',
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case studies',
      description:
        'Optional. Up to 3 case studies shown as cards. Only published case studies appear on the page. If left empty, the latest published case studies are shown instead.',
      type: 'array',
      group: 'caseStudies',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'caseStudy' }] })],
      validation: (Rule) => [
        Rule.max(3).error('Add 3 case studies at most.'),
        Rule.unique().error('Each case study can only be added once.'),
      ],
    }),

    // FAQs
    defineField({
      name: 'faqSections',
      title: 'FAQ sections',
      description:
        'Optional. Each section becomes a tab (its title is the tab label) with its own questions. Rendered as FAQ structured data for search engines.',
      type: 'array',
      group: 'faqs',
      of: [defineArrayMember({ type: 'faqSection' })],
    }),

    // Card (index /comparison)
    defineField({
      name: 'cardTitle',
      title: 'Card title',
      description:
        'The heading on this comparison\'s card on the comparison page. If left empty, the title is used.',
      type: 'string',
      group: 'card',
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card description',
      description: 'The short paragraph on the card. Keep it to 2 or 3 lines.',
      type: 'text',
      rows: 3,
      group: 'card',
      validation: (Rule) => Rule.max(200).warning('Keep the card description under 200 characters so the cards line up.'),
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      description:
        'Search and social preview settings. If left blank, we fall back to the title, the subtitle and the site defaults.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Published (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title (A to Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'competitorLogo',
    },
    prepare({ title, slug, media }) {
      return {
        title: title || '(untitled comparison)',
        subtitle: slug ? `/comparison/${slug}` : '(no slug yet)',
        media,
      };
    },
  },
});
