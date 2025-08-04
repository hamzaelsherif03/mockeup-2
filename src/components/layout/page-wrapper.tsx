'use client'

import { ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { BottomNavigation } from './bottom-navigation'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${className || ''} pb-20 md:pb-0`}>
        {children}
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  )
}