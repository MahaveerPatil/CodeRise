/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#DC2626',   // Crimson Red
          secondary: '#F97316', // Ember Orange
          accent: '#991B1B',    // Deep Wine Red
        },
        bg: {
          base: '#080505',
          surface: '#110A0A',
          elevated: '#1A0E0E',
          card: '#130909',
          cardHover: '#1E1010',
        },
        text: {
          primary: '#F8F0F0',
          secondary: '#B0928F',
          muted: '#6B4C4C',
          inverse: '#080505',
        },
        border: {
          subtle: 'rgba(220, 38, 38, 0.12)',
          default: 'rgba(220, 38, 38, 0.2)',
          strong: 'rgba(220, 38, 38, 0.4)',
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
        glow: '0 0 20px rgba(220, 38, 38, 0.35)',
        'glow-strong': '0 0 40px rgba(220, 38, 38, 0.55)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
        card: '0 4px 24px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 40px rgba(220, 38, 38, 0.25)',
        elevated: '0 20px 60px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};
