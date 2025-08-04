'use client'

import { Button } from '@/components/ui/button'
import { Phone, Calendar, Eye, Mail } from 'lucide-react'

export function BottomNavigation() {
  const handleCallNow = () => {
    window.location.href = 'tel:+15551234567'
  }

  const handleScheduleTour = () => {
    // This would open the tour scheduling modal/form
    const element = document.getElementById('schedule-tour')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleVirtualTour = () => {
    // This would open the virtual tour
    const element = document.getElementById('virtual-tour')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border">
      <div className="grid grid-cols-4 gap-1 p-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs"
          onClick={handleCallNow}
          aria-label="Call now"
        >
          <Phone className="h-5 w-5" />
          <span>Call Now</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs"
          onClick={handleScheduleTour}
          aria-label="Schedule tour"
        >
          <Calendar className="h-5 w-5" />
          <span>Schedule</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs"
          onClick={handleVirtualTour}
          aria-label="Virtual tour"
        >
          <Eye className="h-5 w-5" />
          <span>Virtual Tour</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs"
          onClick={handleContact}
          aria-label="Contact form"
        >
          <Mail className="h-5 w-5" />
          <span>Contact</span>
        </Button>
      </div>
    </div>
  )
}