'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface PushNotificationProps {
  vapidPublicKey?: string
  onSubscriptionChange?: (subscription: PushSubscription | null) => void
}

export function PushNotificationManager({ 
  vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  onSubscriptionChange 
}: PushNotificationProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  useEffect(() => {
    // Check initial notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }

    // Check if user already has a subscription
    checkExistingSubscription()

    // Show notification prompt after some time if permission is default
    if (Notification.permission === 'default') {
      const timer = setTimeout(() => {
        const hasBeenPrompted = sessionStorage.getItem('notification-prompted')
        if (!hasBeenPrompted) {
          setShowPrompt(true)
        }
      }, 10000) // Show after 10 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const checkExistingSubscription = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready
        const existingSubscription = await registration.pushManager.getSubscription()
        
        if (existingSubscription) {
          setSubscription(existingSubscription)
          onSubscriptionChange?.(existingSubscription)
        }
      } catch (error) {
        console.error('Error checking existing subscription:', error)
      }
    }
  }

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const subscribeToNotifications = async () => {
    if (!vapidPublicKey) {
      console.error('VAPID public key not provided')
      return
    }

    setIsSubscribing(true)

    try {
      // Request notification permission
      const permission = await Notification.requestPermission()
      setPermission(permission)

      if (permission === 'granted') {
        // Get service worker registration
        const registration = await navigator.serviceWorker.ready

        // Subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        })

        setSubscription(subscription)
        onSubscriptionChange?.(subscription)

        // Send subscription to server
        await sendSubscriptionToServer(subscription)

        setShowPrompt(false)
        
        // Show success notification
        showWelcomeNotification()
      }
    } catch (error) {
      console.error('Error subscribing to push notifications:', error)
    } finally {
      setIsSubscribing(false)
    }
  }

  const unsubscribeFromNotifications = async () => {
    if (!subscription) return

    try {
      const success = await subscription.unsubscribe()
      
      if (success) {
        setSubscription(null)
        onSubscriptionChange?.(null)
        
        // Remove subscription from server
        await removeSubscriptionFromServer(subscription)
      }
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error)
    }
  }

  const sendSubscriptionToServer = async (subscription: PushSubscription) => {
    try {
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          action: 'subscribe'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send subscription to server')
      }
    } catch (error) {
      console.error('Error sending subscription to server:', error)
    }
  }

  const removeSubscriptionFromServer = async (subscription: PushSubscription) => {
    try {
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          action: 'unsubscribe'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to remove subscription from server')
      }
    } catch (error) {
      console.error('Error removing subscription from server:', error)
    }
  }

  const showWelcomeNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Welcome to Little Sprouts!', {
        body: 'You\'ll now receive updates about events, closures, and important announcements.',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: 'welcome'
      })
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    sessionStorage.setItem('notification-prompted', 'true')
  }

  // Don't show if notifications aren't supported
  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return null
  }

  return (
    <>
      {/* Notification Permission Prompt */}
      <AnimatePresence>
        {showPrompt && permission === 'default' && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
          >
            <Card className="p-4 shadow-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Stay Updated
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Get notified about important updates, events, and emergency closures.
                  </p>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={subscribeToNotifications}
                      disabled={isSubscribing}
                      size="sm"
                      className="text-xs"
                    >
                      {isSubscribing ? 'Enabling...' : 'Enable Notifications'}
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
                  aria-label="Dismiss notification prompt"
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

      {/* Notification Settings (for subscribed users) */}
      {subscription && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-green-800 font-medium">
                Notifications Enabled
              </span>
            </div>
            <Button
              onClick={unsubscribeFromNotifications}
              variant="outline"
              size="sm"
              className="text-xs border-green-300 text-green-700 hover:bg-green-100"
            >
              Disable
            </Button>
          </div>
          <p className="text-xs text-green-600 mt-2">
            You'll receive updates about events, closures, and important announcements.
          </p>
        </div>
      )}
    </>
  )
}

// Hook for sending push notifications (admin use)
export function usePushNotifications() {
  const sendNotification = async (
    message: string,
    title: string = 'Little Sprouts Nursery',
    options: {
      url?: string
      icon?: string
      badge?: string
      tag?: string
      requireInteraction?: boolean
    } = {}
  ) => {
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          options: {
            icon: options.icon || '/icons/icon-192x192.png',
            badge: options.badge || '/icons/badge-72x72.png',
            tag: options.tag || 'general',
            requireInteraction: options.requireInteraction || false,
            data: {
              url: options.url || '/',
              timestamp: Date.now()
            }
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send notification')
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending push notification:', error)
      throw error
    }
  }

  const sendEmergencyNotification = async (message: string) => {
    return sendNotification(
      message,
      '🚨 Emergency Alert - Little Sprouts',
      {
        tag: 'emergency',
        requireInteraction: true
      }
    )
  }

  const sendEventReminder = async (eventName: string, eventDate: string) => {
    return sendNotification(
      `Don't forget about ${eventName} on ${eventDate}!`,
      '📅 Event Reminder',
      {
        tag: 'event-reminder',
        url: '/events'
      }
    )
  }

  const sendClosureNotification = async (date: string, reason: string) => {
    return sendNotification(
      `We will be closed on ${date} due to ${reason}.`,
      '🏫 Closure Notice',
      {
        tag: 'closure',
        requireInteraction: true
      }
    )
  }

  return {
    sendNotification,
    sendEmergencyNotification,
    sendEventReminder,
    sendClosureNotification
  }
}

// Notification preferences component
export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    events: true,
    closures: true,
    reminders: true,
    emergency: true
  })

  const updatePreference = async (type: string, enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [type]: enabled
    }))

    // Save to server
    try {
      await fetch('/api/notification-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          enabled
        })
      })
    } catch (error) {
      console.error('Error updating notification preferences:', error)
    }
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-900">Events & Activities</label>
            <p className="text-xs text-gray-600">Get notified about upcoming events and activities</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.events}
            onChange={(e) => updatePreference('events', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-900">Closures & Delays</label>
            <p className="text-xs text-gray-600">Important notices about closures and delays</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.closures}
            onChange={(e) => updatePreference('closures', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-900">Reminders</label>
            <p className="text-xs text-gray-600">Helpful reminders about important dates</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.reminders}
            onChange={(e) => updatePreference('reminders', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-900">Emergency Alerts</label>
            <p className="text-xs text-gray-600">Critical safety and emergency notifications</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.emergency}
            onChange={(e) => updatePreference('emergency', e.target.checked)}
            disabled // Emergency notifications should always be enabled
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded opacity-50"
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> Emergency alerts cannot be disabled for safety reasons.
        </p>
      </div>
    </Card>
  )
}