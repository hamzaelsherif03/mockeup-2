'use client'

import { useSkipLink } from '@/hooks/use-accessibility'
import { cn } from '@/lib/utils'

interface SkipLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export function SkipLink({ href, className, children }: SkipLinkProps) {
  const { skipLinkRef, handleSkipLinkClick } = useSkipLink()

  return (
    <a
      ref={skipLinkRef}
      href={href}
      onClick={(e) => {
        e.preventDefault()
        handleSkipLinkClick(href.substring(1)) // Remove the # from href
      }}
      className={cn(
        // Visually hidden by default
        'absolute left-[-10000px] top-auto w-px h-px overflow-hidden',
        // Visible when focused
        'focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible',
        // Styling when visible
        'focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:z-50',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        // Transition
        'transition-all duration-200',
        className
      )}
    >
      {children}
    </a>
  )
}

export function SkipLinks() {
  return (
    <div className="skip-links">
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>
      <SkipLink href="#navigation">
        Skip to navigation
      </SkipLink>
      <SkipLink href="#footer">
        Skip to footer
      </SkipLink>
    </div>
  )
}