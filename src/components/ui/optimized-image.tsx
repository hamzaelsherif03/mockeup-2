'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './loading-spinner'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  loadingClassName?: string
  errorClassName?: string
  showSpinner?: boolean
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | string
  lazy?: boolean
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  className,
  loadingClassName,
  errorClassName,
  showSpinner = true,
  aspectRatio,
  lazy = true,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
    }
  }

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.startsWith('data:') || baseSrc.startsWith('blob:')) {
      return undefined
    }

    const sizes = [480, 768, 1024, 1280, 1920]
    return sizes
      .map(size => `${baseSrc}?w=${size}&q=${quality} ${size}w`)
      .join(', ')
  }

  const getSizes = () => {
    // Default responsive sizes
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  }

  useEffect(() => {
    setCurrentSrc(src)
    setIsLoading(true)
    setHasError(false)
  }, [src])

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatio && (aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses] || aspectRatio),
        className
      )}
    >
      {/* Loading spinner */}
      {isLoading && showSpinner && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-muted/50',
          loadingClassName
        )}>
          <LoadingSpinner size="md" />
        </div>
      )}

      {/* Error state */}
      {hasError && currentSrc === fallbackSrc && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground',
          errorClassName
        )}>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🖼️</div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Main image */}
      <Image
        src={currentSrc}
        alt={alt}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && currentSrc === fallbackSrc ? 'opacity-50' : '',
          aspectRatio ? 'object-cover' : ''
        )}
        {...(lazy && {
          loading: 'lazy',
          placeholder: 'blur',
          blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        })}
        sizes={getSizes()}
        {...props}
      />

      {/* Progressive enhancement: WebP support */}
      <noscript>
        <img
          src={typeof currentSrc === 'string' ? currentSrc : fallbackSrc}
          alt={alt}
          className={cn('w-full h-full object-cover', className)}
        />
      </noscript>
    </div>
  )
}

// Specialized components for common use cases
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      aspectRatio="video"
      priority
      lazy={false}
      quality={90}
      sizes="100vw"
    />
  )
}

export function ProfileImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      aspectRatio="square"
      quality={80}
      sizes="(max-width: 768px) 150px, 200px"
    />
  )
}

export function ThumbnailImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={75}
      sizes="(max-width: 768px) 100px, 150px"
    />
  )
}

// Gallery image with optimized loading
export function GalleryImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={85}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
    />
  )
}