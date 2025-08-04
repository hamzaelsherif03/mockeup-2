'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Shield, Users, Award, Info } from 'lucide-react'
import { useManualPopup } from '@/components/popup/PopupProvider'
// import { MotionWrapper } from '@/components/animations/motion-wrapper'

export function HeroSection() {
  const { triggerPopup } = useManualPopup()

  return (
    <section className="relative bg-gradient-to-br from-background to-muted py-16 md:py-24 lg:py-32">
      <div className="nursery-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Where Little Minds{' '}
                <span className="text-primary">Grow Big Dreams</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Nurturing children ages 6 weeks to 5 years with experienced teachers, 
                play-based learning, and a safe, loving environment since 2009.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-full">
                <Shield className="h-4 w-4 text-accent" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-full">
                <Star className="h-4 w-4 text-accent" />
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-full">
                <Award className="h-4 w-4 text-accent" />
                <span>15+ Years Experience</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="nursery" 
                size="lg" 
                className="text-lg"
                onClick={() => {
                  // Navigate to contact page and scroll to tour section
                  window.location.href = '/contact#schedule-tour';
                }}
              >
                Schedule Your Personal Tour
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg"
                onClick={triggerPopup}
              >
                <Info className="h-5 w-5 mr-2" />
                Get Information
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Children Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Parent Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Cards */}
          <div className="relative">
            {/* Main hero card with image */}
            <Card className="bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="aspect-video rounded-2xl mb-6 overflow-hidden">
                  <img 
                    src="/images/hero-placeholder.svg" 
                    alt="Little Sprouts Nursery Building" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Child's Second Home</h3>
                <p className="text-muted-foreground">
                  Beautiful, safe facilities designed specifically for early childhood development, 
                  with secure play areas and age-appropriate learning spaces.
                </p>
              </CardContent>
            </Card>

            {/* Floating testimonial */}
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-4 rounded-2xl shadow-lg max-w-xs">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-accent" />
                ))}
              </div>
              <p className="text-sm font-medium">
                "My son has thrived here! The teachers genuinely care and 
                he's learned so much."
              </p>
              <p className="text-xs opacity-80 mt-2">- Jennifer M., Parent of 3-year-old</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}