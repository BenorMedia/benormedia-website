import { defineType, defineField } from 'sanity';

/**
 * siteSettings — singleton with global site-wide content.
 * Cannot be created twice or deleted (enforced in sanity.config + structure).
 *
 * Navigation and Footer content is authored directly in the Astro components
 * (Lead decision 2026-09-25). Only General, SEO & Meta, Organization and
 * Global sections remain in the CMS.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'seo', title: 'SEO & Meta' },
    { name: 'organization', title: 'Organization' },
    { name: 'global', title: 'Global sections' },
  ],
  fields: [
    // ---- General ----
    defineField({
      name: 'siteName',
      title: 'Site name',
      description: 'The name of the site, used in the browser tab and social shares.',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL (production)',
      description:
        'The full production URL, e.g. https://benor.media. Used for canonical URLs, the sitemap and Open Graph tags.',
      type: 'url',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'The site logo used in the navigation. SVG strongly preferred.',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the logo for screen readers. Defaults to the site name if blank.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      description: 'The main contact email address.',
      type: 'string',
      group: 'general',
    }),

    // ---- SEO & Meta ----
    defineField({
      name: 'titleTemplate',
      title: 'Title template',
      description:
        'How page titles appear in browser tabs. Use %s where the page title should go, e.g. "%s | BenorMedia".',
      type: 'string',
      group: 'seo',
      initialValue: '%s | BenorMedia',
    }),
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default meta title',
      description: 'Used on the Home page and as a fallback anywhere a page has no meta title.',
      type: 'string',
      group: 'seo',
      validation: (Rule) =>
        Rule.max(60).warning('Meta titles longer than 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default meta description',
      description: 'Used as a fallback whenever a page or post has no meta description.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) =>
        Rule.max(160).warning('Meta descriptions longer than 160 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default social share image',
      description: 'Recommended size 1200 x 630 pixels. Used whenever a page has no share image of its own.',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the image for screen readers.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter/X handle',
      description: 'Include the @ sign, e.g. @benormedia.',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Site Verification token',
      description: 'The content value of the meta tag Google Search Console gives you to verify site ownership.',
      type: 'string',
      group: 'seo',
    }),

    // ---- Organization (JSON-LD) ----
    defineField({
      name: 'legalName',
      title: 'Legal name',
      description: 'The company\'s legal name (used in structured data).',
      type: 'string',
      group: 'organization',
    }),
    defineField({
      name: 'orgDescription',
      title: 'Organization description',
      description: 'A short paragraph describing the company (used in structured data).',
      type: 'text',
      rows: 3,
      group: 'organization',
    }),
    defineField({
      name: 'orgLogo',
      title: 'Organization logo (square)',
      description: 'A square version of the logo used by search engines (Google recommends 112 x 112 pixels or larger).',
      type: 'image',
      group: 'organization',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'sameAs',
      title: 'Social profile URLs',
      description: 'Full URLs to the company\'s official social profiles (LinkedIn, X, etc.).',
      type: 'array',
      of: [{ type: 'url' }],
      group: 'organization',
    }),
    defineField({
      name: 'foundingYear',
      title: 'Founding year',
      description: 'Year the company was founded, e.g. 2019.',
      type: 'number',
      group: 'organization',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      description: 'Optional. Company address for structured data.',
      type: 'object',
      group: 'organization',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'region', title: 'Region / State', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Postal code', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
      ],
    }),

    // ---- Global sections ----
    defineField({
      name: 'ctaBanner',
      title: 'CTA banner',
      description: 'The site-wide call-to-action banner shown near the bottom of most pages.',
      type: 'object',
      group: 'global',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'buttons',
          title: 'Buttons',
          type: 'array',
          of: [{ type: 'button' }],
          validation: (Rule) => Rule.max(2),
        }),
        defineField({
          name: 'socialProofText',
          title: 'Social proof text',
          description: 'A short line shown under the buttons, e.g. "Trusted by 150+ teams".',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'contactModal',
      title: 'Contact modal',
      description: 'Content for the site-wide contact popup.',
      type: 'object',
      group: 'global',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'successMessage',
          title: 'Success message',
          description: 'The message shown after a form is submitted successfully.',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
