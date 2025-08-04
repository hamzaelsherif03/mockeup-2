'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/use-accessibility'

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn'
  once?: boolean
  threshold?: number
}

// Base motion wrapper with accessibility support
export function MotionWrapper({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  animation = 'fadeIn',
  once = true,
  threshold = 0.1
}: MotionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "0px 0px -100px 0px" })
  const prefersReducedMotion = useReducedMotion()

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration, delay }
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration, delay, ease: "easeOut" }
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration, delay, ease: "easeOut" }
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration, delay, ease: "easeOut" }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration, delay, ease: "easeOut" }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration, delay, ease: "easeOut" }
    }
  }

  const currentAnimation = animations[animation]

  // Disable animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={currentAnimation.initial}
      animate={isInView ? currentAnimation.animate : currentAnimation.initial}
      transition={currentAnimation.transition as any}
    >
      {children}
    </motion.div>
  )
}

// Staggered animation for lists
export function StaggeredList({
  children,
  className = '',
  staggerDelay = 0.1,
  animation = 'slideUp'
}: {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn'
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <MotionWrapper
          key={index}
          delay={index * staggerDelay}
          animation={animation}
        >
          {child}
        </MotionWrapper>
      ))}
    </div>
  )
}

// Parallax scroll effect
export function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
  direction = 'up'
}: {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const prefersReducedMotion = useReducedMotion()

  const transforms = {
    up: useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]),
    down: useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]),
    left: useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]),
    right: useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed])
  }

  const styleMap = {
    up: { y: transforms.up },
    down: { y: transforms.down },
    left: { x: transforms.left },
    right: { x: transforms.right }
  }

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={styleMap[direction]}
    >
      {children}
    </motion.div>
  )
}

// Scroll-triggered counter animation
export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className = '',
  suffix = '',
  prefix = ''
}: {
  from?: number
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span ref={ref} className={className}>{prefix}{to}{suffix}</span>
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {prefix}
      <motion.span>
        {from}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

// Hover animation wrapper
export function HoverMotion({
  children,
  className = '',
  scale = 1.05,
  rotate = 0,
  y = -5,
  duration = 0.2
}: {
  children: ReactNode
  className?: string
  scale?: number
  rotate?: number
  y?: number
  duration?: number
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        rotate,
        y,
        transition: { duration, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}

// Page transition wrapper
export function PageTransition({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Floating animation for decorative elements
export function FloatingElement({
  children,
  className = '',
  amplitude = 10,
  duration = 3
}: {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Typewriter effect
export function TypewriterText({
  text,
  className = '',
  speed = 50,
  delay = 0
}: {
  text: string
  className?: string
  speed?: number
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span ref={ref} className={className}>{text}</span>
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ width: 0 }}
      animate={isInView ? { width: "auto" } : { width: 0 }}
      transition={{
        duration: text.length * (speed / 1000),
        delay,
        ease: "linear"
      }}
      style={{ 
        overflow: "hidden", 
        whiteSpace: "nowrap",
        borderRight: "2px solid currentColor"
      }}
    >
      {text}
    </motion.span>
  )
}

// Progress bar animation
export function AnimatedProgressBar({
  progress,
  className = '',
  height = '8px',
  backgroundColor = '#e5e7eb',
  fillColor = '#3b82f6',
  duration = 1,
  delay = 0
}: {
  progress: number
  className?: string
  height?: string
  backgroundColor?: string
  fillColor?: string
  duration?: number
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div 
        ref={ref}
        className={className}
        style={{ 
          height, 
          backgroundColor, 
          borderRadius: height,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: fillColor,
            borderRadius: height
          }}
        />
      </div>
    )
  }

  return (
    <div 
      ref={ref}
      className={className}
      style={{ 
        height, 
        backgroundColor, 
        borderRadius: height,
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${progress}%` } : { width: 0 }}
        transition={{ duration, delay, ease: "easeOut" }}
        style={{
          height: '100%',
          backgroundColor: fillColor,
          borderRadius: height
        }}
      />
    </div>
  )
}

// Magnetic button effect
export function MagneticButton({
  children,
  className = '',
  magnetStrength = 0.3
}: {
  children: ReactNode
  className?: string
  magnetStrength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * magnetStrength
    const deltaY = (e.clientY - centerY) * magnetStrength

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}