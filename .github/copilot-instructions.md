# Farsund Grappling Website

A modern website for **Farsund Grappling Club** (Brazilian Jiu-Jitsu), built with Next.js 16 and powered by **Payload CMS** for content management.

## Tech Stack

- **Framework**: Next.js 16.x with App Router and Turbopack
- **Language**: TypeScript (strict mode)
- **CMS**: Payload CMS 3.x with MongoDB database
- **UI**: Material-UI (MUI) 7.x
- **Animations**: Framer Motion 12.x
- **Deployment**: Vercel with Vercel Blob storage

## Project Structure

```
src/
├── app/
│   ├── (frontend)/           # Public pages
│   │   ├── page.tsx          # Homepage (/)
│   │   ├── training/         # Training schedules (/training)
│   │   ├── about/            # Club & instructors (/about)
│   │   ├── news/             # News articles (/news)
│   │   └── become-member/    # Membership info (/become-member)
│   └── (payload)/            # CMS admin panel (/admin)
│       ├── admin/            # Admin UI
│       └── api/              # Payload REST/GraphQL APIs
├── collections/              # Payload CMS collection schemas
├── components/               # Reusable React components
│   └── animations/           # Framer Motion animation components
├── lib/
│   ├── data.ts               # Static fallback data & types
│   └── payload-data.ts       # CMS data fetching functions
└── payload.config.ts         # Payload CMS configuration
```

## Development Commands

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run seed         # Seed CMS database with initial content
npm run lint         # Run ESLint
```

## Development Guidelines

### Code Style

- Use TypeScript for all components and functions with proper typing
- Use ES module syntax (`import/export`), never CommonJS (`require`)
- Use MUI components for UI elements (buttons, cards, forms, dialogs)
- Use MUI's `sx` prop for styling, layout, and spacing
- Use MUI's theme system for consistent design

### Components

- Create reusable components in `/src/components`
- Client components must have `"use client"` directive at top
- Use Framer Motion for animations via `/src/components/animations`
- Optimize images using Next.js `Image` component with Sharp

### Data Fetching

- Fetch CMS content using functions from `@/lib/payload-data`
- Static fallback data is in `@/lib/data.ts` (for types/reference)
- All pages use server-side data fetching from Payload CMS

### Responsive Design

- Implement mobile-first responsive design
- Test on mobile, tablet, and desktop viewports
- Use MUI breakpoints (`xs`, `sm`, `md`, `lg`, `xl`) in `sx` prop

## CMS Collections

| Collection         | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| `Homepage`         | Hero section, features, "What is Grappling" content |
| `ClubInfo`         | Club story, contact info, Google Maps location      |
| `Instructors`      | Instructor profiles with photos and bios            |
| `TrainingPrograms` | Class schedules and program descriptions            |
| `News`             | News articles with rich text and featured images    |
| `MembershipInfo`   | Membership pricing and types                        |
| `Facility`         | Training facility information                       |
| `Background`       | Site-wide visual settings                           |
| `Media`            | Uploaded images and files                           |

## Environment Variables

Required in `.env.local`:

```env
PAYLOAD_SECRET=<32+ character secret key>
MONGODB_URI=<MongoDB connection string>
NEXT_PUBLIC_SERVER_URL=<Site URL, e.g., http://localhost:3000>
```

## Future Enhancement Ideas

- [ ] Image gallery of club activities and events
- [ ] Member testimonials section
- [ ] Internationalization for Norwegian language (i18n)
- [ ] Event calendar with competition schedule
- [ ] Online membership registration form
