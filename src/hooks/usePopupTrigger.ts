'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePopup } from '@/components/popup/PopupProvider'
import { 
  POPUP_CONFIG,
  getCurrentPageType,
  getVisitorSession,
  getScrollPercentage,
  createExitIntentListener,
  shouldShowPopup,
  isReturnVisitor
} from '@/lib/popup-utils'

interface UsePopupTriggerOptions {
  enableTimeBasedTriggers?: boolean
  enableScrollTriggers?: boolean
  enableExitIntentTriggers?: boolean
  enablePageVisitTriggers?: boolean
}

export function usePopupTrigger(options: UsePopupTriggerOptions = {}) {
  const {
    enableTimeBasedTriggers = true,
    enableScrollTriggers = true,
    enableExitIntentTriggers = true,
    enablePageVisitTriggers = true
  } = options

  const { showPopup, state } = usePopup()
  const triggersRef = useRef({
    timeTriggered: false,
    scrollTriggered: false,
    exitIntentTriggered: false,
    pageVisitTriggered: false
  })

  const checkAndTriggerPopup = useCallback((triggerType: 'time' | 'scroll' | 'exit-intent' | 'page-visit') => {
    // Don't show if popup is already open or has been dismissed recently
    if (state.isOpen || !shouldShowPopup()) {
      return
    }

    // Don't trigger the same type twice
    if (triggersRef.current[`${triggerType.replace('-', '')}Triggered` as keyof typeof triggersRef.current]) {
      return
    }

    showPopup(triggerType)
    triggersRef.current[`${triggerType.replace('-', '')}Triggered` as keyof typeof triggersRef.current] = true
  }, [showPopup, state.isOpen])

  // Time-based triggers
  useEffect(() => {
    if (!enableTimeBasedTriggers || triggersRef.current.timeTriggered) {
      return
    }

    const pageType = getCurrentPageType()
    let delay: number = POPUP_CONFIG.HOMEPAGE_DELAY

    // Adjust delay based on page type
    switch (pageType) {
      case 'programs':
      case 'about':
      case 'admissions':
        delay = POPUP_CONFIG.PROGRAM_PAGE_DELAY
        break
      case 'contact':
        // Don't show popup on contact page
        return
      default:
        delay = POPUP_CONFIG.HOMEPAGE_DELAY
    }

    const timer = setTimeout(() => {
      checkAndTriggerPopup('time')
    }, delay)

    return () => clearTimeout(timer)
  }, [enableTimeBasedTriggers, checkAndTriggerPopup])

  // Scroll-based triggers
  useEffect(() => {
    if (!enableScrollTriggers || triggersRef.current.scrollTriggered) {
      return
    }

    const handleScroll = () => {
      const scrollPercent = getScrollPercentage()
      if (scrollPercent >= POPUP_CONFIG.SCROLL_THRESHOLD) {
        checkAndTriggerPopup('scroll')
        window.removeEventListener('scroll', handleScroll)
      }
    }

    // Add a small delay before enabling scroll tracking
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 5000) // Wait 5 seconds after page load

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [enableScrollTriggers, checkAndTriggerPopup])

  // Exit intent triggers
  useEffect(() => {
    if (!enableExitIntentTriggers || triggersRef.current.exitIntentTriggered) {
      return
    }

    // Only enable exit intent after user has been on page for a minimum time
    const timer = setTimeout(() => {
      const cleanup = createExitIntentListener(() => {
        checkAndTriggerPopup('exit-intent')
      })

      return cleanup
    }, POPUP_CONFIG.EXIT_INTENT_DELAY)

    return () => clearTimeout(timer)
  }, [enableExitIntentTriggers, checkAndTriggerPopup])

  // Page visit triggers
  useEffect(() => {
    if (!enablePageVisitTriggers || triggersRef.current.pageVisitTriggered) {
      return
    }

    const session = getVisitorSession()
    const isReturn = isReturnVisitor()

    // Trigger for return visitors immediately
    if (isReturn && !state.hasBeenShown) {
      setTimeout(() => {
        checkAndTriggerPopup('page-visit')
      }, 3000) // Short delay for return visitors
      return
    }

    // Trigger for new visitors after multiple page views
    if (session.pageViews >= POPUP_CONFIG.MAX_PAGES_BEFORE_TRIGGER) {
      setTimeout(() => {
        checkAndTriggerPopup('page-visit')
      }, 2000) // Short delay after reaching page threshold
    }
  }, [enablePageVisitTriggers, checkAndTriggerPopup, state.hasBeenShown])

  // Reset triggers when popup is closed (for testing purposes)
  useEffect(() => {
    if (!state.isOpen && state.hasBeenShown) {
      // Reset triggers after popup is closed to allow re-triggering in development
      // In production, you might want to keep these disabled
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          triggersRef.current = {
            timeTriggered: false,
            scrollTriggered: false,
            exitIntentTriggered: false,
            pageVisitTriggered: false
          }
        }, 5000) // Reset after 5 seconds in development
      }
    }
  }, [state.isOpen, state.hasBeenShown])

  return {
    // Expose current trigger states for debugging
    triggerStates: triggersRef.current,
    // Manual trigger function
    triggerPopup: (type: 'time' | 'scroll' | 'exit-intent' | 'page-visit' = 'time') => {
      checkAndTriggerPopup(type)
    },
    // Reset function for development
    resetTriggers: () => {
      triggersRef.current = {
        timeTriggered: false,
        scrollTriggered: false,
        exitIntentTriggered: false,
        pageVisitTriggered: false
      }
    }
  }
}

// Specialized hook for homepage
export function useHomepagePopupTrigger() {
  return usePopupTrigger({
    enableTimeBasedTriggers: true,
    enableScrollTriggers: true,
    enableExitIntentTriggers: true,
    enablePageVisitTriggers: true
  })
}

// Specialized hook for program pages
export function useProgramPagePopupTrigger() {
  return usePopupTrigger({
    enableTimeBasedTriggers: true,
    enableScrollTriggers: true,
    enableExitIntentTriggers: false, // Less aggressive on program pages
    enablePageVisitTriggers: true
  })
}

// Specialized hook for about/admissions pages
export function useInfoPagePopupTrigger() {
  return usePopupTrigger({
    enableTimeBasedTriggers: true,
    enableScrollTriggers: true,
    enableExitIntentTriggers: true,
    enablePageVisitTriggers: false // Don't trigger based on page visits for info pages
  })
}