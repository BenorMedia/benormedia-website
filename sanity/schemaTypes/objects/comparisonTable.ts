import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Side-by-side table of a comparison (SCHEMAS.md v0.14, Figma 3790:37411).
 * The table is a list of groups ("Performance", "SEO & AEO"…), each with
 * rows: feature, Webflow cell, competitor cell. The header row (Webflow logo,
 * competitor logo), the check icon on Webflow cells and the dash on
 * competitor cells are fixed in code.
 */
export const comparisonTableRow = defineType({
  name: 'comparisonTableRow',
  title: 'Table row',
  type: 'object',
  fields: [
    defineField({
      name: 'feature',
      title: 'Feature',
      description: 'The row label in the first column, e.g. "Hosting & speed".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'webflow',
      title: 'Webflow',
      description: 'The Webflow cell, shown with a check mark, e.g. "Global CDN and hosting included".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'competitor',
      title: 'Competitor',
      description: 'The competitor cell, shown with a dash, e.g. "Depends on your host, theme and plugin stack".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'feature',
      webflow: 'webflow',
      competitor: 'competitor',
    },
    prepare({ title, webflow, competitor }) {
      return {
        title: title || '(no feature yet)',
        subtitle: [webflow, competitor].filter(Boolean).join(' / '),
      };
    },
  },
});

export const comparisonTableGroup = defineType({
  name: 'comparisonTableGroup',
  title: 'Table group',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Group label',
      description: 'The grey band above these rows, e.g. "Performance". Shown in capitals.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      description: 'The rows in this group. Drag to reorder.',
      type: 'array',
      of: [defineArrayMember({ type: 'comparisonTableRow' })],
      validation: (Rule) => Rule.required().min(1).error('Add at least one row.'),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      rows: 'rows',
    },
    prepare({ title, rows }) {
      const count = Array.isArray(rows) ? rows.length : 0;
      return {
        title: title || '(no label yet)',
        subtitle: `${count} ${count === 1 ? 'row' : 'rows'}`,
      };
    },
  },
});
