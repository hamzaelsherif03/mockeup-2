'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Users, 
  Clock, 
  Puzzle, 
  FileText, 
  Phone, 
  Mail,
  CheckCircle,
  Activity,
  Shield,
  Award,
  Palette,
  Music,
  BookOpen,
  PlayCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

const toddlerFeatures = [
  {
    icon: Users,
    title: "1:6 Teacher Ratio",
    description: "Our small group sizes ensure each toddler receives individual attention while learning to interact with peers in a supportive environment.",
    highlight: "Perfect balance of attention and socialization"
  },
  {
    icon: Activity,
    title: "Potty Training Support",
    description: "Gentle, patient approach to potty training that follows your child&apos;s readiness cues and maintains consistency between home and school.",
    highlight: "Individual readiness approach"
  },
  {
    icon: Heart,
    title: "Social Skill Development",
    description: "Learning to share, take turns, express emotions, and build friendships through guided play and positive peer interactions.",
    highlight: "Building friendship foundations"
  },
  {
    icon: Palette,
    title: "Creative Arts & Crafts",
    description: "Hands-on creative experiences that develop fine motor skills, self-expression, and artistic confidence through age-appropriate projects.",
    highlight: "Fostering creativity and expression"
  }
]

const dailySchedule = [
  { time: '7:00 - 8:30 AM', activity: 'Arrival & Free Choice Centers', description: 'Self-directed play and morning greeting routines' },
  { time: '8:30 - 9:00 AM', activity: 'Breakfast & Morning Snack', description: 'Nutritious meal with growing independence' },
  { time: '9:00 - 9:30 AM', activity: 'Circle Time & Songs', description: 'Group gathering, calendar, and music activities' },
  { time: '9:30 - 10:30 AM', activity: 'Learning Centers', description: 'Dramatic play, blocks, books, and manipulatives' },
  { time: '10:30 - 11:00 AM', activity: 'Outdoor Play', description: 'Gross motor activities and nature exploration' },
  { time: '11:00 - 11:30 AM', activity: 'Story Time', description: 'Interactive reading and language development' },
  { time: '11:30 AM - 12:30 PM', activity: 'Lunch', description: 'Family-style meals promoting social skills' },
  { time: '12:30 - 2:30 PM', activity: 'Rest Time', description: 'Quiet rest or nap time for restoration' },
  { time: '2:30 - 3:00 PM', activity: 'Afternoon Snack', description: 'Healthy snacks and conversation practice' },
  { time: '3:00 - 4:00 PM', activity: 'Art & Creative Projects', description: 'Process-focused art experiences' },
  { time: '4:00 - 5:00 PM', activity: 'Music & Movement', description: 'Dancing, instruments, and body awareness' },
  { time: '5:00 - 6:00 PM', activity: 'Free Play & Pickup', description: 'Choice time and family reunions' }
]

const developmentAreas = [
  {
    icon: BookOpen,
    title: "Language & Communication",
    skills: [
      "Vocabulary expansion through conversation and books",
      "Learning to express needs and feelings with words", 
      "Following simple instructions and routines",
      "Singing songs and reciting nursery rhymes"
    ]
  },
  {
    icon: Puzzle,
    title: "Cognitive Development",
    skills: [
      "Problem-solving through play and exploration",
      "Understanding cause and effect relationships",
      "Sorting, matching, and early math concepts",
      "Memory development through routine and repetition"
    ]
  },
  {
    icon: Heart,
    title: "Social-Emotional Growth",
    skills: [
      "Learning to share and take turns with friends",
      "Expressing emotions in appropriate ways",
      "Developing empathy and caring for others",
      "Building confidence and independence"
    ]
  },
  {
    icon: Activity,
    title: "Physical Development",
    skills: [
      "Gross motor skills through climbing and running",
      "Fine motor development with art and manipulatives",
      "Body awareness and coordination activities",
      "Self-help skills like dressing and feeding"
    ]
  }
]

const learningCenters = [
  {
    name: "Dramatic Play Center",
    description: "Kitchen, dolls, and dress-up clothes for imaginative role-playing"
  },
  {
    name: "Block & Building Area", 
    description: "Various blocks and construction materials for spatial development"
  },
  {
    name: "Art & Creation Station",
    description: "Paint, crayons, playdough, and collage materials for creative expression"
  },
  {
    name: "Book & Quiet Corner",
    description: "Cozy reading space with age-appropriate books and soft seating"
  },
  {
    name: "Sensory & Science Table",
    description: "Hands-on exploration with water, sand, and natural materials"
  },
  {
    name: "Music & Movement Area",
    description: "Instruments, scarves, and space for dancing and rhythm activities"
  }
]

const pottyTrainingApproach = [
  "Follow each child&apos;s individual readiness signs and timeline",
  "Consistent communication between teachers and families",
  "Positive reinforcement and celebration of progress",
  "Accidents treated as learning opportunities without shame",
  "Flexible approach accommodating different learning styles",
  "Regular updates and collaboration with parents"
]

export default function ToddlerProgramPage() {
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
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta-100 to-terracotta-200 rounded-2xl flex items-center justify-center mr-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
                    Toddler Program
                  </h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    18 months - 3 years
                  </Badge>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Encouraging independence while providing security through structured play and learning. 
                Our toddler program balances exploration and guidance to support your child&apos;s growing 
                sense of self and curiosity about the world.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1:6</div>
                  <div className="text-sm text-muted-foreground">Teacher Ratio</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">Play</div>
                  <div className="text-sm text-muted-foreground">Based Learning</div>
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
                  Schedule Toddler Tour
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    alert('Download our Toddler Program Information Packet\nCall (555) 123-4567 or email us to receive detailed program information.');
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
                    src="/images/program-toddler.svg" 
                    alt="Active toddler learning environment with play centers, art activities, and group interaction spaces" 
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
              Growing Independence Through Guided Discovery
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The toddler years are magical - filled with wonder, exploration, and rapid growth. Our program 
              embraces this natural curiosity while providing the structure and security toddlers need to thrive. 
              We celebrate each child&apos;s unique personality while gently guiding them toward independence, 
              social skills, and a love of learning that will serve them throughout their educational journey.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            What Makes Our Toddler Program Special
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {toddlerFeatures.map((feature, index) => {
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
                A Day Full of Discovery
              </h2>
              <p className="text-muted-foreground mb-6">
                Our daily schedule provides the predictable routine toddlers crave while offering 
                plenty of opportunities for exploration, creativity, and social interaction. Each 
                day is carefully planned to balance active and quiet times, individual and group 
                activities, and structured and free-choice experiences.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Flexible Structure:</strong> While we maintain consistent routines, we adapt 
                  to the needs and interests of the children in our care, allowing for spontaneous 
                  learning opportunities.
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
                    Daily Schedule
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
            Supporting Your Toddler&apos;s Development
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

      {/* Learning Centers */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Engaging Learning Centers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCenters.map((center, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <PlayCircle className="h-5 w-5 mr-2 text-primary" />
                      {center.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {center.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Potty Training */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-bold mb-6">
                Gentle Potty Training Support
              </h2>
              <p className="text-muted-foreground mb-6">
                Potty training is a significant milestone that requires patience, consistency, and 
                understanding. Our experienced toddler teachers work closely with families to create 
                a positive, stress-free experience that honors each child&apos;s unique timeline and 
                readiness signs.
              </p>
              
              <ul className="space-y-3">
                {pottyTrainingApproach.map((approach, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>{approach}</span>
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
                    Our Toddler Specialists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                      <img 
                        src="/images/staff-teacher1.svg" 
                        alt="Maria Rodriguez, Lead Toddler Teacher" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold">Maria Rodriguez</h3>
                    <p className="text-sm text-primary mb-2">Lead Toddler Teacher</p>
                    <p className="text-xs text-muted-foreground">
                      8+ years toddler experience<br />
                      Bilingual education specialist
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Program Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Group Size</span>
                      <span className="font-medium">12 children max</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Teacher Ratio</span>
                      <span className="font-medium">1:6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Outdoor Time</span>
                      <span className="font-medium">Daily</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Art Projects</span>
                      <span className="font-medium">Process-focused</span>
                    </div>
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
                Ready to Explore Our Toddler Program?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Come see our engaging toddler environment in action! Watch how we balance 
                structure and freedom, support growing independence, and celebrate each 
                child&apos;s unique personality and learning style.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Call Our Toddler Coordinator</p>
                    <a href="tel:+15551234567" className="text-primary-foreground/80 hover:text-primary-foreground">
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Email Questions</p>
                    <a href="mailto:toddlers@littlesprouts.com" className="text-primary-foreground/80 hover:text-primary-foreground">
                      toddlers@littlesprouts.com
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
                    Schedule Your Toddler Tour
                  </h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Experience our toddler program firsthand. See our learning centers, 
                    meet our caring teachers, and discover how we make learning fun!
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