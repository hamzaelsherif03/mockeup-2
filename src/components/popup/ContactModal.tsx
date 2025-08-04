'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, CheckCircle, Heart, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuickContactForm } from './QuickContactForm'
import { QuickContactData } from '@/lib/popup-utils'
import { ACTIVE_POSITION, POPUP_TRANSITION } from './PopupPositions'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  triggerSource?: string
}

export function ContactModal({ isOpen, onClose, triggerSource }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<QuickContactData | null>(null)

  const handleSubmit = async (data: QuickContactData) => {
    // Submit to API
    const response = await fetch('/api/quick-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        source: triggerSource || 'unknown'
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to submit contact information')
    }

    setSubmittedData(data)
  }

  const handleSuccess = () => {
    setIsSubmitted(true)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setSubmittedData(null)
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              <motion.div
                initial={ACTIVE_POSITION.initial}
                animate={ACTIVE_POSITION.animate}
                exit={ACTIVE_POSITION.exit}
                transition={POPUP_TRANSITION}
                className={ACTIVE_POSITION.className}
              >
                <div className="w-full max-w-[95vw] sm:max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-border max-h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-accent p-4 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                          <h2 className="font-serif font-bold text-lg text-white">Little Sprouts</h2>
                          <p className="text-white/90 text-xs">Where Little Minds Grow Big Dreams</p>
                        </div>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                          aria-label="Close dialog"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {!isSubmitted ? (
                      <QuickContactForm
                        onSubmit={handleSubmit}
                        onSuccess={handleSuccess}
                        triggerSource={triggerSource}
                      />
                    ) : (
                      <SuccessMessage 
                        data={submittedData} 
                        onClose={handleClose}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

function SuccessMessage({ data, onClose }: { data: QuickContactData | null; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="text-center py-4"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <CheckCircle className="h-8 w-8 text-green-600" />
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h3 className="text-xl font-serif font-bold mb-2 text-gray-900">
          Thank You, {data?.name?.split(' ')[0] || 'Friend'}! 
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          We've received your information and are excited to connect with you. 
          You'll hear from our team within 24 hours.
        </p>
      </motion.div>

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="bg-muted/50 rounded-lg p-4 mb-4 text-left"
      >
        <h4 className="font-medium text-sm mb-2 flex items-center">
          <Heart className="h-4 w-4 text-primary mr-2" />
          What happens next:
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Our team will review your information</li>
          <li>• We'll send you a welcome email with next steps</li>
          <li>• You'll receive updates based on your interests</li>
          {data?.interestType === 'tour' && (
            <li>• We'll contact you to schedule your personal tour</li>
          )}
          {data?.interestType === 'enrollment' && (
            <li>• You'll receive enrollment information and deadlines</li>
          )}
        </ul>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="text-center text-xs text-muted-foreground border-t border-border pt-4"
      >
        <p className="mb-2">Need immediate assistance?</p>
        <div className="space-y-1">
          <a 
            href="tel:+15551234567" 
            className="text-primary hover:underline block"
          >
            📞 (555) 123-4567
          </a>
          <a 
            href="mailto:info@littlesprouts.com" 
            className="text-primary hover:underline block"
          >
            ✉️ info@littlesprouts.com
          </a>
        </div>
      </motion.div>

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0 }}
        onClick={onClose}
        className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        Continue Exploring
      </motion.button>
    </motion.div>
  )
}