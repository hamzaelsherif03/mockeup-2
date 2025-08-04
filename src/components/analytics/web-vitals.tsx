'use client'

import { useEffect } from 'react'
import type { Metric } from 'web-vitals'

interface WebVitalsProps {
  debug?: boolean
  reportWebVitals?: (metric: Metric) => void
}

export function WebVitals({ debug = false, reportWebVitals }: WebVitalsProps) {
  useEffect(() => {
    const handleWebVitals = (metric: Metric) => {
      // Log to console in debug mode
      if (debug) {
        console.log('Web Vital:', {
          name: metric.name,
          value: Math.round(metric.value * 1000) / 1000,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id
        })
      }

      // Send to analytics service
      if (reportWebVitals) {
        reportWebVitals(metric)
      }

      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }

      // Send to Vercel Analytics if available
      if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
          name: metric.name,
          data: {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta
          }
        })
      }

      // Warn about poor performance in development
      if (process.env.NODE_ENV === 'development' && metric.rating === 'poor') {
        console.warn(`Poor ${metric.name} score detected:`, {
          value: metric.value,
          threshold: getThreshold(metric.name),
          suggestion: getSuggestion(metric.name)
        })
      }
    }

    // Dynamic import to avoid loading web-vitals in SSR
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(handleWebVitals)
      onINP(handleWebVitals)  // Using onINP (replaces deprecated onFID)
      onFCP(handleWebVitals)
      onLCP(handleWebVitals)
      onTTFB(handleWebVitals)
    }).catch((error) => {
      if (debug) {
        console.warn('Failed to load web-vitals:', error)
      }
    })
  }, [debug, reportWebVitals])

  return null // This component doesn't render anything
}

function getThreshold(metric: string): string {
  const thresholds: Record<string, string> = {
    CLS: '0.1',
    INP: '200ms',
    FCP: '1.8s',
    LCP: '2.5s',
    TTFB: '800ms'
  }
  return thresholds[metric] || 'N/A'
}

function getSuggestion(metric: string): string {
  const suggestions: Record<string, string> = {
    CLS: 'Ensure images and ads have dimensions set, avoid inserting content above existing content',
    INP: 'Optimize JavaScript execution, reduce main thread work, break up long tasks',
    FCP: 'Optimize critical rendering path, inline critical CSS, optimize fonts',
    LCP: 'Optimize largest contentful element (usually images), improve server response times',
    TTFB: 'Optimize server response times, use CDN, optimize database queries'
  }
  return suggestions[metric] || 'Check web.dev for optimization tips'
}

// TypeScript augmentation for gtag and va
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      parameters?: Record<string, any>
    ) => void
    va?: (
      command: string,
      parameters?: Record<string, any>
    ) => void
  }
}

// Hook for tracking custom performance metrics
export function usePerformanceMetrics() {
  const trackCustomMetric = (name: string, value: number, unit: string = 'ms') => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Custom Metric - ${name}: ${value}${unit}`)
    }

    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'custom_metric', {
        custom_parameter: name,
        value: value,
        event_category: 'Performance',
        non_interaction: true
      })
    }

    // Send to Vercel Analytics
    if (typeof window !== 'undefined' && window.va) {
      window.va('event', {
        name: 'custom_metric',
        data: {
          metric_name: name,
          value: value,
          unit: unit
        }
      })
    }
  }

  const trackUserTiming = (name: string, startTime: number, endTime: number = performance.now()) => {
    const duration = endTime - startTime
    trackCustomMetric(name, Math.round(duration))
    
    // Also use Performance API
    if ('performance' in window && 'measure' in performance) {
      try {
        performance.mark(`${name}-start`)
        performance.mark(`${name}-end`)
        performance.measure(name, `${name}-start`, `${name}-end`)
      } catch (error) {
        console.warn('Failed to create performance measure:', error)
      }
    }
  }

  return { trackCustomMetric, trackUserTiming }
}

// Component for measuring interaction-to-next-paint specifically
export function InteractionTracker({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let interactionStart: number

    const handleInteractionStart = () => {
      interactionStart = performance.now()
    }

    const handleInteractionEnd = () => {
      if (interactionStart) {
        const duration = performance.now() - interactionStart
        if (duration > 200) { // Only track slow interactions
          console.warn(`Slow interaction detected: ${Math.round(duration)}ms`)
        }
      }
    }

    // Track various interaction types
    const events = ['click', 'keydown', 'pointerdown']
    events.forEach(event => {
      document.addEventListener(event, handleInteractionStart, { passive: true })
    })

    const endEvents = ['click', 'keyup', 'pointerup']
    endEvents.forEach(event => {
      document.addEventListener(event, handleInteractionEnd, { passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteractionStart)
      })
      endEvents.forEach(event => {
        document.removeEventListener(event, handleInteractionEnd)
      })
    }
  }, [])

  return <>{children}</>
}