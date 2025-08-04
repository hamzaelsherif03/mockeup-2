'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Clock, 
  Users, 
  BookOpen, 
  Heart, 
  Utensils, 
  Moon,
  Baby,
  Palette,
  Music,
  Puzzle,
  CheckCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

const programData = [
  {
    id: 'infants',
    title: 'Infant Program',
    ageRange: '6 weeks - 18 months',
    icon: Baby,
    color: 'from-sage-green-100 to-sage-green-200',
    ratio: '1:4',
    hours: '7:00 AM - 6:00 PM',
    description: 'Our infant program provides a nurturing, home-like environment where your baby receives individualized care and attention.',
    curriculum: {
      focus: 'Attachment, sensory development, and early communication',
      activities: [
        'Tummy time and motor skill development',
        'Sensory exploration with safe materials',
        'Music and movement activities',
        'Reading and language development',
        'Individual feeding and sleep schedules'
      ]
    },
    dailySchedule: [
      { time: '7:00-8:30 AM', activity: 'Arrival & Free Play' },
      { time: '8:30-9:00 AM', activity: 'Morning Snack' },
      { time: '9:00-10:00 AM', activity: 'Tummy Time & Motor Skills' },
      { time: '10:00-11:30 AM', activity: 'Individual Naps (as needed)' },
      { time: '11:30 AM-12:30 PM', activity: 'Lunch & Feeding' },
      { time: '12:30-2:30 PM', activity: 'Afternoon Naps' },
      { time: '2:30-3:00 PM', activity: 'Sensory Play' },
      { time: '3:00-4:00 PM', activity: 'Outdoor Time (weather permitting)' },
      { time: '4:00-5:30 PM', activity: 'Free Play & Departure' }
    ],
    features: [
      'Flexible feeding schedules',
      'Individual attention and care',
      'Daily communication logs',
      'Safe sleep practices',
      'Sanitized toys and environment'
    ]
  },
  {
    id: 'toddlers',
    title: 'Toddler Program',
    ageRange: '18 months - 3 years',
    icon: Heart,
    color: 'from-terracotta-100 to-terracotta-200',
    ratio: '1:6',
    hours: '7:00 AM - 6:00 PM',
    description: 'Our toddler program encourages independence while providing the security and structure toddlers need to thrive.',
    curriculum: {
      focus: 'Language development, social skills, and independence',
      activities: [
        'Circle time with songs and stories',
        'Art and creative expression',
        'Dramatic play and imagination',
        'Early potty training support',
        'Social interaction and sharing'
      ]
    },
    dailySchedule: [
      { time: '7:00-8:30 AM', activity: 'Arrival & Centers' },
      { time: '8:30-9:00 AM', activity: 'Morning Snack' },
      { time: '9:00-9:30 AM', activity: 'Circle Time' },
      { time: '9:30-10:30 AM', activity: 'Learning Centers' },
      { time: '10:30-11:00 AM', activity: 'Outdoor Play' },
      { time: '11:00-12:00 PM', activity: 'Lunch' },
      { time: '12:00-2:30 PM', activity: 'Nap Time' },
      { time: '2:30-3:00 PM', activity: 'Snack Time' },
      { time: '3:00-4:00 PM', activity: 'Art & Creative Play' },
      { time: '4:00-6:00 PM', activity: 'Free Play & Departure' }
    ],
    features: [
      'Potty training support',
      'Language development focus',
      'Social skill building',
      'Creative arts program',
      'Outdoor exploration daily'
    ]
  },
  {
    id: 'preschool',
    title: 'Preschool Program',
    ageRange: '3 - 4 years',
    icon: BookOpen,
    color: 'from-mocha-mousse-100 to-mocha-mousse-200',
    ratio: '1:8',
    hours: '7:00 AM - 6:00 PM',
    description: 'Our preschool program builds foundation skills through play-based learning and structured group activities.',
    curriculum: {
      focus: 'Pre-literacy, math concepts, and social development',
      activities: [
        'Letter and number recognition',
        'Science experiments and discovery',
        'Cooperative games and teamwork',
        'Fine motor skill development',
        'Cultural awareness and diversity'
      ]
    },
    dailySchedule: [
      { time: '7:00-8:30 AM', activity: 'Arrival & Free Choice' },
      { time: '8:30-9:00 AM', activity: 'Breakfast' },
      { time: '9:00-9:30 AM', activity: 'Morning Circle' },
      { time: '9:30-10:30 AM', activity: 'Learning Centers' },
      { time: '10:30-11:00 AM', activity: 'Outdoor Play' },
      { time: '11:00-11:30 AM', activity: 'Story Time' },
      { time: '11:30 AM-12:30 PM', activity: 'Lunch' },
      { time: '12:30-2:30 PM', activity: 'Rest/Quiet Time' },
      { time: '2:30-3:00 PM', activity: 'Snack' },
      { time: '3:00-4:30 PM', activity: 'Project Time' },
      { time: '4:30-6:00 PM', activity: 'Free Play & Departure' }
    ],
    features: [
      'School readiness preparation',
      'STEAM learning activities',
      'Group project collaboration',
      'Field trips and special events',
      'Individual portfolios'
    ]
  },
  {
    id: 'pre-k',
    title: 'Pre-K Program',
    ageRange: '4 - 5 years',
    icon: Puzzle,
    color: 'from-forest-green-100 to-forest-green-200',
    ratio: '1:10',
    hours: '7:00 AM - 6:00 PM',
    description: 'Our Pre-K program ensures kindergarten readiness with advanced learning and comprehensive school preparation.',
    curriculum: {
      focus: 'Academic readiness, critical thinking, and independence',
      activities: [
        'Reading and writing skills',
        'Math problem solving',
        'Science investigations',
        'Social studies exploration',
        'Leadership opportunities'
      ]
    },
    dailySchedule: [
      { time: '7:00-8:30 AM', activity: 'Arrival & Journal Writing' },
      { time: '8:30-9:00 AM', activity: 'Breakfast' },
      { time: '9:00-9:30 AM', activity: 'Morning Meeting' },
      { time: '9:30-10:30 AM', activity: 'Literacy Block' },
      { time: '10:30-11:00 AM', activity: 'Math Activities' },
      { time: '11:00-11:30 AM', activity: 'Outdoor Time' },
      { time: '11:30 AM-12:30 PM', activity: 'Lunch' },
      { time: '12:30-1:30 PM', activity: 'Rest/Reading Time' },
      { time: '1:30-2:30 PM', activity: 'Science/Social Studies' },
      { time: '2:30-3:00 PM', activity: 'Snack' },
      { time: '3:00-4:30 PM', activity: 'Choice Time & Projects' },
      { time: '4:30-6:00 PM', activity: 'Reflection & Departure' }
    ],
    features: [
      'Kindergarten readiness assessment',
      'Academic skill building',
      'Leadership development',
      'Portfolio documentation',
      'Transition support to elementary'
    ]
  }
]

interface ProgramDetailsProps {
  programId?: string
}

export function ProgramDetails({ programId }: ProgramDetailsProps) {
  const program = programId ? 
    programData.find(p => p.id === programId) || programData[0] : 
    programData[0]

  const Icon = program.icon

  return (
    <section className="nursery-section">
      <div className="nursery-container">
        {/* Program Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mr-6`}>
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">{program.title}</h1>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  {program.ageRange}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {program.ratio} Ratio
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {program.hours}
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            {program.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Curriculum & Learning Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{program.curriculum.focus}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {program.curriculum.activities.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Daily Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Daily Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {program.dailySchedule.map((item, index) => (
                      <div key={index} className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="font-medium text-sm text-primary min-w-[120px]">
                          {item.time}
                        </div>
                        <div className="text-sm">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Program Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Program Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">At a Glance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Teacher Ratio</span>
                    <span className="font-medium">{program.ratio}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hours</span>
                    <span className="font-medium">{program.hours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Age Range</span>
                    <span className="font-medium">{program.ageRange}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-primary/5">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Interested in This Program?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule a tour to see our {program.title.toLowerCase()} in action and meet our amazing teachers.
                  </p>
                  <div className="space-y-2">
                    <Button variant="nursery" className="w-full">
                      Schedule Tour
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Download Info Packet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Have Questions?</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-medium">Call Us</div>
                      <div className="text-muted-foreground">(555) 123-4567</div>
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">info@littlesprouts.com</div>
                    </div>
                    <div>
                      <div className="font-medium">Visit Us</div>
                      <div className="text-muted-foreground">123 Nursery Lane<br />Springfield, ST 12345</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}