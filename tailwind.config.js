/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6366F1',
          secondary: '#06B6D4',
          accent: '#8B5CF6',
        },
        bg: {
          base: '#050508',
          surface: '#0D0D14',
          elevated: '#12121C',
          card: '#0F0F1A',
          cardHover: '#141425',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#475569',
          inverse: '#050508',
        },
        border: {
          subtle: 'rgba(99, 102, 241, 0.12)',
          default: 'rgba(99, 102, 241, 0.2)',
          strong: 'rgba(99, 102, 241, 0.4)',
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
        glow: '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-strong': '0 0 40px rgba(99, 102, 241, 0.5)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(99, 102, 241, 0.2)',
        elevated: '0 20px 60px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
