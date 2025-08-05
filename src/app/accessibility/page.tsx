'use client'

import { AccessibilityStatement } from '@/components/accessibility/accessibility-statement'

export default function AccessibilityPage() {
  return (
    <section className="nursery-section">
      <div className="nursery-container">
        <AccessibilityStatement />
      </div>
    </section>
  )
}