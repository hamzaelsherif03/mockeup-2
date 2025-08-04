// Popup utility functions and types
export interface QuickContactData {
  name: string
  email: string
  phone?: string
  interestType: string
  optedIn: boolean
}

export type PopupTriggerType = 'time' | 'scroll' | 'exit-intent' | 'page-visit' | 'manual'
export type PopupStatus = 'never-shown' | 'dismissed' | 'submitted' | 'temporarily-dismissed'

export interface PopupState {
  isOpen: boolean
  hasBeenShown: boolean
  lastDismissed: number | null
  submissionCount: number
  triggerSource: PopupTriggerType | null
}

// Local storage keys
export const POPUP_STORAGE_KEYS = {
  POPUP_STATE: 'littlesprouts_popup_state',
  LAST_SUBMISSION: 'littlesprouts_last_submission',
  VISITOR_SESSION: 'littlesprouts_visitor_session'
} as const

// Popup timing configuration
export const POPUP_CONFIG = {
  HOMEPAGE_DELAY: 15000, // 15 seconds
  PROGRAM_PAGE_DELAY: 30000, // 30 seconds
  SCROLL_THRESHOLD: 50, // 50% scroll
  DISMISSAL_COOLDOWN: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes in ms
  EXIT_INTENT_DELAY: 2000, // 2 seconds before exit intent can trigger
  MAX_PAGES_BEFORE_TRIGGER: 2
} as const

// Interest type options
export const INTEREST_TYPES = [
  { value: 'tour', label: 'Schedule a Tour' },
  { value: 'enrollment', label: 'Enrollment Information' },
  { value: 'programs', label: 'Program Details' },
  { value: 'pricing', label: 'Pricing & Fees' },
  { value: 'general', label: 'General Information' }
] as const

// Utility functions
export const getPopupState = (): PopupState => {
  if (typeof window === 'undefined') {
    return {
      isOpen: false,
      hasBeenShown: false,
      lastDismissed: null,
      submissionCount: 0,
      triggerSource: null
    }
  }

  try {
    const stored = localStorage.getItem(POPUP_STORAGE_KEYS.POPUP_STATE)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.warn('Failed to parse popup state from localStorage:', error)
  }

  return {
    isOpen: false,
    hasBeenShown: false,
    lastDismissed: null,
    submissionCount: 0,
    triggerSource: null
  }
}

export const savePopupState = (state: PopupState): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(POPUP_STORAGE_KEYS.POPUP_STATE, JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to save popup state to localStorage:', error)
  }
}

export const shouldShowPopup = (): boolean => {
  const state = getPopupState()
  
  // Never show if user has submitted recently
  if (state.submissionCount > 0) {
    return false
  }

  // Check cooldown period after dismissal
  if (state.lastDismissed) {
    const timeSinceDismissal = Date.now() - state.lastDismissed
    if (timeSinceDismissal < POPUP_CONFIG.DISMISSAL_COOLDOWN) {
      return false
    }
  }

  return true
}

export const getVisitorSession = () => {
  if (typeof window === 'undefined') {
    return { pageViews: 0, startTime: Date.now() }
  }

  try {
    const stored = sessionStorage.getItem(POPUP_STORAGE_KEYS.VISITOR_SESSION)
    if (stored) {
      const session = JSON.parse(stored)
      // Check if session is still valid (not expired)
      if (Date.now() - session.startTime < POPUP_CONFIG.SESSION_TIMEOUT) {
        return session
      }
    }
  } catch (error) {
    console.warn('Failed to parse visitor session from sessionStorage:', error)
  }

  // Create new session
  const newSession = { pageViews: 1, startTime: Date.now() }
  try {
    sessionStorage.setItem(POPUP_STORAGE_KEYS.VISITOR_SESSION, JSON.stringify(newSession))
  } catch (error) {
    console.warn('Failed to save visitor session to sessionStorage:', error)
  }

  return newSession
}

export const incrementPageViews = () => {
  const session = getVisitorSession()
  session.pageViews += 1
  
  try {
    sessionStorage.setItem(POPUP_STORAGE_KEYS.VISITOR_SESSION, JSON.stringify(session))
  } catch (error) {
    console.warn('Failed to update page views in sessionStorage:', error)
  }

  return session.pageViews
}

export const isReturnVisitor = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const hasLocalStorageData = localStorage.getItem(POPUP_STORAGE_KEYS.POPUP_STATE)
    return Boolean(hasLocalStorageData)
  } catch (error) {
    return false
  }
}

export const getCurrentPageType = (): string => {
  if (typeof window === 'undefined') return 'unknown'
  
  const pathname = window.location.pathname
  
  if (pathname === '/') return 'homepage'
  if (pathname.startsWith('/programs')) return 'programs'
  if (pathname.startsWith('/about')) return 'about'
  if (pathname.startsWith('/contact')) return 'contact'
  if (pathname.startsWith('/admissions')) return 'admissions'
  
  return 'other'
}

export const getScrollPercentage = (): number => {
  if (typeof window === 'undefined') return 0
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  
  if (scrollHeight === 0) return 0
  
  return Math.round((scrollTop / scrollHeight) * 100)
}

export const createExitIntentListener = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  let exitIntentTriggered = false
  
  const handleMouseLeave = (e: MouseEvent) => {
    // Only trigger if mouse is leaving from the top of the page
    if (e.clientY <= 0 && !exitIntentTriggered) {
      exitIntentTriggered = true
      callback()
    }
  }

  document.addEventListener('mouseleave', handleMouseLeave)
  
  // Return cleanup function
  return () => {
    document.removeEventListener('mouseleave', handleMouseLeave)
  }
}

export const validateQuickContactData = (data: Partial<QuickContactData>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  if (!data.name?.trim()) {
    errors.name = 'Name is required'
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.interestType) {
    errors.interestType = 'Please select what you\'re interested in'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}