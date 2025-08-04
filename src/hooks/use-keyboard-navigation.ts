'use client'

import { useEffect, useRef } from 'react'

export function useKeyboardNavigation() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) return

      const focusableElements = containerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      const focusableArray = Array.from(focusableElements) as HTMLElement[]
      const currentIndex = focusableArray.indexOf(document.activeElement as HTMLElement)

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          const nextIndex = (currentIndex + 1) % focusableArray.length
          focusableArray[nextIndex]?.focus()
          break

        case 'ArrowUp':
          event.preventDefault()
          const prevIndex = currentIndex === 0 ? focusableArray.length - 1 : currentIndex - 1
          focusableArray[prevIndex]?.focus()
          break

        case 'Home':
          event.preventDefault()
          focusableArray[0]?.focus()
          break

        case 'End':
          event.preventDefault()
          focusableArray[focusableArray.length - 1]?.focus()
          break

        case 'Escape':
          // Close any open menus or modals
          const openMenus = containerRef.current.querySelectorAll('[aria-expanded="true"]')
          openMenus.forEach((menu) => {
            if (menu instanceof HTMLElement) {
              menu.click() // Trigger close
            }
          })
          break
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  return containerRef
}

export function useDropdownNavigation(isOpen: boolean, onClose: () => void) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }

      if (event.key === 'Tab') {
        if (!dropdownRef.current) return

        const focusableElements = dropdownRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

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
    
    // Focus first element when dropdown opens
    const firstFocusable = dropdownRef.current?.querySelector(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement
    
    firstFocusable?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return dropdownRef
}