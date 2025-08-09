import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'trainingProgram',
  title: 'Training Program',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Program Name',
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
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
          ],
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
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'All Levels', value: 'all'},
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          {title: 'Kids (6-12)', value: 'kids'},
          {title: 'Teens (13-17)', value: 'teens'},
          {title: 'Adults (18+)', value: 'adults'},
          {title: 'All Ages', value: 'all'},
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  {title: 'Monday', value: 'monday'},
                  {title: 'Tuesday', value: 'tuesday'},
                  {title: 'Wednesday', value: 'wednesday'},
                  {title: 'Thursday', value: 'thursday'},
                  {title: 'Friday', value: 'friday'},
                  {title: 'Saturday', value: 'saturday'},
                  {title: 'Sunday', value: 'sunday'},
                ],
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'startTime',
              title: 'Start Time',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'endTime',
              title: 'End Time',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'instructor',
              title: 'Instructor',
              type: 'reference',
              to: {type: 'instructor'},
            },
          ],
          preview: {
            select: {
              day: 'day',
              startTime: 'startTime',
              endTime: 'endTime',
              instructor: 'instructor.name',
            },
            prepare(selection) {
              const {day, startTime, endTime, instructor} = selection
              return {
                title: `${day}: ${startTime} - ${endTime}`,
                subtitle: instructor ? `with ${instructor}` : 'No instructor assigned',
              }
            },
          },
        }
      ]
    }),
    defineField({
      name: 'price',
      title: 'Price Information',
      type: 'object',
      fields: [
        {
          name: 'monthly',
          title: 'Monthly Price (NOK)',
          type: 'number',
        },
        {
          name: 'dropIn',
          title: 'Drop-in Price (NOK)',
          type: 'number',
        },
        {
          name: 'trial',
          title: 'Trial Price (NOK)',
          type: 'number',
        },
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
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
      level: 'level',
      ageGroup: 'ageGroup',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {level, ageGroup, isActive} = selection
      return Object.assign({}, selection, {
        subtitle: `${level} • ${ageGroup} ${isActive ? '✅' : '❌'}`,
      })
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
