import { defineType, defineField, defineArrayMember } from 'sanity';
import { ACCENT_TITLE_MAX_MESSAGE } from '../objects/accentTitle';

/**
 * Service page — routable at /<slug> (src/pages/[service].astro).
 *
 * Reinstated 2026-09-29 (SCHEMAS.md v0.6, lead-approved fields). One Studio
 * tab per page section, in page order, plus SEO. Layout is fixed by the
 * approved design: no page builder.
 */

// Top-level routes a service slug would collide with (docs/SITEMAP.md
// "Reserved slugs").
const RESERVED_SLUGS = ['work', 'pricing', 'testimonials', 'blog', 'studio', 'dev', '404'];

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** "Custom Websites & Migrations" → "custom-websites-migrations". */
const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);

const ACCENT_TITLE_HELP =
  'Select words and click "Gradient" (G) in the toolbar to show them with the brand gradient. Press Shift+Enter for a line break. Keep it to one paragraph.';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'problem', title: 'Problem' },
    { name: 'process', title: 'Process' },
    { name: 'faqs', title: 'FAQs' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Overview
    defineField({
      name: 'name',
      title: 'Service name',
      description:
        'The name of the service, e.g. "Custom Websites & Migrations". Shown in the breadcrumb above the page title and anywhere the service is listed.',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'The page URL, e.g. /custom-websites-migrations. Click "Generate" to fill it from the service name. Lowercase letters, numbers and dashes only. Changing it changes the page address, so avoid it once the page is live.',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'name',
        maxLength: 96,
        slugify,
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          const current = value?.current;
          if (!current) return true;
          if (!KEBAB_CASE.test(current)) {
            return 'Use lowercase letters, numbers and single dashes only, e.g. "custom-websites-migrations".';
          }
          if (RESERVED_SLUGS.includes(current)) {
            return `"${current}" is already used by another page of the site. Pick a different slug.`;
          }
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2026-09-25' });
          const id = document?._id.replace(/^drafts\./, '');
          const params = { draft: `drafts.${id}`, published: id, slug: current };
          const query =
            '!defined(*[_type == "service" && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)';
          const isUnique = await client.fetch(query, params);
          return isUnique ? true : 'Another service already uses this slug.';
        }),
    }),
    defineField({
      name: 'clients',
      title: 'Related clients',
      description:
        'Optional. Clients whose work relates to this service. Pick each client once; drag to reorder.',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'client' }] })],
      validation: (Rule) => Rule.unique().error('Each client can only be added once.'),
    }),

    // Hero
    defineField({
      name: 'headline',
      title: 'Headline',
      description: `The big title at the top of the page. ${ACCENT_TITLE_HELP}`,
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
      description: 'The paragraph under the headline.',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),

    // Problem
    defineField({
      name: 'problemTitle',
      title: 'Problem title',
      description: `Title of "The Problem" section. ${ACCENT_TITLE_HELP}`,
      type: 'accentTitle',
      group: 'problem',
      validation: (Rule) => Rule.max(1).error(ACCENT_TITLE_MAX_MESSAGE),
    }),
    defineField({
      name: 'problemDescription',
      title: 'Problem description',
      description: 'The paragraph under the problem title.',
      type: 'text',
      rows: 3,
      group: 'problem',
    }),

    // Process
    defineField({
      name: 'processTitle',
      title: 'Process title',
      description: `Title of the "Process" section. ${ACCENT_TITLE_HELP}`,
      type: 'accentTitle',
      group: 'process',
      validation: (Rule) => Rule.max(1).error(ACCENT_TITLE_MAX_MESSAGE),
    }),
    defineField({
      name: 'processDescription',
      title: 'Process description',
      description:
        'The paragraph under the process title. Press Enter where the design needs a line break.',
      type: 'text',
      rows: 3,
      group: 'process',
    }),
    defineField({
      name: 'steps',
      title: 'Process steps',
      description:
        'The steps shown as numbered tabs. The number (01, 02…) comes from the order in this list: drag a step to change its number.',
      type: 'array',
      group: 'process',
      of: [defineArrayMember({ type: 'processStep' })],
    }),

    // FAQs
    defineField({
      name: 'faqSections',
      title: 'FAQ sections',
      description:
        'Optional. Each section becomes a tab (its title is the tab label) with its own questions. Rendered as FAQ structured data for Google.',
      type: 'array',
      group: 'faqs',
      of: [defineArrayMember({ type: 'faqSection' })],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      description:
        'Search and social preview settings. If left blank, we fall back to the service name, the subtitle and the site defaults.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Name (A to Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || '(unnamed service)',
        subtitle: slug ? `/${slug}` : '(no slug yet)',
      };
    },
  },
});
