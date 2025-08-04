'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Google Analytics conversion events
export const GA_EVENTS = {
  // Form submissions
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  TOUR_REQUEST_SUBMIT: 'tour_request_submit',
  ENROLLMENT_FORM_SUBMIT: 'enrollment_form_submit',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  
  // Page interactions
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  DIRECTIONS_CLICK: 'directions_click',
  VIRTUAL_TOUR_START: 'virtual_tour_start',
  VIRTUAL_TOUR_COMPLETE: 'virtual_tour_complete',
  
  // Program interactions
  PROGRAM_VIEW: 'program_view',
  PROGRAM_BROCHURE_DOWNLOAD: 'program_brochure_download',
  
  // Engagement
  VIDEO_PLAY: 'video_play',
  VIDEO_COMPLETE: 'video_complete',
  TESTIMONIAL_READ: 'testimonial_read',
  
  // E-commerce style events for lead tracking
  ADD_TO_WAITLIST: 'add_to_waitlist',
  BEGIN_ENROLLMENT: 'begin_enrollment',
  COMPLETE_ENROLLMENT: 'complete_enrollment'
} as const

interface ConversionEvent {
  action: string
  category?: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Enhanced gtag function with error handling
export function trackConversion(event: ConversionEvent) {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Analytics not loaded')
    return
  }

  const { action, category = 'engagement', label, value, custom_parameters } = event

  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
      // Add custom dimensions for nursery-specific tracking
      custom_dimension_1: 'nursery_website',
      custom_dimension_2: 'conversion_tracking'
    })

    // Also send to Google Ads if conversion ID is set
    if (process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}/${action}`,
        value: value,
        currency: 'USD'
      })
    }

    console.log('Conversion tracked:', { action, category, label, value })
  } catch (error) {
    console.error('Error tracking conversion:', error)
  }
}

// Hook for easy conversion tracking
export function useConversionTracking() {
  const trackFormSubmission = (formType: string, success: boolean = true) => {
    trackConversion({
      action: success ? `${formType}_success` : `${formType}_error`,
      category: 'form_submission',
      label: formType,
      value: success ? 1 : 0
    })
  }

  const trackPhoneClick = (location: string = 'header') => {
    trackConversion({
      action: GA_EVENTS.PHONE_CLICK,
      category: 'contact',
      label: location
    })
  }

  const trackEmailClick = (location: string = 'header') => {
    trackConversion({
      action: GA_EVENTS.EMAIL_CLICK,
      category: 'contact',
      label: location
    })
  }

  const trackProgramView = (programName: string) => {
    trackConversion({
      action: GA_EVENTS.PROGRAM_VIEW,
      category: 'program_engagement',
      label: programName
    })
  }

  const trackVirtualTour = (action: 'start' | 'complete') => {
    trackConversion({
      action: action === 'start' ? GA_EVENTS.VIRTUAL_TOUR_START : GA_EVENTS.VIRTUAL_TOUR_COMPLETE,
      category: 'virtual_tour',
      label: action,
      value: action === 'complete' ? 5 : 1 // Higher value for completion
    })
  }

  const trackEnrollmentStep = (step: 'begin' | 'complete') => {
    trackConversion({
      action: step === 'begin' ? GA_EVENTS.BEGIN_ENROLLMENT : GA_EVENTS.COMPLETE_ENROLLMENT,
      category: 'enrollment',
      label: step,
      value: step === 'complete' ? 100 : 25 // High value for completed enrollment
    })
  }

  return {
    trackFormSubmission,
    trackPhoneClick,
    trackEmailClick,
    trackProgramView,
    trackVirtualTour,
    trackEnrollmentStep,
    trackConversion
  }
}

// Google Ads Conversion Tracking Component
export function GoogleAdsConversionTracking() {
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID

  if (!conversionId) {
    return null
  }

  return (
    <>
      <Script
        id="google-ads-conversion"
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-conversion-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${conversionId}');
          `
        }}
      />
    </>
  )
}

// Facebook Pixel Tracking Component
export function FacebookPixelTracking() {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

  if (!pixelId) {
    return null
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

// Enhanced ecommerce tracking for lead generation
export function trackLeadGeneration(leadType: string, value: number = 25) {
  if (typeof window === 'undefined' || !window.gtag) return

  // Track as enhanced ecommerce purchase
  window.gtag('event', 'purchase', {
    transaction_id: `lead_${Date.now()}`,
    value: value,
    currency: 'USD',
    items: [{
      item_id: leadType,
      item_name: `${leadType} Lead`,
      category: 'lead_generation',
      quantity: 1,
      price: value
    }]
  })

  // Track Facebook Pixel lead event if available
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_category: leadType,
      value: value,
      currency: 'USD'
    })
  }
}

// Scroll depth tracking
export function useScrollTracking() {
  useEffect(() => {
    let scrollDepths = [25, 50, 75, 100]
    let scrolledDepths: number[] = []

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !scrolledDepths.includes(depth)) {
          scrolledDepths.push(depth)
          trackConversion({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${depth}%`,
            value: depth
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

// Time on page tracking
export function useTimeOnPageTracking() {
  useEffect(() => {
    const startTime = Date.now()
    const milestones = [30, 60, 120, 300] // seconds
    const trackedMilestones: number[] = []

    const trackTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)
      
      milestones.forEach(milestone => {
        if (timeOnPage >= milestone && !trackedMilestones.includes(milestone)) {
          trackedMilestones.push(milestone)
          trackConversion({
            action: 'time_on_page',
            category: 'engagement',
            label: `${milestone}s`,
            value: milestone
          })
        }
      })
    }

    const interval = setInterval(trackTimeOnPage, 10000) // Check every 10 seconds

    return () => {
      clearInterval(interval)
      const finalTime = Math.round((Date.now() - startTime) / 1000)
      trackConversion({
        action: 'session_duration',
        category: 'engagement',
        value: finalTime
      })
    }
  }, [])
}

// Component to initialize all tracking
export function ConversionTrackingProvider({ children }: { children: React.ReactNode }) {
  useScrollTracking()
  useTimeOnPageTracking()

  return <>{children}</>
}

// TypeScript augmentation for fbq (gtag is declared in web-vitals.tsx)
declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}