# Farsund Grappling CMS - Quick Start

> 5-minute setup guide for Payload CMS with Next.js 16

## 🚀 Quick Setup

### 1. Install MongoDB

**Option A - MongoDB Atlas (Recommended for production):**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a free cluster
4. Get your connection string

**Option B - Local MongoDB (For development):**
```bash
# Windows (using Chocolatey)
choco install mongodb

# Or download from: https://www.mongodb.com/try/download/community
```

### 2. Configure Environment

Create or update `.env.local`:
```env
# Secret key for CMS authentication (min 32 characters)
PAYLOAD_SECRET=your-secret-key-min-32-chars-here

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/farsund-grappling

# Site URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Seed Database

```bash
npm run seed
```

### 4. Start Server

```bash
npm run dev
```

### 5. Access CMS

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Website |
| http://localhost:3000/admin | CMS Admin Panel |

**Default Login:**
- Email: `admin@farsundgrappling.no`
- Password: `ChangeThisPassword123!`

⚠️ **IMPORTANT: Change password immediately after first login!**

## 📚 Full Documentation

See [CMS_SETUP_GUIDE.md](./CMS_SETUP_GUIDE.md) for complete documentation.

## 🎯 What Can Instructors Manage?

### ✅ Homepage
- Hero section title and buttons
- "Why Train With Us" cards (with emojis!)
- "What is Grappling" content
- News section labels

### ✅ Training Programs
- Add/edit class types
- Set schedules (day, time, instructor)
- Assign instructors
- Show/hide programs

### ✅ Instructors
- Upload photos
- Write bios and accolades
- Add contact info
- Control display order

### ✅ News Articles
- Create and publish news
- Add featured images
- Write rich text articles
- Save as draft or publish

### ✅ Membership
- Edit pricing and options
- Describe membership types
- Update contact info

### ✅ About Page
- Edit club story
- Manage instructor cards
- Update facility info
- Add Google Maps location

### ✅ Visual Settings
- Upload background images
- Adjust overlay opacity
- Change overlay color

## 🛠️ Troubleshooting

### Can't connect to database?
- Check MongoDB is running
- Verify connection string in `.env.local`

**Changes not showing?**
- Clear browser cache
- Check "Published" status (for news)
- Ensure programs are "Active"

**Need help?**
See [CMS_SETUP_GUIDE.md](./CMS_SETUP_GUIDE.md) for detailed troubleshooting.

## 📱 Production Deployment

When going live:
1. Use MongoDB Atlas (not local MongoDB)
2. Generate new secure `PAYLOAD_SECRET`
3. Update `NEXT_PUBLIC_SERVER_URL` to your domain
4. Change default admin password
5. Enable MongoDB IP whitelisting

## 🔒 Security Notes

- Never commit `.env.local` to git (already in `.gitignore`)
- Use strong passwords for admin accounts
- Change default credentials immediately
- Use MongoDB Atlas with IP restrictions for production
