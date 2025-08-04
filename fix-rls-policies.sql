`-- Fix RLS policies to allow anonymous form submissions
-- Run this in your Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert contact forms" ON contact_forms;
DROP POLICY IF EXISTS "Anyone can insert tour requests" ON tour_requests;

-- Create new policies that allow anonymous inserts
CREATE POLICY "Allow anonymous contact form submissions" ON contact_forms
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous tour request submissions" ON tour_requests
  FOR INSERT TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "Allow authenticated contact form submissions" ON contact_forms
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated tour request submissions" ON tour_requests
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Keep the existing read policies for authenticated users
-- (These should already exist from the previous schema)`