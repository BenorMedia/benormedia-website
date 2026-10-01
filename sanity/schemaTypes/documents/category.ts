import { defineType, defineField } from 'sanity';

/**
 * Category — shared by clients (industry) and blog posts.
 *
 * Displayed uppercased with CSS; stored in mixed case (e.g. "HR Tech").
 * Seeded with 22 canonical values by scripts/seed-categories.mjs.
 */
export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The category name, e.g. "Fintech" or "HR Tech". Must be unique.',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true;
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2026-09-25' });
          const id = document?._id.replace(/^drafts\./, '');
          const params = { draft: `drafts.${id}`, published: id, title: value };
          const query =
            '!defined(*[_type == "category" && !(_id in [$draft, $published]) && title == $title][0]._id)';
          const isUnique = await client.fetch(query, params);
          return isUnique ? true : 'A category with this title already exists.';
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'The URL-friendly version of the title. Used by the blog filter (e.g. ?category=hr-tech). Click "Generate" to fill it from the title.',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
});
