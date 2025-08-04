'use client'

import Script from 'next/script'

interface LocalBusinessInfo {
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  openingHours: string[]
  priceRange: string
  paymentAccepted: string[]
  areaServed: string[]
  languages: string[]
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  services: Array<{
    name: string
    description: string
    url?: string
  }>
}

const businessInfo: LocalBusinessInfo = {
  name: 'Little Sprouts Nursery',
  description: 'Licensed childcare center providing quality early education with experienced teachers, proven curriculum, and a nurturing environment for children aged 6 weeks to 5 years.',
  url: 'https://littlesproutsnursery.com',
  telephone: '+1-555-123-4567',
  email: 'info@littlesproutsnursery.com',
  address: {
    streetAddress: '123 Oak Street',
    addressLocality: 'Springfield',
    addressRegion: 'IL',
    postalCode: '62701',
    addressCountry: 'US'
  },
  geo: {
    latitude: 39.7817,
    longitude: -89.6501
  },
  openingHours: [
    'Mo-Fr 06:30-18:00',
    'Sa 07:00-17:00'
  ],
  priceRange: '$$',
  paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Bank Transfer'],
  areaServed: ['Springfield, IL', 'Jacksonville, IL', 'Chatham, IL', 'Sherman, IL'],
  languages: ['English'],
  socialMedia: {
    facebook: 'https://facebook.com/littlesproutsnursery',
    instagram: 'https://instagram.com/littlesproutsnursery',
    twitter: 'https://twitter.com/littlesproutsnursery'
  },
  services: [
    {
      name: 'Infant Care',
      description: 'Professional care for infants 6 weeks to 12 months with certified caregivers',
      url: 'https://littlesproutsnursery.com/programs/infants'
    },
    {
      name: 'Toddler Care',
      description: 'Educational care program for toddlers 12-24 months focusing on development',
      url: 'https://littlesproutsnursery.com/programs/toddlers'
    },
    {
      name: 'Preschool Program',
      description: 'Pre-kindergarten education for children 2-5 years with certified teachers',
      url: 'https://littlesproutsnursery.com/programs/preschool'
    },
    {
      name: 'Before & After School Care',
      description: 'Safe and engaging care for school-age children before and after school hours',
      url: 'https://littlesproutsnursery.com/programs/school-age'
    }
  ]
}

export function LocalSEOData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    '@id': businessInfo.url,
    name: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    image: [
      'https://littlesproutsnursery.com/images/nursery-exterior.jpg',
      'https://littlesproutsnursery.com/images/nursery-interior.jpg',
      'https://littlesproutsnursery.com/images/playground.jpg'
    ],
    priceRange: businessInfo.priceRange,
    paymentAccepted: businessInfo.paymentAccepted,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude
    },
    openingHoursSpecification: businessInfo.openingHours.map(hours => {
      const [days, time] = hours.split(' ')
      const [open, close] = time.split('-')
      
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days.includes('-') ? 
          days.split('-').map(day => {
            const dayMap: Record<string, string> = {
              'Mo': 'Monday',
              'Tu': 'Tuesday', 
              'We': 'Wednesday',
              'Th': 'Thursday',
              'Fr': 'Friday',
              'Sa': 'Saturday',
              'Su': 'Sunday'
            }
            return dayMap[day] || day
          }) : [days],
        opens: open,
        closes: close
      }
    }),
    areaServed: businessInfo.areaServed.map(area => ({
      '@type': 'Place',
      name: area
    })),
    availableLanguage: businessInfo.languages,
    sameAs: Object.values(businessInfo.socialMedia).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Childcare Services',
      itemListElement: businessInfo.services.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          ...(service.url && { url: service.url })
        }
      }))
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: businessInfo.telephone,
      contactType: 'customer service',
      email: businessInfo.email,
      availableLanguage: businessInfo.languages,
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:30',
        closes: '18:00'
      }
    }
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema)
      }}
    />
  )
}

// Google Business Profile optimization metadata
export function GoogleBusinessMeta() {
  return (
    <>
      <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''} />
      <meta name="google" content="notranslate" />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      
      {/* Local business specific meta tags */}
      <meta name="geo.region" content="US-IL" />
      <meta name="geo.placename" content="Springfield" />
      <meta name="geo.position" content="39.7817;-89.6501" />
      <meta name="ICBM" content="39.7817, -89.6501" />
      
      {/* Business category meta tags */}
      <meta name="business.category" content="Childcare" />
      <meta name="business.category" content="Daycare" />
      <meta name="business.category" content="Preschool" />
      <meta name="business.category" content="Early Childhood Education" />
    </>
  )
}

// Local search optimization component
export function LocalSearchOptimization() {
  const localKeywords = [
    'daycare Springfield IL',
    'childcare Springfield Illinois',
    'preschool Springfield IL',
    'nursery Springfield Illinois',
    'infant care Springfield IL',
    'toddler care Springfield Illinois',
    'before after school care Springfield',
    'licensed daycare Springfield IL',
    'quality childcare Springfield Illinois',
    'early childhood education Springfield'
  ]

  // This would typically be used in a blog or content section
  const localContent = {
    neighborhoods: [
      'Downtown Springfield',
      'West Springfield', 
      'East Springfield',
      'North Springfield',
      'Sangamon County'
    ],
    landmarks: [
      'Near Abraham Lincoln Presidential Library',
      'Close to University of Illinois Springfield',
      'Walking distance from Washington Park',
      'Minutes from Springfield High School'
    ],
    community: [
      'Serving families in the Capitol City',
      'Proud member of Springfield Chamber of Commerce',
      'Supporting Springfield community since 2010',
      'Licensed by Illinois Department of Children and Family Services'
    ]
  }

  return (
    <div className="hidden" aria-hidden="true">
      {/* This content helps with local SEO but is hidden from users */}
      <div>
        {localKeywords.map((keyword, index) => (
          <span key={index}>{keyword}</span>
        ))}
      </div>
      <div>
        {localContent.neighborhoods.map((neighborhood, index) => (
          <span key={index}>{neighborhood}</span>
        ))}
      </div>
      <div>
        {localContent.landmarks.map((landmark, index) => (
          <span key={index}>{landmark}</span>
        ))}
      </div>
      <div>
        {localContent.community.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  )
}

// FAQ Schema specifically for local SEO
export function LocalFAQSchema() {
  const localFAQs = [
    {
      question: 'What areas does Little Sprouts Nursery serve in Springfield, IL?',
      answer: 'We serve families throughout Springfield, Illinois including Downtown, West Springfield, East Springfield, North Springfield, and surrounding areas in Sangamon County. We also welcome families from nearby communities like Jacksonville, Chatham, and Sherman.'
    },
    {
      question: 'Are you licensed by the state of Illinois?',
      answer: 'Yes, Little Sprouts Nursery is fully licensed by the Illinois Department of Children and Family Services (DCFS). We maintain all required certifications and undergo regular inspections to ensure we meet the highest standards of care and safety.'
    },
    {
      question: 'What are your hours of operation in Springfield?',
      answer: 'We are open Monday through Friday from 6:30 AM to 6:00 PM, and Saturdays from 7:00 AM to 5:00 PM. These hours are designed to accommodate working parents in the Springfield area.'
    },
    {
      question: 'Do you offer tours of your Springfield facility?',
      answer: 'Absolutely! We encourage all prospective families to schedule a tour of our Springfield nursery. You can call us at (555) 123-4567 or request a tour through our website to see our facilities and meet our caring staff.'
    }
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: localFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <Script
      id="local-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }}
    />
  )
}