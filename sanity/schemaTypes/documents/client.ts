import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

/** Six-digit hex colour, e.g. `#001F3D` (`brandColor`, `brandGlowColor`). */
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

/**
 * Client — a customer showcased across the site.
 *
 * Not a routable document; no detail pages (see DECISIONS 2026-09-25).
 * Referenced from Home (featured work, work cards/list, logo strip) and
 * from the Work page.
 *
 * `sector` (SCHEMAS v0.9, lead 2026-10-01): one of a fixed list; drives the
 * Work page filters.
 *
 * `logoOnDark` (SCHEMAS v0.11): optional logo for dark backgrounds (navy
 * case-study card). Empty: the site whitens `logo` with CSS.
 *
 * `brandColor` / `brandGlowColor` (SCHEMAS v0.13, lead 2026-10-22): optional
 * hex strings for the case-study card thumbnail background and glow. Empty:
 * the card uses `--color-navy` / `--color-blue-500` (Surfe's colours).
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
      name: 'logoOnDark',
      title: 'Logo on dark',
      description:
        'Optional. A version of the logo made for dark backgrounds, such as the navy case study card. SVG strongly preferred. If left empty, the site turns the regular logo white, which only looks right for one-colour logos.',
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
      name: 'brandColor',
      title: 'Brand colour',
      description:
        'Optional. The background of the client logo area on the case study cards (Case studies page and the "Resources" cards under each case study). Six-digit hex code, e.g. #001F3D. Pick a dark colour: the logo is shown in white on top. If left empty, the default navy is used.',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(HEX_COLOR, { name: 'hex colour' }).error(
          'Use a six-digit hex code with the #, e.g. #001F3D.',
        ),
    }),
    defineField({
      name: 'brandGlowColor',
      title: 'Brand glow colour',
      description:
        'Optional. The soft glow behind the logo on the case study cards (same cards as Brand colour). Six-digit hex code, e.g. #1355FF. If left empty, the default blue is used.',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(HEX_COLOR, { name: 'hex colour' }).error(
          'Use a six-digit hex code with the #, e.g. #1355FF.',
        ),
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
