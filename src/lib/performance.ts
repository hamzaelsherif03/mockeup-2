// Performance utilities and Core Web Vitals monitoring

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Image lazy loading utility
export function lazyLoadImage(img: HTMLImageElement): void {
  const imageObserver = createIntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement
        const src = image.dataset.src
        
        if (src) {
          image.src = src
          image.classList.remove('opacity-0')
          image.classList.add('opacity-100', 'transition-opacity', 'duration-300')
          observer.unobserve(image)
        }
      }
    })
  })

  imageObserver.observe(img)
}

// Preload critical resources
export function preloadCriticalResources(): void {
  // Preload critical fonts
  const fonts = [
    '/fonts/inter-var.woff2',
    '/fonts/playfair-display-var.woff2'
  ]

  fonts.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.href = font
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  // Preload critical images
  const criticalImages = [
    '/images/hero-background.webp',
    '/images/nursery-logo.webp'
  ]

  criticalImages.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

// Core Web Vitals measurement
interface WebVital {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

export function measureWebVitals(onPerfEntry?: (vital: WebVital) => void): void {
  if (!onPerfEntry || typeof onPerfEntry !== 'function') {
    return
  }

  // Dynamic import to avoid loading web-vitals in SSR
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(onPerfEntry)
    onINP(onPerfEntry)  // Using onINP (replaces deprecated onFID)
    onFCP(onPerfEntry)
    onLCP(onPerfEntry)
    onTTFB(onPerfEntry)
  }).catch(error => {
    console.warn('Failed to load web-vitals:', error)
  })
}

// Performance observer for monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private observers: PerformanceObserver[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startMonitoring(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    // Monitor Long Tasks
    this.observeLongTasks()
    
    // Monitor Layout Shifts
    this.observeLayoutShifts()
    
    // Monitor Resource Loading
    this.observeResourceTiming()
  }

  private observeLongTasks(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name
            })
          }
        })
      })

      observer.observe({ entryTypes: ['longtask'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('Long task monitoring not supported:', error)
    }
  }

  private observeLayoutShifts(): void {
    try {
      let clsValue = 0
      let clsEntries: PerformanceEntry[] = []

      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            clsEntries.push(entry)
          }
        })

        if (clsValue > 0.1) {
          console.warn('High Cumulative Layout Shift detected:', {
            value: clsValue,
            entries: clsEntries
          })
        }
      })

      observer.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('Layout shift monitoring not supported:', error)
    }
  }

  private observeResourceTiming(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          // Monitor slow loading resources
          if (entry.duration > 2000) {
            console.warn('Slow resource detected:', {
              name: entry.name,
              duration: entry.duration,
              size: entry.transferSize
            })
          }
        })
      })

      observer.observe({ entryTypes: ['resource'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('Resource timing monitoring not supported:', error)
    }
  }

  stopMonitoring(): void {
    this.observers.forEach(observer => {
      observer.disconnect()
    })
    this.observers = []
  }
}

// Optimize images based on device capabilities
export function getOptimalImageSize(
  originalWidth: number,
  originalHeight: number,
  containerWidth: number,
  devicePixelRatio: number = 1
): { width: number; height: number } {
  const targetWidth = Math.min(containerWidth * devicePixelRatio, originalWidth)
  const aspectRatio = originalHeight / originalWidth
  const targetHeight = targetWidth * aspectRatio

  return {
    width: Math.round(targetWidth),
    height: Math.round(targetHeight)
  }
}

// Service Worker registration
export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}

// Critical CSS inlining helper
export function inlineCriticalCSS(css: string): void {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  }
}

// Resource hints
export function addResourceHints(): void {
  if (typeof document === 'undefined') return

  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
  ]

  hints.forEach(hint => {
    const link = document.createElement('link')
    link.rel = hint.rel
    link.href = hint.href
    if ('crossorigin' in hint) {
      link.crossOrigin = 'anonymous'
    }
    document.head.appendChild(link)
  })
}

// Bundle size monitoring
export function monitorBundleSize(): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      const jsResources = resources.filter(resource => 
        resource.name.includes('.js') && 
        resource.transferSize > 0
      )

      const totalJSSize = jsResources.reduce((total, resource) => 
        total + (resource.transferSize || 0), 0
      )

      console.log(`Total JS bundle size: ${Math.round(totalJSSize / 1024)}KB`)
      
      if (totalJSSize > 300 * 1024) { // 300KB threshold
        console.warn('Large JavaScript bundle detected. Consider code splitting.')
      }
    })
  }
}

// Memory usage monitoring
export function monitorMemoryUsage(): void {
  if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any)) {
    const memory = (window.performance as any).memory
    
    console.log({
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576) + 'MB',
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576) + 'MB',
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB'
    })
  }
}