'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-accessibility'

// Animated form field wrapper
export function AnimatedField({
  children,
  error,
  success,
  className = ''
}: {
  children: ReactNode
  error?: string
  success?: boolean
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  const fieldVariants = {
    idle: { scale: 1, borderColor: '#d1d5db' },
    focus: { scale: 1.02, borderColor: '#3b82f6' },
    error: { 
      scale: 1, 
      borderColor: '#ef4444',
      x: [0, -10, 10, -10, 10, 0],
      transition: { x: { duration: 0.4 } }
    },
    success: { scale: 1, borderColor: '#10b981' }
  }

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {children}
        <AnimatePresence>
          {error && (
            <div className="text-red-600 text-sm mt-1">
              {error}
            </div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={fieldVariants}
      initial="idle"
      whileFocus="focus"
      animate={error ? "error" : success ? "success" : "idle"}
    >
      {children}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-600 text-sm mt-1 flex items-center"
          >
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </motion.svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Animated button with loading state
export function AnimatedButton({
  children,
  isLoading = false,
  isSuccess = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}: {
  children: ReactNode
  isLoading?: boolean
  isSuccess?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
  [key: string]: any
}) {
  const prefersReducedMotion = useReducedMotion()

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    loading: { scale: 1 },
    success: { scale: 1.1 }
  }

  if (prefersReducedMotion) {
    return (
      <button
        className={className}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...props}
      >
        {isLoading ? 'Loading...' : isSuccess ? 'Success!' : children}
      </button>
    )
  }

  return (
    <motion.button
      className={className}
      variants={buttonVariants}
      initial="idle"
      whileHover={!disabled && !isLoading ? "hover" : "idle"}
      whileTap={!disabled && !isLoading ? "tap" : "idle"}
      animate={isLoading ? "loading" : isSuccess ? "success" : "idle"}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            />
            Loading...
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="flex items-center justify-center"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
            Success!
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Multi-step form progress indicator
export function FormProgress({
  steps,
  currentStep,
  className = ''
}: {
  steps: string[]
  currentStep: number
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={`flex justify-between ${className}`}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`px-3 py-1 rounded text-sm ${
              index <= currentStep
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex justify-between ${className}`}>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
              index < currentStep
                ? 'bg-green-500 text-white'
                : index === currentStep
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
            animate={{
              scale: index === currentStep ? 1.1 : 1,
              backgroundColor: 
                index < currentStep ? '#10b981' :
                index === currentStep ? '#3b82f6' : '#e5e7eb'
            }}
            transition={{ duration: 0.3 }}
          >
            {index < currentStep ? (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </motion.svg>
            ) : (
              index + 1
            )}
          </motion.div>
          <motion.span
            className={`text-xs text-center ${
              index <= currentStep ? 'text-gray-900' : 'text-gray-500'
            }`}
            animate={{
              fontWeight: index === currentStep ? 600 : 400
            }}
          >
            {step}
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

// Animated checkbox
export function AnimatedCheckbox({
  checked,
  onChange,
  label,
  className = ''
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  const checkboxVariants = {
    unchecked: { scale: 1, backgroundColor: '#ffffff', borderColor: '#d1d5db' },
    checked: { scale: 1.05, backgroundColor: '#3b82f6', borderColor: '#3b82f6' }
  }

  if (prefersReducedMotion) {
    return (
      <label className={`flex items-center cursor-pointer ${className}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        {label && <span className="ml-2 text-sm text-gray-700">{label}</span>}
      </label>
    )
  }

  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <motion.div
        className="relative w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer"
        variants={checkboxVariants}
        animate={checked ? 'checked' : 'unchecked'}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(!checked)}
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
      {label && (
        <motion.span
          className="ml-2 text-sm text-gray-700"
          animate={{ color: checked ? '#1f2937' : '#6b7280' }}
        >
          {label}
        </motion.span>
      )}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
    </label>
  )
}

// Floating label input
export function FloatingLabelInput({
  label,
  value,
  onChange,
  type = 'text',
  error,
  className = '',
  ...props
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  error?: string
  className?: string
  [key: string]: any
}) {
  const [isFocused, setIsFocused] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const hasValue = value.length > 0

  const labelVariants = {
    default: { y: 0, scale: 1, color: '#6b7280' },
    float: { y: -24, scale: 0.8, color: '#3b82f6' },
    error: { y: -24, scale: 0.8, color: '#ef4444' }
  }

  if (prefersReducedMotion) {
    return (
      <div className={`relative ${className}`}>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={isFocused || hasValue ? '' : label}
          {...props}
        />
        {(isFocused || hasValue) && (
          <label className="absolute left-3 -top-6 text-xs text-blue-600">
            {label}
          </label>
        )}
        {error && (
          <div className="text-red-600 text-sm mt-1">{error}</div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-blue-500'
        }`}
        {...props}
      />
      <motion.label
        className="absolute left-3 top-2 pointer-events-none origin-left"
        variants={labelVariants}
        animate={
          error ? 'error' :
          (isFocused || hasValue) ? 'float' : 'default'
        }
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-600 text-sm mt-1"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}