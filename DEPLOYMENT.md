# 🚀 Production Deployment Guide

This guide will help you deploy the Graduate Chai website to production.

## 📋 Prerequisites

- Node.js 18.0 or later
- npm 8.0 or later
- Git repository access
- Domain name (optional but recommended)
- Email service (Gmail recommended)

## 🎯 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest and most optimized platform for Next.js applications.

#### Step 1: Prepare Your Repository

1. Ensure all changes are committed and pushed to your main branch
2. Verify your `.env.example` file is up to date
3. Test locally with `npm run build`

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your repository
5. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

#### Step 3: Set Environment Variables

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```env
# Required
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=support@graduate.in
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_PHONE_NUMBER=919999999999
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/your-handle/
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@your-channel
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/your-page
```

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at `https://your-project.vercel.app`

### Option 2: Netlify

#### Step 1: Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Click "New site from Git"
4. Choose your repository

#### Step 2: Configure Build Settings

```
Build command: npm run build
Publish directory: .next
```

#### Step 3: Set Environment Variables

In Site settings → Environment variables, add the same variables as above.

### Option 3: Traditional Hosting (VPS/Dedicated Server)

#### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### Step 2: Deploy Application

```bash
# Clone repository
git clone your-repo-url
cd graduate-chai

# Install dependencies
npm install

# Set environment variables
cp env.example .env.local
nano .env.local  # Edit with your values

# Build application
npm run build

# Start with PM2
pm2 start npm --name "graduate-chai" -- start
pm2 startup
pm2 save
```

#### Step 3: Configure Nginx

Create `/etc/nginx/sites-available/graduate-chai`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/graduate-chai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Environment Configuration

### Email Setup (Gmail)

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to Security → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASS`

3. **Test Email Configuration**

```bash
# Test locally
npm run dev
# Try sending a test order or franchise inquiry
```

### Google Analytics Setup

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create a new property
   - Get your Measurement ID (G-XXXXXXXXXX)

2. **Add to Environment Variables**

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Custom Domain Setup

1. **Update Environment Variables**

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

2. **Update Metadata** (if needed)
   Edit `src/app/layout.tsx` to update:

- Open Graph URLs
- Twitter card URLs
- Canonical URLs

3. **DNS Configuration**

- Point your domain to your hosting provider
- Add SSL certificate (automatic on Vercel/Netlify)

## 🔒 Security Checklist

- [ ] Environment variables are set
- [ ] HTTPS is enabled
- [ ] Security headers are configured
- [ ] Email is working
- [ ] Forms are functional
- [ ] Analytics is tracking
- [ ] Images are optimized
- [ ] Performance is good

## 📊 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npx depcheck

# Optimize images
# Ensure all images are in WebP format where possible
```

### Monitoring Setup

1. **Google Analytics**: Track user behavior
2. **Vercel Analytics**: Monitor performance (if using Vercel)
3. **Error Tracking**: Consider Sentry for error monitoring

## 🧪 Testing Before Go-Live

### Functionality Tests

- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Product ordering works
- [ ] Franchise form submits
- [ ] Email notifications are received
- [ ] Mobile responsiveness
- [ ] Dark mode toggle
- [ ] Social media links

### Performance Tests

- [ ] Page load speed < 3 seconds
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] No console errors
- [ ] SEO meta tags are present

### Security Tests

- [ ] HTTPS redirect works
- [ ] Forms are protected against spam
- [ ] No sensitive data in client-side code
- [ ] Headers are properly set

## 🚀 Post-Deployment

### Monitoring

1. **Set up uptime monitoring** (UptimeRobot, Pingdom)
2. **Monitor error logs** (Vercel logs, server logs)
3. **Track performance metrics** (Google PageSpeed Insights)

### Maintenance

1. **Regular updates**: Keep dependencies updated
2. **Security patches**: Monitor for vulnerabilities
3. **Content updates**: Keep product information current
4. **Backup strategy**: Regular backups of configuration

### SEO Optimization

1. **Submit sitemap** to Google Search Console
2. **Set up Google Search Console** for monitoring
3. **Optimize meta descriptions** and titles
4. **Monitor Core Web Vitals**

## 🆘 Troubleshooting

### Common Issues

**Build Fails**

```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Clear cache and rebuild
rm -rf .next
npm run build
```

**Email Not Working**

- Verify SMTP credentials
- Check firewall settings
- Test with different email provider

**Performance Issues**

- Optimize images
- Enable compression
- Use CDN for static assets
- Implement caching strategies

**Domain Issues**

- Verify DNS settings
- Check SSL certificate
- Ensure redirects are working

## 📞 Support

For deployment issues:

1. Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
2. Review platform-specific guides (Vercel, Netlify, etc.)
3. Check GitHub issues for similar problems
4. Contact support with specific error messages

---

**Your Graduate Chai website is now production-ready! 🎉**
