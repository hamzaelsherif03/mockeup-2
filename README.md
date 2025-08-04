# Little Sprouts Nursery Website

A modern, professional nursery website built with Next.js, TypeScript, Tailwind CSS, and Supabase. This full-featured website provides comprehensive information about childcare services, programs, and facilities with a focus on accessibility and user experience.

## ✨ Features

- **🎨 Modern Design**: Clean, responsive UI with warm nursery-themed colors
- **♿ Accessibility First**: WCAG AA compliant with comprehensive accessibility features
- **📱 Mobile Optimized**: Responsive design with mobile-first approach
- **🎭 Smooth Animations**: Framer Motion animations for enhanced user experience
- **📊 Performance Optimized**: Next.js 15 with optimized images and lazy loading
- **🗃️ Database Integration**: Supabase backend for contact forms and tour requests
- **🔍 SEO Optimized**: Structured data, sitemap, and meta tags
- **🚀 PWA Ready**: Service worker and offline capabilities
- **📧 Contact Forms**: Integrated contact and tour request forms
- **🎯 TypeScript**: Full type safety throughout the application

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Database**: Supabase
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nursery-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (Optional)**
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials if you want database functionality
   ```

4. **Set up Supabase (Optional)**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`
   - Run the SQL schema in `supabase-schema.sql`
   - Configure RLS policies using provided SQL files
   - **Note**: The website works without Supabase - forms will validate but won't save data

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── admissions/        # Admissions information  
│   ├── api/               # API routes (contact, tour requests)
│   ├── contact/           # Contact page
│   └── programs/          # Programs page
├── components/            # React components
│   ├── accessibility/     # Accessibility features
│   ├── animations/        # Framer Motion components
│   ├── forms/            # Contact and tour request forms
│   ├── layout/           # Header, footer, navigation
│   ├── sections/         # Page sections (hero, testimonials, etc.)
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
└── utils/                # Helper functions
```

## 🎨 Key Pages

- **Home**: Hero section, programs preview, testimonials
- **About**: Facility information, staff profiles, mission
- **Programs**: Detailed program information by age group
- **Admissions**: Enrollment process, pricing, requirements
- **Contact**: Contact form, location, hours

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Features in Detail

### Accessibility
- Screen reader optimization
- Keyboard navigation support
- Color contrast compliance
- Skip links and ARIA labels

### Performance
- Optimized images with Next.js Image component
- Lazy loading for components
- Bundle optimization
- Web Vitals monitoring

### SEO
- Structured data markup
- Meta tags optimization
- Sitemap generation
- Robot.txt configuration

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub** (already done if you're reading this!)

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and import your GitHub repository
   - The project will deploy automatically with zero configuration

3. **Environment Variables (Optional)**
   - If you want database functionality, add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - The site works perfectly without these - forms will validate but won't save to database

4. **Custom Domain (Optional)**
   - Add your custom domain in Vercel dashboard
   - Update `NEXT_PUBLIC_SITE_URL` environment variable

### Other Platforms

The project can also be deployed to:
- **Netlify**: Works out of the box
- **Railway**: Supports Next.js with zero config
- **AWS Amplify**: Deploy directly from GitHub
- **Cloudflare Pages**: Full-stack Next.js support

## ⚠️ Important Notes

- **Forms without Supabase**: The website validates and accepts form submissions but won't save data without Supabase configuration
- **Production Ready**: All components are optimized for production deployment
- **SEO Optimized**: Includes sitemap, robots.txt, and structured data

You can start editing the pages by modifying files in the `src/app/` directory. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter and Playfair Display fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
