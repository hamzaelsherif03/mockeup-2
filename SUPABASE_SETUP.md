# Supabase Setup Guide for Little Sprouts Nursery

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `little-sprouts-nursery`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your location
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

## 2. Get Your Project Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIs...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIs...` (keep this secret!)

## 3. Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

## 4. Create Database Tables

1. Go to your Supabase dashboard
2. Click **SQL Editor** in the sidebar
3. Click "New query"
4. Copy and paste the contents of `supabase-schema.sql`
5. Click "Run" to execute the SQL

This will create:
- `contact_forms` table
- `tour_requests` table
- Indexes for performance
- Row Level Security policies
- Helper functions

## 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/contact`
3. Fill out and submit the contact form
4. Check your Supabase dashboard → **Table Editor** → `contact_forms`
5. You should see your form submission!

## 6. Admin Dashboard

- Visit `http://localhost:3000/admin` to see the admin dashboard
- This is a demo interface showing how you can manage form submissions
- In production, add authentication to protect this route

## 7. Email Notifications (Optional)

### Option A: Supabase Edge Functions
1. Install Supabase CLI: `npm install -g supabase`
2. Create Edge Functions for email notifications
3. Use services like SendGrid, Postmark, or Resend

### Option B: Third-party Service
1. Add email service credentials to your `.env.local`
2. Update the API routes to send emails after saving to database

## 8. Database Policies & Security

The schema includes Row Level Security (RLS) policies:

- **Public insert**: Anyone can submit forms (website visitors)
- **Authenticated read/update**: Only authenticated users can view/manage submissions

To set up staff authentication:
1. Enable email authentication in Supabase Auth settings
2. Create staff accounts through Supabase dashboard
3. Update policies as needed for your security requirements

## 9. Backup & Monitoring

1. **Automatic Backups**: Supabase automatically backs up your database
2. **Monitoring**: Check the Supabase dashboard for usage stats
3. **Logs**: View real-time logs in the Logs section

## 10. Production Deployment

When deploying to production:

1. **Environment Variables**: Add your Supabase credentials to your hosting platform
2. **Domain**: Update CORS settings in Supabase if needed
3. **SSL**: Ensure your site uses HTTPS
4. **Rate Limiting**: Consider adding rate limiting to your API routes

## Database Schema Overview

### contact_forms
- `id` (UUID, Primary Key)
- `created_at` (Timestamp)
- `name`, `email`, `phone`
- `inquiry_type`, `subject`, `message`
- `status` (new, read, responded, closed)
- `user_agent`, `ip_address`

### tour_requests
- `id` (UUID, Primary Key)
- `created_at` (Timestamp)
- `parent_name`, `email`, `phone`
- `child_name`, `child_age`
- `preferred_date`, `preferred_time`
- `program_interest`, `message`
- `status` (new, scheduled, completed, cancelled)
- `user_agent`, `ip_address`

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your environment variables are correct
2. **"Permission denied"**: Check RLS policies in your database
3. **"Table doesn't exist"**: Make sure you ran the SQL schema
4. **"CORS error"**: Check your Supabase project settings

### Debug Steps:

1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify environment variables are loaded
4. Test database connection with a simple query