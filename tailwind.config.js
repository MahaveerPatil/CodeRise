/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '1rem',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 107, 107, 0.35)',
        'glow-strong': '0 0 40px rgba(255, 107, 107, 0.55)',
        'glow-yellow': '0 0 20px rgba(255, 217, 61, 0.3)',
        card: '0 4px 24px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 40px rgba(255, 107, 107, 0.2)',
        elevated: '0 20px 60px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};
