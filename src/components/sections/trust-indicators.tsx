'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Shield, Award, Users, Clock, Heart, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const trustFactors = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'Fully licensed by the state with comprehensive insurance coverage',
    highlight: 'State Licensed'
  },
  {
    icon: Award,
    title: '15+ Years Experience',
    description: 'Serving families in our community since 2009 with excellence',
    highlight: 'Established 2009'
  },
  {
    icon: Users,
    title: 'Low Teacher Ratios',
    description: 'Personalized attention with industry-leading teacher-to-child ratios',
    highlight: 'Small Class Sizes'
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Open 7:00 AM - 6:00 PM Monday through Friday for busy families',
    highlight: '11 Hours Daily'
  }
]

const certifications = [
  'State Licensed Childcare Facility',
  'CPR & First Aid Certified Staff',
  'Background Checked Teachers',
  'Health Department Approved',
  'Fire Safety Certified',
  'USDA Approved Nutrition Program'
]

export function TrustIndicators() {
  return (
    <section id="virtual-tour" className="nursery-section bg-background">
      <div className="nursery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Your Child's Safety is Our Priority
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We maintain the highest standards of safety, education, and care 
            to give you complete peace of mind.
          </p>
        </motion.div>

        {/* Main Trust Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustFactors.map((factor, index) => {
            const Icon = factor.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{factor.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {factor.description}
                    </p>
                    <div className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {factor.highlight}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-muted/50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-bold mb-2">
              Certifications & Compliance
            </h3>
            <p className="text-muted-foreground">
              We exceed all local and state requirements for childcare facilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 bg-background p-4 rounded-xl"
              >
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center"
        >
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary font-serif">500+</div>
            <div className="text-muted-foreground">Children Served</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary font-serif">98%</div>
            <div className="text-muted-foreground">Parent Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary font-serif">0</div>
            <div className="text-muted-foreground">Safety Incidents</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}