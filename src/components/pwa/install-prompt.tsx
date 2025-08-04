'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if app is already installed or running in standalone mode
    const checkInstallStatus = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
      const isIOSStandalone = (window.navigator as any).standalone === true
      const isPWAInstalled = isStandaloneMode || isIOSStandalone
      
      setIsStandalone(isPWAInstalled)
      setIsInstalled(isPWAInstalled)
    }

    checkInstallStatus()

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show install prompt after a delay (don't be too aggressive)
      setTimeout(() => {
        if (!isInstalled) {
          setShowPrompt(true)
        }
      }, 5000)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      // Show the install prompt
      await deferredPrompt.prompt()

      // Wait for the user's response
      const { outcome } = await deferredPrompt.userChoice
      
      console.log(`User response to install prompt: ${outcome}`)
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      }

      // Clear the saved prompt
      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
      console.error('Error showing install prompt:', error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  // Don't show if already installed, dismissed, or no prompt available
  if (isInstalled || !deferredPrompt || !showPrompt) {
    return null
  }

  // Check if user has already dismissed this session
  if (sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
      >
        <Card className="p-4 shadow-lg border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Install Little Sprouts App
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Get quick access to schedules, updates, and more. Works offline too!
              </p>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="text-xs"
                >
                  Install App
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Not Now
                </Button>
              </div>
            </div>
            
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss install prompt"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

// iOS-specific install prompt (since iOS doesn't support beforeinstallprompt)
export function IOSInstallPrompt() {
  const [showIOSPrompt, setShowIOSPrompt] = useState(false)

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isInStandaloneMode = (window.navigator as any).standalone === true
    const hasBeenPrompted = sessionStorage.getItem('ios-install-prompted')

    // Show iOS install instructions if on iOS, not in standalone mode, and hasn't been prompted
    if (isIOS && !isInStandaloneMode && !hasBeenPrompted) {
      setTimeout(() => {
        setShowIOSPrompt(true)
      }, 8000) // Show after 8 seconds
    }
  }, [])

  const handleDismiss = () => {
    setShowIOSPrompt(false)
    sessionStorage.setItem('ios-install-prompted', 'true')
  }

  if (!showIOSPrompt) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50"
      >
        <Card className="p-4 shadow-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Add to Home Screen
              </h3>
              <div className="text-xs text-gray-600 mb-3 space-y-1">
                <p>Install this app on your iPhone:</p>
                <div className="flex items-center space-x-1">
                  <span>1. Tap</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 5l.001 8c0 1.1-.9 2-2 2s-2-.9-2-2h-1c-1.1 0-2-.9-2-2s.9-2 2-2h1l-.001-4h2L16 5zM12 1C6.48 1 2 5.48 2 12s4.48 11 11 11 11-4.48 11-11S17.52 1 12 1zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
                  </svg>
                  <span>in Safari</span>
                </div>
                <p>2. Select "Add to Home Screen"</p>
              </div>
            </div>
            
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss iOS install prompt"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

// PWA status indicator for development/debugging
export function PWAStatus() {
  const [status, setStatus] = useState<{
    isOnline: boolean
    isInstalled: boolean
    swStatus: 'loading' | 'ready' | 'error'
  }>({
    isOnline: navigator.onLine,
    isInstalled: false,
    swStatus: 'loading'
  })

  useEffect(() => {
    // Check installation status
    const checkInstallStatus = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
      const isIOSStandalone = (window.navigator as any).standalone === true
      setStatus(prev => ({
        ...prev,
        isInstalled: isStandaloneMode || isIOSStandalone
      }))
    }

    // Check service worker status
    const checkSWStatus = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready
          setStatus(prev => ({
            ...prev,
            swStatus: registration ? 'ready' : 'error'
          }))
        } catch (error) {
          setStatus(prev => ({
            ...prev,
            swStatus: 'error'
          }))
        }
      } else {
        setStatus(prev => ({
          ...prev,
          swStatus: 'error'
        }))
      }
    }

    // Online/offline status
    const handleOnline = () => setStatus(prev => ({ ...prev, isOnline: true }))
    const handleOffline = () => setStatus(prev => ({ ...prev, isOnline: false }))

    checkInstallStatus()
    checkSWStatus()

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('appinstalled', () => {
      setStatus(prev => ({ ...prev, isInstalled: true }))
    })

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
      <div>PWA Status:</div>
      <div className={`${status.isOnline ? 'text-green-400' : 'text-red-400'}`}>
        {status.isOnline ? '🟢 Online' : '🔴 Offline'}
      </div>
      <div className={`${status.isInstalled ? 'text-green-400' : 'text-yellow-400'}`}>
        {status.isInstalled ? '📱 Installed' : '📱 Not Installed'}
      </div>
      <div className={`${
        status.swStatus === 'ready' ? 'text-green-400' : 
        status.swStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
      }`}>
        SW: {status.swStatus}
      </div>
    </div>
  )
}