-- Temporarily disable RLS for testing
-- IMPORTANT: Only use this for testing, re-enable RLS for production

-- Disable RLS temporarily
ALTER TABLE contact_forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE tour_requests DISABLE ROW LEVEL SECURITY;

-- You can re-enable it later with:
-- ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tour_requests ENABLE ROW LEVEL SECURITY;