-- Quick Contacts table for popup form submissions
-- Run this in your Supabase SQL Editor

-- Create the quick_contacts table
CREATE TABLE IF NOT EXISTS quick_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest_type TEXT NOT NULL,
  opted_in BOOLEAN DEFAULT false,
  source TEXT NOT NULL DEFAULT 'unknown',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'not_interested')),
  user_agent TEXT,
  ip_address TEXT
);

-- Enable Row Level Security
ALTER TABLE quick_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous inserts and authenticated reads
CREATE POLICY "Allow anonymous quick contact submissions" ON quick_contacts
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated quick contact submissions" ON quick_contacts
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to read all quick contacts (for admin dashboard)
CREATE POLICY "Allow authenticated users to read quick contacts" ON quick_contacts
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update quick contact status
CREATE POLICY "Allow authenticated users to update quick contacts" ON quick_contacts
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quick_contacts_created_at ON quick_contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quick_contacts_status ON quick_contacts(status);
CREATE INDEX IF NOT EXISTS idx_quick_contacts_email ON quick_contacts(email);
CREATE INDEX IF NOT EXISTS idx_quick_contacts_source ON quick_contacts(source);

-- Add some helpful comments
COMMENT ON TABLE quick_contacts IS 'Stores contact information collected via popup forms';
COMMENT ON COLUMN quick_contacts.interest_type IS 'What the user is interested in: tour, enrollment, programs, pricing, general';
COMMENT ON COLUMN quick_contacts.source IS 'How the popup was triggered: time, scroll, exit-intent, page-visit, manual';
COMMENT ON COLUMN quick_contacts.status IS 'Follow-up status: new, contacted, converted, not_interested';
COMMENT ON COLUMN quick_contacts.opted_in IS 'Whether user opted in to receive communications';