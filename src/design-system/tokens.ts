export const colors = {
  // Brand — Deep Red & Crimson
  brand: {
    primary: '#DC2626',   // Crimson Red
    secondary: '#F97316', // Ember Orange
    accent: '#991B1B',    // Deep Wine Red
  },
  // Backgrounds (slightly warm dark)
  bg: {
    base: '#080505',
    surface: '#110A0A',
    elevated: '#1A0E0E',
    card: '#130909',
    cardHover: '#1E1010',
  },
  // Text
  text: {
    primary: '#F8F0F0',
    secondary: '#B0928F',
    muted: '#6B4C4C',
    inverse: '#080505',
  },
  // Border
  border: {
    subtle: 'rgba(220, 38, 38, 0.12)',
    default: 'rgba(220, 38, 38, 0.2)',
    strong: 'rgba(220, 38, 38, 0.4)',
  },
  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const gradients = {
  brand: 'linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #F97316 100%)',
  brandSubtle:
    'linear-gradient(135deg, rgba(153,27,27,0.15) 0%, rgba(220,38,38,0.1) 50%, rgba(249,115,22,0.05) 100%)',
  surface: 'linear-gradient(135deg, #110A0A 0%, #1A0E0E 100%)',
  glow: 'radial-gradient(circle at center, rgba(220,38,38,0.15) 0%, transparent 70%)',
  text: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
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
  section: '6rem',
  sectionMd: '5rem',
  sectionSm: '4rem',
  container: '80rem',
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
  glow: '0 0 20px rgba(220, 38, 38, 0.35)',
  glowStrong: '0 0 40px rgba(220, 38, 38, 0.55)',
  glowOrange: '0 0 20px rgba(249, 115, 22, 0.3)',
  card: '0 4px 24px rgba(0, 0, 0, 0.5)',
  cardHover: '0 8px 40px rgba(220, 38, 38, 0.25)',
  elevated: '0 20px 60px rgba(0, 0, 0, 0.7)',
};

export const glass = {
  weak: {
    background: 'rgba(17, 10, 10, 0.6)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(220, 38, 38, 0.12)',
  },
  medium: {
    background: 'rgba(17, 10, 10, 0.8)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(220, 38, 38, 0.2)',
  },
  strong: {
    background: 'rgba(8, 5, 5, 0.95)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(220, 38, 38, 0.3)',
  },
};
