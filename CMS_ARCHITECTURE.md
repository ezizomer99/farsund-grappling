****# Farsund Grappling CMS Architecture

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 16.x | React framework with App Router |
| **CMS** | Payload CMS 3.x | Content management |
| **Database** | MongoDB | Document storage |
| **UI** | Material-UI 7.x | Component library & styling |
| **Animations** | Framer Motion | Page transitions |
| **Deployment** | Cloudflare Pages | Edge hosting |

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FARSUND GRAPPLING WEBSITE                    │
│                  (Next.js 16 + Payload CMS 3.x)                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────┐      ┌──────────────────────────────────┐
│   MongoDB Database  │◄─────┤   Payload CMS (Backend)          │
│   (Cloud or Local)  │      │   - Content Management           │
│                     │      │   - Media Storage                │
│   Collections:      │      │   - User Authentication          │
│   • Users           │      │   - API Routes                   │
│   • Media           │      │                                  │
│   • Homepage        │      │   Admin Panel: /admin            │
│   • Club Info       │      └──────────────▲───────────────────┘
│   • Instructors     │                     │
│   • Training Prog   │                     │
│   • News            │                     │ Fetch Data
│   • Membership Info │                     │
│   • Facility        │      ┌──────────────┴───────────────────┐
│   • Background      │      │   Next.js Pages (Frontend)       │
└─────────────────────┘      │   - Homepage (/)                 │
                             │   - Training (/training)          │
                             │   - About (/about)                │
                             │   - News (/news)                  │
                             │   - Become Member (/become-member)│
                             └───────────────────────────────────┘
```

## File Structure

```
farsund-grappling/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (frontend)/               # Public Pages (route group)
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── layout.tsx            # Frontend layout
│   │   │   ├── training/page.tsx     # Training page
│   │   │   ├── about/page.tsx        # About page
│   │   │   ├── news/page.tsx         # News page
│   │   │   └── become-member/page.tsx # Membership page
│   │   │
│   │   ├── (payload)/                # CMS Routes (Protected)
│   │   │   ├── admin/                # Admin Panel UI
│   │   │   │   └── [[...segments]]/  # Dynamic admin routes
│   │   │   └── api/                  # Payload API routes
│   │   │       ├── [...slug]/        # REST API endpoints
│   │   │       └── graphql/          # GraphQL API
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   │
│   ├── collections/                  # CMS Collection Definitions
│   │   ├── Users.ts                  # User accounts & roles
│   │   ├── Media.ts                  # Image uploads
│   │   ├── Homepage.ts               # Homepage content
│   │   ├── ClubInfo.ts               # Club information
│   │   ├── Instructors.ts            # Instructor profiles
│   │   ├── TrainingPrograms.ts       # Class schedules
│   │   ├── TrainingPage.ts           # Training page settings
│   │   ├── News.ts                   # News articles
│   │   ├── Facility.ts               # Facility information
│   │   └── Background.ts             # Visual settings
│   │
│   ├── components/                   # Reusable React components
│   │   ├── Navigation.tsx            # Main navigation (MUI)
│   │   ├── Footer.tsx                # Site footer
│   │   ├── RichText.tsx              # Lexical rich text renderer
│   │   └── animations/               # Framer Motion components
│   │
│   ├── lib/
│   │   ├── data.ts                   # Static data (backup/types)
│   │   └── payload-data.ts           # CMS data fetching functions
│   │
│   ├── scripts/
│   │   └── seed.ts                   # Database seeding script
│   │
│   ├── payload.config.ts             # Payload CMS configuration
│   ├── payload-types.ts              # Generated TypeScript types
│   └── theme.ts                      # Material-UI theme config
│
├── public/
│   └── media/                        # Uploaded images stored here
│
├── .env.local                        # Environment variables (SECRET!)
├── CLAUDE.md                         # Claude Code AI instructions
├── CMS_QUICKSTART.md                 # Quick setup guide
├── CMS_SETUP_GUIDE.md                # Complete documentation
├── CMS_STATUS.md                     # Implementation status
├── CMS_ARCHITECTURE.md               # This file
└── DEPLOYMENT_CHECKLIST.md           # Production deployment guide
```

## Data Flow

### Content Creation (Instructors → Database)

```
Instructor logs in at /admin
         ↓
   Edits content in CMS UI
         ↓
   Clicks "Save" or "Publish"
         ↓
   Payload validates data
         ↓
   Saves to MongoDB
         ↓
   Content is live!
```

### Content Display (Database → Website Visitors)

```
User visits website page
         ↓
   Next.js page component loads
         ↓
   Calls payload-data.ts function
         ↓
   Fetches data from MongoDB
         ↓
   Renders page with CMS content
         ↓
   User sees updated content
```

## User Roles & Permissions

```
┌────────────────────────────────────────────────────────────┐
│  ADMIN ROLE                                                │
│  • Full access to all collections                          │
│  • Can create/edit/delete any content                      │
│  • Can manage users and permissions                        │
│  • Can upload and manage media                             │
│  • Can access system settings                              │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  INSTRUCTOR ROLE                                           │
│  • Can edit most content collections                       │
│  • Can create/publish news articles                        │
│  • Can manage training programs                            │
│  • Can edit their own instructor profile                   │
│  • Can upload images                                       │
│  • Limited access to system settings                       │
└────────────────────────────────────────────────────────────┘
```

## Content Management Workflow

### Example: Publishing a News Article

1. **Create**
   - Instructor logs into `/admin`
   - Goes to "News" collection
   - Clicks "Create New"
   - Fills in title, slug, content
   - Uploads featured image
   - Sets status to "Draft"
   - Saves

2. **Review**
   - Content is saved but not public
   - Can preview and edit
   - Can share draft with others

3. **Publish**
   - Changes status to "Published"
   - Sets publish date/time
   - Clicks "Save"
   - Article appears on website immediately

4. **Update**
   - Can edit anytime
   - Changes are instant
   - Can unpublish if needed

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Public Routes (No Authentication Required)                 │
│  • Homepage (/)                                             │
│  • Training (/training)                                     │
│  • About (/about)                                           │
│  • News (/news)                                             │
│  • Become Member (/become-member)                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Protected Routes (Authentication Required)                 │
│  • Admin Panel (/admin)                                     │
│  • API Routes (/api/payload/*)                              │
│                                                             │
│  Security Measures:                                         │
│  • JWT-based authentication                                 │
│  • bcrypt password hashing                                  │
│  • CSRF protection                                          │
│  • Role-based access control                                │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

### Development
```
Local Machine
├── Next.js Dev Server (localhost:3000)
├── MongoDB (localhost:27017)
└── Payload CMS Admin (/admin)
```

### Production (Recommended)
```
Cloudflare Pages
├── Static Next.js Site
├── Edge Functions for dynamic routes
└── Connection to MongoDB Atlas (Cloud)
```

## Key Features by Collection

### 📄 Homepage
- Hero section (title, buttons)
- 3 feature cards with emojis
- What is Grappling section
- News section configuration

### 🏢 Club Info
- Club story (rich text)
- Mission statement
- Contact information
- Social media links
- Google Maps integration

### 👨‍🏫 Instructors
- Profile photos
- Name, title, belt level
- Bio with achievements
- Contact information
- Display order

### 📅 Training Programs
- Class name and description
- Skill level and age group
- Weekly schedule
- Assigned instructors
- Active/inactive toggle

### 📰 News
- Article title and slug
- Featured images
- Summary and full content
- Author attribution
- Publish date/time
- Draft/published status

### 💳 Membership Info
- Main content
- Multiple membership types
- Pricing and features
- How to join instructions
- Contact information

### 🏋️ Facility
- Training area info
- Facility images
- Opportunities description

### 🎨 Background
- Background image upload
- Overlay color and opacity

## Technology Stack

```
Frontend:
├── Next.js 16 (App Router)
├── React 18
├── Material-UI 7
├── TypeScript 5
└── Framer Motion 12

Backend:
├── Payload CMS 3.x
├── MongoDB (Database)
├── Lexical (Rich Text Editor)
└── Sharp (Image Processing)

Deployment:
├── Cloudflare Pages
└── MongoDB Atlas
```

## Maintenance & Updates

### Regular Tasks (Instructors)
- Publish news articles
- Update training schedules
- Add new programs
- Upload photos
- Update contact info

### Periodic Tasks (Admin)
- Backup database
- Update user accounts
- Review and moderate content
- Monitor storage usage
- Update CMS when needed

### Technical Updates (Developer)
- Update npm dependencies
- Review security updates
- Optimize performance
- Add new features as needed
