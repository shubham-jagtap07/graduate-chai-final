# Graduate Chai & Products - Next.js Website

A modern, responsive website for Graduate Chai & Products built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- 🎨 Modern, responsive design with dark mode support
- ✨ Smooth animations and transitions using Framer Motion
- 🛍️ Interactive product catalog with ordering system
- 📱 Mobile-first approach with excellent accessibility
- 🎯 SEO optimized with structured data
- 📧 Email integration for orders and franchise inquiries
- 🔒 Security headers and production optimizations
- 📊 Google Analytics integration ready
- 🌐 Internationalization ready

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Icons**: Heroicons & React Icons
- **Email**: Nodemailer for contact forms
- **Type Checking**: TypeScript
- **State Management**: React Context API
- **Performance**: Image optimization, code splitting

## 📋 Prerequisites

- Node.js 18.0 or later
- npm 8.0 or later
- Git

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone [repository-url]
cd graduate-chai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# SMTP Configuration for Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Contact Email
CONTACT_EMAIL=support@graduate.in

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://graduatechai.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Social Media Links
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_PHONE_NUMBER=919999999999
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/nilesh_graduatechaiwala/
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@graduate_chai_
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/graduatechai
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
graduate-chai/
├── public/                  # Static files
│   ├── images/             # Image assets
│   ├── video/              # Video assets
│   └── audio/              # Audio assets
├── src/
│   ├── app/                # App router pages
│   │   ├── api/            # API routes
│   │   ├── about/          # About page
│   │   ├── franchise/      # Franchise page
│   │   ├── order/          # Order page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── animations/     # Animation components
│   │   ├── layout/         # Layout components
│   │   ├── sections/       # Page sections
│   │   ├── OrderForm.tsx   # Order modal
│   │   ├── FloatingActions.tsx # Floating buttons
│   │   └── ThemeProvider.tsx # Theme context
│   └── styles/             # Additional styles
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run analyze` - Analyze bundle size
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🚀 Production Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Start production server**

   ```bash
   npm run start
   ```

````

### Environment Variables for Production

Make sure to set these in your hosting platform:

```env
# Required
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=support@graduate.in
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_PHONE_NUMBER=919999999999
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/your-handle/
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@your-channel
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/your-page
````

## 🔧 Configuration

### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in `SMTP_PASS`

### Google Analytics

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add it to `NEXT_PUBLIC_GA_ID`

### Custom Domain

1. Update `NEXT_PUBLIC_SITE_URL` with your domain
2. Update metadata in `src/app/layout.tsx`
3. Configure DNS settings

## 🎨 Customization

### Colors and Branding

Edit `tailwind.config.js` to customize colors:

```js
theme: {
  extend: {
    colors: {
      primary: '#a35d15', // Your brand color
      secondary: '#4c6ef5',
    }
  }
}
```

### Content Updates

- **Products**: Update `src/components/sections/Products.tsx`
- **Team**: Update `src/components/sections/Mastermind.tsx`
- **Contact**: Update environment variables
- **Images**: Replace files in `public/images/`

## 🔒 Security Features

- Security headers configured
- XSS protection enabled
- Content Security Policy ready
- HTTPS enforcement
- Input validation and sanitization

## ♿ Accessibility Features

- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion support
- Focus management

## 📱 Performance Optimizations

- Image optimization with Next.js Image
- Code splitting and lazy loading
- Bundle analysis tools
- Compression enabled
- CDN ready
- Caching strategies

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📈 Analytics and Monitoring

- Google Analytics 4 integration
- Performance monitoring ready
- Error tracking setup
- SEO optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@graduate.in or create an issue in the repository.

## 🔄 Updates and Maintenance

- Regular dependency updates
- Security patches
- Performance monitoring
- Content updates
- SEO optimization

---

**Made with ❤️ for Graduate Chai & Products**
