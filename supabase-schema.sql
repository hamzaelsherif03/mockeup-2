-- Little Sprouts Nursery Database Schema
-- Run this in your Supabase SQL editor to create the required tables

-- Contact Forms Table
CREATE TABLE IF NOT EXISTS contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  inquiry_type VARCHAR(100) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'closed')),
  user_agent TEXT,
  ip_address INET
);

-- Tour Requests Table
CREATE TABLE IF NOT EXISTS tour_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  child_name VARCHAR(255) NOT NULL,
  child_age VARCHAR(50) NOT NULL,
  preferred_date DATE,
  preferred_time VARCHAR(50),
  program_interest VARCHAR(100),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'scheduled', 'completed', 'cancelled')),
  user_agent TEXT,
  ip_address INET
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_forms_status ON contact_forms(status);
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON contact_forms(email);

CREATE INDEX IF NOT EXISTS idx_tour_requests_created_at ON tour_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tour_requests_status ON tour_requests(status);
CREATE INDEX IF NOT EXISTS idx_tour_requests_email ON tour_requests(email);
CREATE INDEX IF NOT EXISTS idx_tour_requests_preferred_date ON tour_requests(preferred_date);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert (form submissions)
CREATE POLICY "Anyone can insert contact forms" ON contact_forms
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert tour requests" ON tour_requests
  FOR INSERT WITH CHECK (true);

-- Create policies for authenticated users to read/update (staff access)
-- Note: You'll need to set up authentication for staff members
CREATE POLICY "Authenticated users can view contact forms" ON contact_forms
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact forms" ON contact_forms
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view tour requests" ON tour_requests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update tour requests" ON tour_requests
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a view for staff dashboard (optional)
CREATE OR REPLACE VIEW staff_dashboard AS
SELECT 
  'contact_form' as type,
  id,
  created_at,
  name as contact_name,
  email,
  phone,
  inquiry_type as category,
  subject as title,
  status,
  NULL as preferred_date
FROM contact_forms

UNION ALL

SELECT 
  'tour_request' as type,
  id,
  created_at,
  parent_name as contact_name,
  email,
  phone,
  program_interest as category,
  child_name as title,
  status,
  preferred_date
FROM tour_requests

ORDER BY created_at DESC;

-- Grant access to the view for authenticated users
GRANT SELECT ON staff_dashboard TO authenticated;

-- Create function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to auto-update the updated_at column
CREATE TRIGGER update_contact_forms_updated_at 
  BEFORE UPDATE ON contact_forms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tour_requests_updated_at 
  BEFORE UPDATE ON tour_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a function to get form statistics
CREATE OR REPLACE FUNCTION get_form_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'contact_forms', json_build_object(
      'total', (SELECT COUNT(*) FROM contact_forms),
      'new', (SELECT COUNT(*) FROM contact_forms WHERE status = 'new'),
      'this_week', (SELECT COUNT(*) FROM contact_forms WHERE created_at >= NOW() - INTERVAL '7 days')
    ),
    'tour_requests', json_build_object(
      'total', (SELECT COUNT(*) FROM tour_requests),
      'new', (SELECT COUNT(*) FROM tour_requests WHERE status = 'new'),
      'this_week', (SELECT COUNT(*) FROM tour_requests WHERE created_at >= NOW() - INTERVAL '7 days')
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_form_stats() TO authenticated;