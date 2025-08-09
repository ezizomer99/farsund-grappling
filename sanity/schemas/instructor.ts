import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title/Position',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'beltLevel',
      title: 'Belt Level',
      type: 'string',
      options: {
        list: [
          {title: 'Hvitt Belte', value: 'Hvitt Belte'},
          {title: 'Blått Belte', value: 'Blått Belte'},
          {title: 'Lilla Belte', value: 'Lilla Belte'},
          {title: 'Brunt Belte', value: 'Brunt Belte'},
          {title: 'Svart Belte', value: 'Svart Belte'},
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      // Make profile image optional for now
      // validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
          ],
          lists: [],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'profileImage',
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
  ],
})
