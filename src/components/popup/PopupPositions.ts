// Popup positioning configurations
// Use these classes and animations to easily change popup position

export const POPUP_POSITIONS = {
  // Bottom right corner (current) - like chat widgets
  BOTTOM_RIGHT: {
    className: "fixed bottom-6 right-6 z-50 w-full max-w-md sm:bottom-6 sm:right-6 max-sm:bottom-4 max-sm:right-4 max-sm:left-4",
    initial: { opacity: 0, scale: 0.8, x: 100, y: 100 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: { opacity: 0, scale: 0.8, x: 100, y: 100 }
  },

  // Center (traditional modal)
  CENTER: {
    className: "fixed inset-0 flex items-center justify-center p-4 z-50 w-full h-full",
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },

  // Bottom center - like mobile app prompts
  BOTTOM_CENTER: {
    className: "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-4",
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 100 }
  },

  // Top right - like notifications
  TOP_RIGHT: {
    className: "fixed top-6 right-6 z-50 w-full max-w-md sm:top-6 sm:right-6 max-sm:top-4 max-sm:right-4 max-sm:left-4",
    initial: { opacity: 0, scale: 0.8, x: 100, y: -100 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: { opacity: 0, scale: 0.8, x: 100, y: -100 }
  },

  // Top center - like announcement bars
  TOP_CENTER: {
    className: "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-4",
    initial: { opacity: 0, scale: 0.9, y: -100 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -100 }
  },

  // Bottom left corner
  BOTTOM_LEFT: {
    className: "fixed bottom-6 left-6 z-50 w-full max-w-md sm:bottom-6 sm:left-6 max-sm:bottom-4 max-sm:right-4 max-sm:left-4",
    initial: { opacity: 0, scale: 0.8, x: -100, y: 100 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: { opacity: 0, scale: 0.8, x: -100, y: 100 }
  },

  // Right side panel - slides in from right
  RIGHT_PANEL: {
    className: "fixed right-0 top-0 bottom-0 z-50 w-full max-w-md",
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" }
  },

  // Left side panel - slides in from left  
  LEFT_PANEL: {
    className: "fixed left-0 top-0 bottom-0 z-50 w-full max-w-md",
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" }
  }
} as const

// Current active position - change this to switch positions
export const ACTIVE_POSITION = POPUP_POSITIONS.CENTER

// Transition configuration
export const POPUP_TRANSITION = {
  duration: 0.3,
  ease: "easeOut"
} as const