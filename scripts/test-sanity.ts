// Simple script to test Sanity connection and create initial data
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN // You'll need to set this
})

async function testConnection() {
  console.log('Testing Sanity connection...')
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
  
  try {
    // Test read access
    const result = await client.fetch('*[_type == "instructor"][0]')
    console.log('✅ Connection successful!')
    console.log('Found instructor:', result?.name || 'No instructors yet')
    
    // If no API token, just exit here
    if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN === 'your_api_token_here') {
      console.log('\n⚠️  No API token set. To create content, you need to:')
      console.log('1. Go to https://sanity.io/manage/personal/project/53ylspsq')
      console.log('2. Go to API → Tokens → Add API token')
      console.log('3. Create a token with "Editor" permissions')
      console.log('4. Add it to your .env.local file as SANITY_API_TOKEN')
      return
    }
    
    // Test write access by creating a simple instructor
    const instructor = {
      _type: 'instructor',
      name: 'Andreas',
      slug: {
        _type: 'slug',
        current: 'andreas'
      },
      title: 'Hovedtrener',
      beltLevel: 'Brun Belte',
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Andreas har trent submission wrestling og BJJ i mange år og har omfattende erfaring fra konkurranser på nasjonalt nivå.'
            }
          ]
        }
      ],
      order: 1
    }
    
    const created = await client.create(instructor)
    console.log('✅ Created instructor:', created.name)
    
  } catch (error) {
    console.error('❌ Connection failed:', error)
  }
}

testConnection()
