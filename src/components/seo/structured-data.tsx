'use client'

import Script from 'next/script'

interface LocalBusinessSchema {
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
  image: string[]
  serviceArea?: string
  areaServed?: string[]
}

interface OrganizationSchema {
  name: string
  url: string
  logo: string
  description: string
  email: string
  telephone: string
  address: LocalBusinessSchema['address']
  socialLinks: string[]
  foundingDate: string
  numberOfEmployees?: string
}

export function LocalBusinessStructuredData({
  business
}: {
  business: LocalBusinessSchema
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    '@id': business.url,
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.telephone,
    email: business.email,
    image: business.image,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude
    },
    openingHoursSpecification: business.openingHours.map(hours => {
      const [days, time] = hours.split(': ')
      const [open, close] = time.split('-')
      
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days.split(',').map(day => day.trim()),
        opens: open.trim(),
        closes: close.trim()
      }
    }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Childcare Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Infant Care',
            description: 'Professional care for infants 6 weeks to 12 months',
            category: 'Childcare'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Toddler Care',
            description: 'Educational care program for toddlers 12-24 months',
            category: 'Childcare'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Preschool Program',
            description: 'Pre-kindergarten education for children 2-5 years',
            category: 'Education'
          }
        }
      ]
    },
    ...(business.areaServed && {
      areaServed: business.areaServed.map(area => ({
        '@type': 'Place',
        name: area
      }))
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Exceptional care and education. My daughter has thrived here!'
      }
    ]
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export function OrganizationStructuredData({
  organization
}: {
  organization: OrganizationSchema
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organization.url,
    name: organization.name,
    url: organization.url,
    logo: {
      '@type': 'ImageObject',
      url: organization.logo,
      width: 600,
      height: 600
    },
    description: organization.description,
    email: organization.email,
    telephone: organization.telephone,
    foundingDate: organization.foundingDate,
    ...(organization.numberOfEmployees && {
      numberOfEmployees: organization.numberOfEmployees
    }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: organization.address.streetAddress,
      addressLocality: organization.address.addressLocality,
      addressRegion: organization.address.addressRegion,
      postalCode: organization.address.postalCode,
      addressCountry: organization.address.addressCountry
    },
    sameAs: organization.socialLinks,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: organization.telephone,
      contactType: 'customer service',
      email: organization.email,
      availableLanguage: ['English']
    }
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export function WebsiteStructuredData({
  website
}: {
  website: {
    name: string
    url: string
    description: string
    publisher: OrganizationSchema
  }
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${website.url}#website`,
    url: website.url,
    name: website.name,
    description: website.description,
    publisher: {
      '@type': 'Organization',
      '@id': website.publisher.url,
      name: website.publisher.name,
      url: website.publisher.url,
      logo: {
        '@type': 'ImageObject',
        url: website.publisher.logo
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${website.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export function BreadcrumbStructuredData({
  breadcrumbs
}: {
  breadcrumbs: Array<{ name: string; url: string }>
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export function FAQStructuredData({
  faqs
}: {
  faqs: Array<{ question: string; answer: string }>
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
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
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export function EventStructuredData({
  events
}: {
  events: Array<{
    name: string
    description: string
    startDate: string
    endDate?: string
    location: {
      name: string
      address: string
    }
    organizer: {
      name: string
      url: string
    }
    image?: string
  }>
}) {
  const structuredData = events.map(event => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address
      }
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer.name,
      url: event.organizer.url
    },
    ...(event.image && {
      image: {
        '@type': 'ImageObject',
        url: event.image
      }
    })
  }))

  return (
    <>
      {structuredData.map((data, index) => (
        <Script
          key={index}
          id={`event-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
    </>
  )
}

// Main structured data component that combines all schemas
export function StructuredData() {
  const businessData: LocalBusinessSchema = {
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
      'Monday-Friday: 6:30 AM-6:00 PM',
      'Saturday: 7:00 AM-5:00 PM'
    ],
    priceRange: '$$',
    image: [
      'https://littlesproutsnursery.com/images/nursery-exterior.jpg',
      'https://littlesproutsnursery.com/images/nursery-interior.jpg',
      'https://littlesproutsnursery.com/images/nursery-playground.jpg'
    ],
    areaServed: ['Springfield', 'Jacksonville', 'Chatham', 'Sherman']
  }

  const organizationData: OrganizationSchema = {
    name: 'Little Sprouts Nursery',
    url: 'https://littlesproutsnursery.com',
    logo: 'https://littlesproutsnursery.com/images/logo.png',
    description: 'Licensed childcare center providing quality early education.',
    email: 'info@littlesproutsnursery.com',
    telephone: '+1-555-123-4567',
    address: businessData.address,
    socialLinks: [
      'https://facebook.com/littlesproutsnursery',
      'https://instagram.com/littlesproutsnursery',
      'https://twitter.com/littlesproutsnursery'
    ],
    foundingDate: '2010-01-15',
    numberOfEmployees: '15-20'
  }

  const websiteData = {
    name: 'Little Sprouts Nursery',
    url: 'https://littlesproutsnursery.com',
    description: 'Licensed childcare center providing quality early education.',
    publisher: organizationData
  }

  return (
    <>
      <LocalBusinessStructuredData business={businessData} />
      <OrganizationStructuredData organization={organizationData} />
      <WebsiteStructuredData website={websiteData} />
    </>
  )
}