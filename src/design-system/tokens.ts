export const colors = {
  // Brand — Coral & Sunrise
  brand: {
    primary: '#FF6B6B',   // Coral
    secondary: '#FFD93D', // Warm Yellow
    accent: '#FF8E53',    // Sunset Orange
  },
  bg: {
    base: '#07060A',
    surface: '#0F0D14',
    elevated: '#17141E',
    card: '#120F18',
    cardHover: '#1C1824',
  },
  text: {
    primary: '#F5F0FF',
    secondary: '#A899C0',
    muted: '#5C5070',
    inverse: '#07060A',
  },
  border: {
    subtle: 'rgba(255, 107, 107, 0.12)',
    default: 'rgba(255, 107, 107, 0.22)',
    strong: 'rgba(255, 107, 107, 0.4)',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const gradients = {
  brand: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%)',
  brandSubtle: 'linear-gradient(135deg, rgba(255,107,107,0.15) 0%, rgba(255,142,83,0.1) 50%, rgba(255,217,61,0.05) 100%)',
  surface: 'linear-gradient(135deg, #0F0D14 0%, #17141E 100%)',
  glow: 'radial-gradient(circle at center, rgba(255,107,107,0.15) 0%, transparent 70%)',
  text: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%)',
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Syne', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
};

export const shadows = {
  glow: '0 0 20px rgba(255, 107, 107, 0.35)',
  glowStrong: '0 0 40px rgba(255, 107, 107, 0.55)',
  glowYellow: '0 0 20px rgba(255, 217, 61, 0.3)',
  card: '0 4px 24px rgba(0, 0, 0, 0.5)',
  cardHover: '0 8px 40px rgba(255, 107, 107, 0.2)',
  elevated: '0 20px 60px rgba(0, 0, 0, 0.7)',
};

export const glass = {
  weak:   { background: 'rgba(15,13,20,0.6)',  backdropFilter: 'blur(8px)',  border: '1px solid rgba(255,107,107,0.12)' },
  medium: { background: 'rgba(15,13,20,0.8)',  backdropFilter: 'blur(16px)', border: '1px solid rgba(255,107,107,0.22)' },
  strong: { background: 'rgba(7,6,10,0.95)',   backdropFilter: 'blur(24px)', border: '1px solid rgba(255,107,107,0.3)' },
};
