// Design tokens for consistent styling across the nursery website

export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
  '5xl': '8rem',  // 128px
} as const

export const borderRadius = {
  sm: '0.5rem',   // 8px
  md: '0.75rem',  // 12px
  lg: '1rem',     // 16px
  xl: '1.5rem',   // 24px
  '2xl': '2rem',  // 32px
  full: '9999px',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const

export const typography = {
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  lineHeights: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const

export const transitions = {
  fast: '150ms ease',
  normal: '300ms ease',
  slow: '500ms ease',
} as const

export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1600px',
} as const

// Nursery-specific design tokens
export const nurseryTokens = {
  // Container sizes
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    max: '1600px',
  },
  
  // Component specific tokens
  card: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    shadow: shadows.md,
  },
  
  button: {
    borderRadius: borderRadius.lg,
    paddingX: spacing.lg,
    paddingY: spacing.md,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.medium,
    transition: transitions.fast,
  },
  
  // Layout tokens
  header: {
    height: '80px',
    padding: spacing.md,
  },
  
  section: {
    paddingY: {
      mobile: spacing['3xl'],
      desktop: spacing['5xl'],
    },
  },
  
  // Trust indicators
  trustBadge: {
    borderRadius: borderRadius.full,
    paddingX: spacing.md,
    paddingY: spacing.sm,
    fontSize: typography.fontSizes.sm,
  },
} as const

// Color accessibility helpers
export const colorContrasts = {
  // WCAG AA compliant color combinations
  primary: {
    onLight: 'hsl(28 39% 53%)', // Mocha Mousse on light backgrounds
    onDark: 'hsl(45 67% 98%)',  // Warm white on dark backgrounds
  },
  secondary: {
    onLight: 'hsl(128 33% 29%)', // Forest green on light backgrounds
    onDark: 'hsl(91 28% 66%)',   // Sage green on dark backgrounds
  },
  accent: {
    onLight: 'hsl(12 65% 61%)',  // Terracotta on light backgrounds
    onDark: 'hsl(45 67% 98%)',   // Warm white on dark backgrounds
  },
} as const

// Animation presets for nursery content
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  slideInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const