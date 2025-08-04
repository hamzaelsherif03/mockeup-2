'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, Mail, Phone, HelpCircle, CheckCircle, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { 
  QuickContactData, 
  INTEREST_TYPES, 
  validateQuickContactData,
  getPopupState,
  savePopupState 
} from '@/lib/popup-utils'

interface QuickContactFormProps {
  onSubmit: (data: QuickContactData) => Promise<void>
  onSuccess: () => void
  triggerSource?: string
}

export function QuickContactForm({ onSubmit, onSuccess, triggerSource }: QuickContactFormProps) {
  const [formData, setFormData] = useState<QuickContactData>({
    name: '',
    email: '',
    phone: '',
    interestType: '',
    optedIn: true
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof QuickContactData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = validateQuickContactData(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      
      // Update popup state to mark as submitted
      const currentState = getPopupState()
      savePopupState({
        ...currentState,
        submissionCount: currentState.submissionCount + 1,
        isOpen: false
      })
      
      onSuccess()
    } catch (error) {
      console.error('Error submitting quick contact form:', error)
      setErrors({ 
        submit: 'Failed to send your information. Please try again or call us directly at (555) 123-4567.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header with benefits */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <Heart className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-xl font-serif font-bold">Stay Connected with Little Sprouts!</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Get updates on programs, enrollment opportunities, and special events
        </p>
      </div>

      {/* Name Field */}
      <div>
        <label htmlFor="popup-name" className="block text-sm font-medium mb-1">
          Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="popup-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${
              errors.name ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Your full name"
            disabled={isSubmitting}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="popup-email" className="block text-sm font-medium mb-1">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="popup-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm ${
              errors.email ? 'border-red-500' : 'border-border'
            }`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="popup-phone" className="block text-sm font-medium mb-1">
          Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="popup-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            placeholder="(555) 123-4567"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Interest Type */}
      <div>
        <label htmlFor="popup-interest" className="block text-sm font-medium mb-1">
          I'm interested in *
        </label>
        <div className="relative">
          <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            id="popup-interest"
            value={formData.interestType}
            onChange={(e) => handleInputChange('interestType', e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none text-sm ${
              errors.interestType ? 'border-red-500' : 'border-border'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select what interests you</option>
            {INTEREST_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        {errors.interestType && (
          <p className="text-red-500 text-xs mt-1">{errors.interestType}</p>
        )}
      </div>

      {/* Opt-in Checkbox */}
      <div className="flex items-start space-x-3">
        <input
          id="popup-optin"
          type="checkbox"
          checked={formData.optedIn}
          onChange={(e) => handleInputChange('optedIn', e.target.checked)}
          className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
          disabled={isSubmitting}
        />
        <label htmlFor="popup-optin" className="text-xs text-muted-foreground leading-relaxed">
          I'd like to receive updates about Little Sprouts programs, events, and enrollment opportunities. 
          <span className="block mt-1 text-xs">
            <em>No spam, unsubscribe anytime. Your privacy matters to us.</em>
          </span>
        </label>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{errors.submit}</p>
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
            Sending...
          </>
        ) : (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Keep Me Informed
          </>
        )}
      </Button>

      {/* Trust signals */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Join 500+ families who trust Little Sprouts with their children's early education
        </p>
      </div>

      {/* Benefits preview based on interest type */}
      {formData.interestType && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="bg-accent/10 rounded-lg p-3 mt-4"
        >
          <p className="text-xs font-medium mb-1">You'll receive:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {formData.interestType === 'tour' && (
              <>
                <li>• Priority scheduling for personal tours</li>
                <li>• Virtual tour access and facility updates</li>
                <li>• Special enrollment promotions</li>
              </>
            )}
            {formData.interestType === 'enrollment' && (
              <>
                <li>• Early enrollment notifications</li>
                <li>• Application deadline reminders</li>
                <li>• Enrollment assistance and guidance</li>
              </>
            )}
            {formData.interestType === 'programs' && (
              <>
                <li>• Program updates and curriculum changes</li>
                <li>• Age-appropriate activity ideas</li>
                <li>• Teacher spotlight features</li>
              </>
            )}
            {formData.interestType === 'pricing' && (
              <>
                <li>• Current pricing and fee schedules</li>
                <li>• Payment plan options</li>
                <li>• Sibling and multi-child discounts</li>
              </>
            )}
            {formData.interestType === 'general' && (
              <>
                <li>• General nursery updates and news</li>
                <li>• Community events and activities</li>
                <li>• Parenting tips and resources</li>
              </>
            )}
          </ul>
        </motion.div>
      )}
    </form>
  )
}