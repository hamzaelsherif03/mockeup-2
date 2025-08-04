'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/use-accessibility'
import { OptimizedImage } from '@/components/ui/optimized-image'

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
}

interface InteractiveGalleryProps {
  images: GalleryImage[]
  columns?: number
  className?: string
}

export function InteractiveGallery({
  images,
  columns = 3,
  className = ''
}: InteractiveGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const categories = ['all', ...new Set(images.map(img => img.category).filter(Boolean) as string[])]
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter)

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  }

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-4 grid-cols-1 md:grid-cols-${Math.min(columns, 3)} lg:grid-cols-${columns}`}>
          {filteredImages.map(image => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                aspectRatio="square"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
              <div className="relative">
                <OptimizedImage
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  ✕
                </button>
              </div>
              {(selectedImage.title || selectedImage.description) && (
                <div className="p-6">
                  {selectedImage.title && (
                    <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  )}
                  {selectedImage.description && (
                    <p className="text-gray-600">{selectedImage.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Filter Buttons */}
      <motion.div 
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        className={`grid gap-4 grid-cols-1 md:grid-cols-${Math.min(columns, 3)} lg:grid-cols-${columns}`}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        key={filter} // Re-animate when filter changes
      >
        <AnimatePresence>
          {filteredImages.map(image => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              whileHover={{ scale: 1.05, y: -5 }}
              onHoverStart={() => setHoveredId(image.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setSelectedImage(image)}
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                aspectRatio="square"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white text-center">
                  {image.title && (
                    <motion.h3
                      className="text-lg font-semibold"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredId === image.id ? 0 : 20,
                        opacity: hoveredId === image.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {image.title}
                    </motion.h3>
                  )}
                  {image.description && (
                    <motion.p
                      className="text-sm mt-1"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredId === image.id ? 0 : 20,
                        opacity: hoveredId === image.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {image.description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
              
              {/* Hover overlay with zoom icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredId === image.id ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <OptimizedImage
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto"
                />
                <motion.button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Navigation arrows */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
                    setSelectedImage(filteredImages[prevIndex])
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
                    setSelectedImage(filteredImages[nextIndex])
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
              
              {(selectedImage.title || selectedImage.description) && (
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedImage.title && (
                    <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  )}
                  {selectedImage.description && (
                    <p className="text-gray-600">{selectedImage.description}</p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Masonry-style gallery for varied image sizes
export function MasonryGallery({
  images,
  className = ''
}: {
  images: GalleryImage[]
  className?: string
}) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={`columns-1 md:columns-2 lg:columns-3 gap-4 ${className}`}>
        {images.map(image => (
          <div
            key={image.id}
            className="break-inside-avoid mb-4 cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="w-full rounded-lg"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <motion.div
        className={`columns-1 md:columns-2 lg:columns-3 gap-4 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="break-inside-avoid mb-4 cursor-pointer group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedImage(image)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="w-full rounded-lg"
            />
            {image.title && (
              <motion.div
                className="p-3"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <h4 className="font-medium text-gray-900">{image.title}</h4>
                {image.description && (
                  <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for masonry gallery */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="max-w-4xl max-h-[90vh] relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}