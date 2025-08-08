# Farsund Grappling Website

This is a Next.js project for the Farsund Grappling Club. This static website provides information about the club, training programs, membership options, news, and more.

## Project Structure

- `/src/app` - Contains all the routes and pages of the application using Next.js App Router
    - `/page.tsx` - Home page
    - `/training/page.tsx` - Training programs and schedules
    - `/become-member/page.tsx` - Membership information
    - `/about/page.tsx` - Information about the club, instructors and facilities
    - `/news/page.tsx` - Club news and updates
- `/src/components` - Reusable components (Navigation, Footer, etc.)
- `/public` - Static assets (images, icons, etc.)

## Development Guidelines

- Use TypeScript for all new components and functions
- Follow Tailwind CSS conventions for styling
- Create reusable components when elements appear in multiple places
- Optimize images using Next.js Image Component
- Implement responsive design for all screen sizes

## Future Enhacement Ideas

- Add image gallery of club activites and events
- Implement a blog system for more detailed news articles
- Add member testimonials section
- Add integration with a CMS for easier content updates
- Implement internationalization for Norwegian language support