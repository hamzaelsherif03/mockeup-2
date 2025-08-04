'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { AboutHero } from '@/components/sections/about-hero'
import { StaffProfiles } from '@/components/sections/staff-profiles'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Award, Heart, Users, Clock, Target } from 'lucide-react'

// Metadata is handled at the layout level for client components

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutHero />
      
      {/* Mission & Philosophy Section */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Mission & Philosophy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At Little Sprouts Nursery, we believe every child is unique and deserves a nurturing environment 
              where they can grow, learn, and thrive. Our mission is to provide exceptional early childhood 
              education that fosters creativity, builds confidence, and prepares children for lifelong learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Core Values */}
            <Card>
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-3" />
                <CardTitle>Nurturing Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We provide a warm, loving environment where children feel safe, valued, and supported 
                  in their individual growth journey.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-3" />
                <CardTitle>Excellence in Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our research-based curriculum and experienced teachers ensure your child receives 
                  the highest quality early education.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-3" />
                <CardTitle>Community Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We work closely with families to create a strong support system that extends 
                  from our classrooms to your home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Why Choose Little Sprouts?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Licensed & Insured</h3>
              <p className="text-sm text-muted-foreground">
                Fully licensed by the state with comprehensive insurance coverage
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">15+ Years Experience</h3>
              <p className="text-sm text-muted-foreground">
                Serving families in our community with excellence since 2009
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Low Ratios</h3>
              <p className="text-sm text-muted-foreground">
                Small class sizes ensure personalized attention for every child
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Hours</h3>
              <p className="text-sm text-muted-foreground">
                Open 7:00 AM - 6:00 PM to accommodate busy family schedules
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Features Section */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Our Facility
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">A Safe & Stimulating Environment</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span>Secure entry system with video monitoring</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span>Age-appropriate playgrounds with safety surfacing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span>Bright, spacious classrooms with natural lighting</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span>Dedicated spaces for art, music, and movement</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span>On-site kitchen for nutritious meals and snacks</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span>Library corner in every classroom</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted rounded-2xl p-8">
              <img 
                src="/images/facility-interior.svg" 
                alt="Little Sprouts Nursery facility interior showing colorful learning centers" 
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <StaffProfiles />

      {/* Certifications Section */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Our Certifications & Affiliations
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-background rounded-lg p-6 h-32 flex items-center justify-center">
                <span className="text-muted-foreground">State Licensed</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-background rounded-lg p-6 h-32 flex items-center justify-center">
                <span className="text-muted-foreground">NAEYC Accredited</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-background rounded-lg p-6 h-32 flex items-center justify-center">
                <span className="text-muted-foreground">CPR Certified</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-background rounded-lg p-6 h-32 flex items-center justify-center">
                <span className="text-muted-foreground">First Aid Trained</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Meet Our Caring Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Director */}
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src="/images/staff-director.svg" 
                    alt="Sarah Johnson, Director" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                <p className="text-primary font-medium mb-3">Director & Founder</p>
                <p className="text-sm text-muted-foreground mb-4">
                  M.Ed. Early Childhood Education, 15+ years experience. 
                  Passionate about creating nurturing environments where children thrive.
                </p>
                <div className="text-xs space-y-1">
                  <div className="bg-accent/10 px-2 py-1 rounded-full inline-block mr-2">
                    Master's Degree
                  </div>
                  <div className="bg-accent/10 px-2 py-1 rounded-full inline-block">
                    CPR Certified
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Teacher */}
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src="/images/staff-teacher1.svg" 
                    alt="Maria Rodriguez, Lead Teacher" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Maria Rodriguez</h3>
                <p className="text-primary font-medium mb-3">Lead Preschool Teacher</p>
                <p className="text-sm text-muted-foreground mb-4">
                  B.A. Child Development, 8 years experience. 
                  Specializes in bilingual education and creative arts integration.
                </p>
                <div className="text-xs space-y-1">
                  <div className="bg-accent/10 px-2 py-1 rounded-full inline-block mr-2">
                    Bilingual
                  </div>
                  <div className="bg-accent/10 px-2 py-1 rounded-full inline-block">
                    Art Specialist
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Infant Teacher */}
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src="/images/staff-teacher2.svg" 
                    alt="Lisa Chen, Infant Teacher" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lisa Chen</h3>
                <p className="text-primary font-medium mb-3">Infant & Toddler Specialist</p>
                <p className="text-sm text-muted-foreground mb-4">
                  A.A. Early Childhood, 6 years experience. 
                  Expert in infant development and gentle sleep training techniques.
                </p>
                <div className="text-xs space-y-1">
                  <div className="bg-accent/10 px-2 py-1 rounded-full inline-block mr-2">
                    Infant Care
                  </div>
                  <div className="bg-accent/10 px-2 py-1 rounded-full inline-block">
                    Sleep Training
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              All our staff members are background checked, CPR certified, and participate in 
              ongoing professional development to provide the highest quality care.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                alert('Contact us at (555) 123-4567 to schedule a meet-and-greet with our team!')
              }}
            >
              Meet Our Team
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}