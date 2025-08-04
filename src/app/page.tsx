'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { HeroSection } from '@/components/sections/hero'
import { ProgramsPreview } from '@/components/sections/programs-preview'
import { TrustIndicators } from '@/components/sections/trust-indicators'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { StructuredData } from '@/components/seo/structured-data'
import { useHomepagePopupTrigger } from '@/hooks/usePopupTrigger'

export default function Home() {
  // Initialize popup triggers for homepage
  useHomepagePopupTrigger()

  return (
    <PageWrapper>
      <StructuredData />
      <HeroSection />
      <TrustIndicators />
      <ProgramsPreview />
      <TestimonialsSection />
    </PageWrapper>
  )
}
