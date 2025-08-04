'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Baby, 
  Heart, 
  Clock, 
  Users, 
  FileText, 
  Phone, 
  Mail,
  CheckCircle,
  Activity,
  Shield,
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'

const infantFeatures = [
  {
    icon: Users,
    title: "Low 1:4 Ratio",
    description: "Each caregiver focuses on just 4 infants, ensuring personalized attention and individualized care for your baby's unique needs.",
    highlight: "Maximum personal attention"
  },
  {
    icon: Clock,
    title: "Flexible Schedules",
    description: "We follow your baby&apos;s natural rhythm for feeding, sleeping, and play. No rigid schedules - just responsive, nurturing care.",
    highlight: "Follows baby&apos;s natural rhythm"
  },
  {
    icon: FileText,
    title: "Daily Reports",
    description: "Detailed daily communication about feedings, diaper changes, sleep patterns, activities, and precious milestone moments.",
    highlight: "Never miss a moment"
  },
  {
    icon: Activity,
    title: "Sensory Play",
    description: "Age-appropriate sensory exploration activities that promote cognitive development and motor skill growth in a safe environment.",
    highlight: "Developmentally appropriate"
  }
]

const dailySchedule = [
  { time: '7:00 - 8:00 AM', activity: 'Arrival & Morning Snuggles', description: 'Gentle welcome and comfort time' },
  { time: '8:00 - 9:00 AM', activity: 'Individual Feeding Time', description: 'Bottles or nursing support as needed' },
  { time: '9:00 - 10:00 AM', activity: 'Tummy Time & Motor Play', description: 'Supervised floor time and movement' },
  { time: '10:00 - 11:30 AM', activity: 'Morning Naps', description: 'Individual sleep schedules honored' },
  { time: '11:30 AM - 12:30 PM', activity: 'Lunch & Feeding', description: 'Solid foods and bottles as appropriate' },
  { time: '12:30 - 2:30 PM', activity: 'Afternoon Rest Time', description: 'Peaceful sleep in individual cribs' },
  { time: '2:30 - 3:30 PM', activity: 'Sensory Exploration', description: 'Safe textures, sounds, and visual stimulation' },
  { time: '3:30 - 4:30 PM', activity: 'Outdoor Time', description: 'Fresh air in strollers (weather permitting)' },
  { time: '4:30 - 6:00 PM', activity: 'Quiet Play & Pickup', description: 'Gentle activities and family reunions' }
]

const developmentAreas = [
  {
    icon: Heart,
    title: "Physical Development",
    skills: [
      "Tummy time for neck and core strength",
      "Reaching and grasping coordination", 
      "Rolling, sitting, and mobility milestones",
      "Fine motor skill development"
    ]
  },
  {
    icon: Activity,
    title: "Cognitive Growth",
    skills: [
      "Cause and effect exploration",
      "Object permanence understanding",
      "Sensory processing development",
      "Problem-solving emergence"
    ]
  },
  {
    icon: Baby,
    title: "Language Development",
    skills: [
      "Responsive talking and singing",
      "Daily story time and books",
      "Sound recognition and mimicking",
      "Pre-verbal communication skills"
    ]
  },
  {
    icon: Users,
    title: "Social-Emotional",
    skills: [
      "Secure attachment building",
      "Trust and comfort routines",
      "Emotional regulation support",
      "Social interaction foundations"
    ]
  }
]

const careFeatures = [
  "Safe sleep practices following SIDS prevention guidelines",
  "Individual supplies for bottles, diapers, and comfort items",
  "Gentle, responsive diaper changing with one-on-one attention",
  "Flexible feeding schedules accommodating breast milk and formula",
  "Introduction to solid foods following family preferences",
  "Sanitized toys and environment with frequent cleaning protocols"
]

export default function InfantProgramPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="nursery-section bg-gradient-to-br from-background to-muted">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sage-green-100 to-sage-green-200 rounded-2xl flex items-center justify-center mr-4">
                  <Baby className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
                    Infant Program
                  </h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    6 weeks - 18 months
                  </Badge>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Nurturing care with individualized attention, flexible feeding schedules, and 
                developmental activities designed specifically for your baby's precious early months.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1:4</div>
                  <div className="text-sm text-muted-foreground">Teacher Ratio</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">Daily</div>
                  <div className="text-sm text-muted-foreground">Reports</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="nursery" 
                  size="lg"
                  onClick={() => {
                    const contactSection = document.getElementById('contact-info');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Schedule Infant Tour
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    alert('Download our Infant Care Information Packet\nCall (555) 123-4567 or email us to receive detailed program information.');
                  }}
                >
                  Download Info Packet
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="/images/program-infant.svg" 
                    alt="Nurturing infant care environment with comfortable spaces for feeding, sleeping, and gentle play activities" 
                    className="w-full h-80 object-cover"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Where Every Baby Thrives
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our infant program provides a peaceful, home-like environment where your baby receives 
              the individual attention they deserve. We understand that every baby is unique, with their 
              own schedule, preferences, and developmental timeline. Our experienced caregivers work 
              closely with families to ensure continuity between home and our nurturing environment.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            What Makes Our Infant Program Special
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infantFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {feature.highlight}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-bold mb-6">
                Sample Daily Schedule
              </h2>
              <p className="text-muted-foreground mb-6">
                While we follow each baby&apos;s individual needs and rhythms, here&apos;s what a typical 
                day might look like in our infant program. Remember, your baby&apos;s schedule always 
                takes priority over our suggested timeline.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Flexible Approach:</strong> Every baby is different. We adapt our schedule 
                  to match your child's natural feeding and sleeping patterns.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Daily Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dailySchedule.map((item, index) => (
                      <div key={index} className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="font-medium text-sm text-primary min-w-[140px] flex-shrink-0">
                          {item.time}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.activity}</div>
                          <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Areas */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Supporting Your Baby's Development
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developmentAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{area.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {area.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Care Practices */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-bold mb-6">
                Safe & Loving Care Practices
              </h2>
              <p className="text-muted-foreground mb-6">
                Safety and comfort are our top priorities. We follow the highest standards of 
                infant care while creating a warm, nurturing environment where your baby feels 
                secure and loved.
              </p>
              
              <ul className="space-y-3">
                {careFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Safety Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">SIDS Prevention</span>
                      <span className="font-medium">✓ Certified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">CPR/First Aid</span>
                      <span className="font-medium">✓ All Staff</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Background Checks</span>
                      <span className="font-medium">✓ Required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">State Licensed</span>
                      <span className="font-medium">✓ Current</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Our Infant Specialists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                      <img 
                        src="/images/staff-teacher2.svg" 
                        alt="Lisa Chen, Infant Specialist" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold">Lisa Chen</h3>
                    <p className="text-sm text-primary mb-2">Lead Infant Specialist</p>
                    <p className="text-xs text-muted-foreground">
                      6+ years infant care experience<br />
                      Certified in infant development
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & CTA */}
      <section id="contact-info" className="nursery-section bg-primary text-primary-foreground">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Ready to Visit Our Infant Program?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                We'd love to show you our peaceful infant environment and introduce you to 
                our caring specialists. Schedule a personalized tour to see how we can 
                support your baby's growth and development.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Call Our Infant Coordinator</p>
                    <a href="tel:+15551234567" className="text-primary-foreground/80 hover:text-primary-foreground">
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Email Questions</p>
                    <a href="mailto:infants@littlesprouts.com" className="text-primary-foreground/80 hover:text-primary-foreground">
                      infants@littlesprouts.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary-foreground">
                    Schedule Your Infant Tour
                  </h3>
                  <p className="text-primary-foreground/80 mb-6">
                    See our infant spaces, meet our specialists, and learn about our 
                    individualized approach to baby care.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => {
                        const contactSection = document.getElementById('contact-form') || 
                                             document.querySelector('[href="/contact"]');
                        if (contactSection) {
                          if (contactSection.id) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.location.href = '/contact';
                          }
                        } else {
                          window.location.href = '/contact';
                        }
                      }}
                    >
                      Schedule Tour Now
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      onClick={() => {
                        window.location.href = '/programs';
                      }}
                    >
                      Compare All Programs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}