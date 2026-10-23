import { defineType, defineField, defineArrayMember } from 'sanity';
import { KEBAB_CASE, slugify } from './service';

/**
 * Case study — routable at /case-studies/<slug> (SCHEMAS.md v0.10,
 * approved by the lead 2026-10-20).
 *
 * One Studio tab per page part, in page order, plus SEO. Layout is fixed by
 * the approved design: no page builder. The body is plain Portable Text
 * (paragraphs, H2, H3, quote, bold, italic, links, lists) plus callout
 * boxes: no images, embeds or tables.
 *
 * v0.12 (Figma 3842:40046, code only, not deployed): hero facts `solution`,
 * `timeline`, `stack`; body `blockquote` style and `caseStudyCallout`;
 * `resultsIntro` / `resultsSummary` around the results; `kpi.label`.
 */

const API_VERSION = '2026-09-25';

/** Published and draft ids of the document being edited. */
const ownIds = (id: string | undefined) => {
  const published = (id ?? '').replace(/^drafts\./, '');
  return { draft: `drafts.${published}`, published };
};

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'article', title: 'Article' },
    { name: 'results', title: 'Results' },
    { name: 'card', title: 'Card' },
    { name: 'related', title: 'Related' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Overview
    defineField({
      name: 'title',
      title: 'Title',
      description:
        'The case study title. Shown as the big page title, on the case study cards and at the end of the breadcrumb.',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'The page URL, e.g. /case-studies/joor. Click "Generate" to fill it from the title. Lowercase letters, numbers and dashes only. Changing it changes the page address, so avoid it once the page is live.',
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
            return 'Use lowercase letters, numbers and single dashes only, e.g. "joor-website-redesign".';
          }
          const { document, getClient } = context;
          const client = getClient({ apiVersion: API_VERSION });
          const params = { ...ownIds(document?._id), slug: current };
          const query =
            '!defined(*[_type == "caseStudy" && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)';
          const isUnique = await client.fetch(query, params);
          return isUnique ? true : 'Another case study already uses this slug.';
        }),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      description:
        'The client this case study is about. Their logo is shown on the card and at the top of the page, and their name under "01 / Client". The website screenshot and website URL set on the client are shown in the browser frame at the top of the page.',
      type: 'reference',
      to: [{ type: 'client' }],
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published on',
      description:
        'The date shown on the card and at the top of the page. Case studies are listed newest first. Defaults to today.',
      type: 'date',
      group: 'overview',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Time to read (minutes)',
      description:
        'Optional override. If left empty, it is calculated automatically from the length of the article.',
      type: 'number',
      group: 'overview',
      validation: (Rule) =>
        Rule.integer().min(1).error('Use a whole number of minutes, 1 or more.'),
    }),

    // Hero
    defineField({
      name: 'intro',
      title: 'Intro',
      description:
        'The paragraph under the title at the top of the page. Also used as the search description if the SEO tab has none.',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      description: 'The client\'s industry, shown under "02 / Industry".',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      description:
        'The services BenorMedia delivered. Their names are shown under "03 / Services delivered". Pick each service once; drag to reorder.',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
      validation: (Rule) => Rule.unique().error('Each service can only be added once.'),
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      description: 'Shown under "04 / Solution". Defaults to "BenorMedia". Left empty, the item is hidden.',
      type: 'string',
      group: 'hero',
      // Lead 2026-10-22: the value is the brand, one word (house style).
      initialValue: 'BenorMedia',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      description: 'Optional. How long the project took, e.g. "10 weeks", shown under "05 / Timeline". Left empty, the item is hidden.',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'stack',
      title: 'Stack',
      description:
        'Optional. The tools and platforms used, one per item, e.g. "Webflow". Shown under "06 / Stack", separated by slashes. Left empty, the item is hidden.',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      description:
        'A short summary of the client\'s problem. Not shown on the page: used in the search description when the SEO tab has none.',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      description:
        'Optional. The quote shown on this page. If left empty, the testimonial linked to the client is used. If neither exists, no quote is shown.',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      group: 'hero',
    }),

    // Article
    defineField({
      name: 'body',
      title: 'Article',
      description:
        'The case study text. Use Heading 2 for each main section (they build the table of contents) and Heading 3 for a phase inside a section: everything from a Heading 3 to the next Heading 2 is shown in a narrower column. Use Quote for a short highlighted quote, bullet lists for check-mark lists, and "Callout box" for a boxed list such as deliverables. You can also use bold, italic, links and numbered lists.',
      type: 'array',
      group: 'article',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bulleted list', value: 'bullet' },
            { title: 'Numbered list', value: 'number' },
          ],
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
                    description:
                      'Use a path such as /pricing for pages on this site, or a full address starting with https:// for other websites.',
                    // The site renders only full addresses and paths that
                    // start with "/" or "#" (`safeHref` in src/lib/sanity/case-study-body.ts);
                    // anything else would be dropped silently (QA nit 7).
                    validation: (Rule) =>
                      Rule.required()
                        .uri({ allowRelative: true, scheme: ['http', 'https'] })
                        .custom((value: string | undefined) => {
                          const href = value?.trim();
                          if (!href) return true;
                          if (/^https?:\/\//i.test(href)) return true;
                          if (href.startsWith('//')) {
                            return 'Start a link to another website with https:// (for example https://example.com).';
                          }
                          if (href.startsWith('/') || href.startsWith('#')) return true;
                          return `Start a link to a page on this site with "/" (for example /${href.replace(/^\.?\/*/, '')}), or use a full address starting with https://.`;
                        }),
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
        }),
        defineArrayMember({ type: 'caseStudyCallout' }),
        defineArrayMember({ type: 'caseStudyFigure' }),
      ],
    }),

    // Results
    defineField({
      name: 'resultsIntro',
      title: 'Results intro',
      description: 'Optional. A short paragraph under "The results" heading, above the numbers.',
      type: 'text',
      rows: 3,
      group: 'results',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      description:
        'Optional. Up to 3 key numbers shown in a row under the article. Each one has a value, an optional label and a short line explaining it.',
      type: 'array',
      group: 'results',
      of: [defineArrayMember({ type: 'kpi' })],
      validation: (Rule) => Rule.max(3).error('Add 3 results at most: the design has room for 3.'),
    }),
    defineField({
      name: 'resultsSummary',
      title: 'Results summary',
      description: 'Optional. A short closing paragraph under the numbers.',
      type: 'text',
      rows: 3,
      group: 'results',
    }),

    // Card (v0.11)
    defineField({
      name: 'cardStats',
      title: 'Card stats',
      description:
        'Optional. Up to 2 key numbers shown in a row on this case study\'s card (on the case studies page and in "Related" sections). Each one has a value and a short label. If left empty, the card shows no stats row.',
      type: 'array',
      group: 'card',
      of: [defineArrayMember({ type: 'cardStat' })],
      validation: (Rule) => Rule.max(2).error('Add 2 card stats at most: the card has room for 2.'),
    }),

    // Related
    defineField({
      name: 'related',
      title: 'Related case studies',
      description:
        'Optional. Up to 3 other case studies shown at the end of the page. If left empty, the latest published case studies are shown instead.',
      type: 'array',
      group: 'related',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'caseStudy' }],
          options: {
            // Hide this case study from its own picker.
            filter: ({ document }) => {
              const { draft, published } = ownIds(document?._id);
              return {
                filter: '!(_id in [$draft, $published])',
                params: { draft, published },
              };
            },
          },
        }),
      ],
      validation: (Rule) => [
        Rule.max(3).error('Add 3 related case studies at most.'),
        Rule.unique().error('Each case study can only be added once.'),
        Rule.custom((value, context) => {
          const list = (value ?? []) as Array<{ _ref?: string }>;
          const { published } = ownIds(context.document?._id);
          const pointsToItself = list.some(
            (item) => item?._ref?.replace(/^drafts\./, '') === published,
          );
          return pointsToItself ? 'A case study cannot be related to itself.' : true;
        }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      description:
        'Search and social preview settings. If left blank, we fall back to the title, the intro and the site defaults.',
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
      title: 'Published (oldest first)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
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
      clientName: 'client.name',
      media: 'client.logo',
    },
    prepare({ title, clientName, media }) {
      return {
        title: title || '(untitled case study)',
        subtitle: clientName || '(no client yet)',
        media,
      };
    },
  },
});
