/**
 * Migration script to transfer existing data to Sanity
 * Run this script after setting up your Sanity project
 */

// Load environment variables
import { config } from 'dotenv'
config({ path: '.env.local' })

import { clientWrite } from '../src/lib/sanity.client'
import { newsItems } from '../src/data/news'
import { instructors } from '../src/data/instructors'

async function migrateData() {
  console.log('Starting data migration to Sanity...')

  try {
    // Migrate instructors first (since news articles reference them)
    console.log('Migrating instructors...')
    const migratedInstructors = []
    
    for (const instructor of instructors) {
      const sanityInstructor = {
        _type: 'instructor',
        name: instructor.name,
        slug: {
          _type: 'slug',
          current: instructor.name.toLowerCase().replace(/\s+/g, '-')
        },
        title: instructor.title,
        beltLevel: instructor.beltLevel,
        bio: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: instructor.bio
              }
            ]
          }
        ],
        order: instructor.id
      }

      const result = await clientWrite.create(sanityInstructor)
      migratedInstructors.push(result)
      console.log(`✅ Migrated instructor: ${instructor.name}`)
    }

    // Migrate news articles
    console.log('Migrating news articles...')
    
    for (const newsItem of newsItems) {
      const sanityNewsArticle = {
        _type: 'newsArticle',
        title: newsItem.title,
        slug: {
          _type: 'slug',
          current: newsItem.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        },
        author: {
          _type: 'reference',
          _ref: migratedInstructors[0]._id // Reference the first instructor
        },
        publishedAt: newsItem.date === 'TBD' ? new Date().toISOString() : new Date().toISOString(),
        summary: newsItem.summary,
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: newsItem.content
              }
            ]
          }
        ],
        status: 'published'
      }

      const result = await clientWrite.create(sanityNewsArticle)
      console.log(`✅ Migrated news article: ${newsItem.title}`)
    }

    // Create initial club info
    console.log('Creating initial club info...')
    const clubInfoDoc = {
      _type: 'clubInfo',
      title: 'Farsund Grappling Club',
      story: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Velkommen til Farsund Grappling, hvor vi tilbyr høykvalitets trening i submission wrestling og Brazilian Jiu-Jitsu. Vår klubb er dedikert til å skape et trygt og inkluderende miljø for alle som ønsker å lære og utvikle seg innen kampsport.'
            }
          ]
        }
      ],
      mission: 'Å tilby høykvalitets kampsport-trening i et trygt og inkluderende miljø.',
      contactInfo: {
        email: 'kontakt@farsundgrappling.no',
        address: 'Løft Gym, Farsund'
      }
    }

    await clientWrite.create(clubInfoDoc)
    console.log('✅ Created initial club info')

    console.log('🎉 Data migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

// Run the migration
migrateData()
