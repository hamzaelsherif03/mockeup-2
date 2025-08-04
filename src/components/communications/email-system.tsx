'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Email template types for the nursery
export type EmailTemplateType = 
  | 'welcome'
  | 'tour_confirmation'
  | 'enrollment_welcome'
  | 'weekly_newsletter'
  | 'event_reminder'
  | 'closure_notice'
  | 'emergency_alert'
  | 'parent_conference'
  | 'payment_reminder'
  | 'milestone_celebration'

interface EmailTemplate {
  id: string
  type: EmailTemplateType
  subject: string
  content: string
  variables: string[]
  trigger?: 'immediate' | 'scheduled' | 'event_based'
  delay?: number // in hours
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'welcome_inquiry',
    type: 'welcome',
    subject: 'Welcome to Little Sprouts Nursery!',
    content: `
      <h1>Welcome to Little Sprouts Nursery, {{parentName}}!</h1>
      
      <p>Thank you for your interest in our childcare services. We're excited to potentially welcome {{childName}} to our Little Sprouts family!</p>
      
      <h2>What's Next?</h2>
      <ul>
        <li>Schedule a tour of our facility</li>
        <li>Meet our experienced teachers</li>
        <li>Learn about our programs</li>
        <li>Discuss enrollment options</li>
      </ul>
      
      <p>Our team will contact you within 24 hours to answer any questions and help schedule your visit.</p>
      
      <p>In the meantime, feel free to:</p>
      <ul>
        <li><a href="{{virtualTourUrl}}">Take our virtual tour</a></li>
        <li><a href="{{programsUrl}}">Learn about our programs</a></li>
        <li><a href="{{testimonialsUrl}}">Read parent testimonials</a></li>
      </ul>
      
      <p>Best regards,<br>
      The Little Sprouts Team</p>
    `,
    variables: ['parentName', 'childName', 'virtualTourUrl', 'programsUrl', 'testimonialsUrl'],
    trigger: 'immediate'
  },
  {
    id: 'tour_confirmation',
    type: 'tour_confirmation',
    subject: 'Your Tour is Confirmed - Little Sprouts Nursery',
    content: `
      <h1>Tour Confirmation</h1>
      
      <p>Dear {{parentName}},</p>
      
      <p>Your tour of Little Sprouts Nursery is confirmed for:</p>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <strong>Date:</strong> {{tourDate}}<br>
        <strong>Time:</strong> {{tourTime}}<br>
        <strong>Duration:</strong> 30-45 minutes<br>
        <strong>Location:</strong> 123 Oak Street, Springfield, IL 62701
      </div>
      
      <h2>What to Expect</h2>
      <ul>
        <li>Meet our teaching staff</li>
        <li>See our classrooms and facilities</li>
        <li>Learn about our curriculum</li>
        <li>Discuss enrollment and tuition</li>
        <li>Ask any questions you may have</li>
      </ul>
      
      <p><strong>Please bring:</strong></p>
      <ul>
        <li>Any questions you'd like to ask</li>
        <li>Your child (optional but welcomed!)</li>
      </ul>
      
      <p>Need to reschedule? Simply reply to this email or call us at {{phoneNumber}}.</p>
      
      <p>We look forward to meeting you!</p>
      
      <p>Warm regards,<br>
      The Little Sprouts Team</p>
    `,
    variables: ['parentName', 'tourDate', 'tourTime', 'phoneNumber'],
    trigger: 'immediate'
  },
  {
    id: 'enrollment_welcome',
    type: 'enrollment_welcome',
    subject: 'Welcome to the Little Sprouts Family! 🌱',
    content: `
      <h1>Welcome to Little Sprouts Nursery!</h1>
      
      <p>Dear {{parentName}},</p>
      
      <p>We are thrilled to welcome {{childName}} to the Little Sprouts family! Your enrollment is now complete, and we can't wait to begin this exciting journey together.</p>
      
      <h2>Important Information for {{childName}}'s First Day</h2>
      
      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <strong>Start Date:</strong> {{startDate}}<br>
        <strong>Program:</strong> {{program}}<br>
        <strong>Teacher:</strong> {{teacherName}}<br>
        <strong>Drop-off Time:</strong> {{dropoffTime}}<br>
        <strong>Pick-up Time:</strong> {{pickupTime}}
      </div>
      
      <h2>Before the First Day</h2>
      <ul>
        <li>Complete all required forms (attached)</li>
        <li>Provide emergency contact information</li>
        <li>Submit immunization records</li>
        <li>Label all personal items</li>
      </ul>
      
      <h2>What to Bring</h2>
      <ul>
        <li>Comfort item (blanket, stuffed animal)</li>
        <li>Extra clothes in a labeled bag</li>
        <li>Lunch and snacks (if applicable)</li>
        <li>Nap items (if staying for nap time)</li>
      </ul>
      
      <p>Our parent portal is now active for your family. You can access it <a href="{{parentPortalUrl}}">here</a> using the credentials we'll send separately.</p>
      
      <p>If you have any questions or concerns, please don't hesitate to reach out.</p>
      
      <p>Welcome aboard!</p>
      
      <p>The Little Sprouts Team</p>
    `,
    variables: ['parentName', 'childName', 'startDate', 'program', 'teacherName', 'dropoffTime', 'pickupTime', 'parentPortalUrl'],
    trigger: 'immediate'
  },
  {
    id: 'weekly_newsletter',
    type: 'weekly_newsletter',
    subject: 'This Week at Little Sprouts - {{weekOf}}',
    content: `
      <h1>Little Sprouts Weekly Update</h1>
      <h2>Week of {{weekOf}}</h2>
      
      <p>Dear Little Sprouts Families,</p>
      
      <h2>🌟 This Week's Highlights</h2>
      <ul>
        <li>{{highlight1}}</li>
        <li>{{highlight2}}</li>
        <li>{{highlight3}}</li>
      </ul>
      
      <h2>📚 Learning Themes</h2>
      <p><strong>Infants/Toddlers:</strong> {{infantTheme}}</p>
      <p><strong>Preschool:</strong> {{preschoolTheme}}</p>
      <p><strong>Pre-K:</strong> {{prekTheme}}</p>
      
      <h2>🎉 Upcoming Events</h2>
      <ul>
        <li>{{event1}}</li>
        <li>{{event2}}</li>
      </ul>
      
      <h2>📋 Important Reminders</h2>
      <ul>
        <li>{{reminder1}}</li>
        <li>{{reminder2}}</li>
      </ul>
      
      <h2>🏆 Student Spotlight</h2>
      <p>{{studentSpotlight}}</p>
      
      <p>Thank you for being part of our community!</p>
      
      <p>Best wishes,<br>
      The Little Sprouts Team</p>
    `,
    variables: ['weekOf', 'highlight1', 'highlight2', 'highlight3', 'infantTheme', 'preschoolTheme', 'prekTheme', 'event1', 'event2', 'reminder1', 'reminder2', 'studentSpotlight'],
    trigger: 'scheduled'
  },
  {
    id: 'emergency_alert',
    type: 'emergency_alert',
    subject: '🚨 URGENT: {{alertType}} - Little Sprouts Nursery',
    content: `
      <div style="background: #fef2f2; border: 2px solid #f87171; padding: 20px; border-radius: 8px;">
        <h1 style="color: #dc2626; margin-top: 0;">🚨 URGENT NOTICE</h1>
        
        <p><strong>Alert Type:</strong> {{alertType}}</p>
        <p><strong>Date/Time:</strong> {{timestamp}}</p>
        
        <h2>Important Information</h2>
        <p>{{emergencyMessage}}</p>
        
        <div style="background: white; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3>Immediate Actions Required:</h3>
          <ul>
            <li>{{action1}}</li>
            <li>{{action2}}</li>
            <li>{{action3}}</li>
          </ul>
        </div>
        
        <p><strong>Contact Information:</strong></p>
        <p>Emergency Line: {{emergencyPhone}}<br>
        Email: {{adminEmail}}</p>
        
        <p>We will update you as more information becomes available.</p>
        
        <p>Little Sprouts Administration</p>
      </div>
    `,
    variables: ['alertType', 'timestamp', 'emergencyMessage', 'action1', 'action2', 'action3', 'emergencyPhone', 'adminEmail'],
    trigger: 'immediate'
  }
]

// Email automation service
export class EmailAutomationService {
  private static instance: EmailAutomationService
  private sequences: Map<string, EmailSequence> = new Map()

  static getInstance(): EmailAutomationService {
    if (!EmailAutomationService.instance) {
      EmailAutomationService.instance = new EmailAutomationService()
    }
    return EmailAutomationService.instance
  }

  // Trigger email sequence
  async triggerSequence(
    sequenceType: EmailTemplateType,
    recipientEmail: string,
    variables: Record<string, string>,
    delay?: number
  ): Promise<void> {
    const template = emailTemplates.find(t => t.type === sequenceType)
    if (!template) {
      throw new Error(`Email template not found: ${sequenceType}`)
    }

    const emailData = {
      to: recipientEmail,
      subject: this.replaceVariables(template.subject, variables),
      content: this.replaceVariables(template.content, variables),
      delay: delay || template.delay || 0
    }

    if (emailData.delay > 0) {
      // Schedule email for later
      this.scheduleEmail(emailData, emailData.delay)
    } else {
      // Send immediately
      await this.sendEmail(emailData)
    }
  }

  // Replace template variables
  private replaceVariables(template: string, variables: Record<string, string>): string {
    let result = template
    Object.keys(variables).forEach(key => {
      const placeholder = `{{${key}}}`
      result = result.replace(new RegExp(placeholder, 'g'), variables[key])
    })
    return result
  }

  // Send email via API
  private async sendEmail(emailData: {
    to: string
    subject: string
    content: string
  }): Promise<void> {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`)
      }

      console.log('Email sent successfully to:', emailData.to)
    } catch (error) {
      console.error('Error sending email:', error)
      // Could implement retry logic here
    }
  }

  // Schedule email for later delivery
  private scheduleEmail(emailData: any, delayHours: number): void {
    const delayMs = delayHours * 60 * 60 * 1000
    
    setTimeout(() => {
      this.sendEmail(emailData)
    }, delayMs)
  }

  // Batch send emails
  async sendBatchEmails(
    emails: Array<{
      to: string
      templateType: EmailTemplateType
      variables: Record<string, string>
    }>
  ): Promise<void> {
    const promises = emails.map(email => 
      this.triggerSequence(email.templateType, email.to, email.variables)
    )

    await Promise.allSettled(promises)
  }
}

// Email sequence management
interface EmailSequence {
  id: string
  name: string
  emails: Array<{
    template: EmailTemplateType
    delay: number // hours after previous email
  }>
}

// Common email automation triggers
export function useEmailAutomation() {
  const emailService = EmailAutomationService.getInstance()

  const sendWelcomeEmail = async (parentName: string, childName: string, email: string) => {
    await emailService.triggerSequence('welcome', email, {
      parentName,
      childName,
      virtualTourUrl: `${window.location.origin}/virtual-tour`,
      programsUrl: `${window.location.origin}/programs`,
      testimonialsUrl: `${window.location.origin}/testimonials`
    })
  }

  const sendTourConfirmation = async (
    parentName: string,
    email: string,
    tourDate: string,
    tourTime: string
  ) => {
    await emailService.triggerSequence('tour_confirmation', email, {
      parentName,
      tourDate,
      tourTime,
      phoneNumber: '(555) 123-4567'
    })
  }

  const sendEnrollmentWelcome = async (
    parentName: string,
    childName: string,
    email: string,
    enrollmentDetails: {
      startDate: string
      program: string
      teacherName: string
      dropoffTime: string
      pickupTime: string
    }
  ) => {
    await emailService.triggerSequence('enrollment_welcome', email, {
      parentName,
      childName,
      ...enrollmentDetails,
      parentPortalUrl: `${window.location.origin}/parent-portal`
    })
  }

  const sendEmergencyAlert = async (
    emails: string[],
    alertType: string,
    message: string,
    actions: string[]
  ) => {
    const emailPromises = emails.map(email =>
      emailService.triggerSequence('emergency_alert', email, {
        alertType,
        timestamp: new Date().toLocaleString(),
        emergencyMessage: message,
        action1: actions[0] || '',
        action2: actions[1] || '',
        action3: actions[2] || '',
        emergencyPhone: '(555) 123-4567',
        adminEmail: 'admin@littlesproutsnursery.com'
      })
    )

    await Promise.allSettled(emailPromises)
  }

  return {
    sendWelcomeEmail,
    sendTourConfirmation,
    sendEnrollmentWelcome,
    sendEmergencyAlert
  }
}

// Email template editor component
export function EmailTemplateEditor({ 
  template, 
  onSave 
}: { 
  template: EmailTemplate
  onSave: (template: EmailTemplate) => void 
}) {
  const [editedTemplate, setEditedTemplate] = useState(template)

  const handleSave = () => {
    onSave(editedTemplate)
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Edit Email Template</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Subject Line</label>
          <input
            type="text"
            value={editedTemplate.subject}
            onChange={(e) => setEditedTemplate({
              ...editedTemplate,
              subject: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Content</label>
          <textarea
            value={editedTemplate.content}
            onChange={(e) => setEditedTemplate({
              ...editedTemplate,
              content: e.target.value
            })}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Variables Available</label>
          <p className="text-sm text-gray-600">
            {editedTemplate.variables.map(v => `{{${v}}}`).join(', ')}
          </p>
        </div>

        <div className="flex space-x-3">
          <Button onClick={handleSave}>
            Save Template
          </Button>
          <Button variant="outline" onClick={() => setEditedTemplate(template)}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  )
}