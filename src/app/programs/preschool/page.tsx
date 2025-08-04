'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  BookOpen, 
  Calculator, 
  Clock, 
  FileText, 
  Phone, 
  Mail,
  CheckCircle,
  Award,
  Shield,
  MapPin,
  Camera,
  Music,
  Palette,
  Puzzle,
  Globe,
  Star,
  Calendar
} from 'lucide-react'
import { motion } from 'framer-motion'

const preschoolFeatures = [
  {
    icon: Users,
    title: "1:8 Teacher Ratio",
    description: "Optimal group size that allows for individualized attention while fostering collaborative learning and peer relationships in a structured environment.",
    highlight: "Perfect learning community size"
  },
  {
    icon: BookOpen,
    title: "Pre-Literacy & Math Skills",
    description: "Introduction to letters, sounds, numbers, and early math concepts through hands-on activities, games, and interactive learning experiences.",
    highlight: "School readiness foundation"
  },
  {
    icon: Globe,
    title: "Circle Time & Group Play",
    description: "Daily group activities that build listening skills, turn-taking, sharing ideas, and participating in community discussions and collaborative projects.",
    highlight: "Building community connections"
  },
  {
    icon: MapPin,
    title: "Field Trips & Special Events",
    description: "Regular excursions to libraries, farms, museums, and community locations that extend learning beyond the classroom and create memorable experiences.",
    highlight: "Real-world learning adventures"
  }
]

const dailySchedule = [
  { time: '7:00 - 8:30 AM', activity: 'Arrival & Morning Work', description: 'Independent activities and social preparation' },
  { time: '8:30 - 9:00 AM', activity: 'Breakfast', description: 'Nutritious meal with conversation practice' },
  { time: '9:00 - 9:30 AM', activity: 'Morning Circle', description: 'Calendar, weather, sharing, and planning' },
  { time: '9:30 - 10:30 AM', activity: 'Learning Centers', description: 'Literacy, math, science, and dramatic play' },
  { time: '10:30 - 11:00 AM', activity: 'Snack & Outdoor Play', description: 'Fresh air and gross motor activities' },
  { time: '11:00 - 11:45 AM', activity: 'Story Time & Discussion', description: 'Interactive reading and comprehension' },
  { time: '11:45 AM - 12:45 PM', activity: 'Lunch', description: 'Family-style dining and social skills' },
  { time: '12:45 - 2:15 PM', activity: 'Rest/Quiet Time', description: 'Nap or quiet activities for restoration' },
  { time: '2:15 - 2:45 PM', activity: 'Afternoon Snack', description: 'Healthy treats and friendship building' },
  { time: '2:45 - 3:45 PM', activity: 'Project Time', description: 'Art, science experiments, and investigations' },
  { time: '3:45 - 4:45 PM', activity: 'Music & Movement', description: 'Songs, dancing, and rhythm activities' },
  { time: '4:45 - 6:00 PM', activity: 'Choice Centers & Pickup', description: 'Free choice activities and family time' }
]

const learningAreas = [
  {
    icon: BookOpen,
    title: "Language & Literacy",
    skills: [
      "Letter recognition and phonetic sounds",
      "Pre-writing skills and name practice", 
      "Vocabulary development through stories",
      "Listening comprehension and discussion skills",
      "Introduction to rhyming and word patterns"
    ]
  },
  {
    icon: Calculator,
    title: "Mathematics & Logic",
    skills: [
      "Number recognition and counting to 20",
      "Patterns, sorting, and classification",
      "Basic addition and subtraction concepts",
      "Shape recognition and spatial relationships",
      "Measurement and comparison activities"
    ]
  },
  {
    icon: Globe,
    title: "Science & Discovery",
    skills: [
      "Simple experiments and observations",
      "Nature exploration and classification",
      "Weather patterns and seasonal changes",
      "Animal habitats and life cycles",
      "Cause and effect investigations"
    ]
  },
  {
    icon: Palette,
    title: "Creative Arts",
    skills: [
      "Various art mediums and techniques",
      "Music appreciation and instrument play",
      "Creative movement and dance",
      "Dramatic play and storytelling",
      "Cultural arts and traditions exploration"
    ]
  }
]

const fieldTripExamples = [
  {
    icon: BookOpen,
    destination: "Public Library",
    description: "Story time sessions, book exploration, and meeting librarians"
  },
  {
    icon: MapPin,
    destination: "Local Farm",
    description: "Animal interactions, crop learning, and farm-to-table education"
  },
  {
    icon: Star,
    destination: "Children&apos;s Museum",
    description: "Hands-on exhibits, interactive learning, and guided exploration"
  },
  {
    icon: Music,
    destination: "Community Theater",
    description: "Age-appropriate performances and behind-the-scenes tours"
  },
  {
    icon: Globe,
    destination: "Fire Station",
    description: "Safety education, equipment exploration, and community helpers"
  },
  {
    icon: Camera,
    destination: "Nature Center",
    description: "Wildlife observation, nature walks, and environmental learning"
  }
]

const specialEvents = [
  "Seasonal celebrations and cultural holidays",
  "Family fun nights and community building",
  "Grandparents Day and special visitors",
  "Art show displaying children&apos;s creativity",
  "Science fair with hands-on experiments",
  "Graduation ceremony preparing for kindergarten"
]

const schoolReadinessSkills = [
  {
    category: "Academic Readiness",
    skills: ["Letter and number recognition", "Following multi-step directions", "Problem-solving strategies", "Basic writing skills"]
  },
  {
    category: "Social Skills", 
    skills: ["Sharing and cooperation", "Conflict resolution", "Friendship building", "Group participation"]
  },
  {
    category: "Independence",
    skills: ["Self-care routines", "Responsibility for belongings", "Decision-making skills", "Time management awareness"]
  },
  {
    category: "Communication",
    skills: ["Clear verbal expression", "Active listening", "Asking questions", "Storytelling abilities"]
  }
]

export default function PreschoolProgramPage() {
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
                <div className="w-16 h-16 bg-gradient-to-br from-mocha-mousse-100 to-mocha-mousse-200 rounded-2xl flex items-center justify-center mr-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
                    Preschool Program
                  </h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    3 - 4 years
                  </Badge>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Building foundation skills through play-based learning and group activities. 
                Our preschool program prepares children for academic success while fostering 
                creativity, critical thinking, and social development in a supportive community.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1:8</div>
                  <div className="text-sm text-muted-foreground">Teacher Ratio</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">K-Prep</div>
                  <div className="text-sm text-muted-foreground">Focus</div>
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
                  Schedule Preschool Tour
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    alert('Download our Preschool Program Information Packet\nCall (555) 123-4567 or email us to receive detailed program information.');
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
                    src="/images/program-preschool.svg" 
                    alt="Engaging preschool classroom with learning centers, group activities, and educational materials for foundation skill building" 
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
              Preparing Young Scholars for Success
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our preschool program strikes the perfect balance between academic preparation and 
              joyful childhood experiences. Through play-based learning, group activities, and 
              exciting field trips, children develop the confidence, skills, and love of learning 
              that will serve them throughout their educational journey. We celebrate each child&apos;s 
              unique strengths while building the foundation skills needed for kindergarten success.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            What Makes Our Preschool Program Special
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {preschoolFeatures.map((feature, index) => {
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
                A Day of Learning Adventures
              </h2>
              <p className="text-muted-foreground mb-6">
                Our preschool day is thoughtfully structured to include a rich variety of 
                learning experiences. From morning circle time to hands-on projects, each 
                activity is designed to engage curious minds while building essential skills 
                for kindergarten readiness.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  <strong>Learning Through Play:</strong> Our curriculum integrates academic 
                  skills into engaging, age-appropriate activities that make learning natural 
                  and enjoyable for preschoolers.
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

      {/* Learning Areas */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Comprehensive Learning Areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learningAreas.map((area, index) => {
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

      {/* Field Trips & Special Events */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Field Trips & Special Events
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Educational Field Trips</h3>
              <p className="text-muted-foreground mb-6">
                Our regular field trips extend learning beyond the classroom, providing 
                real-world experiences that bring curriculum concepts to life and create 
                lasting memories.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fieldTripExamples.map((trip, index) => {
                  const Icon = trip.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-1">{trip.destination}</h4>
                              <p className="text-xs text-muted-foreground">{trip.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Special Events & Celebrations</h3>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Annual Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {specialEvents.map((event, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-4 w-4 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm">{event}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2">Family Involvement</h4>
                <p className="text-sm text-muted-foreground">
                  Parents and families are always welcome to join field trips and special 
                  events. We believe in creating a strong home-school connection that 
                  supports each child&apos;s learning journey.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Readiness */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Kindergarten Readiness Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolReadinessSkills.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                          <span className="text-sm">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff & Program Info */}
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
                Experienced Preschool Educators
              </h2>
              <p className="text-muted-foreground mb-6">
                Our preschool teachers are specially trained in early childhood education 
                and understand the unique developmental needs of 3-4 year olds. They create 
                engaging, supportive environments where every child can thrive academically 
                and socially.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-muted rounded-lg">
                  <Award className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Qualified Teachers</h3>
                    <p className="text-sm text-muted-foreground">Early childhood education degrees and ongoing training</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-muted rounded-lg">
                  <Shield className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Safety First</h3>
                    <p className="text-sm text-muted-foreground">CPR/First Aid certified with background checks</p>
                  </div>
                </div>
              </div>
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
                    <Users className="h-5 w-5 mr-2" />
                    Program Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Class Size</span>
                      <span className="font-medium">16 children maximum</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Teacher Ratio</span>
                      <span className="font-medium">1:8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Field Trips</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Curriculum</span>
                      <span className="font-medium">Play-based learning</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Assessment</span>
                      <span className="font-medium">Portfolio documentation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Ready for the Next Step?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our preschool graduates enter kindergarten confident, curious, and 
                    prepared for academic success.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    95% kindergarten readiness rate
                  </Badge>
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
                Experience Our Preschool Program
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Come see our dynamic preschool classrooms in action! Observe our engaging 
                learning centers, meet our dedicated teachers, and discover how we prepare 
                children for kindergarten success through joyful, meaningful experiences.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Call Our Preschool Coordinator</p>
                    <a href="tel:+15551234567" className="text-primary-foreground/80 hover:text-primary-foreground">
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Email Questions</p>
                    <a href="mailto:preschool@littlesprouts.com" className="text-primary-foreground/80 hover:text-primary-foreground">
                      preschool@littlesprouts.com
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
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Schedule Your Preschool Tour
                  </h3>
                  <p className="text-white/80 mb-6">
                    Watch our preschoolers engage in hands-on learning, participate in 
                    circle time, and prepare for their bright academic future.
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