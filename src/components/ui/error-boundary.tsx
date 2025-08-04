'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Log error to monitoring service
    if (typeof window !== 'undefined') {
      // This would be replaced with actual error reporting service
      console.error('Error logged:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} retry={this.handleRetry} />
      }

      return <DefaultErrorFallback error={this.state.error} retry={this.handleRetry} />
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  retry: () => void
}

function DefaultErrorFallback({ error, retry }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl">Oops! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We're sorry, but something unexpected happened. Our team has been notified 
            and is working to fix the issue.
          </p>

          {isDevelopment && error && (
            <div className="bg-muted p-4 rounded-lg text-left">
              <h4 className="font-medium text-sm mb-2">Error Details (Development Only):</h4>
              <pre className="text-xs text-red-600 overflow-auto max-h-32">
                {error.message}
                {error.stack && '\n\n' + error.stack}
              </pre>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={retry} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>

          <div className="text-sm text-muted-foreground border-t pt-4">
            <p>If this problem continues, please contact us:</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="tel:+15551234567" className="text-primary hover:underline">
                (555) 123-4567
              </a>
              <a href="mailto:info@littlesprouts.com" className="text-primary hover:underline">
                info@littlesprouts.com
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Specialized error boundaries for different sections
export function FormErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={FormErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}

function FormErrorFallback({ retry }: ErrorFallbackProps) {
  return (
    <Card className="p-6 text-center">
      <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-4" />
      <h3 className="font-semibold mb-2">Form Error</h3>
      <p className="text-muted-foreground mb-4 text-sm">
        There was a problem with the form. Please try refreshing or contact us directly.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button size="sm" onClick={retry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href="tel:+15551234567">Call Us Instead</a>
        </Button>
      </div>
    </Card>
  )
}

export function SectionErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={SectionErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}

function SectionErrorFallback({ retry }: ErrorFallbackProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-8 text-center">
      <AlertTriangle className="h-6 w-6 text-muted-foreground mx-auto mb-3" />
      <p className="text-muted-foreground text-sm mb-3">
        This section couldn't load properly.
      </p>
      <Button size="sm" variant="outline" onClick={retry}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </div>
  )
}