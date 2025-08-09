# Sanity CMS Setup Instructions

This guide will help you set up Sanity CMS for the Farsund Grappling website.

## 1. Create a Sanity Account

1. Go to [sanity.io](https://sanity.io)
2. Sign up for a free account
3. Create a new project

## 2. Initialize Sanity Project

Run the following command in your terminal:

```bash
npm run sanity:init
```

Follow the prompts:
- Choose "Create new project"
- Give your project a name (e.g., "Farsund Grappling CMS")
- Choose the dataset name: `production`
- Confirm the output path: just press Enter

## 3. Update Environment Variables

Update your `.env.local` file with your actual Sanity project details:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_actual_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-08-09"
SANITY_API_TOKEN="your_api_token"
```

To get your API token:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Editor" permissions

## 4. Deploy Sanity Studio

Deploy your Sanity Studio so instructors can access it:

```bash
npm run sanity:deploy
```

Choose a studio hostname (e.g., `farsund-grappling-studio`)

## 5. Migrate Existing Data (Optional)

To migrate your existing news and instructor data to Sanity:

```bash
npx tsx scripts/migrate-to-sanity.ts
```

## 6. Access Your CMS

After setup, you can access your CMS in two ways:

### Option 1: Embedded Studio (Recommended)
- Go to `http://localhost:3000/studio` (during development)
- Or `https://yourdomain.com/studio` (in production)

### Option 2: Standalone Studio
- Go to `https://your-studio-hostname.sanity.studio`

## 7. Set Up User Access

To give instructors access to the CMS:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to Members
4. Invite instructors by email
5. Give them "Editor" role

## Content Types Available

### News Articles
- Title, summary, content (rich text)
- Featured images
- Author (references instructor)
- Publication date
- Draft/Published status

### Instructors
- Name, title, belt level
- Profile photo
- Biography (rich text)
- Contact information
- Display order

### Club Information
- Club story and mission
- Contact details
- Social media links

### Training Programs
- Program details and schedules
- Skill levels and age groups
- Pricing information
- Instructor assignments

## Usage Instructions for Instructors

### Adding a News Article

1. Log in to the studio
2. Click "News Articles"
3. Click "Create"
4. Fill in:
   - Title
   - Summary (brief description)
   - Content (full article with formatting)
   - Featured image (optional)
   - Author (select yourself)
5. Choose "Published" status
6. Click "Publish"

### Updating Your Profile

1. Log in to the studio
2. Click "Instructors"
3. Find and click your profile
4. Update any information
5. Click "Publish"

## Technical Notes

- Content updates appear on the website within 1-2 minutes
- Images are automatically optimized and served via CDN
- All content is automatically backed up by Sanity
- The studio works on mobile devices for quick updates

## Support

If you encounter any issues:
1. Check that environment variables are correctly set
2. Ensure your API token has the right permissions
3. Check the browser console for error messages
4. Contact the developer for assistance
