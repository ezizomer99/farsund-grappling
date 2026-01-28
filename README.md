# Farsund Grappling Website

A modern, dynamic website for **Farsund Grappling Club** (Brazilian Jiu-Jitsu) built with Next.js 16 and powered by **Payload CMS**. This website provides information about the club, training programs, membership options, news, and instructor profiles.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)
![Payload CMS](https://img.shields.io/badge/Payload_CMS-3.73.0-000000?style=flat&logo=payload&logoColor=white)
![Material-UI](https://img.shields.io/badge/MUI-7.3.7-007FFF?style=flat&logo=mui&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat&logo=cloudflare&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)

## 🎯 Features

### 🌐 Website Features
- **Responsive Design**: Mobile-first design optimized for all screen sizes
- **Modern Animations**: Smooth page transitions and scroll effects using Framer Motion
- **Dynamic Content**: All content managed through Payload CMS admin panel
- **Image Optimization**: Next.js Image component with Sharp for automatic resizing
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Built with Next.js 16 and Turbopack for optimal speed
- **Material-UI Components**: Professional UI with Material Design system

### 📱 Pages & Sections
| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Welcome page with club overview, features, and latest news |
| **Training** | `/training` | Dynamic training schedule calendar and program descriptions |
| **About** | `/about` | Club information, instructor profiles, and facilities |
| **News** | `/news` | Latest club news and updates with rich text content |
| **Become Member** | `/become-member` | Membership information and pricing options |
| **CMS Admin** | `/admin` | Content management panel (login required) |

### ⚙️ Content Management System
**Payload CMS** provides a self-hosted, modern CMS that instructors can use to manage all website content:

- ✅ **No code required** - User-friendly admin panel
- ✅ **Real-time updates** - Changes appear instantly
- ✅ **Image uploads** - Drag and drop with automatic resizing
- ✅ **Rich text editor** - Lexical editor with full formatting
- ✅ **Role-based access** - Admin and instructor roles
- ✅ **Draft/publish workflow** - Save drafts before publishing

**What Instructors Can Edit:**
- Homepage content (hero section, features, "What is Grappling")
- Training programs and weekly schedules
- Instructor profiles with photos and bios
- News articles with featured images
- Membership information and pricing
- Club information and contact details
- Google Maps location embed
- Site-wide visual settings (background, overlay)

📚 **[Quick Start Guide →](./CMS_QUICKSTART.md)** | **[Full Setup Guide →](./CMS_SETUP_GUIDE.md)**

## 🏗️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.4 | React framework with App Router |
| TypeScript | 5.x | Type-safe JavaScript |
| Material-UI (MUI) | 7.3.7 | UI component library |
| Framer Motion | 12.23.12 | Animation library |
| Sharp | 0.34.5 | Image processing |

### Content Management
| Technology | Version | Purpose |
|------------|---------|---------|
| Payload CMS | 3.73.0 | Headless CMS framework |
| MongoDB | Atlas | Document database |
| Lexical | (bundled) | Rich text editor |
| JWT + bcrypt | (bundled) | Authentication |

### Deployment & Hosting
| Technology | Purpose |
|------------|---------|
| Cloudflare Pages | Edge hosting platform |
| @cloudflare/next-on-pages | Build adapter |
| MongoDB Atlas | Cloud database (recommended) |

### Development Tools
| Tool | Purpose |
|------|---------|
| npm | Package manager |
| Turbopack | Development bundler |
| ESLint | Code linting |
| tsx | TypeScript execution for scripts |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm package manager
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
│   └── logo.svg                     # Site logo
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

### Material-UI (MUI)
The project uses **Material-UI 7.x** for all UI components and styling:

- **Components**: Buttons, Cards, Typography, Dialogs, Forms, Layout
- **Styling**: `sx` prop for inline styles, spacing, and responsive design
- **Theme**: Custom MUI theme in `src/theme.ts`
- **Responsive**: Mobile-first with MUI breakpoints (`xs`, `sm`, `md`, `lg`, `xl`)

### Animation System
Built with **Framer Motion 12.x**:
- `<PageTransition>` - Smooth page navigation
- `<FadeIn>` - Fade-in animations
- `<ScrollReveal>` - Animate on scroll
- `<Stagger>` - Sequential list animations

Located in `src/components/animations/`

## 📊 Content Management

### Payload CMS Overview
- **Admin Panel**: `/admin` route
- **Database**: MongoDB (local or Atlas)
- **Authentication**: Built-in JWT auth
- **Rich Text**: Lexical editor

### Collections

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| **Homepage** | Main page content | Hero title, features, "What is Grappling" |
| **News** | Blog articles | Title, slug, author, content, featured image |
| **Instructors** | Staff profiles | Name, belt level, bio, photo |
| **TrainingPrograms** | Class schedules | Name, schedule, level, age group |
| **ClubInfo** | Club details | Story, contact, location |
| **MembershipInfo** | Pricing | Types, prices, benefits |
| **Facility** | Gym info | Description, features |
| **Background** | Site visuals | Background image, overlay |
| **Media** | Uploads | Images, files |
| **Users** | Accounts | Email, password, role |

### Content Workflow

1. **Login**: Go to `/admin` and sign in
2. **Navigate**: Select collection from sidebar
3. **Edit**: Create or modify content
4. **Save**: Click save (drafts) or publish
5. **View**: Changes appear immediately on site

## 🚀 Deployment

### Cloudflare Pages Deployment

#### Prerequisites
- Cloudflare account
- Wrangler CLI: `npm install -g wrangler`
- MongoDB Atlas database

#### Deploy Steps
```bash
# Build for Cloudflare Pages
npm run pages:build

# Preview locally
npm run preview

# Deploy to production
npm run deploy
```

#### Environment Variables (Cloudflare Dashboard)
```env
PAYLOAD_SECRET=your-production-secret-32-chars-min
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

See **[Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)** for complete guide.

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# CMS
npm run seed             # Seed database with initial content
npm run payload          # Payload CLI commands

# Deployment
npm run pages:build      # Build for Cloudflare Pages
npm run preview          # Preview Cloudflare build locally
npm run deploy           # Deploy to Cloudflare Pages
```

### Development Workflow

1. **Start Server**: `npm run dev`
2. **Edit Code**: Make changes to components/pages
3. **Edit Content**: Use CMS at `/admin`
4. **Test**: Verify at http://localhost:3000
5. **Deploy**: `npm run deploy`

### Adding New Features

#### New Page
1. Create `src/app/(frontend)/new-page/page.tsx`
2. Add navigation link in `src/components/Navigation.tsx`
3. Style with MUI components and `sx` prop
4. Add animations from `src/components/animations/`

#### New Content Type
1. Create collection in `src/collections/NewType.ts`
2. Register in `src/payload.config.ts`
3. Add fetch function in `src/lib/payload-data.ts`
4. Create page to display content

## 🔒 Security & Performance

### Security Features
- **Environment Variables**: Secrets in `.env.local`
- **JWT Auth**: Secure admin access
- **Role-Based Access**: Admin and instructor roles
- **Password Hashing**: bcrypt encryption

### Performance Optimizations
- **Next.js Image**: Automatic optimization with Sharp
- **Turbopack**: Fast development builds
- **Edge Deployment**: Cloudflare edge network
- **Code Splitting**: Automatic with App Router
- **Server Components**: Reduced client JS

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
```bash
# Check connection string format
# Atlas: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
# Local: mongodb://localhost:27017/<database>

# Verify network access in Atlas (whitelist IP)
```

#### CMS Admin Not Loading
```bash
# Ensure PAYLOAD_SECRET is set (32+ chars)
# Verify MongoDB is running
# Check .env.local exists and is formatted correctly
```

#### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

#### Image Upload Issues
- Check `public/media/` directory exists
- Verify file permissions
- Ensure Sharp is installed correctly

### Logs and Debugging
```bash
# View dev server logs
npm run dev

# Check for TypeScript errors
npx tsc --noEmit
```

## 📖 Additional Documentation

- **[CMS Quick Start](./CMS_QUICKSTART.md)** - 5-minute setup
- **[CMS Setup Guide](./CMS_SETUP_GUIDE.md)** - Complete instructions
- **[CMS Architecture](./CMS_ARCHITECTURE.md)** - Technical details
- **[Implementation Summary](./CMS_IMPLEMENTATION_SUMMARY.md)** - What was built
- **[CMS Status](./CMS_STATUS.md)** - Migration guide
- **[Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)** - Production deploy

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test locally
4. Commit: `git commit -m "Add new feature"`
5. Push: `git push origin feature/new-feature`
6. Open Pull Request

## 📄 License

This project is private and proprietary to Farsund Grappling Club.

---

Built with ❤️ for the Farsund Grappling community
