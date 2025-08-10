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
  location?: {
    title?: string
    mapEmbedUrl?: string
    directionsUrl?: string
    findUsTitle?: string
    description?: string
    directionsText?: string
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
  isActive: boolean
  order: number
}

export interface Homepage {
  _id: string
  title: string
  heroSection: {
    title: string
    scheduleButtonText: string
    memberButtonText: string
  }
  whyTrainWithUs: {
    title: string
    features: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  whatIsGrappling: {
    title: string
    content: any[]
    ctaButtonText: string
  }
  newsSection: {
    title: string
    viewAllText: string
    readMoreText: string
  }
}

export interface Facility {
  _id: string
  title: string
  trainingArea: {
    title: string
    subtitle: string
    image: {
      asset: any
      alt: string
    }
  }
  opportunities: {
    title: string
    description: any[]
  }
}

export interface Background {
  _id: string
  title: string
  backgroundImage: {
    asset: any
    alt: string
  }
  overlayOpacity: number
  overlayColor: string
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
  contactInfo {
    email,
    phone,
    address,
    socialMedia {
      facebook,
      instagram
    }
  },
  location {
    title,
    mapEmbedUrl,
    directionsUrl,
    findUsTitle,
    description,
    directionsText
  }
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
  isActive,
  order
}`

const facilityQuery = groq`*[_type == "facility"][0] {
  _id,
  title,
  trainingArea{
    title,
    subtitle,
    image{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  opportunities{
    title,
    description
  }
}`

const homepageQuery = groq`*[_type == "homepage"][0] {
  _id,
  title,
  heroSection{
    title,
    scheduleButtonText,
    memberButtonText
  },
  whyTrainWithUs{
    title,
    features[]{
      icon,
      title,
      description
    }
  },
  whatIsGrappling{
    title,
    content,
    ctaButtonText
  },
  newsSection{
    title,
    viewAllText,
    readMoreText
  }
}`

const backgroundQuery = groq`*[_type == "background"][0] {
  _id,
  title,
  backgroundImage{
    asset->{
      _id,
      url
    },
    alt
  },
  overlayOpacity,
  overlayColor
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

export async function getFacility(): Promise<Facility | null> {
  return client.fetch(facilityQuery)
}

export async function getHomepage(): Promise<Homepage | null> {
  return client.fetch(homepageQuery)
}

export async function getBackground(): Promise<Background | null> {
  return client.fetch(backgroundQuery)
}
