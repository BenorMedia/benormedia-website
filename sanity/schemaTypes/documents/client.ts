import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** "Darwin CX" → "darwin-cx". */
const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);

/**
 * Client — a customer showcased across the site.
 *
 * Referenced from Home (featured work, work cards/list, logo strip) and
 * from the Work page. A client is routable only when it has a case study
 * (`caseStudy` on + `slug`, SCHEMAS v0.10, lead 2026-11-04): its Work row
 * gets a "Case study" tag, sorts first and links to `/work/<slug>`. Every
 * other client stays without a detail page (DECISIONS 2026-09-25).
 *
 * `sector` (SCHEMAS v0.9, lead 2026-10-01): one of a fixed list; drives the
 * Work page filters.
 *
 * `orderRank` (hidden, @sanity/orderable-document-list): drag-and-drop order
 * of the Studio "Clients" list. Only the Work page listing sorts by it; Home,
 * Pricing and service pages keep their own order (SCHEMAS.md v0.7).
 */
export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'client', newItemPosition: 'after' }),
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The client\'s company name.',
      type: 'string',
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case study',
      description:
        'Turn on when this client has a case study. The Work page then shows a "Case study" tag on its row, lists it first and links the row to /work/<slug>.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Case study slug',
      description:
        'The case study URL, e.g. /work/surfe. Click "Generate" to fill it from the client name. Lowercase letters, numbers and dashes only. Changing it changes the page address, so avoid it once the page is live.',
      type: 'slug',
      hidden: ({ document }) => !document?.caseStudy,
      options: {
        source: 'name',
        maxLength: 96,
        slugify,
      },
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const current = value?.current;
          if (!current) {
            return context.document?.caseStudy ? 'A case study needs a slug.' : true;
          }
          if (!KEBAB_CASE.test(current)) {
            return 'Use lowercase letters, numbers and single dashes only, e.g. "surfe".';
          }
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2026-09-25' });
          const id = document?._id.replace(/^drafts\./, '');
          const params = { draft: `drafts.${id}`, published: id, slug: current };
          const query =
            '!defined(*[_type == "client" && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)';
          const isUnique = await client.fetch(query, params);
          return isUnique ? true : 'Another client already uses this slug.';
        }),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'The full logo. SVG strongly preferred so it stays sharp at any size.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the logo for screen readers. If left blank, the client name is used automatically.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description:
        'Small square icon used in the Home work list rows. SVG strongly preferred.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the icon for screen readers. If left blank, the client name is used automatically.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      description:
        'Small circular badge shown on the client card. Transparent PNG or SVG.',
      type: 'image',
      options: { hotspot: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the badge for screen readers. If left blank, \'<client name> badge\' is used automatically. Required if a badge image is set.',
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
    defineField({
      name: 'cardThumbnail',
      title: 'Card thumbnail',
      description: 'Image used in the Home work cards. Drag the dot to control the crop.',
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
    defineField({
      name: 'websiteScreenshot',
      title: 'Website screenshot',
      description:
        'A screenshot of the client\'s website. Used in several places across the site.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the screenshot for screen readers. Required only if the image is set.',
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
    defineField({
      name: 'websiteVideo',
      title: 'Website video',
      description:
        'Short MP4 recording of the client\'s website. Use 16:9, no audio, ideally 2–5 MB. Plays muted and looping in the Home Featured Work card while the card is on screen, shown whole (never cropped). Nothing downloads until then.',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'websiteVideoPoster',
      title: 'Website video poster',
      description:
        'Still image shown in the video frame until the video starts, and instead of the video for visitors who turn off motion. Cropped to 16:9. Falls back to the top of the website screenshot when empty.',
      type: 'image',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      description:
        'Optional. Pick a testimonial from this client. Required if you plan to feature this client in the Home "Featured Work" section.',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'fundsRaised',
      title: 'Funds raised',
      description: 'Amount raised, formatted as it should appear, e.g. "$25.0M". The word "Raised" is added automatically.',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'The industry this client belongs to. Pick exactly one.',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      description: 'The sector this client belongs to. Pick one. Drives the Work page filters.',
      type: 'string',
      options: {
        list: [
          { title: 'Agency', value: 'agency' },
          { title: 'Professional Services', value: 'professional-services' },
          { title: 'SaaS', value: 'saas' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      description: 'Full URL to the client\'s live website. Optional.',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title',
      media: 'logo',
    },
  },
});
