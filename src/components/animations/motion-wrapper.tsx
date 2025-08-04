'use client'

import { motion, MotionProps } from 'framer-motion'
import React from 'react'

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

export function MotionWrapper({ 
  children, 
  as = 'div',
  className,
  ...motionProps 
}: MotionWrapperProps) {
  const Component = motion[as as keyof typeof motion] as any
  
  return (
    <Component className={className} {...motionProps}>
      {children}
    </Component>
  )
}