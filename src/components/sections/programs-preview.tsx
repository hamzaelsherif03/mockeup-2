'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Baby, Heart, Users, GraduationCap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const programs = [
  {
    id: 'infants',
    title: 'Infants',
    ageRange: '6 weeks - 18 months',
    icon: Baby,
    description: 'Nurturing care with individualized attention, feeding schedules, and developmental activities.',
    features: [
      'Low 1:4 teacher-to-child ratio',
      'Flexible feeding & nap schedules', 
      'Daily development reports',
      'Sensory play activities'
    ],
    color: 'bg-gradient-to-br from-sage-green-100 to-sage-green-200'
  },
  {
    id: 'toddlers',
    title: 'Toddlers',
    ageRange: '18 months - 3 years',
    icon: Heart,
    description: 'Encouraging independence while providing security through structured play and learning.',
    features: [
      '1:6 teacher-to-child ratio',
      'Potty training support',
      'Social skill development',
      'Creative arts & crafts'
    ],
    color: 'bg-gradient-to-br from-terracotta-100 to-terracotta-200'
  },
  {
    id: 'preschool',
    title: 'Preschool',
    ageRange: '3 - 4 years',
    icon: Users,
    description: 'Building foundation skills through play-based learning and group activities.',
    features: [
      '1:8 teacher-to-child ratio',
      'Pre-literacy & math skills',
      'Circle time & group play',
      'Field trips & special events'
    ],
    color: 'bg-gradient-to-br from-mocha-mousse-100 to-mocha-mousse-200'
  },
  {
    id: 'pre-k',
    title: 'Pre-K',
    ageRange: '4 - 5 years',
    icon: GraduationCap,
    description: 'Kindergarten readiness with advanced learning and social preparation.',
    features: [
      '1:10 teacher-to-child ratio',
      'Kindergarten prep curriculum',
      'Reading & writing skills',
      'Science experiments'
    ],
    color: 'bg-gradient-to-br from-forest-green-100 to-forest-green-200'
  }
]

export function ProgramsPreview() {
  return (
    <section className="nursery-section bg-muted/50">
      <div className="nursery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Age-Appropriate Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our expert-designed programs nurture your child's development at every stage, 
            from infancy through kindergarten readiness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl ${program.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-serif">{program.title}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {program.ageRange}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        alert(`Learn more about our ${program.title}!\nCall (555) 123-4567 to schedule a tour and see this program in action.`);
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            variant="nursery" 
            size="lg"
            onClick={() => {
              const programsSection = document.getElementById('programs') || document.getElementById('program-details');
              if (programsSection) {
                programsSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                alert('Call us at (555) 123-4567 to learn more about our programs!');
              }
            }}
          >
            View All Programs
          </Button>
        </motion.div>
      </div>
    </section>
  )
}