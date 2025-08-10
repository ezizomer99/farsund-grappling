import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Homepage Content'
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Velkommen til Farsund Grappling'
        }),
        defineField({
          name: 'scheduleButtonText',
          title: 'Schedule Button Text',
          type: 'string',
          initialValue: 'Se Timeplanen'
        }),
        defineField({
          name: 'memberButtonText',
          title: 'Member Button Text',
          type: 'string',
          initialValue: 'Bli Medlem'
        }),
      ],
    }),
    defineField({
      name: 'whyTrainWithUs',
      title: 'Why Train With Us Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Hvorfor Trene Med Oss?'
        }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon (Emoji)',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Feature Description',
                  type: 'text',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  icon: 'icon',
                },
                prepare(selection) {
                  const { title, icon } = selection
                  return {
                    title: `${icon} ${title}`,
                  }
                },
              },
            }
          ],
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: 'whatIsGrappling',
      title: 'What is Grappling Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: '🤼‍♂️ Hva er Grappling?'
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'Call-to-Action Button Text',
          type: 'string',
          initialValue: 'Start i Dag'
        }),
      ],
    }),
    defineField({
      name: 'newsSection',
      title: 'News Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Siste Nytt'
        }),
        defineField({
          name: 'viewAllText',
          title: 'View All Link Text',
          type: 'string',
          initialValue: 'Se Alle'
        }),
        defineField({
          name: 'readMoreText',
          title: 'Read More Link Text',
          type: 'string',
          initialValue: 'Les Mer'
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
