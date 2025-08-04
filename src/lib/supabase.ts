import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => Boolean(supabase)

// Database types
export interface ContactFormSubmission {
  id?: string
  created_at?: string
  name: string
  email: string
  phone?: string
  inquiry_type: string
  subject: string
  message: string
  status?: 'new' | 'read' | 'responded' | 'closed'
  user_agent?: string
  ip_address?: string
}

export interface TourRequestSubmission {
  id?: string
  created_at?: string
  parent_name: string
  email: string
  phone: string
  child_name: string
  child_age: string
  preferred_date: string
  preferred_time: string
  program_interest: string
  message?: string
  status?: 'new' | 'scheduled' | 'completed' | 'cancelled'
  user_agent?: string
  ip_address?: string
}

export interface QuickContactSubmission {
  id?: string
  created_at?: string
  name: string
  email: string
  phone?: string
  interest_type: string
  opted_in: boolean
  source: string
  status?: 'new' | 'contacted' | 'converted' | 'not_interested'
  user_agent?: string
  ip_address?: string
}

// Helper functions for database operations
export const insertContactForm = async (data: ContactFormSubmission) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  const { data: result, error } = await supabase
    .from('contact_forms')
    .insert([data])
    .select()

  if (error) {
    console.error('Error inserting contact form:', error)
    throw error
  }

  return result[0]
}

export const insertTourRequest = async (data: TourRequestSubmission) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  const { data: result, error } = await supabase
    .from('tour_requests')
    .insert([data])
    .select()

  if (error) {
    console.error('Error inserting tour request:', error)
    throw error
  }

  return result[0]
}

export const insertQuickContact = async (data: QuickContactSubmission) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  const { data: result, error } = await supabase
    .from('quick_contacts')
    .insert([data])
    .select()

  if (error) {
    console.error('Error inserting quick contact:', error)
    throw error
  }

  return result[0]
}

export const getContactForms = async (status?: string) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  let query = supabase
    .from('contact_forms')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching contact forms:', error)
    throw error
  }

  return data
}

export const getTourRequests = async (status?: string) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  let query = supabase
    .from('tour_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching tour requests:', error)
    throw error
  }

  return data
}

export const getQuickContacts = async (status?: string) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  let query = supabase
    .from('quick_contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching quick contacts:', error)
    throw error
  }

  return data
}

export const updateContactFormStatus = async (id: string, status: string) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  const { data, error } = await supabase
    .from('contact_forms')
    .update({ status })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating contact form status:', error)
    throw error
  }

  return data[0]
}

export const updateTourRequestStatus = async (id: string, status: string) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  const { data, error } = await supabase
    .from('tour_requests')
    .update({ status })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating tour request status:', error)
    throw error
  }

  return data[0]
}

export const updateQuickContactStatus = async (id: string, status: string) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  const { data, error } = await supabase
    .from('quick_contacts')
    .update({ status })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating quick contact status:', error)
    throw error
  }

  return data[0]
}