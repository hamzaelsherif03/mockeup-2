'use client'

import { useEffect, useState } from 'react'

export function CSSChecker() {
  const [cssStatus, setCssStatus] = useState<{
    loaded: boolean
    stylesheets: number
    variables: Record<string, string>
    errors: string[]
  }>({
    loaded: false,
    stylesheets: 0,
    variables: {},
    errors: []
  })

  useEffect(() => {
    const checkCSS = () => {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]')
      const rootStyle = getComputedStyle(document.documentElement)
      const errors: string[] = []
      
      // Check important CSS variables
      const cssVars = {
        '--background': rootStyle.getPropertyValue('--background'),
        '--foreground': rootStyle.getPropertyValue('--foreground'),
        '--primary': rootStyle.getPropertyValue('--primary'),
        '--secondary': rootStyle.getPropertyValue('--secondary'),
      }
      
      // Check if CSS is actually loaded
      const bodyStyle = window.getComputedStyle(document.body)
      const bgColor = bodyStyle.backgroundColor
      const isLoaded = bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent'
      
      // Check for missing variables
      Object.entries(cssVars).forEach(([key, value]) => {
        if (!value || value.trim() === '') {
          errors.push(`Missing CSS variable: ${key}`)
        }
      })
      
      setCssStatus({
        loaded: isLoaded,
        stylesheets: stylesheets.length,
        variables: cssVars,
        errors
      })
    }
    
    // Check immediately and after DOM load
    checkCSS()
    window.addEventListener('DOMContentLoaded', checkCSS)
    
    // Also check after a delay
    const timer = setTimeout(checkCSS, 1000)
    
    return () => {
      window.removeEventListener('DOMContentLoaded', checkCSS)
      clearTimeout(timer)
    }
  }, [])
  
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg max-w-sm text-xs font-mono">
      <h3 className="font-bold mb-2">CSS Debug Info</h3>
      <div>CSS Loaded: {cssStatus.loaded ? '✅' : '❌'}</div>
      <div>Stylesheets: {cssStatus.stylesheets}</div>
      <div className="mt-2">
        <div className="font-bold">CSS Variables:</div>
        {Object.entries(cssStatus.variables).map(([key, value]) => (
          <div key={key} className="truncate">
            {key}: {value || '❌ MISSING'}
          </div>
        ))}
      </div>
      {cssStatus.errors.length > 0 && (
        <div className="mt-2 text-red-400">
          <div className="font-bold">Errors:</div>
          {cssStatus.errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )}
    </div>
  )
}