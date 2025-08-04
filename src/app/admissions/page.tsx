'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Users, Clock, DollarSign, FileText, Calendar, Phone, Mail } from 'lucide-react'

const enrollmentSteps = [
  {
    step: 1,
    title: 'Schedule a Tour',
    description: 'Visit our facility and meet our staff. Tours are available Monday-Friday.',
    icon: Calendar,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    step: 2,
    title: 'Submit Application',
    description: 'Complete our enrollment application with your child\'s information.',
    icon: FileText,
    color: 'bg-green-100 text-green-600'
  },
  {
    step: 3,
    title: 'Meet with Director',
    description: 'Discuss your child\'s needs and our program fit in a personal meeting.',
    icon: Users,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    step: 4,
    title: 'Complete Enrollment',
    description: 'Finalize paperwork, submit required documents, and secure your spot.',
    icon: CheckCircle,
    color: 'bg-emerald-100 text-emerald-600'
  }
]

const requiredDocuments = [
  'Completed enrollment application',
  'Child\'s birth certificate',
  'Immunization records',
  'Physical examination form (within 1 year)',
  'Emergency contact information',
  'Pick-up authorization forms',
  'Photo permission form',
  'Medical care permission form'
]

const tuitionRates = [
  {
    program: 'Infant Program',
    ageRange: '6 weeks - 18 months',
    fullTime: '$280/week',
    partTime: '$35/day',
    ratio: '1:3'
  },
  {
    program: 'Toddler Program',
    ageRange: '18 months - 3 years',
    fullTime: '$260/week',
    partTime: '$32/day',
    ratio: '1:5'
  },
  {
    program: 'Preschool Program',
    ageRange: '3 - 4 years',
    fullTime: '$240/week',
    partTime: '$30/day',
    ratio: '1:8'
  },
  {
    program: 'Pre-K Program',
    ageRange: '4 - 5 years',
    fullTime: '$220/week',
    partTime: '$28/day',
    ratio: '1:10'
  }
]

export default function AdmissionsPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="nursery-section bg-gradient-to-br from-background to-muted">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Admissions & Enrollment
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                We make the enrollment process simple and welcoming. Learn about our admission 
                requirements, tuition rates, and how to secure a spot for your child at Little Sprouts.
              </p>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-primary font-semibold">
                  📅 Now accepting applications for all age groups
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Limited spots available - apply early!
                </p>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="/images/enrollment.svg" 
                    alt="Enrollment process with forms, calendar, and welcome materials" 
                    className="w-full h-80 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Simple Enrollment Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enrollmentSteps.map((step) => {
              const Icon = step.icon
              return (
                <Card key={step.step} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="nursery"
              onClick={() => {
                alert('Ready to start? Call (555) 123-4567 to schedule your tour today!')
              }}
            >
              Start Your Enrollment Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Tuition & Rates */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Tuition & Rates
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tuitionRates.map((rate, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <h3>{rate.program}</h3>
                      <p className="text-sm text-muted-foreground font-normal">{rate.ageRange}</p>
                    </div>
                    <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      Ratio {rate.ratio}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full-Time (5 days)</p>
                      <p className="text-2xl font-bold text-primary">{rate.fullTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Drop-In Rate</p>
                      <p className="text-2xl font-bold text-primary">{rate.partTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Payment Options</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Weekly automatic payments
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Bi-weekly payment plans
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Cash, check, or card accepted
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Online payment portal
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Additional Fees</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Registration fee: $100 (one-time)</li>
                    <li>Supply fee: $25/month</li>
                    <li>Late pickup: $1/minute after 6:00 PM</li>
                    <li>Field trips: Varies by activity</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  <strong>Sibling Discount:</strong> 10% off tuition for second child, 15% off for third child and beyond.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Required Documents */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Required Documents</h2>
              <p className="text-muted-foreground mb-6">
                Please prepare the following documents for your child's enrollment. Our staff 
                will review each item to ensure we have everything needed for a smooth start.
              </p>
              
              <ul className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <FileText className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> All immunizations must be up-to-date according to 
                  state requirements. We can provide a checklist of required vaccinations.
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Have Questions About Enrollment?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our admissions team is here to help guide you through the process 
                  and answer any questions you may have.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <a href="tel:+15551234567" className="text-primary hover:underline">
                        (555) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <a href="mailto:admissions@littlesprouts.com" className="text-primary hover:underline">
                        admissions@littlesprouts.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 7:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className="w-full" 
                    variant="nursery"
                    onClick={() => {
                      alert('Schedule your visit today! Call (555) 123-4567 or email admissions@littlesprouts.com')
                    }}
                  >
                    Schedule Your Tour
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist Information */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Join Our Waitlist</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our programs fill up quickly! If your preferred program is currently full, 
              join our waitlist to be notified when spots become available.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Priority Placement</h3>
                  <p className="text-sm text-muted-foreground">
                    Waitlist families receive first priority for openings
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Personal Contact</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll call you personally when a spot opens
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Future Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Join early for future enrollment dates
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              variant="nursery"
              onClick={() => {
                alert('Join our waitlist! Call (555) 123-4567 to add your child to our priority list.')
              }}
            >
              Join Waitlist Today
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}