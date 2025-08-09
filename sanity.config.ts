import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'farsund-grappling',
  title: 'Farsund Grappling CMS',

  projectId: '53ylspsq',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('News Articles')
              .child(S.documentTypeList('newsArticle').title('News Articles')),
            S.listItem()
              .title('Instructors')
              .child(S.documentTypeList('instructor').title('Instructors')),
            S.listItem()
              .title('Club Information')
              .child(S.documentTypeList('clubInfo').title('Club Information')),
            S.listItem()
              .title('Training Programs')
              .child(S.documentTypeList('trainingProgram').title('Training Programs')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
