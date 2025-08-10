import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'farsundgrappling',
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
              .title('Homepage')
              .child(S.documentTypeList('homepage').title('Homepage')),
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
            S.listItem()
              .title('Facilities')
              .child(S.documentTypeList('facility').title('Facilities')),
            S.listItem()
              .title('Website Background')
              .child(S.documentTypeList('background').title('Website Background')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
