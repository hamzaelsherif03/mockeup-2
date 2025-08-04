'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Phone, MessageCircle, CheckCircle, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContactFormData {
  name: string
  email: string
  phone: string
  inquiryType: string
  subject: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const inquiryTypes = [
    { value: 'enrollment', label: 'Enrollment Information' },
    { value: 'programs', label: 'Program Details' },
    { value: 'pricing', label: 'Pricing & Fees' },
    { value: 'tour', label: 'Schedule a Tour' },
    { value: 'current-parent', label: 'Current Parent Question' },
    { value: 'other', label: 'Other' }
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Submit to API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert(result.error || 'Failed to send message. Please try again or call us directly.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please check your connection or call us at (555) 123-4567.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for reaching out to Little Sprouts. We've received your message and will respond within 24 hours.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Inquiry Type:</span>
                <span>{inquiryTypes.find(type => type.value === formData.inquiryType)?.label}</span>
              </div>
              {formData.subject && (
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Subject:</span>
                  <span className="text-right">{formData.subject}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="font-medium">Contact:</span>
                <span>{formData.email}</span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  inquiryType: '',
                  subject: '',
                  message: ''
                })
              }}
              className="mt-4 w-full"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-center">
          Contact Little Sprouts
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Have questions? We're here to help! Send us a message and we'll get back to you within 24 hours.
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Optional - for faster response</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-border'
                }`}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Inquiry Type */}
          <div>
            <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
              What can we help you with? *
            </label>
            <div className="relative">
              <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                id="inquiryType"
                value={formData.inquiryType}
                onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none ${
                  errors.inquiryType ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">Select inquiry type</option>
                {inquiryTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.inquiryType && (
              <p className="text-red-500 text-xs mt-1">{errors.inquiryType}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Brief subject line (optional)"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                  errors.message ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Please share your questions, concerns, or tell us how we can help you..."
              />
            </div>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* Helpful suggestions based on inquiry type */}
          {formData.inquiryType && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">Helpful Information to Include:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                {formData.inquiryType === 'enrollment' && (
                  <>
                    <li>• Your child's age and desired start date</li>
                    <li>• Preferred program type (full-time, part-time)</li>
                    <li>• Any special needs or considerations</li>
                  </>
                )}
                {formData.inquiryType === 'programs' && (
                  <>
                    <li>• Specific age group you're interested in</li>
                    <li>• Questions about curriculum or daily activities</li>
                    <li>• Teacher qualifications or class sizes</li>
                  </>
                )}
                {formData.inquiryType === 'tour' && (
                  <>
                    <li>• Preferred dates and times for your visit</li>
                    <li>• Whether you prefer in-person or virtual tour</li>
                    <li>• Number of children and their ages</li>
                  </>
                )}
                {formData.inquiryType === 'pricing' && (
                  <>
                    <li>• Program type you're considering</li>
                    <li>• Full-time or part-time enrollment</li>
                    <li>• Questions about payment plans or discounts</li>
                  </>
                )}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="nursery"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Message...
              </>
            ) : (
              'Send Message'
            )}
          </Button>

          {/* Contact alternatives */}
          <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
            <p className="mb-2">Prefer to contact us directly?</p>
            <div className="flex justify-center space-x-6">
              <a href="tel:+15551234567" className="flex items-center hover:text-primary">
                <Phone className="h-4 w-4 mr-1" />
                (555) 123-4567
              </a>
              <a href="mailto:info@littlesprouts.com" className="flex items-center hover:text-primary">
                <Mail className="h-4 w-4 mr-1" />
                Email Us
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}