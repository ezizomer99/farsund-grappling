# Farsund Grappling CMS Setup Guide

This guide will help you set up and use the Payload CMS for managing content on the Farsund Grappling website.

## Prerequisites

1. **MongoDB Database**: You need a MongoDB database. You have two options:
   - **Local MongoDB**: Install MongoDB locally on your machine
   - **MongoDB Atlas**: Use a free cloud database at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## Installation Steps

### 1. Install MongoDB (Choose One Option)

#### Option A: MongoDB Atlas (Recommended for Production)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/`)

#### Option B: Local MongoDB (For Development)
1. Download MongoDB from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install MongoDB on your machine
3. Start MongoDB service
4. Your connection string will be: `mongodb://localhost:27017/farsund-grappling`

### 2. Configure Environment Variables

Open the `.env.local` file in the root of your project and update these values:

```env
# Generate a secure secret key (at least 32 characters)
# You can use: openssl rand -base64 32
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production

# Your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/farsund-grappling
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farsund-grappling

# Your website URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Seed the Database

Run the seed script to populate your CMS with initial data:

```bash
npm run seed
```

This will create:
- An admin user account
- Homepage content
- Club information
- Sample instructor profile
- Training programs
- News articles
- Facility information
- Membership details

**Default Admin Login:**
- Email: `admin@farsundgrappling.no`
- Password: `ChangeThisPassword123!`

⚠️ **IMPORTANT**: Change this password immediately after first login!

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Access the CMS

Open your browser and navigate to:
- **CMS Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Website**: [http://localhost:3000](http://localhost:3000)

## Using the CMS

### Logging In

1. Go to `http://localhost:3000/admin`
2. Enter your email and password
3. Click "Login"

### Managing Content

#### Homepage Content
- **Location**: Collections → Homepage
- **Edit**: Click on the homepage entry
- **Sections**:
  - Hero Section: Main welcome title and button text
  - Why Train With Us: Three feature cards with emojis, titles, and descriptions
  - What is Grappling: Title and rich text content
  - News Section: Configure labels for the news section

#### Club Information
- **Location**: Collections → Club Info
- **Edit**: Click on the club info entry
- **Sections**:
  - Story: Tell your club's story
  - Mission: Your club mission statement
  - Contact Info: Email, phone, address, social media links
  - Location: Google Maps embed URL and directions

#### Instructors
- **Location**: Collections → Instructors
- **Add New**: Click "Create New"
- **Fields**:
  - Name, Title, Belt Level
  - Profile Image: Upload a photo
  - Bio: Write about experience and accolades
  - Contact: Email and phone
  - Order: Controls display order (lower numbers appear first)

#### Training Programs
- **Location**: Collections → Training Programs
- **Add New**: Click "Create New"
- **Fields**:
  - Name: Program name (e.g., "Voksne Nybegynner")
  - Description: What the program offers
  - Level: Beginner, Intermediate, Advanced, or All
  - Age Group: Kids, Teens, Adults, or All
  - Schedule: Add days, times, and instructors
  - Is Active: Toggle to show/hide the program
  - Order: Display order

#### News Articles
- **Location**: Collections → News
- **Add New**: Click "Create New"
- **Fields**:
  - Title: Article title
  - Slug: URL-friendly version (e.g., "new-class-starting")
  - Author: Select the author
  - Published At: When to publish
  - Featured Image: Optional header image
  - Summary: Brief description for news listing
  - Content: Full article content
  - Status: Draft or Published

#### Membership Information
- **Location**: Collections → Membership Info
- **Edit**: Click on the membership entry
- **Sections**:
  - Main Content: General membership information
  - Membership Types: Add different membership options
  - How to Join: Instructions for becoming a member
  - Contact: Contact information for membership inquiries

#### Facility
- **Location**: Collections → Facility
- **Edit**: Click on the facility entry
- **Sections**:
  - Training Area: Title, subtitle, and image
  - Opportunities: What your facility offers

#### Background Settings
- **Location**: Collections → Background
- **Edit**: Click on the background entry
- **Sections**:
  - Background Image: Optional background image
  - Overlay Opacity: 0 (transparent) to 1 (solid)
  - Overlay Color: Hex color code (e.g., #000000)

### Tips for Content Management

1. **Use Emojis**: For homepage features, use emojis to make content more engaging (🥋, 👨‍👩‍👧‍👦, 🏆, etc.)

2. **Google Maps Embed**:
   - Go to Google Maps
   - Find your location
   - Click "Share" → "Embed a map"
   - Copy the entire URL from the `src` attribute
   - Paste it in the "Map Embed URL" field

3. **Creating Slugs**: 
   - Keep them short and URL-friendly
   - Use hyphens instead of spaces
   - Example: "New Class Starting" → "new-class-starting"

4. **Image Uploads**:
   - Recommended size: 1200x800px for featured images
   - Instructor photos: 400x400px (square)
   - Format: JPG or PNG
   - Keep file sizes under 2MB for best performance

5. **Rich Text Editor**:
   - Use headings for structure
   - Add links by highlighting text and clicking the link icon
   - Format text with bold, italic, lists, etc.

6. **Publishing News**:
   - Save as "Draft" while working
   - Change to "Published" when ready to go live
   - Published articles appear on the website automatically

### Creating New Users

1. Go to Collections → Users
2. Click "Create New"
3. Enter email, name, and password
4. Choose role:
   - **Admin**: Full access to all content and settings
   - **Instructor**: Can manage content but limited settings access
5. Click "Save"

## Troubleshooting

### Cannot Connect to Database
- Check that MongoDB is running
- Verify your connection string in `.env.local`
- For MongoDB Atlas, ensure your IP is whitelisted

### Changes Not Appearing
- Clear your browser cache
- Check that content status is "Published" (for news)
- Check that programs have "Is Active" checked

### Forgot Password
Contact the administrator to reset your password through the Users collection.

### Images Not Uploading
- Check file size (must be under 10MB)
- Ensure proper permissions on the `public/media` folder
- Try a different image format (JPG/PNG)

## Deployment

When deploying to production:

1. **Update Environment Variables**:
   - Generate a new `PAYLOAD_SECRET`
   - Use your production MongoDB connection string
   - Set `NEXT_PUBLIC_SERVER_URL` to your domain

2. **Change Admin Password**:
   - Log in with default credentials
   - Go to your user profile
   - Change password to something secure

3. **Secure MongoDB**:
   - Use MongoDB Atlas with IP whitelisting
   - Use strong database credentials
   - Enable MongoDB authentication

## Support

For technical issues or questions, contact:
- Email: [Your Email]
- Or create an issue in the project repository

## Package Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "seed": "tsx src/scripts/seed.ts",
    "payload": "payload"
  }
}
```
