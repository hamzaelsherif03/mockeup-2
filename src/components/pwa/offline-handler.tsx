'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function OfflineHandler() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineBanner, setShowOfflineBanner] = useState(false)
  const [pendingForms, setPendingForms] = useState<string[]>([])

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)
      
      if (!online) {
        setShowOfflineBanner(true)
      } else {
        // When coming back online, hide banner after a delay
        setTimeout(() => {
          setShowOfflineBanner(false)
        }, 3000)
      }
    }

    // Set initial status
    updateOnlineStatus()

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Check for pending forms in localStorage
    const checkPendingForms = () => {
      const pending = []
      if (localStorage.getItem('pending-contact-form')) {
        pending.push('Contact Form')
      }
      if (localStorage.getItem('pending-tour-request')) {
        pending.push('Tour Request')
      }
      if (localStorage.getItem('pending-enrollment-form')) {
        pending.push('Enrollment Form')
      }
      setPendingForms(pending)
    }

    checkPendingForms()

    // Check periodically for pending forms
    const interval = setInterval(checkPendingForms, 5000)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      clearInterval(interval)
    }
  }, [])

  const handleRetryForms = () => {
    // Trigger background sync if service worker is available
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        const syncManager = (registration as any).sync
        if (syncManager) {
          if (localStorage.getItem('pending-contact-form')) {
            syncManager.register('contact-form')
          }
          if (localStorage.getItem('pending-tour-request')) {
            syncManager.register('tour-request')
          }
          if (localStorage.getItem('pending-enrollment-form')) {
            syncManager.register('enrollment-form')
          }
        }
      })
    }
  }

  return (
    <>
      {/* Offline Banner */}
      <AnimatePresence>
        {showOfflineBanner && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <div className={`px-4 py-3 text-center text-white ${
              isOnline ? 'bg-green-600' : 'bg-orange-600'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                {isOnline ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>You're back online!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>You're offline. Some features may not work.</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Forms Notification */}
      <AnimatePresence>
        {isOnline && pendingForms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-4 right-4 z-50 max-w-sm"
          >
            <Card className="p-4 shadow-lg border-l-4 border-l-blue-500 bg-blue-50">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-900 mb-1">
                    Pending Forms
                  </h3>
                  <p className="text-xs text-blue-700 mb-2">
                    {pendingForms.length} form{pendingForms.length > 1 ? 's' : ''} will be submitted automatically.
                  </p>
                  <ul className="text-xs text-blue-600 mb-3">
                    {pendingForms.map((form, index) => (
                      <li key={index}>• {form}</li>
                    ))}
                  </ul>
                  <Button
                    onClick={handleRetryForms}
                    size="sm"
                    className="text-xs bg-blue-600 hover:bg-blue-700"
                  >
                    Retry Now
                  </Button>
                </div>
                <button
                  onClick={() => setPendingForms([])}
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  aria-label="Dismiss pending forms notification"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Form storage utilities for offline functionality
export function storeFormDataOffline(formType: string, data: any) {
  const timestamp = new Date().toISOString()
  const formData = {
    ...data,
    timestamp,
    formType
  }
  
  localStorage.setItem(`pending-${formType}`, JSON.stringify(formData))
  
  // Store in IndexedDB for background sync
  if ('indexedDB' in window) {
    const request = indexedDB.open('NurseryFormData', 1)
    
    request.onerror = () => {
      console.error('Failed to open IndexedDB')
    }
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['forms'], 'readwrite')
      const store = transaction.objectStore('forms')
      
      store.put({
        id: formType,
        data: formData,
        timestamp
      })
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('forms')) {
        db.createObjectStore('forms', { keyPath: 'id' })
      }
    }
  }
  
  // Register background sync if available
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then(registration => {
      const syncManager = (registration as any).sync
      if (syncManager) {
        syncManager.register(formType)
      }
    })
  }
}

export function removeStoredFormData(formType: string) {
  localStorage.removeItem(`pending-${formType}`)
  
  // Remove from IndexedDB
  if ('indexedDB' in window) {
    const request = indexedDB.open('NurseryFormData', 1)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['forms'], 'readwrite')
      const store = transaction.objectStore('forms')
      store.delete(formType)
    }
  }
}

// Offline-aware fetch wrapper
export async function offlineFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return response
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error('You are offline. This action will be retried when you reconnect.')
    }
    throw error
  }
}

// Component to handle offline form submissions
export function OfflineFormWrapper({
  children,
  onSubmit,
  formType,
  className = ''
}: {
  children: React.ReactNode
  onSubmit: (data: any) => Promise<void>
  formType: string
  className?: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      if (navigator.onLine) {
        // Online - submit immediately
        await onSubmit(data)
        setSuccess(true)
        removeStoredFormData(formType)
      } else {
        // Offline - store for later submission
        storeFormDataOffline(formType, data)
        setSuccess(true)
        
        // Show offline message
        setTimeout(() => {
          setError('Form saved! It will be submitted when you\'re back online.')
        }, 1000)
      }
    } catch (error) {
      if (!navigator.onLine) {
        // Store form data if submission failed due to being offline
        storeFormDataOffline(formType, data)
        setError('You\'re offline. Form saved and will be submitted when you reconnect.')
      } else {
        setError(error instanceof Error ? error.message : 'Submission failed')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      {children}
      
      {/* Status Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-3 rounded-md text-sm ${
              error.includes('offline') || error.includes('saved')
                ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          </motion.div>
        )}
        
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 rounded-md text-sm bg-green-50 text-green-800 border border-green-200"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Form submitted successfully!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}