# Grappling Club Website

A modern, dynamic website for a grappling club built with Next.js and powered by Sanity CMS. This website provides information about the club, training programs, membership options, news, and instructor profiles.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-4.3.0-F03E2F?style=flat&logo=sanity&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat&logo=cloudflare&logoColor=white)

## 🎯 Features

### 🌐 Website Features
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Modern Animations**: Smooth page transitions and scroll effects using Framer Motion
- **Dynamic Content**: All content managed through Sanity CMS
- **Image Optimization**: Next.js Image component with Sanity CDN integration
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Built with Next.js 15 and Turbopack for optimal speed

### 📱 Pages & Sections
- **Home** (`/`) - Welcome page with club overview
- **Training** (`/training`) - Dynamic training schedule calendar and program descriptions
- **About** (`/about`) - Club information, instructors, and facilities
- **News** (`/news`) - Latest club news and updates
- **Become Member** (`/become-member`) - Membership information and sign-up details

### ⚙️ Content Management (Sanity CMS)
- **News Articles**: Rich text editor for club news and announcements
- **Instructors**: Instructor profiles with photos, bios, and contact information
- **Training Programs**: Schedule management with day/time slots and instructor assignments
- **Club Information**: General club details, mission, and contact information

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.23.12
- **Image Handling**: Next.js Image with Sanity Image URL

### Content Management
- **CMS**: Sanity 4.3.0
- **Rich Text**: Portable Text with @portabletext/react
- **Image Management**: Sanity Asset Pipeline
- **Real-time Preview**: Sanity Vision Tool

### Deployment & Hosting
- **Platform**: Cloudflare Pages
- **Build Tool**: @cloudflare/next-on-pages
- **CDN**: Sanity CDN for images
- **Environment**: Edge runtime compatible

### Development Tools
- **Package Manager**: npm
- **Build System**: Turbopack (Next.js)
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Sanity account and project access

### 1. Clone and Install
```bash
git clone <repository-url>
cd grappling-club-website
npm install
```

### 2. Environment Setup
Create `.env.local` file in the root directory:
```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token_here

# Optional: Sanity Studio URL
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-url.sanity.studio
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### 4. Sanity Studio Access
Access the CMS at: https://your-studio-url.sanity.studio (hosted studio)

## 📁 Project Structure

```
src/
├── app/                         # Next.js App Router pages
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout with navigation
│   ├── globals.css              # Global styles
│   ├── about/page.tsx           # About page (Sanity integrated)
│   ├── become-member/page.tsx   # Membership page
│   ├── news/page.tsx            # News page (Sanity integrated)
│   ├── training/page.tsx        # Training page (Sanity integrated)
│   └── studio/                  # Sanity Studio route (optional)
├── components/                  # Reusable React components
│   ├── Navigation.tsx           # Main navigation component
│   ├── Footer.tsx               # Footer component
│   ├── RichText.tsx             # Portable Text renderer
│   ├── ScrollEffectsWrapper.tsx # Scroll animation wrapper
│   └── animations/              # Animation components
│       ├── FadeIn.tsx           # Fade in animation
│       ├── PageTransition.tsx   # Page transition effects
│       ├── ScrollReveal.tsx     # Scroll-triggered animations
│       └── Stagger.tsx          # Staggered animations
├── lib/                         # Utility libraries
│   ├── sanity.client.ts         # Sanity client configuration
│   ├── sanity.queries.ts        # Data fetching functions
│   └── env.ts                   # Environment variable validation
└── data/                        # Static data (legacy, mostly replaced by Sanity)
    ├── clubInfo.ts              # Club information
    ├── facilities.ts            # Facilities data
    ├── instructors.ts           # Static instructor data
    ├── news.ts                  # Static news data
    └── training.ts              # Static training data

sanity/                          # Sanity CMS configuration
├── schemas/                     # Content type definitions
│   ├── newsArticle.ts           # News article schema
│   ├── instructor.ts            # Instructor schema
│   ├── clubInfo.ts              # Club info schema
│   ├── trainingProgram.ts       # Training program schema
│   └── index.ts                 # Schema exports
└── structure.ts                 # Sanity Studio structure

public/                          # Static assets
├── images/                      # Club photos and images
├── instructors/                 # Instructor photos
└── favicon.ico                  # Site favicon

scripts/                         # Utility scripts
├── migrate-to-sanity.ts         # Data migration script
└── test-sanity.ts               # Sanity connection test
```

## 🎨 Styling & Design

### Tailwind CSS Configuration
- **Version**: Tailwind CSS 4.0
- **Custom Theme**: Configured for grappling club branding
- **Responsive Design**: Mobile-first approach
- **Dark/Light Modes**: Custom color schemes

### Animation System
- **Page Transitions**: Smooth navigation between pages
- **Scroll Effects**: Elements animate in on scroll
- **Staggered Animations**: Sequential animations for lists
- **Performance Optimized**: Uses Framer Motion with proper optimization

## 📊 Content Management

### Sanity CMS Setup
**Project ID**: `[See environment variables]`  
**Dataset**: `production`  
**Studio URL**: https://your-studio-url.sanity.studio

> **Note**: The actual Sanity project ID is configured via environment variables for security.

### Content Types

#### 1. News Articles (`newsArticle`)
```typescript
{
  title: string              // Article headline
  slug: slug                 // URL-friendly identifier
  author: reference          // Reference to instructor
  publishedAt: datetime      // Publication date
  featuredImage?: image      // Optional header image
  summary: text              // Short description
  content: array             // Rich text content (Portable Text)
  status: 'draft' | 'published'
}
```

#### 2. Instructors (`instructor`)
```typescript
{
  name: string               // Full name
  slug: slug                 // URL identifier
  title: string              // Position/role
  beltLevel: string          // Belt rank
  profileImage: image        // Profile photo
  bio: array                 // Rich text biography
  email?: string             // Contact email
  phone?: string             // Phone number
  order: number              // Display order
}
```

#### 3. Training Programs (`trainingProgram`)
```typescript
{
  name: string               // Program name
  slug: slug                 // URL identifier
  description: array         // Rich text description
  level: string              // Skill level required
  ageGroup: string           // Target age group
  schedule: array            // Class schedule
  price?: object             // Pricing information
  isActive: boolean          // Active status
  order: number              // Display order
}
```

#### 4. Club Information (`clubInfo`)
```typescript
{
  title: string              // Club name
  story: array               // Club history/story
  mission?: string           // Mission statement
  values?: array             // Core values
  contactInfo?: object       // Contact details
}
```

### Content Management Workflow

1. **Access Sanity Studio**: Go to your studio URL
2. **Create/Edit Content**: Use the intuitive editor interface
3. **Publish Changes**: Content updates appear on website immediately
4. **Manage Users**: Invite instructors with appropriate permissions

## 🚀 Deployment

### Cloudflare Pages Deployment

#### Prerequisites
- Cloudflare account
- Wrangler CLI installed: `npm install -g wrangler`

#### Build Commands
```bash
# Build for production
npm run pages:build

# Preview locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

#### Environment Variables (Cloudflare)
Set these in your Cloudflare Pages dashboard:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
```

#### Build Settings
- **Build Command**: `npm run pages:build`
- **Build Output Directory**: `.vercel/output/static`
- **Node.js Version**: 18+

### Alternative Deployment Options

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Deploy dist folder
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Cloudflare Pages
npm run pages:build     # Build for Cloudflare Pages
npm run preview         # Preview Cloudflare build locally
npm run deploy          # Deploy to Cloudflare Pages

# Sanity CMS
npm run sanity:init     # Initialize Sanity project
npm run sanity:deploy   # Deploy Sanity Studio
```

### Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit components, pages, or styles
3. **Test Locally**: Verify changes at http://localhost:3000
4. **Update Content**: Use Sanity Studio for content changes
5. **Deploy**: Push to repository for automatic deployment

### Adding New Features

#### New Page
1. Create `src/app/new-page/page.tsx`
2. Add navigation link in `src/components/Navigation.tsx`
3. Style with Tailwind CSS
4. Add animations using components from `src/components/animations/`

#### New Content Type
1. Create schema in `sanity/schemas/newType.ts`
2. Export in `sanity/schemas/index.ts`
3. Add query in `src/lib/sanity.queries.ts`
4. Update TypeScript interfaces
5. Create page/component to display content

## 🔒 Security & Performance

### Security Features
- **Environment Variables**: Sensitive data stored securely
- **API Tokens**: Limited scope Sanity tokens
- **CORS**: Properly configured for Sanity integration
- **Input Validation**: Sanity schema validation

### Performance Optimizations
- **Next.js Image**: Automatic image optimization
- **Turbopack**: Fast development builds
- **Edge Runtime**: Cloudflare Edge deployment
- **Code Splitting**: Automatic with Next.js App Router
- **Static Generation**: Pages pre-rendered when possible

## 🐛 Troubleshooting

### Common Issues

#### Build Artifacts in Git
```bash
# Clean build artifacts
git rm -r --cached dist/
echo "dist/" >> .gitignore
```

#### Sanity Connection Issues
```bash
# Test Sanity connection
node -e "
const {createClient} = require('@sanity/client');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN
});
client.fetch('*[_type == \"newsArticle\"][0]').then(console.log);
"
```

#### Image Display Issues
- Verify `next.config.ts` includes Sanity CDN hostname
- Check image asset references in Sanity
- Ensure proper image alt text

### Getting Help

1. **Documentation**: Check Next.js and Sanity documentation
2. **Issues**: Create GitHub issues for bugs
3. **Community**: Next.js and Sanity Discord communities
4. **Support**: Contact repository maintainers


---

Built with ❤️ for the grappling community
