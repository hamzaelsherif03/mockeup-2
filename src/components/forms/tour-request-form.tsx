'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, User, Phone, Mail, Baby, MessageCircle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface FormData {
  parentName: string
  email: string
  phone: string
  childAge: string
  preferredDate: string
  preferredTime: string
  tourType: 'in-person' | 'virtual'
  message: string
}

export function TourRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: '',
    phone: '',
    childAge: '',
    preferredDate: '',
    preferredTime: '',
    tourType: 'in-person',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.childAge) {
      newErrors.childAge = 'Child age is required'
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required'
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required'
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
      const response = await fetch('/api/tour-request', {
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
        alert(result.error || 'Failed to submit tour request. Please try again or call us directly.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit tour request. Please check your connection or call us at (555) 123-4567.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
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
            <h3 className="text-xl font-semibold mb-2">Tour Request Received!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest in Little Sprouts. We'll contact you within 24 hours to confirm your tour details.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Tour Type:</span>
                <span className="capitalize">{formData.tourType} Tour</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Preferred Date:</span>
                <span>{new Date(formData.preferredDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Preferred Time:</span>
                <span>{formData.preferredTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-center">
          Schedule Your Tour
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Take the first step in your child's learning journey. We can't wait to meet you!
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tour Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Tour Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange('tourType', 'in-person')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.tourType === 'in-person'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <User className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-medium">In-Person Tour</div>
                <div className="text-xs text-muted-foreground">Visit our facility</div>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('tourType', 'virtual')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.tourType === 'virtual'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <MessageCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-medium">Virtual Tour</div>
                <div className="text-xs text-muted-foreground">Online meeting</div>
              </button>
            </div>
          </div>

          {/* Parent Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium mb-2">
                Parent/Guardian Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="parentName"
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.parentName ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Your full name"
                />
              </div>
              {errors.parentName && (
                <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>
              )}
            </div>

            <div>
              <label htmlFor="childAge" className="block text-sm font-medium mb-2">
                Child's Age *
              </label>
              <div className="relative">
                <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  id="childAge"
                  value={formData.childAge}
                  onChange={(e) => handleInputChange('childAge', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none ${
                    errors.childAge ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="">Select age range</option>
                  <option value="6weeks-18months">6 weeks - 18 months</option>
                  <option value="18months-3years">18 months - 3 years</option>
                  <option value="3-4years">3 - 4 years</option>
                  <option value="4-5years">4 - 5 years</option>
                  <option value="multiple">Multiple children</option>
                </select>
              </div>
              {errors.childAge && (
                <p className="text-red-500 text-xs mt-1">{errors.childAge}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="(555) 123-4567"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Tour Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium mb-2">
                Preferred Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.preferredDate ? 'border-red-500' : 'border-border'
                  }`}
                />
              </div>
              {errors.preferredDate && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium mb-2">
                Preferred Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  id="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none ${
                    errors.preferredTime ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="">Select time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              {errors.preferredTime && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>
              )}
            </div>
          </div>

          {/* Additional Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Questions or Special Requests
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Tell us about any special needs, questions about our programs, or anything else we should know..."
            />
          </div>

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
                Scheduling Your Tour...
              </>
            ) : (
              'Schedule My Tour'
            )}
          </Button>

          {/* Trust Indicators */}
          <div className="text-center text-xs text-muted-foreground">
            We'll contact you within 24 hours to confirm your tour. 
            Your information is secure and never shared.
          </div>
        </form>
      </CardContent>
    </Card>
  )
}