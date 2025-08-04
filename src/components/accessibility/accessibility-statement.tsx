'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function AccessibilityStatement() {
  const features = [
    {
      category: 'Visual Accessibility',
      items: [
        'WCAG 2.2 Level AA color contrast compliance',
        'Scalable text up to 200% without horizontal scrolling',
        'High contrast mode support',
        'Reduced motion support for users with vestibular disorders',
        'Focus indicators on all interactive elements',
        'Clear visual hierarchy with semantic headings'
      ]
    },
    {
      category: 'Keyboard Navigation',
      items: [
        'Full keyboard navigation support',
        'Skip links to main content areas',
        'Logical tab order throughout the site',
        'Keyboard shortcuts for common actions',
        'Focus trapping in modal dialogs',
        'Escape key functionality to close overlays'
      ]
    },
    {
      category: 'Screen Reader Support',
      items: [
        'Semantic HTML structure with proper landmarks',
        'ARIA labels and descriptions where needed',
        'Live regions for dynamic content updates',
        'Form labels and error associations',
        'Image alt text for all meaningful images',
        'Table headers and captions where applicable'
      ]
    },
    {
      category: 'Content & Language',
      items: [
        'Plain language and clear instructions',
        'Consistent navigation and layout',
        'Error messages that are descriptive and helpful',
        'Form validation with clear feedback',
        'Headings that describe content structure',
        'Link text that describes destination or function'
      ]
    },
    {
      category: 'Technical Features',
      items: [
        'Progressive enhancement for core functionality',
        'Graceful degradation when JavaScript is disabled',
        'Responsive design that works on all devices',
        'Fast loading times and optimized performance',
        'Valid HTML markup',
        'Proper document structure and metadata'
      ]
    }
  ]

  const keyboardShortcuts = [
    { key: 'Tab', description: 'Navigate to next interactive element' },
    { key: 'Shift + Tab', description: 'Navigate to previous interactive element' },
    { key: 'Enter / Space', description: 'Activate buttons and links' },
    { key: 'Arrow Keys', description: 'Navigate within menus and tab panels' },
    { key: 'Escape', description: 'Close modal dialogs and dropdown menus' },
    { key: 'Home / End', description: 'Jump to first/last item in lists' }
  ]

  const contactInfo = {
    email: 'accessibility@littlesproutsnursery.com',
    phone: '+1-555-123-4567',
    address: '123 Oak Street, Springfield, IL 62701'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Accessibility Statement
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Little Sprouts Nursery is committed to ensuring digital accessibility for people 
          with disabilities. We continually improve the user experience for everyone and 
          apply relevant accessibility standards.
        </p>
      </div>

      {/* Conformance Status */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
        <div className="flex items-center space-x-4 mb-4">
          <Badge variant="default" className="bg-green-100 text-green-800">
            WCAG 2.2 Level AA Compliant
          </Badge>
          <Badge variant="outline">
            Section 508 Compliant
          </Badge>
        </div>
        <p className="text-gray-700">
          This website conforms to the Web Content Accessibility Guidelines (WCAG) 2.2 
          at Level AA. WCAG 2.2 covers a wide range of recommendations for making web 
          content more accessible.
        </p>
      </Card>

      {/* Accessibility Features */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Accessibility Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">
                {feature.category}
              </h3>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                    <svg
                      className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Keyboard Navigation */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <p className="text-gray-700 mb-4">
          Our website can be fully navigated using only a keyboard. Here are the main keyboard shortcuts:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {keyboardShortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center space-x-3">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                {shortcut.key}
              </kbd>
              <span className="text-sm text-gray-700">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Browser and Assistive Technology Compatibility */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Browser & Assistive Technology Compatibility</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-3">Supported Browsers</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Chrome (latest 2 versions)</li>
              <li>• Firefox (latest 2 versions)</li>
              <li>• Safari (latest 2 versions)</li>
              <li>• Edge (latest 2 versions)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Tested Assistive Technologies</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• NVDA (Windows)</li>
              <li>• JAWS (Windows)</li>
              <li>• VoiceOver (macOS/iOS)</li>
              <li>• TalkBack (Android)</li>
              <li>• Dragon NaturallySpeaking</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Limitations and Alternatives */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Known Limitations</h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            Despite our best efforts to ensure accessibility, there may be some limitations. 
            We are aware of the following issues and are working to address them:
          </p>
          <ul className="space-y-2 text-sm text-gray-700 ml-4">
            <li>• Some third-party embedded content may not be fully accessible</li>
            <li>• Legacy PDF documents are being updated to meet accessibility standards</li>
            <li>• Some complex interactive elements are continuously being improved</li>
          </ul>
          <p className="text-gray-700">
            If you encounter any accessibility barriers, please contact us using the information below, 
            and we will provide alternative methods to access the content.
          </p>
        </div>
      </Card>

      {/* Feedback and Contact Information */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Feedback & Contact</h2>
        <p className="text-gray-700 mb-4">
          We welcome your feedback on the accessibility of Little Sprouts Nursery's website. 
          Please let us know if you encounter accessibility barriers:
        </p>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">
              Email: <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
                {contactInfo.email}
              </a>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700">
              Phone: <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
                {contactInfo.phone}
              </a>
            </span>
          </div>
          <div className="flex items-start space-x-3">
            <svg className="h-5 w-5 text-gray-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-700">
              Address: {contactInfo.address}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          We try to respond to accessibility feedback within 2 business days.
        </p>
      </Card>

      {/* Assessment Information */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Assessment Information</h2>
        <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-700">
          <div>
            <strong>Assessment Method:</strong>
            <p>Self-evaluation with automated and manual testing</p>
          </div>
          <div>
            <strong>Last Reviewed:</strong>
            <p>January 2025</p>
          </div>
          <div>
            <strong>Assessment Tools Used:</strong>
            <p>axe-core, WAVE, Lighthouse, manual testing</p>
          </div>
          <div>
            <strong>Next Review Date:</strong>
            <p>July 2025</p>
          </div>
        </div>
      </Card>

      {/* Formal Complaints */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h2 className="text-2xl font-semibold mb-4">Formal Accessibility Complaints</h2>
        <p className="text-gray-700">
          If you are not satisfied with the response to your feedback or cannot access any part 
          of this website, you may file a formal accessibility complaint with:
        </p>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p><strong>U.S. Department of Health and Human Services</strong></p>
          <p>Office for Civil Rights</p>
          <p>Online: <a href="https://www.hhs.gov/civil-rights/filing-a-complaint/index.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            File a complaint online
          </a></p>
        </div>
      </Card>
    </div>
  )
}