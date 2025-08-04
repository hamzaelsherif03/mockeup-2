import { NextRequest, NextResponse } from 'next/server'
import { insertContactForm, type ContactFormSubmission, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, phone, inquiryType, subject, message } = body
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Prepare data for Supabase
    const formData: ContactFormSubmission = {
      name,
      email,
      phone: phone || null,
      inquiry_type: inquiryType,
      subject,
      message,
      user_agent: request.headers.get('user-agent') || undefined,
      ip_address: request.headers.get('x-forwarded-for') || undefined
    }

    // Save to Supabase (if configured)
    if (isSupabaseConfigured()) {
      try {
        const result = await insertContactForm(formData)
        console.log('Contact form saved to Supabase:', result.id)
      } catch (dbError) {
        console.error('Database error:', dbError)
        // Continue execution - form submission still succeeds even if DB fails
      }
    } else {
      console.log('Supabase not configured - form data would be saved:', formData)
      // In production without Supabase, you could:
      // - Send email directly
      // - Save to alternative database
      // - Log to external service
    }

    // TODO: Set up Supabase Edge Function for email notifications
    // In production, you can use Supabase Edge Functions to send emails:
    /*
    // Example with Supabase Edge Function
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
      to: 'info@littlesprouts.com',
      from: 'website@littlesprouts.com',
      subject: `New Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Inquiry Type: ${inquiryType}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    }
    
    await sgMail.send(msg)
    
    // Send confirmation email to user
    const confirmationMsg = {
      to: email,
      from: 'info@littlesprouts.com',
      subject: 'Thank you for contacting Little Sprouts Nursery',
      text: `Hi ${name},\n\nThank you for contacting Little Sprouts Nursery. We've received your message and will respond within 24 hours.\n\nBest regards,\nLittle Sprouts Team`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting Little Sprouts Nursery. We've received your message and will respond within 24 hours.</p>
        <p>Best regards,<br>Little Sprouts Team</p>
      `
    }
    
    await sgMail.send(confirmationMsg)
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again or call us directly.' },
      { status: 500 }
    )
  }
}