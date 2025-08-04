'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Types for privacy compliance
interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
  timestamp: string
}

interface PrivacySettings {
  cookies: CookieConsent
  dataRetention: 'minimal' | 'standard' | 'extended'
  communications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  dataSharing: {
    analytics: boolean
    marketing: boolean
    partners: boolean
  }
}

// Cookie Consent Banner
export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: ''
  })

  useEffect(() => {
    // Check if consent has already been given
    const savedConsent = localStorage.getItem('cookie-consent')
    if (!savedConsent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 2000)
    } else {
      const parsedConsent = JSON.parse(savedConsent)
      setConsent(parsedConsent)
      applyCookieSettings(parsedConsent)
    }
  }, [])

  const saveConsent = (consentData: CookieConsent) => {
    const consentWithTimestamp = {
      ...consentData,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('cookie-consent', JSON.stringify(consentWithTimestamp))
    setConsent(consentWithTimestamp)
    applyCookieSettings(consentWithTimestamp)
    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: ''
    })
  }

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: ''
    })
  }

  const applyCookieSettings = (settings: CookieConsent) => {
    // Enable/disable Google Analytics
    if (settings.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    } else if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }

    // Enable/disable marketing cookies
    if (settings.marketing && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      })
    } else if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      })
    }

    // Disable functional cookies if not consented
    if (!settings.functional) {
      // Remove non-essential cookies
      document.cookie.split(";").forEach(cookie => {
        const eqPos = cookie.indexOf("=")
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
        if (!['cookie-consent', '_ga', '_gid'].includes(name)) {
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
        }
      })
    }
  }

  return (
    <>
      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-gray-600 max-w-2xl">
                    We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                    You can choose which cookies to accept. Essential cookies are required for the site to function.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    size="sm"
                  >
                    Cookie Settings
                  </Button>
                  <Button
                    onClick={acceptNecessary}
                    variant="outline"
                    size="sm"
                  >
                    Essential Only
                  </Button>
                  <Button
                    onClick={acceptAll}
                    size="sm"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Preferences</h2>
              
              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Required for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded opacity-50"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-gray-900">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Help us understand how visitors interact with our website by collecting anonymous data.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={(e) => setConsent(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-gray-900">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Used to show you relevant advertisements and measure the effectiveness of our marketing campaigns.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={(e) => setConsent(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-gray-900">Functional Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Enable enhanced functionality like remembering your preferences and personalizing your experience.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.functional}
                      onChange={(e) => setConsent(prev => ({ ...prev, functional: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => saveConsent(consent)}
                >
                  Save Preferences
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Privacy Settings Dashboard
export function PrivacySettingsDashboard() {
  const [settings, setSettings] = useState<PrivacySettings>({
    cookies: {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: ''
    },
    dataRetention: 'standard',
    communications: {
      email: true,
      sms: false,
      push: false
    },
    dataSharing: {
      analytics: false,
      marketing: false,
      partners: false
    }
  })

  useEffect(() => {
    loadPrivacySettings()
  }, [])

  const loadPrivacySettings = () => {
    // Load from localStorage or API
    const savedConsent = localStorage.getItem('cookie-consent')
    if (savedConsent) {
      const consent = JSON.parse(savedConsent)
      setSettings(prev => ({ ...prev, cookies: consent }))
    }
  }

  const updateSettings = async (newSettings: Partial<PrivacySettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)

    try {
      // Save to server
      await fetch('/api/privacy/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      })
    } catch (error) {
      console.error('Error saving privacy settings:', error)
    }
  }

  const downloadData = async () => {
    try {
      const response = await fetch('/api/privacy/data-export')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'my-data-export.json'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading data:', error)
    }
  }

  const deleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await fetch('/api/privacy/delete-account', { method: 'DELETE' })
        // Redirect to confirmation page
        window.location.href = '/account-deleted'
      } catch (error) {
        console.error('Error deleting account:', error)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Settings</h1>
        <p className="text-gray-600">Manage your privacy preferences and data settings</p>
      </div>

      {/* Cookie Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookie Preferences</h2>
        <div className="space-y-4">
          {[
            { key: 'analytics', label: 'Analytics Cookies', description: 'Help us improve our website' },
            { key: 'marketing', label: 'Marketing Cookies', description: 'Personalized advertising' },
            { key: 'functional', label: 'Functional Cookies', description: 'Enhanced website features' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{label}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <input
                type="checkbox"
                checked={settings.cookies[key as keyof typeof settings.cookies] as boolean}
                onChange={(e) => updateSettings({
                  cookies: { ...settings.cookies, [key]: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Communication Preferences */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Communication Preferences</h2>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
            { key: 'sms', label: 'SMS Notifications', description: 'Receive urgent alerts via text' },
            { key: 'push', label: 'Push Notifications', description: 'Browser push notifications' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{label}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <input
                type="checkbox"
                checked={settings.communications[key as keyof typeof settings.communications]}
                onChange={(e) => updateSettings({
                  communications: { ...settings.communications, [key]: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Data Retention */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h2>
        <p className="text-sm text-gray-600 mb-4">How long should we keep your data?</p>
        <div className="space-y-3">
          {[
            { value: 'minimal', label: 'Minimal (1 year)', description: 'Delete data after 1 year' },
            { value: 'standard', label: 'Standard (3 years)', description: 'Keep data for 3 years (recommended)' },
            { value: 'extended', label: 'Extended (7 years)', description: 'Keep data for 7 years' }
          ].map(({ value, label, description }) => (
            <label key={value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="dataRetention"
                value={value}
                checked={settings.dataRetention === value}
                onChange={(e) => updateSettings({ dataRetention: e.target.value as any })}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">{label}</span>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* Data Rights */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Data Rights</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Download Your Data</h3>
              <p className="text-sm text-gray-600">Get a copy of all your personal data</p>
            </div>
            <Button onClick={downloadData} variant="outline">
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Request Data Correction</h3>
              <p className="text-sm text-gray-600">Ask us to correct or update your information</p>
            </div>
            <Button variant="outline">
              Contact Us
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Delete Account</h3>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <Button onClick={deleteAccount} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Compliance Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">COPPA Compliance</h3>
            <p className="text-sm text-gray-600">
              We comply with the Children's Online Privacy Protection Act and do not knowingly collect 
              personal information from children under 13 without parental consent.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">FERPA Compliance</h3>
            <p className="text-sm text-gray-600">
              Educational records are protected under the Family Educational Rights and Privacy Act. 
              Access is strictly controlled and limited to authorized personnel.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">CCPA Rights</h3>
            <p className="text-sm text-gray-600">
              California residents have additional rights including the right to know, delete, 
              and opt-out of the sale of personal information.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Data Security</h3>
            <p className="text-sm text-gray-600">
              All data is encrypted in transit and at rest. We use industry-standard security 
              measures to protect your information.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Privacy Policy Modal
export function PrivacyPolicyModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, enroll your child, or contact us.</p>
          
          <h2>How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, communicate with you, and ensure the safety and well-being of children in our care.</p>
          
          <h2>Information Sharing</h2>
          <p>We do not sell or rent your personal information. We may share information in limited circumstances as described in this policy.</p>
          
          <h2>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          
          <h2>Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information. You may also opt out of certain communications.</p>
          
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@littlesproutsnursery.com.</p>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}