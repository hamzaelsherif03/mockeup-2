'use client'

import { useEffect, useRef, useState } from 'react'

// Custom hook for managing focus
export function useFocusManagement() {
  const focusableElementsRef = useRef<HTMLElement[]>([])
  const currentFocusIndex = useRef(0)

  const updateFocusableElements = (container: HTMLElement | null) => {
    if (!container) return

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    )

    focusableElementsRef.current = focusableElements
  }

  const focusNext = () => {
    const elements = focusableElementsRef.current
    if (elements.length === 0) return

    currentFocusIndex.current = (currentFocusIndex.current + 1) % elements.length
    elements[currentFocusIndex.current]?.focus()
  }

  const focusPrevious = () => {
    const elements = focusableElementsRef.current
    if (elements.length === 0) return

    currentFocusIndex.current = currentFocusIndex.current === 0 
      ? elements.length - 1 
      : currentFocusIndex.current - 1
    elements[currentFocusIndex.current]?.focus()
  }

  const focusFirst = () => {
    const elements = focusableElementsRef.current
    if (elements.length === 0) return

    currentFocusIndex.current = 0
    elements[0]?.focus()
  }

  const focusLast = () => {
    const elements = focusableElementsRef.current
    if (elements.length === 0) return

    currentFocusIndex.current = elements.length - 1
    elements[elements.length - 1]?.focus()
  }

  return {
    updateFocusableElements,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast
  }
}

// Custom hook for screen reader announcements
export function useScreenReader() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof document === 'undefined') return

    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  }

  return { announce }
}

// Custom hook for reduced motion preference
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Custom hook for high contrast preference
export function useHighContrast() {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setPrefersHighContrast(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersHighContrast(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersHighContrast
}

// Custom hook for skip links
export function useSkipLink() {
  const skipLinkRef = useRef<HTMLAnchorElement>(null)

  const showSkipLink = () => {
    if (skipLinkRef.current) {
      skipLinkRef.current.focus()
    }
  }

  const handleSkipLinkClick = (targetId: string) => {
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    skipLinkRef,
    showSkipLink,
    handleSkipLinkClick
  }
}

// Custom hook for modal accessibility
export function useModalAccessibility(isOpen: boolean) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement

      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus()
      }

      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden'

      // Trap focus within modal
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )

          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault()
              lastElement?.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault()
              firstElement?.focus()
            }
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      // Restore focus to the previously focused element
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }

      // Restore body scrolling
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return modalRef
}

// Custom hook for form accessibility
export function useFormAccessibility() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { announce } = useScreenReader()

  const setFieldError = (fieldId: string, errorMessage: string) => {
    setErrors(prev => ({ ...prev, [fieldId]: errorMessage }))
    
    // Announce error to screen readers
    announce(`Error in ${fieldId}: ${errorMessage}`, 'assertive')
  }

  const clearFieldError = (fieldId: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fieldId]
      return newErrors
    })
  }

  const clearAllErrors = () => {
    setErrors({})
  }

  const getFieldProps = (fieldId: string) => ({
    'aria-invalid': !!errors[fieldId],
    'aria-describedby': errors[fieldId] ? `${fieldId}-error` : undefined,
  })

  const getErrorProps = (fieldId: string) => ({
    id: `${fieldId}-error`,
    role: 'alert',
    'aria-live': 'polite' as const,
  })

  return {
    errors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    getFieldProps,
    getErrorProps
  }
}

// Custom hook for landmark navigation
export function useLandmarkNavigation() {
  const landmarks = useRef<Map<string, HTMLElement>>(new Map())

  const registerLandmark = (name: string, element: HTMLElement) => {
    landmarks.current.set(name, element)
  }

  const navigateToLandmark = (name: string) => {
    const element = landmarks.current.get(name)
    if (element) {
      element.focus()
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getAllLandmarks = () => {
    return Array.from(landmarks.current.keys())
  }

  return {
    registerLandmark,
    navigateToLandmark,
    getAllLandmarks
  }
}

// Custom hook for color contrast checking
export function useColorContrast() {
  const checkContrast = (foreground: string, background: string): number => {
    // This is a simplified version - in a real app you'd use a proper color contrast library
    const getLuminance = (color: string): number => {
      // Convert hex to RGB and calculate relative luminance
      const hex = color.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16) / 255
      const g = parseInt(hex.substr(2, 2), 16) / 255
      const b = parseInt(hex.substr(4, 2), 16) / 255

      const [rs, gs, bs] = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })

      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    }

    const l1 = getLuminance(foreground)
    const l2 = getLuminance(background)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)

    return (lighter + 0.05) / (darker + 0.05)
  }

  const meetsWCAG = (ratio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7
  }

  return { checkContrast, meetsWCAG }
}

// Custom hook for text scaling
export function useTextScaling() {
  const [fontSize, setFontSize] = useState('16px')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateFontSize = () => {
      const rootFontSize = window.getComputedStyle(document.documentElement).fontSize
      setFontSize(rootFontSize)
    }

    updateFontSize()

    // Listen for font size changes
    const observer = new MutationObserver(updateFontSize)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    })

    return () => observer.disconnect()
  }, [])

  const scaleFontSize = (scale: number) => {
    const currentSize = parseInt(fontSize)
    const newSize = Math.max(12, Math.min(24, currentSize * scale)) // Limit between 12px and 24px
    document.documentElement.style.fontSize = `${newSize}px`
  }

  return { fontSize, scaleFontSize }
}