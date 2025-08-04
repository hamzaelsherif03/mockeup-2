'use client'

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="nursery-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">Little Sprouts</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Nurturing young minds with love, care, and quality early education 
              in a safe and stimulating environment.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/littlesproutsnursery" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              </a>
              <a href="https://instagram.com/littlesproutsnursery" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              </a>
              <a href="https://twitter.com/littlesprouts" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 cursor-pointer hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div id="contact-form" className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <a href="tel:+15551234567" className="text-primary-foreground/80 hover:text-accent transition-colors">(555) 123-4567</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@littlesprouts.com" className="text-primary-foreground/80 hover:text-accent transition-colors">info@littlesprouts.com</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="text-primary-foreground/80">
                  123 Nursery Lane<br />
                  Springfield, ST 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4" />
                <span className="text-primary-foreground/80">Mon-Fri: 7:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                About Us
              </a>
              <a href="#programs" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Our Programs
              </a>
              <a href="#admissions" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Admissions
              </a>
              <a href="#virtual-tour" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Virtual Tour
              </a>
              <a href="#contact" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Age Groups</h4>
            <div className="space-y-2">
              <div className="text-primary-foreground/80">Infants (6 weeks - 18 months)</div>
              <div className="text-primary-foreground/80">Toddlers (18 months - 3 years)</div>
              <div className="text-primary-foreground/80">Preschool (3 - 4 years)</div>
              <div className="text-primary-foreground/80">Pre-K (4 - 5 years)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="nursery-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm">
              © 2024 Little Sprouts Nursery. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#accessibility" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}