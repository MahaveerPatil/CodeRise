export const colors = {
  // Brand
  brand: {
    primary: '#6366F1',   // Indigo
    secondary: '#06B6D4', // Cyan
    accent: '#8B5CF6',    // Purple
  },
  // Backgrounds
  bg: {
    base: '#050508',
    surface: '#0D0D14',
    elevated: '#12121C',
    card: '#0F0F1A',
    cardHover: '#141425',
  },
  // Text
  text: {
    primary: '#F1F5F9',
    secondary: '#94A3B8',
    muted: '#475569',
    inverse: '#050508',
  },
  // Border
  border: {
    subtle: 'rgba(99, 102, 241, 0.12)',
    default: 'rgba(99, 102, 241, 0.2)',
    strong: 'rgba(99, 102, 241, 0.4)',
  },
  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const gradients = {
  brand: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',
  brandSubtle:
    'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(6,182,212,0.05) 100%)',
  surface: 'linear-gradient(135deg, #0D0D14 0%, #12121C 100%)',
  glow: 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
  text: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Syne', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1.1' }],
    '6xl': ['3.75rem', { lineHeight: '1.05' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
  },
};

export const spacing = {
  section: '6rem',     // py-24
  sectionMd: '5rem',
  sectionSm: '4rem',
  container: '80rem', // max-w-7xl
};

export const radii = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
  card: '1rem',
};

export const shadows = {
  glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  glowStrong: '0 0 40px rgba(99, 102, 241, 0.5)',
  glowCyan: '0 0 20px rgba(6, 182, 212, 0.3)',
  card: '0 4px 24px rgba(0, 0, 0, 0.4)',
  cardHover: '0 8px 40px rgba(99, 102, 241, 0.2)',
  elevated: '0 20px 60px rgba(0, 0, 0, 0.6)',
};

export const glass = {
  weak: {
    background: 'rgba(13, 13, 20, 0.6)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(99, 102, 241, 0.12)',
  },
  medium: {
    background: 'rgba(13, 13, 20, 0.8)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
  },
  strong: {
    background: 'rgba(5, 5, 8, 0.95)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
  },
};
