import { defineType, defineField } from 'sanity';

/**
 * Blog author — single source of truth for name, photo, bio and LinkedIn.
 * Each post references one author.
 */
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The author\'s full name as it should appear on articles.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      description: 'Job title, e.g. "Founder & CEO" or "Head of Design". Optional.',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      description: 'Square headshot. Drag the dot to control the crop.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the image for screen readers. If left blank, the author\'s name is used automatically.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      description: 'Full URL to the author\'s LinkedIn profile. Optional.',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      title: 'Short bio',
      description: 'A short paragraph about the author (around 300 characters).',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.max(320).warning('Bios longer than about 300 characters may wrap awkwardly in article cards.'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo',
    },
  },
});
