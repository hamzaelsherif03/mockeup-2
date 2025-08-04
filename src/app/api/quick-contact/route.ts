import { NextRequest, NextResponse } from 'next/server'
import { insertQuickContact, isSupabaseConfigured, QuickContactSubmission } from '@/lib/supabase'
import { validateQuickContactData } from '@/lib/popup-utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the incoming data
    const validation = validateQuickContactData(body)
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      )
    }

    // Get user agent and IP address for tracking
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'Unknown'

    // Prepare the submission data
    const submissionData: QuickContactSubmission = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      interest_type: body.interestType,
      opted_in: body.optedIn || false,
      source: body.source || 'unknown',
      status: 'new',
      user_agent: userAgent,
      ip_address: ipAddress
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      // In development or if Supabase isn't configured, just return success
      // This allows the form to work even without database setup
      console.log('Supabase not configured. Quick contact submission:', submissionData)
      
      return NextResponse.json({
        success: true,
        message: 'Thank you for your interest! We\'ll be in touch soon.',
        data: {
          ...submissionData,
          id: 'demo-' + Date.now(),
          created_at: new Date().toISOString()
        }
      })
    }

    // Save to database
    const result = await insertQuickContact(submissionData)

    // TODO: Send email notification to staff
    // This could be implemented with a service like Resend, SendGrid, etc.
    console.log('Quick contact submission received:', {
      id: result.id,
      name: result.name,
      email: result.email,
      interest_type: result.interest_type,
      source: result.source
    })

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest! We\'ll be in touch soon.',
      data: {
        id: result.id,
        created_at: result.created_at
      }
    })

  } catch (error) {
    console.error('Error processing quick contact submission:', error)
    
    // Return generic error to client
    return NextResponse.json(
      { 
        error: 'Failed to process your request. Please try again or contact us directly at (555) 123-4567.',
        message: 'We apologize for the inconvenience. Your information is important to us.'
      },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}