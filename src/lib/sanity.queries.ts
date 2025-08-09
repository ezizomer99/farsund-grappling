import { groq } from 'next-sanity'
import { client } from './sanity.client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Types for our data
export interface NewsArticle {
  _id: string
  title: string
  slug: { current: string }
  author: {
    name: string
    slug: { current: string }
  }
  publishedAt: string
  featuredImage?: {
    asset: any
    alt?: string
  }
  summary: string
  content: any[]
  status: 'draft' | 'published'
}

export interface Instructor {
  _id: string
  name: string
  slug: { current: string }
  title: string
  beltLevel: string
  profileImage: {
    asset: any
    alt: string
  }
  bio: any[]
  email?: string
  phone?: string
  order: number
}

export interface ClubInfo {
  _id: string
  title: string
  story: any[]
  mission?: string
  values?: Array<{
    value: string
    description?: string
  }>
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
    socialMedia?: {
      facebook?: string
      instagram?: string
    }
  }
}

export interface TrainingProgram {
  _id: string
  name: string
  slug: { current: string }
  description: any[]
  level: 'beginner' | 'intermediate' | 'advanced' | 'all'
  ageGroup: 'kids' | 'teens' | 'adults' | 'all'
  schedule: Array<{
    day: string
    startTime: string
    endTime: string
    instructor?: {
      name: string
      slug: { current: string }
    }
  }>
  price?: {
    monthly?: number
    dropIn?: number
    trial?: number
  }
  isActive: boolean
  order: number
}

// Queries
const newsQuery = groq`*[_type == "newsArticle"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{name, slug},
  publishedAt,
  featuredImage{asset, alt},
  summary,
  content,
  status
}`

const instructorsQuery = groq`*[_type == "instructor"] | order(order asc) {
  _id,
  name,
  slug,
  title,
  beltLevel,
  profileImage{asset, alt},
  bio,
  email,
  phone,
  order
}`

const clubInfoQuery = groq`*[_type == "clubInfo"][0] {
  _id,
  title,
  story,
  mission,
  values,
  contactInfo
}`

const trainingProgramsQuery = groq`*[_type == "trainingProgram" && isActive == true] | order(order asc) {
  _id,
  name,
  slug,
  description,
  level,
  ageGroup,
  schedule[]{
    day,
    startTime,
    endTime,
    instructor->{name, slug}
  },
  price,
  isActive,
  order
}`

// Fetch functions
export async function getNewsArticles(): Promise<NewsArticle[]> {
  return client.fetch(newsQuery)
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const query = groq`*[_type == "newsArticle" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    author->{name, slug},
    publishedAt,
    featuredImage{asset, alt},
    summary,
    content,
    status
  }`
  return client.fetch(query, { slug })
}

export async function getInstructors(): Promise<Instructor[]> {
  return client.fetch(instructorsQuery)
}

export async function getInstructor(slug: string): Promise<Instructor | null> {
  const query = groq`*[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    title,
    beltLevel,
    profileImage{asset, alt},
    bio,
    email,
    phone,
    order
  }`
  return client.fetch(query, { slug })
}

export async function getClubInfo(): Promise<ClubInfo | null> {
  return client.fetch(clubInfoQuery)
}

export async function getTrainingPrograms(): Promise<TrainingProgram[]> {
  return client.fetch(trainingProgramsQuery)
}
