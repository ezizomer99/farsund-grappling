# Farsund Grappling - Claude Code Instructions

## Project Overview

This is the **Farsund Grappling Club** website - a Next.js 16 application with Payload CMS for content management. The site serves a Norwegian Brazilian Jiu-Jitsu club, providing training schedules, instructor info, membership details, and news.

## Tech Stack

- **Framework**: Next.js 16.x with App Router
- **Language**: TypeScript (strict mode)
- **CMS**: Payload CMS 3.x with MongoDB
- **UI**: Material-UI (MUI) 7.x
- **Animations**: Framer Motion 12.x
- **Deployment**: Cloudflare Pages via @cloudflare/next-on-pages

## Essential Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Build & Deploy
npm run build            # Next.js production build
npm run pages:build      # Build for Cloudflare Pages
npm run deploy           # Deploy to Cloudflare

# CMS
npm run seed             # Seed database with initial content
npm run payload          # Payload CLI commands

# Quality
npm run lint             # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/      # Public pages (/, /training, /about, /news, /become-member)
│   └── (payload)/       # CMS admin panel (/admin) and API routes
├── collections/         # Payload CMS collection schemas
├── components/          # Reusable React components
├── lib/
│   ├── data.ts          # Static fallback data
│   └── payload-data.ts  # CMS data fetching functions
└── payload.config.ts    # Payload CMS configuration
```

## Code Style Rules

- **IMPORTANT**: Use ES modules (`import/export`), NOT CommonJS
- Use MUI components for UI elements (buttons, forms, cards, layout)
- Use MUI's `sx` prop for styling and spacing
- All components must be TypeScript with proper typing
- Use Next.js Image component for all images
- Animations should use Framer Motion

## Common Patterns

### Data Fetching
```typescript
// Always import from payload-data.ts for CMS content
import { getHomepage, getNewsArticles } from "@/lib/payload-data";
```

### Component Structure
```typescript
// Client components need "use client" directive
"use client";
import { Box, Typography } from "@mui/material";
```

### Environment Variables
Required in `.env.local`:
- `PAYLOAD_SECRET` - CMS secret key (32+ chars)
- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_SERVER_URL` - Site URL

## CMS Collections

| Collection | Purpose |
|------------|---------|
| Homepage | Hero, features, "What is Grappling" content |
| ClubInfo | Club story, contact, Google Maps |
| Instructors | Instructor profiles with photos |
| TrainingPrograms | Class schedules and programs |
| News | Blog/news articles |
| MembershipInfo | Membership pricing and types |
| Media | Uploaded images |

## Important Notes

- **Route Groups**: `(frontend)` for public pages, `(payload)` for CMS admin
- **MongoDB Required**: CMS won't work without MongoDB connection
- **Image Uploads**: Stored in `public/media/` directory
- **Rich Text**: Uses Lexical editor in Payload CMS

## Testing Changes

After code changes, verify:
1. Run `npm run lint` - no ESLint errors
2. Run `npm run build` - builds successfully
3. Check the affected page renders correctly
4. Verify CMS admin panel still accessible at `/admin`

## Don't Do

- Don't use `require()` syntax - use ES imports
- Don't add inline styles - use MUI `sx` prop or theme
- Don't hardcode content - fetch from CMS via payload-data.ts
- Don't skip TypeScript types - everything should be typed
