import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'trainingProgram',
  title: 'Treningsprogram',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Programnavn',
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
      title: 'Beskrivelse',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
          ],
          lists: [
            {title: 'Punktliste', value: 'bullet'},
          ],
          marks: {
            decorators: [
              {title: 'Fet', value: 'strong'},
              {title: 'Kursiv', value: 'em'},
            ],
          },
        },
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'level',
      title: 'Nivå',
      type: 'string',
      options: {
        list: [
          {title: 'Nybegynner', value: 'beginner'},
          {title: 'Erfaren', value: 'intermediate'},
          {title: 'Avansert', value: 'advanced'},
          {title: 'Alle nivåer', value: 'all'},
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'ageGroup',
      title: 'Aldersgruppe',
      type: 'string',
      options: {
        list: [
          {title: 'Barn (6-12)', value: 'kids'},
          {title: 'Ungdom (13-17)', value: 'teens'},
          {title: 'Voksne (18+)', value: 'adults'},
          {title: 'Alle aldre', value: 'all'},
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'schedule',
      title: 'Timeplan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Dag',
              type: 'string',
              options: {
                list: [
                  {title: 'Mandag', value: 'monday'},
                  {title: 'Tirsdag', value: 'tuesday'},
                  {title: 'Onsdag', value: 'wednesday'},
                  {title: 'Torsdag', value: 'thursday'},
                  {title: 'Fredag', value: 'friday'},
                  {title: 'Lørdag', value: 'saturday'},
                  {title: 'Søndag', value: 'sunday'},
                ],
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'startTime',
              title: 'Starttid',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'endTime',
              title: 'Sluttid',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'instructor',
              title: 'Instruktør',
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
                subtitle: instructor ? `med ${instructor}` : 'Ingen instruktør tildelt',
              }
            },
          },
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Er aktiv',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Visningsrekkefølge',
      type: 'number',
      description: 'Lavere tall vises først',
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
      title: 'Visningsrekkefølge',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
  ],
})
