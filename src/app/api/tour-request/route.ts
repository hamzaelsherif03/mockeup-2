import { NextRequest, NextResponse } from 'next/server'
import { insertTourRequest, type TourRequestSubmission, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { 
      parentName, 
      email, 
      phone, 
      childName, 
      childAge, 
      preferredDate, 
      preferredTime, 
      programInterest,
      message 
    } = body
    
    if (!parentName || !email || !phone || !childName) {
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

    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = phone.replace(/[^\d]/g, '')
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Prepare data for Supabase
    const tourData: TourRequestSubmission = {
      parent_name: parentName,
      email,
      phone,
      child_name: childName,
      child_age: childAge,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      program_interest: programInterest,
      message: message || null,
      user_agent: request.headers.get('user-agent') || undefined,
      ip_address: request.headers.get('x-forwarded-for') || undefined
    }

    // Save to Supabase (if configured)
    if (isSupabaseConfigured()) {
      try {
        const result = await insertTourRequest(tourData)
        console.log('Tour request saved to Supabase:', result.id)
      } catch (dbError) {
        console.error('Database error:', dbError)
        // Continue execution - form submission still succeeds even if DB fails
      }
    } else {
      console.log('Supabase not configured - tour request data would be saved:', tourData)
      // In production without Supabase, you could:
      // - Send email directly
      // - Save to alternative database
      // - Log to external service
    }

    // In production, you would send emails to both staff and parent:
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    // Email to staff
    const staffMsg = {
      to: 'tours@littlesprouts.com',
      from: 'website@littlesprouts.com',
      subject: `New Tour Request: ${parentName}`,
      text: `
        New tour request received:
        
        Parent: ${parentName}
        Email: ${email}
        Phone: ${phone}
        Child: ${childName} (${childAge})
        Program Interest: ${programInterest}
        Preferred Date: ${preferredDate}
        Preferred Time: ${preferredTime}
        
        Message: ${message || 'No additional message'}
        
        Please contact the family to schedule their tour.
      `,
      html: `
        <h2>New Tour Request</h2>
        <table>
          <tr><td><strong>Parent:</strong></td><td>${parentName}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Child:</strong></td><td>${childName} (${childAge})</td></tr>
          <tr><td><strong>Program Interest:</strong></td><td>${programInterest}</td></tr>
          <tr><td><strong>Preferred Date:</strong></td><td>${preferredDate}</td></tr>
          <tr><td><strong>Preferred Time:</strong></td><td>${preferredTime}</td></tr>
        </table>
        ${message ? `<h3>Additional Message:</h3><p>${message}</p>` : ''}
        <p><strong>Action Required:</strong> Please contact the family to schedule their tour.</p>
      `
    }
    
    await sgMail.send(staffMsg)
    
    // Confirmation email to parent
    const confirmationMsg = {
      to: email,
      from: 'info@littlesprouts.com',
      subject: 'Your Tour Request - Little Sprouts Nursery',
      text: `
        Hi ${parentName},
        
        Thank you for requesting a tour of Little Sprouts Nursery for ${childName}!
        
        We've received your request for:
        - Date: ${preferredDate}
        - Time: ${preferredTime}
        - Program: ${programInterest}
        
        Our team will contact you within 24 hours to confirm your tour appointment.
        
        In the meantime, feel free to call us at (555) 123-4567 if you have any questions.
        
        We look forward to meeting you and ${childName}!
        
        Best regards,
        The Little Sprouts Team
      `,
      html: `
        <p>Hi ${parentName},</p>
        
        <p>Thank you for requesting a tour of Little Sprouts Nursery for ${childName}!</p>
        
        <p>We've received your request for:</p>
        <ul>
          <li><strong>Date:</strong> ${preferredDate}</li>
          <li><strong>Time:</strong> ${preferredTime}</li>
          <li><strong>Program:</strong> ${programInterest}</li>
        </ul>
        
        <p>Our team will contact you within 24 hours to confirm your tour appointment.</p>
        
        <p>In the meantime, feel free to call us at <a href="tel:+15551234567">(555) 123-4567</a> if you have any questions.</p>
        
        <p>We look forward to meeting you and ${childName}!</p>
        
        <p>Best regards,<br>The Little Sprouts Team</p>
      `
    }
    
    await sgMail.send(confirmationMsg)
    */

    return NextResponse.json(
      { 
        success: true, 
        message: `Thank you ${parentName}! We've received your tour request for ${childName}. Our team will contact you within 24 hours to confirm your appointment.` 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Tour request error:', error)
    return NextResponse.json(
      { error: 'Unable to process your tour request. Please call us directly at (555) 123-4567.' },
      { status: 500 }
    )
  }
}