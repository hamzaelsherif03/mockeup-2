'use client'

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="nursery-container py-4 sm:py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Company Info */}
          <div className="space-y-2 sm:space-y-3 col-span-2 sm:col-span-1">
            <h3 className="text-lg sm:text-xl font-serif font-bold">Little Sprouts</h3>
            <p className="text-primary-foreground/80 text-xs sm:text-sm leading-relaxed">
              Nurturing young minds with love, care, and quality early education 
              in a safe and stimulating environment.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://facebook.com/littlesproutsnursery" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer hover:text-accent transition-colors" />
              </a>
              <a href="https://instagram.com/littlesproutsnursery" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer hover:text-accent transition-colors" />
              </a>
              <a href="https://twitter.com/littlesprouts" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div id="contact-form" className="space-y-2 sm:space-y-3">
            <h4 className="text-sm sm:text-base font-semibold">Contact Us</h4>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <a href="tel:+15551234567" className="text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm">(555) 123-4567</a>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <a href="mailto:info@littlesprouts.com" className="text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm">info@littlesprouts.com</a>
              </div>
              <div className="flex items-start space-x-1.5 sm:space-x-2">
                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 mt-0.5 sm:mt-1" />
                <span className="text-primary-foreground/80 text-xs sm:text-sm">
                  123 Nursery Lane<br />
                  Springfield, ST 12345
                </span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="text-primary-foreground/80 text-xs sm:text-sm">Mon-Fri: 7:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-sm sm:text-base font-semibold">Quick Links</h4>
            <div className="space-y-1 sm:space-y-1.5">
              <a href="/about" className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm">
                About Us
              </a>
              <a href="/programs" className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm">
                Our Programs
              </a>
              <a href="/admissions" className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm">
                Admissions
              </a>
              <a href="/contact" className="block text-primary-foreground/80 hover:text-accent transition-colors text-xs sm:text-sm">
                Contact
              </a>
            </div>
          </div>


        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="nursery-container py-3 sm:py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1.5 md:space-y-0">
            <div className="text-primary-foreground/80 text-[10px] sm:text-xs">
              © 2024 Little Sprouts Nursery. All rights reserved.
            </div>
            <div className="flex space-x-2 sm:space-x-4 text-[10px] sm:text-xs">
              <a href="/privacy" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}