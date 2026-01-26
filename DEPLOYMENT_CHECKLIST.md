# 🚀 Production Deployment Checklist

Use this checklist when you're ready to deploy the CMS to production.

## 📋 Pre-Deployment Checklist

### Database Setup
- [ ] Create MongoDB Atlas account
- [ ] Create production cluster (free tier available)
- [ ] Get connection string
- [ ] Whitelist deployment server IP addresses
- [ ] Test database connection from local machine

### Security Configuration
- [ ] Generate secure `PAYLOAD_SECRET` (32+ characters)
  ```bash
  # Generate with: openssl rand -base64 32
  ```
- [ ] Update production environment variables
- [ ] Change default admin password
- [ ] Create individual instructor accounts
- [ ] Review and set proper user roles
- [ ] Enable MongoDB authentication
- [ ] Configure MongoDB network access

### Environment Variables (Production)
Create these in your Cloudflare Pages settings:

```env
# REQUIRED
PAYLOAD_SECRET=your-production-secret-key-32-chars-minimum
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farsund-grappling
NEXT_PUBLIC_SERVER_URL=https://your-domain.com

# OPTIONAL (if using different database for prod)
NODE_ENV=production
```

### Content Review
- [ ] Review all content in CMS
- [ ] Ensure all images are optimized
- [ ] Check all news articles for proper formatting
- [ ] Verify training schedules are up to date
- [ ] Test all instructor profiles
- [ ] Confirm contact information is correct
- [ ] Verify Google Maps embed URL works

### Testing
- [ ] Test user login/logout
- [ ] Create test news article and publish
- [ ] Upload test image
- [ ] Edit homepage content and verify changes
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Verify all links work
- [ ] Check form submissions (if any)

## 🌐 Cloudflare Pages Deployment

### 1. Prepare for Deployment

```bash
# Build the project
npm run build

# Test production build locally
npm run start
```

### 2. Deploy to Cloudflare Pages

```bash
# Build for Cloudflare Pages
npm run pages:build

# Deploy
npm run deploy
```

Or use Cloudflare Pages dashboard:
1. Connect your Git repository
2. Set build command: `npm run pages:build`
3. Set output directory: `.vercel/output/static`
4. Add environment variables (see above)

### 3. Configure Environment Variables in Cloudflare

Go to Cloudflare Pages → Settings → Environment Variables:

Add all production environment variables:
- `PAYLOAD_SECRET`
- `MONGODB_URI`
- `NEXT_PUBLIC_SERVER_URL`

### 4. Custom Domain Setup

In Cloudflare Pages:
1. Go to Custom Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

## 🔒 Post-Deployment Security

### Immediate Actions
- [ ] Log into production CMS at `https://your-domain.com/admin`
- [ ] Change admin password immediately
- [ ] Create individual instructor accounts
- [ ] Test login with instructor account
- [ ] Verify role permissions work correctly
- [ ] Review MongoDB access logs

### MongoDB Atlas Security
- [ ] Navigate to MongoDB Atlas → Security
- [ ] Go to Network Access
- [ ] Add IP addresses:
  - [ ] Your office IP (if accessing from office)
  - [ ] Cloudflare Pages IP ranges (if needed)
  - [ ] Remove `0.0.0.0/0` if present (allows all IPs)
- [ ] Go to Database Access
- [ ] Review user permissions
- [ ] Ensure strong passwords

### Regular Maintenance
- [ ] Set up automatic MongoDB backups
- [ ] Configure backup retention policy
- [ ] Document backup restoration process
- [ ] Schedule monthly security review
- [ ] Plan quarterly password rotations

## 👥 User Management

### Creating Instructor Accounts

1. Log into CMS as admin
2. Go to Collections → Users
3. Click "Create New"
4. Fill in:
   - Email: `instructor-email@example.com`
   - Name: `Instructor Name`
   - Password: `StrongPassword123!`
   - Role: `instructor`
5. Save
6. Share credentials securely (not via email!)
7. Instruct them to change password on first login

### Instructor Account Setup Guide

Send this to new instructors:

```
Welcome to Farsund Grappling CMS!

Your account has been created:
- Email: [their-email]
- Temporary Password: [secure-password]

IMPORTANT: Change your password immediately!

1. Go to: https://your-domain.com/admin
2. Log in with provided credentials
3. Click your name (top right) → Account
4. Change password
5. Save

You can now manage:
- News articles
- Training programs
- Your instructor profile
- Homepage content
- And more!

Need help? See the guide: [link to CMS_SETUP_GUIDE.md]
```

## 📊 Monitoring & Maintenance

### What to Monitor
- [ ] Database storage usage (MongoDB Atlas dashboard)
- [ ] Media storage (public/media folder size)
- [ ] Website performance (Cloudflare Analytics)
- [ ] Error logs (Cloudflare Pages logs)
- [ ] User activity (review CMS access logs)

### Regular Tasks

**Daily:**
- Check Cloudflare Pages deployment status
- Review any error notifications

**Weekly:**
- Review new content published
- Check media storage usage
- Verify backup completion

**Monthly:**
- Review user accounts and permissions
- Update npm dependencies if needed
- Check for Payload CMS updates
- Review and update content as needed

**Quarterly:**
- Security audit
- Password rotation
- Backup restoration test
- Performance optimization review

## 🆘 Emergency Procedures

### If CMS Goes Down

1. Check Cloudflare Pages status
2. Verify MongoDB Atlas is online
3. Check environment variables are set
4. Review deployment logs
5. Rollback to previous deployment if needed

### If Database Connection Fails

1. Check MongoDB Atlas cluster status
2. Verify connection string is correct
3. Check IP whitelist includes deployment IPs
4. Test connection from local machine
5. Contact MongoDB Atlas support if needed

### If You're Locked Out

1. Use MongoDB Atlas to access database directly
2. Find users collection
3. Reset password (requires technical knowledge)
4. Or restore from backup
5. Document what happened for future reference

## 📱 Mobile App Considerations

If you plan to add a mobile app in the future:

- [ ] Payload CMS provides REST API automatically
- [ ] API endpoint: `https://your-domain.com/api/payload`
- [ ] Use JWT authentication for mobile apps
- [ ] Consider rate limiting for API requests
- [ ] Document API endpoints for app developers

## 🔄 Rollback Plan

If something goes wrong:

### Cloudflare Pages Rollback
1. Go to Cloudflare Pages dashboard
2. Find Deployments section
3. Click on previous successful deployment
4. Click "Rollback to this deployment"

### Database Rollback
1. Access MongoDB Atlas
2. Go to Backup tab
3. Select restore point
4. Follow restoration wizard
5. Test thoroughly before going live

## ✅ Final Verification

Before announcing the site is live:

- [ ] Test all pages load correctly
- [ ] Verify CMS login works
- [ ] Test content editing and publishing
- [ ] Check mobile responsiveness
- [ ] Test image uploads
- [ ] Verify news articles display correctly
- [ ] Test training schedule
- [ ] Check instructor profiles
- [ ] Verify contact information
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check Google Maps integration
- [ ] Verify social media links
- [ ] Test with instructor accounts
- [ ] Get feedback from team members

## 🎉 Going Live

Once everything is checked:

1. **Announce to Team**
   - Share CMS login details with instructors
   - Provide link to [CMS_SETUP_GUIDE.md](./CMS_SETUP_GUIDE.md)
   - Schedule training session if needed

2. **Monitor Closely**
   - First 24 hours: Check frequently
   - First week: Daily checks
   - After: Regular maintenance schedule

3. **Gather Feedback**
   - Ask instructors about CMS usability
   - Note any issues or suggestions
   - Make improvements based on feedback

## 📧 Support Contacts

**MongoDB Atlas Support:**
- Website: https://www.mongodb.com/cloud/atlas/support
- Documentation: https://docs.atlas.mongodb.com/

**Cloudflare Pages Support:**
- Website: https://developers.cloudflare.com/pages/
- Community: https://community.cloudflare.com/

**Payload CMS Support:**
- Documentation: https://payloadcms.com/docs
- Discord: https://discord.com/invite/payload
- GitHub: https://github.com/payloadcms/payload

## 🎓 Additional Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Best Practices](https://docs.atlas.mongodb.com/best-practices/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)

---

**Last Updated:** [Current Date]
**Version:** 1.0
**Status:** Ready for Production ✅
