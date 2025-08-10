import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'background',
  title: 'Website Background',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Website Background Settings'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'Important for accessibility and SEO'
        }),
      ],
      validation: (Rule) => Rule.required(),
      description: 'Main background image for the website. Recommended size: 1920x1080 or larger'
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(1).precision(2),
      initialValue: 0.7,
      description: 'Controls how dark the overlay is (0 = transparent, 1 = fully dark). Recommended: 0.6-0.8'
    }),
    defineField({
      name: 'overlayColor',
      title: 'Overlay Color',
      type: 'string',
      options: {
        list: [
          { title: 'Black', value: 'black' },
          { title: 'Dark Blue', value: 'blue-900' },
          { title: 'Dark Gray', value: 'gray-900' },
          { title: 'Dark Green', value: 'green-900' },
        ]
      },
      initialValue: 'black',
      description: 'Color of the overlay that appears over the background image'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage',
    },
  },
})
