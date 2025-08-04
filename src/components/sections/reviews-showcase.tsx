'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const googleReviews = [
  {
    id: 1,
    author: 'Amanda K.',
    rating: 5,
    date: '2 weeks ago',
    review: 'Little Sprouts has been amazing for our daughter Emma. She started when she was 8 months old and is now 3. The teachers genuinely care about each child and provide detailed daily reports. Emma has learned so much and always comes home happy. Highly recommend!',
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    author: 'Robert M.',
    rating: 5,
    date: '1 month ago',
    review: 'As a single dad, finding quality childcare was crucial. Little Sprouts exceeded my expectations. The staff is professional, the facility is immaculate, and my son Lucas has thrived here. They even helped with potty training when I was struggling. Five stars!',
    helpful: 8,
    verified: true
  },
  {
    id: 3,
    author: 'Priya S.',
    rating: 5,
    date: '3 weeks ago',
    review: 'We toured several daycares before choosing Little Sprouts, and we\'re so glad we did. The teachers are experienced and loving, the curriculum is well-structured, and communication is excellent. Our twins are learning Spanish and sign language too!',
    helpful: 15,
    verified: true
  }
]

const facebookReviews = [
  {
    id: 1,
    author: 'Jennifer L.',
    rating: 5,
    date: '1 week ago',
    review: 'Cannot say enough good things about Little Sprouts! Ms. Sarah and her team have created such a warm, nurturing environment. My daughter Maya has been attending for 2 years and has grown so much socially and academically.',
    likes: 23,
    verified: true
  },
  {
    id: 2,
    author: 'David R.',
    rating: 5,
    date: '2 weeks ago',
    review: 'Outstanding childcare center! The teachers are all certified and you can tell they genuinely love what they do. The daily photos and updates give me such peace of mind while I\'m at work. Worth every penny!',
    likes: 18,
    verified: true
  }
]

const localTestimonials = [
  {
    id: 1,
    author: 'The Johnson Family',
    children: 'Sophia (4) and Mason (2)',
    years: '3 years',
    quote: 'Little Sprouts became our second family. When Sophia was diagnosed with mild autism, the staff went above and beyond to create an inclusive environment. Both of our children have flourished here, and we couldn\'t be more grateful.',
    photo: '/testimonials/johnson-family.jpg'
  },
  {
    id: 2,
    author: 'Maria and Carlos T.',
    children: 'Isabella (3)',
    years: '2 years',
    quote: 'As working parents with demanding schedules, we needed childcare we could trust completely. Little Sprouts has been that and more. Isabella speaks English and Spanish fluently now, and her confidence has soared.',
    photo: '/testimonials/torres-family.jpg'
  },
  {
    id: 3,
    author: 'The Chen Family',
    children: 'Ethan (5) and Lily (3)',
    years: '4 years',
    quote: 'Both our children started at Little Sprouts as infants. Watching them grow under such caring guidance has been incredible. Ethan started kindergarten completely prepared, and Lily is following in his footsteps.',
    photo: '/testimonials/chen-family.jpg'
  }
]

export function ReviewsShowcase() {
  return (
    <section className="nursery-section bg-muted/30">
      <div className="nursery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real families who trust us with their most precious gifts.
          </p>
        </motion.div>

        {/* Google Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif font-semibold">Google Reviews</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">4.9</span>
              <span className="text-muted-foreground">(47 reviews)</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-semibold">{review.author}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {review.review}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {review.helpful} people found this helpful
                      </span>
                      {review.verified && (
                        <span className="text-green-600 font-medium">Verified</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Family Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-serif font-semibold mb-8 text-center">
            Family Stories
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {localTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full relative overflow-hidden">
                  <CardContent className="p-8">
                    <div className="absolute top-4 right-4 opacity-10">
                      <Quote className="h-16 w-16 text-primary" />
                    </div>
                    
                    <blockquote className="text-foreground leading-relaxed mb-6 relative z-10">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="border-t border-border pt-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {testimonial.author.split(' ')[0].slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">
                            Parents of {testimonial.children}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.years} with Little Sprouts
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Facebook Reviews Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif font-semibold">Facebook Reviews</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">5.0</span>
              <span className="text-muted-foreground">(28 reviews)</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facebookReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-semibold">{review.author}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {review.review}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {review.likes} likes
                      </span>
                      {review.verified && (
                        <span className="text-blue-600 font-medium">Verified</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary/5 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-serif font-bold mb-6">
            Trusted by Our Community
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary font-serif">4.9/5</div>
              <div className="text-sm text-muted-foreground">Google Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary font-serif">5.0/5</div>
              <div className="text-sm text-muted-foreground">Facebook Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary font-serif">98%</div>
              <div className="text-sm text-muted-foreground">Parent Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary font-serif">95%</div>
              <div className="text-sm text-muted-foreground">Recommend Us</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}