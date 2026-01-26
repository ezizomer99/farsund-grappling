# Farsund Grappling Website

A modern, dynamic website for Farsund Grappling Club built with Next.js and powered by **Payload CMS**. This website provides information about the club, training programs, membership options, news, and instructor profiles.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)
![Payload CMS](https://img.shields.io/badge/Payload-3.73.0-000000?style=flat&logo=payload&logoColor=white)
![Material-UI](https://img.shields.io/badge/MUI-7.3.7-007FFF?style=flat&logo=mui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat&logo=cloudflare&logoColor=white)

## 🎯 Features

### 🌐 Website Features
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Modern Animations**: Smooth page transitions and scroll effects using Framer Motion
- **Dynamic Content**: All content managed through Payload CMS
- **Image Optimization**: Next.js Image component with automatic resizing
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Built with Next.js 15 and Turbopack for optimal speed
- **Material-UI Components**: Professional UI with Material Design

### 📱 Pages & Sections
- **Home** (`/`) - Welcome page with club overview, features, and latest news
- **Training** (`/training`) - Dynamic training schedule calendar and program descriptions
- **About** (`/about`) - Club information, instructor profiles, and facilities
- **News** (`/news`) - Latest club news and updates with rich text content
- **Become Member** (`/become-member`) - Membership information and pricing

### ⚙️ Content Management System (NEW!)
🎉 **Payload CMS** - Self-hosted, modern CMS that instructors can use to manage all content:

- ✅ **No code required** - User-friendly admin panel
- ✅ **Real-time updates** - Changes appear instantly
- ✅ **Image uploads** - Drag and drop with automatic resizing
- ✅ **Rich text editor** - Format text with ease
- ✅ **Role-based access** - Admin and instructor roles
- ✅ **Draft/publish workflow** - Save drafts before publishing

**What Instructors Can Edit:**
- Homepage content (hero, features, "What is Grappling")
- Training programs and schedules
- Instructor profiles with photos and bios
- News articles with featured images
- Membership information and pricing
- Club information and contact details
- Google Maps location
- Site-wide visual settings

📚 **[See CMS Setup Guide →](./CMS_QUICKSTART.md)**

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0 + Material-UI 7.3.7
- **Animations**: Framer Motion 12.23.12
- **Image Handling**: Next.js Image with Sharp

### Content Management (NEW!)
- **CMS**: Payload CMS 3.73.0
- **Database**: MongoDB
- **Rich Text**: Lexical Editor
- **Authentication**: JWT with bcrypt
- **Media**: File uploads with automatic thumbnails

### Deployment & Hosting
- **Platform**: Cloudflare Pages
- **Build Tool**: @cloudflare/next-on-pages
- **Database**: MongoDB Atlas (recommended)
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
- MongoDB (local or Atlas)

### Quick Start

1. **Clone and Install**
```bash
git clone <repository-url>
cd farsund-grappling
npm install
```

2. **Set Up MongoDB**

Choose one option:
- **MongoDB Atlas** (recommended): Get free database at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **Local MongoDB**: Install from [mongodb.com](https://www.mongodb.com/try/download/community)

3. **Configure Environment**

Update `.env.local`:
```env
PAYLOAD_SECRET=your-super-secret-key-min-32-chars
MONGODB_URI=mongodb://localhost:27017/farsund-grappling
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

4. **Seed Database**
```bash
npm run seed
```

5. **Start Development Server**
```bash
npm run dev
```

### Access Points

- **Website**: http://localhost:3000
- **CMS Admin**: http://localhost:3000/admin
  - Email: `admin@farsundgrappling.no`
  - Password: `ChangeThisPassword123!`
  - ⚠️ Change password immediately!

## 📚 Documentation

### 🚀 Getting Started
- **[Quick Start Guide](./CMS_QUICKSTART.md)** - Get up and running in 5 minutes
- **[Implementation Summary](./CMS_IMPLEMENTATION_SUMMARY.md)** - Overview of what was built

### 📖 CMS Documentation
- **[Complete Setup Guide](./CMS_SETUP_GUIDE.md)** - Detailed instructions for instructors
- **[Architecture Overview](./CMS_ARCHITECTURE.md)** - Technical details and system design
- **[Implementation Status](./CMS_STATUS.md)** - Migration guide and current status

### 🚢 Deployment
- **[Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)** - Production deployment guide

### Key Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Populate database with initial content
npm run payload      # Run Payload CLI commands
npm run deploy       # Deploy to Cloudflare Pages
```

## 📁 Project Structure

```
farsund-grappling/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (payload)/               # CMS Admin Panel Routes
│   │   │   ├── [...segments]/       # Dynamic admin routes
│   │   │   └── api/[...slug]/       # Payload API endpoints
│   │   ├── page.tsx                 # Home page
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css              # Global styles
│   │   ├── about/page.tsx           # About page
│   │   ├── become-member/page.tsx   # Membership page
│   │   ├── news/page.tsx            # News page
│   │   └── training/page.tsx        # Training page
│   │
│   ├── collections/                 # Payload CMS Collections
│   │   ├── Users.ts                 # User accounts & roles
│   │   ├── Media.ts                 # Image uploads
│   │   ├── Homepage.ts              # Homepage content
│   │   ├── ClubInfo.ts              # Club information
│   │   ├── Instructors.ts           # Instructor profiles
│   │   ├── TrainingPrograms.ts      # Training classes
│   │   ├── News.ts                  # News articles
│   │   ├── MembershipInfo.ts        # Membership details
│   │   ├── Facility.ts              # Facility information
│   │   └── Background.ts            # Visual settings
│   │
│   ├── components/                  # Reusable React components
│   │   ├── Navigation.tsx           # Main navigation
│   │   ├── Footer.tsx               # Footer component
│   │   ├── RichText.tsx             # Rich text renderer
│   │   ├── ScrollEffectsWrapper.tsx # Scroll animations
│   │   └── animations/              # Animation components
│   │       ├── FadeIn.tsx
│   │       ├── PageTransition.tsx
│   │       ├── ScrollReveal.tsx
│   │       └── Stagger.tsx
│   │
│   ├── lib/
│   │   ├── data.ts                  # Static data (backup/types)
│   │   └── payload-data.ts          # CMS data fetching
│   │
│   ├── scripts/
│   │   └── seed.ts                  # Database seeding
│   │
│   ├── payload.config.ts            # Payload CMS config
│   └── theme.ts                     # Material-UI theme
│
├── public/
│   ├── media/                       # Uploaded images (CMS)
│   └── logo.png                     # Site logo
│
├── .env.local                       # Environment variables (not in git)
├── CMS_QUICKSTART.md                # Quick setup guide
├── CMS_SETUP_GUIDE.md               # Complete CMS documentation
├── CMS_STATUS.md                    # Implementation status
├── CMS_ARCHITECTURE.md              # Technical architecture
├── CMS_IMPLEMENTATION_SUMMARY.md    # What was built
├── DEPLOYMENT_CHECKLIST.md          # Production deployment
├── package.json
├── tsconfig.json
├── next.config.ts
└── wrangler.jsonc                   # Cloudflare Pages config
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
