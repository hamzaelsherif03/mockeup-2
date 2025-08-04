-- Complete RLS reset for form tables
-- Run this in your Supabase SQL Editor

-- First, disable RLS temporarily
ALTER TABLE contact_forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE tour_requests DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies (use CASCADE to handle dependencies)
DROP POLICY IF EXISTS "Anyone can insert contact forms" ON contact_forms CASCADE;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_forms CASCADE;
DROP POLICY IF EXISTS "Allow authenticated contact form submissions" ON contact_forms CASCADE;
DROP POLICY IF EXISTS "Authenticated users can view contact forms" ON contact_forms CASCADE;
DROP POLICY IF EXISTS "Authenticated users can update contact forms" ON contact_forms CASCADE;

DROP POLICY IF EXISTS "Anyone can insert tour requests" ON tour_requests CASCADE;
DROP POLICY IF EXISTS "Allow anonymous tour request submissions" ON tour_requests CASCADE;
DROP POLICY IF EXISTS "Allow authenticated tour request submissions" ON tour_requests CASCADE;
DROP POLICY IF EXISTS "Authenticated users can view tour requests" ON tour_requests CASCADE;
DROP POLICY IF EXISTS "Authenticated users can update tour requests" ON tour_requests CASCADE;

-- Re-enable RLS
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_requests ENABLE ROW LEVEL SECURITY;

-- Create fresh, simple policies for anonymous inserts
CREATE POLICY "contact_forms_insert_anon" ON contact_forms
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "contact_forms_insert_auth" ON contact_forms
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "tour_requests_insert_anon" ON tour_requests
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "tour_requests_insert_auth" ON tour_requests
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Add read policies for authenticated users only
CREATE POLICY "contact_forms_select_auth" ON contact_forms
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "contact_forms_update_auth" ON contact_forms
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "tour_requests_select_auth" ON tour_requests
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "tour_requests_update_auth" ON tour_requests
  FOR UPDATE TO authenticated
  USING (true);

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('contact_forms', 'tour_requests');