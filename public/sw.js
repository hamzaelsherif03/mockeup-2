// Service Worker for Little Sprouts Nursery PWA
const CACHE_NAME = 'little-sprouts-v1'
const OFFLINE_URL = '/offline'

// Files to cache for offline functionality
const CACHE_URLS = [
  '/',
  '/offline',
  '/about',
  '/programs',
  '/contact',
  '/virtual-tour',
  '/manifest.json',
  // Add critical CSS and JS files
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/main.js',
  // Add critical images
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
]

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching essential resources')
        return cache.addAll(CACHE_URLS)
      })
      .then(() => {
        // Force the service worker to become active immediately
        return self.skipWaiting()
      })
      .catch(error => {
        console.error('Cache installation failed:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim()
      })
  )
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse
        }

        // Try to fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone the response for caching
            const responseToCache = response.clone()

            // Cache the fetched resource for future use
            caches.open(CACHE_NAME)
              .then(cache => {
                // Only cache specific types of requests
                const url = new URL(event.request.url)
                if (
                  url.pathname.startsWith('/_next/static/') ||
                  url.pathname.endsWith('.css') ||
                  url.pathname.endsWith('.js') ||
                  url.pathname.endsWith('.png') ||
                  url.pathname.endsWith('.jpg') ||
                  url.pathname.endsWith('.webp') ||
                  url.pathname.startsWith('/icons/')
                ) {
                  cache.put(event.request, responseToCache)
                }
              })

            return response
          })
          .catch(() => {
            // Network failed, try to serve offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_URL)
            }
            
            // For other requests, try to return a generic offline response
            return new Response('Offline', { 
              status: 200, 
              statusText: 'OK',
              headers: { 'Content-Type': 'text/plain' }
            })
          })
      })
  )
})

// Background sync for form submissions
self.addEventListener('sync', event => {
  console.log('Background sync triggered:', event.tag)
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm())
  } else if (event.tag === 'tour-request') {
    event.waitUntil(syncTourRequest())
  }
})

// Handle contact form background sync
async function syncContactForm() {
  try {
    // Get stored form data from IndexedDB
    const formData = await getStoredFormData('contact-form')
    if (formData) {
      // Attempt to submit the form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        // Remove stored data on successful submission
        await removeStoredFormData('contact-form')
        
        // Show success notification
        self.registration.showNotification('Message Sent!', {
          body: 'Your message has been sent successfully.',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/badge-72x72.png',
          tag: 'contact-success'
        })
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Handle tour request background sync
async function syncTourRequest() {
  try {
    const formData = await getStoredFormData('tour-request')
    if (formData) {
      const response = await fetch('/api/tour-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await removeStoredFormData('tour-request')
        
        self.registration.showNotification('Tour Scheduled!', {
          body: `Your tour request for ${formData.preferredDate} has been received.`,
          icon: '/icons/icon-192x192.png',
          badge: '/icons/badge-72x72.png',
          tag: 'tour-success'
        })
      }
    }
  } catch (error) {
    console.error('Tour request sync failed:', error)
  }
}

// Helper functions for IndexedDB operations
function getStoredFormData(key) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NurseryFormData', 1)
    
    request.onerror = () => reject(request.error)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['forms'], 'readonly')
      const store = transaction.objectStore('forms')
      const getRequest = store.get(key)
      
      getRequest.onsuccess = () => resolve(getRequest.result?.data)
      getRequest.onerror = () => reject(getRequest.error)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      db.createObjectStore('forms', { keyPath: 'id' })
    }
  })
}

function removeStoredFormData(key) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NurseryFormData', 1)
    
    request.onerror = () => reject(request.error)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['forms'], 'readwrite')
      const store = transaction.objectStore('forms')
      const deleteRequest = store.delete(key)
      
      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('Push message received:', event)
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Little Sprouts!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/view-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-96x96.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Little Sprouts Nursery', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event)
  
  event.notification.close()

  if (event.action === 'explore') {
    // Open the app to a specific page
    event.waitUntil(
      clients.openWindow('/')
    )
  } else if (event.action === 'close') {
    // Just close the notification
    return
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then(clientList => {
          // If a window is already open, focus it
          for (const client of clientList) {
            if (client.url === '/' && 'focus' in client) {
              return client.focus()
            }
          }
          // Otherwise, open a new window
          if (clients.openWindow) {
            return clients.openWindow('/')
          }
        })
    )
  }
})

// Message handling for communication with the main thread
self.addEventListener('message', event => {
  console.log('Service Worker received message:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

console.log('Service Worker loaded successfully')