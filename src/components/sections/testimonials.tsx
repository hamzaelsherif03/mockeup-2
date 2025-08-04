'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Parent of Emma (4 years)',
    content: 'Little Sprouts transformed my daughter from a shy toddler into a confident, curious child. The teachers genuinely care about each child\'s individual development.',
    rating: 5,
    program: 'Preschool Program'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Parent of Lucas (2 years)',
    content: 'The daily reports and photos give me such peace of mind while at work. I can see how happy and engaged Lucas is throughout the day.',
    rating: 5,
    program: 'Toddler Program'
  },
  {
    id: 3,
    name: 'Jennifer Rodriguez',
    role: 'Parent of Sofia (5 years)',
    content: 'Sofia started kindergarten completely prepared thanks to Little Sprouts. She was already reading and had excellent social skills.',
    rating: 5,
    program: 'Pre-K Program'
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Parent of Twins (3 years)',
    content: 'Managing twins was overwhelming until we found Little Sprouts. The staff treats each child as an individual while helping them grow together.',
    rating: 5,
    program: 'Toddler Program'
  }
]

export function TestimonialsSection() {
  return (
    <section className="nursery-section">
      <div className="nursery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            What Parents Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from families who trust us with their most precious gifts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="h-12 w-12 text-primary" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-accent" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-foreground leading-relaxed mb-6 relative z-10">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                      <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                        {testimonial.program}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-primary/5 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-serif font-bold mb-4">
            Ready to Join Our Family?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Schedule a tour today and see why parents choose Little Sprouts 
            for their children's early learning journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="nursery-button-primary">
              Schedule Your Tour
            </button>
            <button className="nursery-button-secondary">
              Call Us Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}