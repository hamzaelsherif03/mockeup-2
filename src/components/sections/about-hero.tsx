'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Shield, Users, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export function AboutHero() {
  return (
    <section className="nursery-section bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="nursery-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="h-4 w-4" />
                <span>Established 2009</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Our Story of{' '}
                <span className="text-primary">Love, Learning</span>{' '}
                & Growth
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Founded by Sarah Johnson, a former elementary school teacher and mother of three, 
                Little Sprouts began with a simple mission: create a place where children feel 
                as loved and secure as they do at home, while preparing them for a lifetime of learning.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="bg-muted/50 rounded-2xl p-6 border-l-4 border-primary">
              <h3 className="font-serif font-semibold text-lg mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                "To nurture each child's unique potential through developmentally appropriate 
                activities, loving care, and a safe environment that fosters curiosity, 
                creativity, and confidence."
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-serif">15+</div>
                <div className="text-sm text-muted-foreground">Years Serving</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-serif">500+</div>
                <div className="text-sm text-muted-foreground">Families Trust Us</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-serif">12</div>
                <div className="text-sm text-muted-foreground">Expert Teachers</div>
              </div>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main feature card */}
            <Card className="bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="aspect-square bg-gradient-to-br from-sage-green-200 to-forest-green-200 rounded-2xl mb-6 flex items-center justify-center">
                  <Users className="h-16 w-16 text-forest-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Philosophy</h3>
                <p className="text-muted-foreground mb-4">
                  We believe every child is unique and deserves individualized attention 
                  that honors their developmental stage and learning style.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    <span>Safety First Approach</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Heart className="h-4 w-4 text-primary mr-2" />
                    <span>Loving, Nurturing Environment</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>Excellence in Early Education</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating accreditation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-16 -right-3 bg-accent text-white p-4 rounded-2xl shadow-lg max-w-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold text-sm">State Accredited</span>
              </div>
              <p className="text-xs opacity-90">
                Exceeding all state requirements for childcare facilities and 
                early childhood education programs.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}