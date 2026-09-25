import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Blog post — routable at /blog/[slug].
 *
 * Body is Portable Text + @sanity/table only. No embeds/videos/code/CTA
 * blocks (see DECISIONS 2026-09-25).
 */
export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      description: 'The article headline. Shown on cards and at the top of the article.',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'The URL for this article, e.g. /blog/my-post-title. Click "Generate" to fill it from the headline. Must be unique.',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value?.current) return true;
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2026-09-25' });
          const id = document?._id.replace(/^drafts\./, '');
          const params = { draft: `drafts.${id}`, published: id, slug: value.current };
          const query =
            '!defined(*[_type == "post" && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)';
          const isUnique = await client.fetch(query, params);
          return isUnique ? true : 'A post with this slug already exists.';
        }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      description: 'The image shown on blog cards and at the top of the article. Drag the dot to control the crop.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the image for screen readers. Required.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short description',
      description:
        'A short summary shown on blog cards and used as the meta description if none is set. Aim for around 200 characters.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) =>
        Rule.required().max(220).warning('Excerpts longer than ~200 characters may wrap awkwardly on cards.'),
    }),
    defineField({
      name: 'readTime',
      title: 'Time to read (minutes)',
      description:
        'Optional override. If left blank, it is calculated automatically from the article length at build time.',
      type: 'number',
      group: 'content',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      description: 'The date shown on the article. Defaults to now when the post is created.',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'The category this article belongs to. Used by the blog filter. Pick exactly one.',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      description: 'The author of this article. Pick from the Authors list.',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Article',
      description:
        'The article content. Use H2/H3/H4 for sections, bullet or numbered lists, quotes, links and images.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
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
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Page or post',
                    to: [
                      { type: 'homePage' },
                      { type: 'workPage' },
                      { type: 'pricingPage' },
                      { type: 'testimonialsPage' },
                      { type: 'blogPage' },
                      { type: 'post' },
                    ],
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in a new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              description: 'Describe the image for screen readers. Required.',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              description: 'Optional caption shown under the image.',
              type: 'string',
            }),
          ],
        }),
        defineArrayMember({
          type: 'table',
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'faqSections',
      title: 'FAQ sections',
      description:
        'Optional. Grouped questions shown after the article and rendered as FAQ structured data for Google.',
      type: 'array',
      group: 'content',
      of: [{ type: 'faqSection' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description:
        'Search and social preview settings. If left blank, we fall back to the title, excerpt and thumbnail above.',
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
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      publishedAt: 'publishedAt',
      media: 'thumbnail',
    },
    prepare({ title, category, publishedAt, media }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US') : '';
      const subtitle = [category, date].filter(Boolean).join(' · ');
      return {
        title: title || '(untitled post)',
        subtitle,
        media,
      };
    },
  },
});

