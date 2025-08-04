-- Check current RLS status for both tables
-- Run this in your Supabase SQL Editor

SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN ('contact_forms', 'tour_requests');

-- Also check what policies exist
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd 
FROM pg_policies 
WHERE tablename IN ('contact_forms', 'tour_requests')
ORDER BY tablename, policyname;