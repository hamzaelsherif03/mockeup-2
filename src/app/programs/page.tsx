'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Baby, Blocks, GraduationCap, Palette, Heart, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProgramPagePopupTrigger } from '@/hooks/usePopupTrigger'
import { useManualPopup } from '@/components/popup/PopupProvider'


const programs = [
  {
    id: 'infants',
    name: 'Infant Program',
    ageRange: '6 weeks - 18 months',
    icon: Baby,
    color: 'bg-pink-100 text-pink-600',
    image: '/images/program-infant.svg',
    description: 'Nurturing care for your precious little ones in a safe, loving environment.',
    highlights: [
      'Low 1:3 teacher-to-child ratio',
      'Individualized care plans',
      'Sensory exploration activities',
      'Daily communication with parents',
      'Safe sleep practices',
      'Milestone tracking'
    ],
    schedule: [
      { time: '7:00 AM', activity: 'Arrival & Morning Snuggles' },
      { time: '8:00 AM', activity: 'Breakfast & Bottle Time' },
      { time: '9:00 AM', activity: 'Sensory Play & Tummy Time' },
      { time: '10:00 AM', activity: 'Morning Nap' },
      { time: '11:30 AM', activity: 'Lunch' },
      { time: '12:30 PM', activity: 'Story Time & Music' },
      { time: '1:00 PM', activity: 'Afternoon Nap' },
      { time: '3:00 PM', activity: 'Snack & Outdoor Time' },
      { time: '4:00 PM', activity: 'Creative Play' },
      { time: '5:00 PM', activity: 'Evening Activities & Pickup' }
    ]
  },
  {
    id: 'toddlers',
    name: 'Toddler Program',
    ageRange: '18 months - 3 years',
    icon: Blocks,
    color: 'bg-blue-100 text-blue-600',
    image: '/images/program-toddler.svg',
    description: 'Encouraging exploration and independence through play-based learning.',
    highlights: [
      '1:5 teacher-to-child ratio',
      'Potty training support',
      'Language development focus',
      'Social skills building',
      'Art and creative expression',
      'Outdoor exploration'
    ],
    schedule: [
      { time: '7:00 AM', activity: 'Arrival & Free Play' },
      { time: '8:00 AM', activity: 'Breakfast' },
      { time: '9:00 AM', activity: 'Circle Time & Songs' },
      { time: '9:30 AM', activity: 'Learning Centers' },
      { time: '10:30 AM', activity: 'Snack & Story Time' },
      { time: '11:00 AM', activity: 'Outdoor Play' },
      { time: '12:00 PM', activity: 'Lunch' },
      { time: '1:00 PM', activity: 'Nap/Rest Time' },
      { time: '3:00 PM', activity: 'Snack' },
      { time: '3:30 PM', activity: 'Art & Sensory Activities' },
      { time: '4:30 PM', activity: 'Music & Movement' },
      { time: '5:00 PM', activity: 'Free Play & Pickup' }
    ]
  },
  {
    id: 'preschool',
    name: 'Preschool Program',
    ageRange: '3 - 4 years',
    icon: Palette,
    color: 'bg-green-100 text-green-600',
    image: '/images/program-preschool.svg',
    description: 'Building foundations for academic success through hands-on learning.',
    highlights: [
      '1:8 teacher-to-child ratio',
      'Pre-reading and writing skills',
      'Mathematical concepts',
      'Science exploration',
      'Social-emotional learning',
      'Field trips and special events'
    ],
    schedule: [
      { time: '7:00 AM', activity: 'Arrival & Morning Activities' },
      { time: '8:00 AM', activity: 'Breakfast' },
      { time: '8:30 AM', activity: 'Morning Circle' },
      { time: '9:00 AM', activity: 'Literacy Activities' },
      { time: '10:00 AM', activity: 'Snack & Outdoor Play' },
      { time: '11:00 AM', activity: 'Math & Science' },
      { time: '12:00 PM', activity: 'Lunch' },
      { time: '1:00 PM', activity: 'Rest/Quiet Time' },
      { time: '2:30 PM', activity: 'Art & Creative Projects' },
      { time: '3:30 PM', activity: 'Snack' },
      { time: '4:00 PM', activity: 'Music & Movement' },
      { time: '5:00 PM', activity: 'Centers & Pickup' }
    ]
  },
  {
    id: 'pre-k',
    name: 'Pre-K Program',
    ageRange: '4 - 5 years',
    icon: GraduationCap,
    color: 'bg-purple-100 text-purple-600',
    image: '/images/program-prek.svg',
    description: 'Comprehensive kindergarten readiness program for confident learners.',
    highlights: [
      '1:10 teacher-to-child ratio',
      'Advanced literacy skills',
      'Mathematical reasoning',
      'Critical thinking',
      'Independence building',
      'Kindergarten transition support'
    ],
    schedule: [
      { time: '7:00 AM', activity: 'Arrival & Morning Work' },
      { time: '8:00 AM', activity: 'Breakfast' },
      { time: '8:30 AM', activity: 'Morning Meeting' },
      { time: '9:00 AM', activity: 'Literacy Block' },
      { time: '10:00 AM', activity: 'Snack & Recess' },
      { time: '10:45 AM', activity: 'Mathematics' },
      { time: '11:45 AM', activity: 'Lunch' },
      { time: '12:30 PM', activity: 'Rest/Reading Time' },
      { time: '1:30 PM', activity: 'Science/Social Studies' },
      { time: '2:30 PM', activity: 'Specials (Art/Music/PE)' },
      { time: '3:30 PM', activity: 'Snack' },
      { time: '4:00 PM', activity: 'Choice Time' },
      { time: '5:00 PM', activity: 'Homework Help & Pickup' }
    ]
  }
]

export default function ProgramsPage() {
  // Initialize popup triggers for programs page
  useProgramPagePopupTrigger()
  const { triggerPopup } = useManualPopup()

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="nursery-section bg-gradient-to-br from-background to-muted">
        <div className="nursery-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Our Programs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Age-appropriate programs designed to nurture every stage of your child's development. 
              From infants to pre-kindergarten, we provide engaging curriculum that inspires 
              curiosity and fosters growth.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full ${program.color} flex items-center justify-center mb-3`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{program.ageRange}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{program.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        if (program.id === 'infants') {
                          window.location.href = '/programs/infants'
                        } else if (program.id === 'toddlers') {
                          window.location.href = '/programs/toddlers'
                        } else if (program.id === 'preschool') {
                          window.location.href = '/programs/preschool'
                        } else if (program.id === 'pre-k') {
                          window.location.href = '/programs/pre-k'
                        } else {
                          const section = document.getElementById(program.id)
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth' })
                          }
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Detailed Program Sections */}
      {programs.map((program, index) => {
        const Icon = program.icon
        return (
          <motion.section 
            key={program.id} 
            id={program.id}
            className={`nursery-section ${index % 2 === 0 ? 'bg-muted' : 'bg-background'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="nursery-container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-full ${program.color} flex items-center justify-center mr-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif font-bold">{program.name}</h2>
                      <p className="text-muted-foreground">{program.ageRange}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg mb-6 leading-relaxed">{program.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-4">Program Highlights</h3>
                  <ul className="space-y-3 mb-8">
                    {program.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <Heart className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="nursery"
                      onClick={() => {
                        const contactSection = document.getElementById('contact-form')
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' })
                        } else {
                          alert(`Interested in our ${program.name}? Call (555) 123-4567 to schedule a tour!`)
                        }
                      }}
                    >
                      Schedule a Tour
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={triggerPopup}
                    >
                      Get Program Info
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Program Image */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src={program.image} 
                        alt={`${program.name} classroom`} 
                        className="w-full h-64 object-cover"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Sample Daily Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {program.schedule.map((item, i) => (
                          <div key={i} className="flex items-start text-sm">
                            <span className="font-medium w-20 flex-shrink-0">{item.time}</span>
                            <span className="text-muted-foreground">{item.activity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.section>
        )
      })}

      {/* Call to Action */}
      <section className="nursery-section bg-primary text-primary-foreground">
        <div className="nursery-container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Find the Perfect Program for Your Child
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Not sure which program is right for your child? Our experienced staff can help 
            you choose the best fit based on your child's age, development, and unique needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={triggerPopup}
            >
              Get Personalized Guidance
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => {
                alert('Schedule a tour to see our programs in action! Call (555) 123-4567')
              }}
            >
              Schedule a Tour
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}