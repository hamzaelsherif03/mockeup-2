'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useKeyboardNavigation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen, navRef])

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top contact bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="nursery-container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@littlesprouts.com</span>
            </div>
          </div>
          <div className="text-sm">
            Mon-Fri: 7:00 AM - 6:00 PM
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav ref={navRef} className="nursery-container py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-primary">
              <a href="/" className="hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1">
                Little Sprouts
              </a>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Go to homepage"
            >
              Home
            </a>
            <div className="relative group">
              <button 
                className="flex items-center text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
                aria-expanded="false"
                aria-haspopup="true"
                aria-label="Programs menu"
              >
                Programs
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a 
                  href="/programs/infants" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  <div className="font-medium">Infants</div>
                  <div className="text-sm text-muted-foreground">6 weeks - 18 months</div>
                </a>
                <a 
                  href="/programs/toddlers" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  <div className="font-medium">Toddlers</div>
                  <div className="text-sm text-muted-foreground">18 months - 3 years</div>
                </a>
                <a 
                  href="/programs/preschool" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  <div className="font-medium">Preschool</div>
                  <div className="text-sm text-muted-foreground">3 - 4 years</div>
                </a>
                <a 
                  href="/programs/pre-k" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  <div className="font-medium">Pre-K</div>
                  <div className="text-sm text-muted-foreground">4 - 5 years</div>
                </a>
                <div className="border-t border-border mx-2 my-2"></div>
                <a 
                  href="/programs" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors font-medium"
                >
                  View All Programs →
                </a>
              </div>
            </div>
            <a 
              href="/about" 
              className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Learn about us"
            >
              About Us
            </a>
            <div className="relative group">
              <button 
                className="flex items-center text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
                aria-expanded="false"
                aria-haspopup="true"
                aria-label="Admissions menu"
              >
                Admissions
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a 
                  href="/admissions#enrollment-process" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  <div className="font-medium">Enrollment Process</div>
                  <div className="text-sm text-muted-foreground">How to apply</div>
                </a>
                <a 
                  href="/admissions#tuition-rates" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  <div className="font-medium">Pricing & Fees</div>
                  <div className="text-sm text-muted-foreground">Tuition information</div>
                </a>
                <a 
                  href="/admissions#required-documents" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  <div className="font-medium">Forms & Documents</div>
                  <div className="text-sm text-muted-foreground">Required paperwork</div>
                </a>
                <div className="border-t border-border mx-2 my-2"></div>
                <a 
                  href="/admissions" 
                  className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-colors font-medium"
                >
                  Admissions Info →
                </a>
              </div>
            </div>
            <a 
              href="/contact" 
              className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Contact us"
            >
              Contact
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const tourSection = document.getElementById('virtual-tour');
                if (tourSection) {
                  tourSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  alert('Virtual tour coming soon! Call (555) 123-4567 to schedule an in-person visit.');
                }
              }}
            >
              Virtual Tour
            </Button>
            <Button 
              variant="nursery" 
              size="sm"
              onClick={() => {
                const contactSection = document.getElementById('contact-form');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  alert('Contact us at (555) 123-4567 to schedule your tour!');
                }
              }}
            >
              Schedule Tour
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-border" 
            role="navigation" 
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-1 pt-4">
              <a 
                href="/" 
                className="text-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              
              {/* Mobile Programs Submenu */}
              <div className="space-y-1">
                <div className="text-foreground px-3 py-2 font-medium">Programs</div>
                <div className="pl-6 space-y-1">
                  <a 
                    href="/programs/infants" 
                    className="block text-muted-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Infants (6 weeks - 18 months)
                  </a>
                  <a 
                    href="/programs/toddlers" 
                    className="block text-muted-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Toddlers (18 months - 3 years)
                  </a>
                  <a 
                    href="/programs/preschool" 
                    className="block text-muted-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Preschool (3 - 4 years)
                  </a>
                  <a 
                    href="/programs/pre-k" 
                    className="block text-muted-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pre-K (4 - 5 years)
                  </a>
                  <div className="border-t border-border my-2"></div>
                  <a 
                    href="/programs" 
                    className="block text-primary hover:bg-muted transition-colors px-3 py-2 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-semibold">View All Programs</span>
                      <span className="ml-1 font-bold">→</span>
                    </span>
                  </a>
                </div>
              </div>
              
              <a 
                href="/about" 
                className="text-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              
              {/* Mobile Admissions Submenu */}
              <div className="space-y-1">
                <div className="text-foreground px-3 py-2 font-medium">Admissions</div>
                <div className="pl-6 space-y-1">
                  <a 
                    href="/admissions#enrollment-process" 
                    className="block text-muted-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Enrollment Process
                  </a>
                  <a 
                    href="/admissions#tuition-rates" 
                    className="block text-muted-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing & Fees
                  </a>
                  <a 
                    href="/admissions#required-documents" 
                    className="block text-muted-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Forms & Documents
                  </a>
                </div>
              </div>
              
              <a 
                href="/contact" 
                className="text-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    const tourSection = document.getElementById('virtual-tour');
                    if (tourSection) {
                      tourSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      alert('Virtual tour coming soon! Call (555) 123-4567 to schedule an in-person visit.');
                    }
                  }}
                >
                  Virtual Tour
                </Button>
                <Button 
                  variant="nursery" 
                  size="sm" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    const contactSection = document.getElementById('contact-form');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      alert('Contact us at (555) 123-4567 to schedule your tour!');
                    }
                  }}
                >
                  Schedule Tour
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}