'use client'

import { Suspense, lazy, ComponentType, ReactNode } from 'react'
import { LoadingSpinner } from './loading-spinner'

interface LazyComponentProps {
  fallback?: ReactNode
  error?: ReactNode
}

// Higher-order component for lazy loading
export function withLazyLoading<T extends {}>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  options: LazyComponentProps = {}
) {
  const LazyComponent = lazy(importFunc)
  
  return function WrappedLazyComponent(props: T) {
    const { fallback = <LazyComponentFallback />, error } = options
    
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

// Default fallback component
function LazyComponentFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner size="lg" />
    </div>
  )
}

// Skeleton loader for different content types
export function SkeletonLoader({ 
  type = 'text',
  lines = 3,
  className = ''
}: {
  type?: 'text' | 'card' | 'image' | 'profile'
  lines?: number
  className?: string
}) {
  const baseClasses = 'animate-pulse bg-muted rounded'
  
  switch (type) {
    case 'card':
      return (
        <div className={`space-y-4 p-4 ${className}`}>
          <div className={`${baseClasses} h-48 w-full`} />
          <div className="space-y-2">
            <div className={`${baseClasses} h-4 w-3/4`} />
            <div className={`${baseClasses} h-4 w-1/2`} />
          </div>
        </div>
      )
    
    case 'image':
      return (
        <div className={`${baseClasses} aspect-video w-full ${className}`} />
      )
    
    case 'profile':
      return (
        <div className={`space-y-3 ${className}`}>
          <div className={`${baseClasses} h-20 w-20 rounded-full`} />
          <div className="space-y-2">
            <div className={`${baseClasses} h-4 w-24`} />
            <div className={`${baseClasses} h-3 w-16`} />
          </div>
        </div>
      )
    
    default: // text
      return (
        <div className={`space-y-2 ${className}`}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`${baseClasses} h-4`}
              style={{
                width: i === lines - 1 ? '75%' : '100%'
              }}
            />
          ))}
        </div>
      )
  }
}

// Intersection Observer hook for visibility-based lazy loading
import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [hasIntersected, options])

  return { targetRef, isIntersecting, hasIntersected }
}

// Lazy loading wrapper component
export function LazyWrapper({
  children,
  fallback,
  once = true,
  className = '',
  threshold = 0.1,
  rootMargin = '50px'
}: {
  children: ReactNode
  fallback?: ReactNode
  once?: boolean
  className?: string
  threshold?: number
  rootMargin?: string
}) {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin
  })

  const shouldRender = once ? hasIntersected : hasIntersected

  return (
    <div ref={targetRef} className={className}>
      {shouldRender ? children : (fallback || <SkeletonLoader />)}
    </div>
  )
}

// Pre-configured lazy components for common use cases
// Commented out until proper default exports are added
/*
export const LazyHero = withLazyLoading(
  () => import('@/components/sections/hero'),
  { fallback: <SkeletonLoader type="image" className="h-96" /> }
)

export const LazyTestimonials = withLazyLoading(
  () => import('@/components/sections/testimonials'),
  { fallback: <SkeletonLoader type="card" /> }
)

export const LazyVirtualTour = withLazyLoading(
  () => import('@/components/sections/virtual-tour'),
  { fallback: <SkeletonLoader type="image" className="h-64" /> }
)

export const LazyStaffProfiles = withLazyLoading(
  () => import('@/components/sections/staff-profiles'),
  { fallback: <SkeletonLoader type="profile" /> }
)

export const LazyContactForm = withLazyLoading(
  () => import('@/components/forms/contact-form'),
  { fallback: <SkeletonLoader type="card" /> }
)

export const LazyTourRequestForm = withLazyLoading(
  () => import('@/components/forms/tour-request-form'),
  { fallback: <SkeletonLoader type="card" /> }
)
*/