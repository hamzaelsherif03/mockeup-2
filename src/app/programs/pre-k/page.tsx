'use client'

import { PageWrapper } from '@/components/layout/page-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  BookOpen, 
  PenTool, 
  Users, 
  Clock, 
  FileText, 
  Phone, 
  Mail,
  CheckCircle,
  Award,
  Shield,
  Microscope,
  Calculator,
  Globe,
  Star,
  Target,
  Lightbulb,
  Brain,
  Trophy,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

const preKFeatures = [
  {
    icon: Users,
    title: "1:10 Teacher Ratio",
    description: "Advanced group size that encourages peer collaboration, leadership development, and independent learning while maintaining quality individual support.",
    highlight: "Preparing for kindergarten class sizes"
  },
  {
    icon: GraduationCap,
    title: "Kindergarten Prep Curriculum",
    description: "Comprehensive academic program aligned with kindergarten standards, ensuring seamless transition and confident entry into elementary school.",
    highlight: "Standards-aligned learning"
  },
  {
    icon: BookOpen,
    title: "Reading & Writing Skills",
    description: "Advanced literacy instruction including phonics, sight words, reading comprehension, and writing mechanics to build confident readers and writers.",
    highlight: "Advanced literacy development"
  },
  {
    icon: Microscope,
    title: "Science Experiments",
    description: "Hands-on scientific inquiry and experimentation that develops critical thinking, observation skills, and understanding of scientific methods.",
    highlight: "STEM learning foundation"
  }
]

const dailySchedule = [
  { time: '7:00 - 8:30 AM', activity: 'Arrival & Morning Work', description: 'Independent academic activities and preparation' },
  { time: '8:30 - 9:00 AM', activity: 'Breakfast', description: 'Nutritious meal with academic discussions' },
  { time: '9:00 - 9:30 AM', activity: 'Morning Meeting', description: 'Calendar, current events, and goal setting' },
  { time: '9:30 - 10:30 AM', activity: 'Literacy Block', description: 'Reading, phonics, and writing instruction' },
  { time: '10:30 - 11:00 AM', activity: 'Snack & Recess', description: 'Social time and physical activity' },
  { time: '11:00 - 11:45 AM', activity: 'Mathematics', description: 'Number concepts and problem-solving' },
  { time: '11:45 AM - 12:45 PM', activity: 'Lunch', description: 'Social dining and conversation practice' },
  { time: '12:45 - 1:30 PM', activity: 'Rest/Reading Time', description: 'Quiet activities and independent reading' },
  { time: '1:30 - 2:30 PM', activity: 'Science/Social Studies', description: 'Experiments and world exploration' },
  { time: '2:30 - 3:00 PM', activity: 'Afternoon Snack', description: 'Healthy treats and peer interaction' },
  { time: '3:00 - 4:00 PM', activity: 'Specials (Art/Music/PE)', description: 'Creative and physical development' },
  { time: '4:00 - 5:00 PM', activity: 'Choice Time & Projects', description: 'Independent exploration and creativity' },
  { time: '5:00 - 6:00 PM', activity: 'Homework Prep & Pickup', description: 'Study skills and family transition' }
]

const academicAreas = [
  {
    icon: BookOpen,
    title: "Advanced Literacy",
    skills: [
      "Phonics mastery and decoding strategies",
      "Sight word recognition (100+ words)", 
      "Reading comprehension and discussion",
      "Creative and expository writing",
      "Storytelling and presentation skills",
      "Library and research skills introduction"
    ]
  },
  {
    icon: Calculator,
    title: "Mathematical Reasoning",
    skills: [
      "Number recognition and writing to 100",
      "Addition and subtraction with manipulatives",
      "Patterns, graphing, and data analysis",
      "Geometry and spatial relationships",
      "Time, money, and measurement concepts",
      "Word problem solving strategies"
    ]
  },
  {
    icon: Microscope,
    title: "Scientific Inquiry",
    skills: [
      "Hypothesis formation and testing",
      "Observation and data recording",
      "Simple experiments and investigations",
      "Life cycles and natural phenomena",
      "Weather patterns and earth science",
      "Scientific vocabulary development"
    ]
  },
  {
    icon: Globe,
    title: "Social Studies",
    skills: [
      "Community helpers and civic responsibility",
      "Geography and map skills",
      "Cultural diversity and traditions",
      "Historical timeline understanding",
      "Government and rule-making concepts",
      "Environmental awareness and conservation"
    ]
  }
]

const scienceExperiments = [
  {
    title: "Volcano Eruption",
    description: "Chemical reactions with baking soda and vinegar",
    skills: ["Observation", "Prediction", "Chemical changes"]
  },
  {
    title: "Plant Growth Study",
    description: "Growing seeds under different conditions",
    skills: ["Life cycles", "Variables", "Data collection"]
  },
  {
    title: "Sink or Float",
    description: "Testing object density and buoyancy",
    skills: ["Hypothesis", "Properties", "Classification"]
  },
  {
    title: "Color Mixing Lab",
    description: "Primary and secondary color combinations",
    skills: ["Art integration", "Prediction", "Recording"]
  },
  {
    title: "Weather Station",
    description: "Daily weather tracking and patterns",
    skills: ["Data analysis", "Graphing", "Prediction"]
  },
  {
    title: "Simple Machines",
    description: "Exploring levers, pulleys, and ramps",
    skills: ["Engineering", "Problem-solving", "Physics"]
  }
]

const kindergartenReadiness = [
  {
    category: "Academic Skills",
    icon: BookOpen,
    achievements: [
      "Reads simple books independently",
      "Writes name and simple sentences",
      "Counts to 100 and does basic math",
      "Follows multi-step instructions"
    ]
  },
  {
    category: "Social Development", 
    icon: Users,
    achievements: [
      "Works cooperatively in groups",
      "Resolves conflicts peacefully",
      "Shows empathy and kindness",
      "Demonstrates leadership skills"
    ]
  },
  {
    category: "Independence",
    icon: Target,
    achievements: [
      "Manages personal belongings",
      "Completes tasks without reminders",
      "Makes responsible choices",
      "Organizes workspace effectively"
    ]
  },
  {
    category: "Learning Skills",
    icon: Brain,
    achievements: [
      "Asks thoughtful questions",
      "Persists through challenges",
      "Uses problem-solving strategies",
      "Reflects on learning experiences"
    ]
  }
]

const transitionSupport = [
  "School visits and kindergarten teacher meetings",
  "Practice with kindergarten routines and expectations",
  "Portfolio development showcasing academic progress",
  "Parent conferences with kindergarten readiness assessment",
  "Collaboration with receiving elementary schools",
  "Summer transition activities and resources"
]

const specialPrograms = [
  {
    title: "Young Scientists Club",
    description: "Weekly advanced experiments and STEM challenges",
    icon: Microscope
  },
  {
    title: "Future Leaders Program", 
    description: "Leadership opportunities and community service projects",
    icon: Trophy
  },
  {
    title: "Reading Buddies",
    description: "Peer tutoring and reading partnership program",
    icon: BookOpen
  },
  {
    title: "Math Olympiad Prep",
    description: "Advanced mathematical thinking and problem-solving",
    icon: Calculator
  }
]

export default function PreKProgramPage() {
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
                <div className="w-16 h-16 bg-gradient-to-br from-forest-green-100 to-forest-green-200 rounded-2xl flex items-center justify-center mr-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
                    Pre-K Program
                  </h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    4 - 5 years
                  </Badge>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Kindergarten readiness with advanced learning and social preparation. 
                Our comprehensive Pre-K program ensures children enter kindergarten as 
                confident, capable learners ready to excel in their academic journey.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1:10</div>
                  <div className="text-sm text-muted-foreground">Teacher Ratio</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">K-Ready</div>
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
                  Schedule Pre-K Tour
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    alert('Download our Pre-K Program Information Packet\nCall (555) 123-4567 or email us to receive detailed program information.');
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
                    src="/images/prek.webp" 
                    alt="Advanced Pre-K learning environment with kindergarten preparation activities, science experiments, and academic skill development" 
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
              Launching Confident Kindergarteners
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our Pre-K program represents the culmination of early childhood education excellence. 
              Through advanced academic instruction, hands-on science exploration, and comprehensive 
              social preparation, we ensure every child is not just ready for kindergarten, but 
              excited and confident about their next educational adventure. Our graduates consistently 
              excel in elementary school and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            What Makes Our Pre-K Program Exceptional
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {preKFeatures.map((feature, index) => {
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
                A Day of Academic Excellence
              </h2>
              <p className="text-muted-foreground mb-6">
                Our Pre-K daily schedule mirrors kindergarten structure while maintaining 
                age-appropriate pacing and activities. Children experience the routines and 
                expectations they&apos;ll encounter in elementary school, building confidence 
                and familiarity with academic environments.
              </p>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-purple-800">
                  <strong>Kindergarten Simulation:</strong> Our schedule closely matches typical 
                  kindergarten days, helping children feel prepared and confident for their 
                  transition to elementary school.
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

      {/* Academic Areas */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Comprehensive Academic Curriculum
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academicAreas.map((area, index) => {
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

      {/* Science Experiments */}
      <section className="nursery-section bg-background">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Hands-On Science Exploration
          </h2>

          <div className="max-w-2xl mx-auto text-center mb-8">
            <p className="text-lg text-muted-foreground">
              Our Pre-K scientists engage in weekly experiments that develop critical thinking, 
              observation skills, and scientific reasoning. Each experiment builds understanding 
              of STEM concepts while fostering curiosity and discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scienceExperiments.map((experiment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Microscope className="h-5 w-5 text-primary mr-2" />
                      <CardTitle className="text-lg">{experiment.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{experiment.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Learning Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experiment.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kindergarten Readiness */}
      <section className="nursery-section bg-muted">
        <div className="nursery-container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Kindergarten Readiness Milestones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kindergartenReadiness.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-left">
                        {category.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start">
                            <Star className="h-3 w-3 text-primary mt-1 mr-2 flex-shrink-0" />
                            <span className="text-sm">{achievement}</span>
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

      {/* Special Programs & Transition Support */}
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
                Special Enrichment Programs
              </h2>
              <p className="text-muted-foreground mb-6">
                Our Pre-K students have opportunities to participate in specialized programs 
                that challenge advanced learners and develop specific interests and talents.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialPrograms.map((program, index) => {
                  const Icon = program.icon
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
                              <h4 className="font-semibold text-sm mb-1">{program.title}</h4>
                              <p className="text-xs text-muted-foreground">{program.description}</p>
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
              <h2 className="text-3xl font-serif font-bold mb-6">
                Kindergarten Transition Support
              </h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Transition Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {transitionSupport.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <Zap className="h-4 w-4 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="p-6 bg-primary/5 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" />
                  Success Stories
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our Pre-K graduates consistently excel in kindergarten and beyond:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• 100% meet kindergarten readiness standards</li>
                  <li>• 95% exceed grade-level expectations by year-end</li>
                  <li>• 98% teacher satisfaction with preparation</li>
                  <li>• Strong social and leadership skills</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Staff & Program Excellence */}
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
                Expert Pre-K Educators
              </h2>
              <p className="text-muted-foreground mb-6">
                Our Pre-K teachers hold advanced degrees in early childhood education and 
                specialize in kindergarten transition. They understand both child development 
                and elementary school expectations, creating the perfect bridge for our students.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-background rounded-lg">
                  <Award className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Master&apos;s Level Education</h3>
                    <p className="text-sm text-muted-foreground">Advanced degrees in early childhood and elementary education</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-background rounded-lg">
                  <Shield className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Kindergarten Specialists</h3>
                    <p className="text-sm text-muted-foreground">Specialized training in school readiness and transition</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-background rounded-lg">
                  <Brain className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Continuous Learning</h3>
                    <p className="text-sm text-muted-foreground">Regular professional development and collaboration with kindergarten teachers</p>
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
                    Program Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Class Size</span>
                      <span className="font-medium">20 children maximum</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Teacher Ratio</span>
                      <span className="font-medium">1:10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Science Labs</span>
                      <span className="font-medium">Weekly</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Reading Level</span>
                      <span className="font-medium">Kindergarten+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">School Visits</span>
                      <span className="font-medium">Multiple per year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Ready for Success</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our comprehensive program ensures every child is academically, socially, 
                    and emotionally prepared for kindergarten excellence.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">100%</div>
                      <div className="text-muted-foreground">K-Ready Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">15+</div>
                      <div className="text-muted-foreground">Years Experience</div>
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
                Secure Your Child&apos;s Academic Future
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Give your child the strongest possible start to their academic journey. 
                Our Pre-K program doesn&apos;t just prepare children for kindergarten—it 
                launches them toward a lifetime of educational success and confidence.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Call Our Pre-K Coordinator</p>
                    <a href="tel:+15551234567" className="text-primary-foreground/80 hover:text-primary-foreground">
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Email Questions</p>
                    <a href="mailto:prek@littlesprouts.com" className="text-primary-foreground/80 hover:text-primary-foreground">
                      prek@littlesprouts.com
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
                    Schedule Your Pre-K Tour
                  </h3>
                  <p className="text-white/80 mb-6">
                    See our advanced learning environment, meet our expert teachers, 
                    and discover how we prepare children for academic excellence.
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