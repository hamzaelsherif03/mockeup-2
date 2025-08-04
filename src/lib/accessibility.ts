// Accessibility utilities and color contrast testing

// WCAG 2.1 contrast ratio calculations
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function getContrastRatio(foreground: [number, number, number], background: [number, number, number]): number {
  const l1 = getLuminance(...foreground)
  const l2 = getLuminance(...background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null
}

export function meetsWCAGAA(foreground: string, background: string): boolean {
  const fg = hexToRgb(foreground)
  const bg = hexToRgb(background)
  
  if (!fg || !bg) return false
  
  const ratio = getContrastRatio(fg, bg)
  return ratio >= 4.5 // WCAG AA standard
}

export function meetsWCAGAAA(foreground: string, background: string): boolean {
  const fg = hexToRgb(foreground)
  const bg = hexToRgb(background)
  
  if (!fg || !bg) return false
  
  const ratio = getContrastRatio(fg, bg)
  return ratio >= 7 // WCAG AAA standard
}

// Test our nursery color palette
export const colorTests = {
  // Primary combinations
  primaryOnWhite: {
    foreground: '#A0826D', // Mocha Mousse
    background: '#FEFBF6', // Warm White
    meetsAA: meetsWCAGAA('#A0826D', '#FEFBF6'),
    meetsAAA: meetsWCAGAAA('#A0826D', '#FEFBF6'),
    ratio: (() => {
      const fg = hexToRgb('#A0826D')
      const bg = hexToRgb('#FEFBF6')
      return fg && bg ? getContrastRatio(fg, bg) : 0
    })(),
  },
  
  whiteOnPrimary: {
    foreground: '#FEFBF6', // Warm White
    background: '#A0826D', // Mocha Mousse
    meetsAA: meetsWCAGAA('#FEFBF6', '#A0826D'),
    meetsAAA: meetsWCAGAAA('#FEFBF6', '#A0826D'),
    ratio: (() => {
      const fg = hexToRgb('#FEFBF6')
      const bg = hexToRgb('#A0826D')
      return fg && bg ? getContrastRatio(fg, bg) : 0
    })(),
  },
  
  // Secondary combinations
  forestGreenOnWhite: {
    foreground: '#355E3B', // Forest Green
    background: '#FEFBF6', // Warm White
    meetsAA: meetsWCAGAA('#355E3B', '#FEFBF6'),
    meetsAAA: meetsWCAGAAA('#355E3B', '#FEFBF6'),
    ratio: (() => {
      const fg = hexToRgb('#355E3B')
      const bg = hexToRgb('#FEFBF6')
      return fg && bg ? getContrastRatio(fg, bg) : 0
    })(),
  },
  
  whiteOnForestGreen: {
    foreground: '#FEFBF6', // Warm White
    background: '#355E3B', // Forest Green
    meetsAA: meetsWCAGAA('#FEFBF6', '#355E3B'),
    meetsAAA: meetsWCAGAAA('#FEFBF6', '#355E3B'),
    ratio: (() => {
      const fg = hexToRgb('#FEFBF6')
      const bg = hexToRgb('#355E3B')
      return fg && bg ? getContrastRatio(fg, bg) : 0
    })(),
  },
  
  // Accent combinations
  terracottaOnWhite: {
    foreground: '#E2725B', // Terracotta
    background: '#FEFBF6', // Warm White
    meetsAA: meetsWCAGAA('#E2725B', '#FEFBF6'),
    meetsAAA: meetsWCAGAAA('#E2725B', '#FEFBF6'),
    ratio: (() => {
      const fg = hexToRgb('#E2725B')
      const bg = hexToRgb('#FEFBF6')
      return fg && bg ? getContrastRatio(fg, bg) : 0
    })(),
  },
  
  whiteOnTerracotta: {
    foreground: '#FEFBF6', // Warm White
    background: '#E2725B', // Terracotta
    meetsAA: meetsWCAGAA('#FEFBF6', '#E2725B'),
    meetsAAA: meetsWCAGAAA('#FEFBF6', '#E2725B'),
    ratio: (() => {
      const fg = hexToRgb('#FEFBF6')
      const bg = hexToRgb('#E2725B')
      return fg && bg ? getContrastRatio(fg, bg) : 0
    })(),
  },
}

// Focus management utilities
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
    
    if (e.key === 'Escape') {
      element.focus()
    }
  }
  
  element.addEventListener('keydown', handleTabKey)
  
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

// Screen reader utilities
export function announceToScreenReader(message: string) {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.style.position = 'absolute'
  announcement.style.left = '-10000px'
  announcement.style.width = '1px'
  announcement.style.height = '1px'
  announcement.style.overflow = 'hidden'
  
  document.body.appendChild(announcement)
  announcement.textContent = message
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Reduced motion utilities
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getAnimationProps(baseProps: any) {
  if (prefersReducedMotion()) {
    return {
      initial: false,
      animate: baseProps.animate,
      transition: { duration: 0 },
    }
  }
  return baseProps
}