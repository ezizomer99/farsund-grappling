import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'facility',
  title: 'Facilities',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Våre Fasiliteter'
    }),
    defineField({
      name: 'trainingArea',
      title: 'Training Area',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Training Area Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Treningsarealet er inne hos Løft Gym.'
        }),
        defineField({
          name: 'subtitle',
          title: 'Training Area Subtitle',
          type: 'string',
          initialValue: 'Dette er vårt område'
        }),
        defineField({
          name: 'image',
          title: 'Training Area Image',
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
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'opportunities',
      title: 'Opportunities Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Opportunities Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Muligheter'
        }),
        defineField({
          name: 'description',
          title: 'Opportunities Description',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Location Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Beliggenhet'
        }),
        defineField({
          name: 'mapEmbedUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'directionsUrl',
          title: 'Google Maps Directions URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'findUsTitle',
          title: 'Find Us Title',
          type: 'string',
          initialValue: 'Finn Oss'
        }),
        defineField({
          name: 'description',
          title: 'Location Description',
          type: 'string',
          initialValue: 'Vi holder til i Vanse. Her finner du oss:'
        }),
        defineField({
          name: 'directionsText',
          title: 'Directions Link Text',
          type: 'string',
          initialValue: 'Få veibeskrivelser i Google Maps'
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
