'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { ContactForm } from '@/components/forms/contact-form'
import { TourRequestForm } from '@/components/forms/tour-request-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Car, Bus } from 'lucide-react'

export default function ContactPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="nursery-section bg-gradient-to-br from-background to-muted">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                We'd love to hear from you! Whether you have questions about our programs, 
                want to schedule a tour, or need enrollment information, we're here to help.
              </p>
              <div className="bg-accent/10 p-4 rounded-lg">
                <p className="text-primary font-semibold">
                  🕐 Open Monday-Friday, 7:00 AM - 6:00 PM
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Tours available by appointment
                </p>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="/images/entrance.svg" 
                    alt="Little Sprouts Nursery welcoming entrance with landscaping" 
                    className="w-full h-80 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="tel:+15551234567" 
                  className="text-2xl font-bold text-primary hover:underline block mb-2"
                >
                  (555) 123-4567
                </a>
                <p className="text-muted-foreground">
                  Monday - Friday: 7:00 AM - 6:00 PM
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:info@littlesprouts.com" 
                  className="text-lg text-primary hover:underline block mb-2"
                >
                  info@littlesprouts.com
                </a>
                <p className="text-muted-foreground">
                  We respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  <p className="font-semibold">Little Sprouts Nursery</p>
                  <p>123 Rainbow Street</p>
                  <p>Springfield, ST 12345</p>
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* General Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Tour Request Form */}
            <div id="schedule-tour">
              <h2 className="text-3xl font-serif font-bold mb-6">Schedule a Tour</h2>
              <TourRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Hours & Directions */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Hours & Location</h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">7:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Holiday Hours:</strong> We're closed on major holidays. 
                      Holiday schedules are provided to families in advance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Getting to Little Sprouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Car className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">By Car</p>
                        <p className="text-sm text-muted-foreground">
                          Convenient parking available. Located just off Highway 101, 
                          Exit 15 (Rainbow Street).
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Bus className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Public Transit</p>
                        <p className="text-sm text-muted-foreground">
                          Bus routes 15 and 23 stop within two blocks. 
                          Metro station is 0.5 miles away.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Find Us</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">
                        123 Rainbow Street, Springfield, ST 12345
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4 text-center">
                <a 
                  href="https://maps.google.com/?q=123+Rainbow+Street+Springfield+ST+12345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What ages do you serve?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We care for children from 6 weeks old through 5 years (pre-kindergarten). 
                  Our programs are designed for specific age groups to ensure appropriate 
                  development and learning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are your teacher-to-child ratios?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We maintain low ratios: 1:3 for infants, 1:5 for toddlers, 1:8 for preschool, 
                  and 1:10 for pre-K. These exceed state requirements to ensure personalized attention.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide meals?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We provide nutritious breakfast, lunch, and afternoon snack. 
                  Our meals follow USDA guidelines and accommodate dietary restrictions 
                  and allergies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What should I bring for my child?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We provide most supplies, but please bring: comfort items, extra clothes, 
                  diapers/wipes (for younger children), and any special medications. 
                  We'll give you a complete list upon enrollment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do you handle sick children?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Children must be fever-free for 24 hours before returning. We follow 
                  state health guidelines and will contact parents immediately if a 
                  child becomes ill during the day.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer part-time care?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer both full-time and part-time options. We also accommodate 
                  drop-in care when space is available. Contact us to discuss scheduling 
                  that works for your family.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="nursery-section bg-primary text-primary-foreground">
        <div className="nursery-container text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="mb-6 opacity-90">
            For urgent matters during business hours, please call us directly.
          </p>
          <a 
            href="tel:+15551234567"
            className="inline-flex items-center text-xl font-bold hover:underline"
          >
            <Phone className="h-6 w-6 mr-2" />
            (555) 123-4567
          </a>
        </div>
      </section>
    </PageWrapper>
  )
}