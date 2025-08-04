'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Heart, Award, Languages } from 'lucide-react'
import { motion } from 'framer-motion'

const staffMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Director & Founder',
    experience: '15+ years',
    education: 'M.Ed. Early Childhood Education',
    certifications: ['CPR/First Aid', 'Director Certification', 'Child Development Associate'],
    philosophy: 'Every child deserves to feel valued and excited about learning. I believe in creating an environment where curiosity thrives.',
    funFact: 'Former elementary school teacher and mother of three',
    languages: ['English', 'Spanish'],
    image: '/staff/sarah-johnson.jpg' // Placeholder
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    role: 'Lead Infant Teacher',
    experience: '8 years',
    education: 'B.A. Child Development',
    certifications: ['CPR/First Aid', 'Infant Care Specialist', 'Lactation Support'],
    philosophy: 'Building secure attachments with our youngest learners creates the foundation for all future learning and relationships.',
    funFact: 'Speaks three languages and loves singing lullabies',
    languages: ['English', 'Spanish', 'Portuguese'],
    image: '/staff/maria-rodriguez.jpg' // Placeholder
  },
  {
    id: 3,
    name: 'Jennifer Chen',
    role: 'Lead Toddler Teacher',
    experience: '6 years',
    education: 'B.S. Psychology, Minor in Education',
    certifications: ['CPR/First Aid', 'Positive Discipline', 'Montessori Training'],
    philosophy: 'Toddlers learn best through exploration and play. I focus on creating rich sensory experiences that spark wonder.',
    funFact: 'Former museum educator who brings science experiments to the classroom',
    languages: ['English', 'Mandarin'],
    image: '/staff/jennifer-chen.jpg' // Placeholder
  },
  {
    id: 4,
    name: 'Ashley Thompson',
    role: 'Lead Preschool Teacher',
    experience: '7 years',
    education: 'B.A. Elementary Education',
    certifications: ['CPR/First Aid', 'Reading Specialist', 'Art Therapy Training'],
    philosophy: 'Children are natural artists and storytellers. I love incorporating creative expression into every aspect of learning.',
    funFact: 'Professional artist who teaches weekend art classes',
    languages: ['English'],
    image: '/staff/ashley-thompson.jpg' // Placeholder
  },
  {
    id: 5,
    name: 'Michael Davis',
    role: 'Pre-K Lead Teacher',
    experience: '10 years',
    education: 'M.Ed. Elementary Education',
    certifications: ['CPR/First Aid', 'Kindergarten Readiness', 'STEM Education'],
    philosophy: 'Preparing children for kindergarten means building confidence, curiosity, and a love of learning that will last forever.',
    funFact: 'Former engineer who brings hands-on STEM activities to early learning',
    languages: ['English', 'French'],
    image: '/staff/michael-davis.jpg' // Placeholder
  },
  {
    id: 6,
    name: 'Lisa Park',
    role: 'Assistant Director',
    experience: '12 years',
    education: 'M.A. Child Psychology',
    certifications: ['CPR/First Aid', 'Behavioral Specialist', 'Special Needs Training'],
    philosophy: 'Every child has unique strengths. My role is to help identify and nurture those special gifts in each child.',
    funFact: 'Trained therapy dog handler who brings calm energy to challenging moments',
    languages: ['English', 'Korean'],
    image: '/staff/lisa-park.jpg' // Placeholder
  }
]

export function StaffProfiles() {
  return (
    <section className="nursery-section bg-muted/30">
      <div className="nursery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our passionate educators bring years of experience, ongoing training, 
            and genuine love for children to create an exceptional learning environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffMembers.map((staff, index) => (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  {/* Profile Image Placeholder */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <span className="text-2xl font-serif font-bold text-primary">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold">{staff.name}</h3>
                  <p className="text-primary font-medium">{staff.role}</p>
                  
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {staff.experience}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Education */}
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Education</div>
                      <div className="text-xs text-muted-foreground">{staff.education}</div>
                    </div>
                  </div>

                  {/* Philosophy */}
                  <div className="flex items-start space-x-3">
                    <Heart className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Philosophy</div>
                      <div className="text-xs text-muted-foreground italic leading-relaxed">
                        "{staff.philosophy}"
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex items-start space-x-3">
                    <Award className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Certifications</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {staff.certifications.map((cert, certIndex) => (
                          <Badge key={certIndex} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  {staff.languages.length > 1 && (
                    <div className="flex items-start space-x-3">
                      <Languages className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">Languages</div>
                        <div className="text-xs text-muted-foreground">
                          {staff.languages.join(', ')}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fun Fact */}
                  <div className="bg-primary/5 rounded-lg p-3 mt-4">
                    <div className="text-xs font-medium text-primary mb-1">Fun Fact</div>
                    <div className="text-xs text-muted-foreground">{staff.funFact}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-background rounded-2xl p-8 mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-bold mb-2">
              Our Team Values
            </h3>
            <p className="text-muted-foreground">
              What guides us in caring for your children every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Genuine Care</h4>
              <p className="text-sm text-muted-foreground">
                We treat every child as if they were our own, with unconditional love and patience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Continuous Learning</h4>
              <p className="text-sm text-muted-foreground">
                Our team regularly attends workshops and training to stay current with best practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Professional Excellence</h4>
              <p className="text-sm text-muted-foreground">
                We maintain the highest standards in early childhood education and child care.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}