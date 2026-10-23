import { defineField } from 'sanity';

/**
 * Shared `alt` sub-field for image fields (not a schema type). Alt text is
 * required as soon as an image is set, so drafts without an image still save
 * and publish (SCHEMAS.md v0.14, first used by `comparison`).
 */
export const altField = (
  description = 'Describe the image for screen readers. Required when an image is set.',
) =>
  defineField({
    name: 'alt',
    title: 'Alt text',
    description,
    type: 'string',
    validation: (Rule) =>
      Rule.custom((alt, ctx) => {
        const parent = ctx.parent as { asset?: unknown } | undefined;
        if (parent?.asset && !alt?.trim()) return 'Alt text is required when an image is set.';
        return true;
      }),
  });
