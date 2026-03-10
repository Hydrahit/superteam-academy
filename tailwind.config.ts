import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        green: {
          DEFAULT: '#00C896',
          50: '#E6FFF7',
          100: '#B3FFE8',
          200: '#80FFD9',
          300: '#4DFFCA',
          400: '#1AFFBB',
          500: '#00C896',
          600: '#00A87E',
          700: '#008866',
          800: '#00684E',
          900: '#004836',
        },
        purple: {
          DEFAULT: '#9945FF',
          50: '#F5EAFF',
          100: '#E0C0FF',
          200: '#CC96FF',
          300: '#B86CFF',
          400: '#A342FF',
          500: '#9945FF',
          600: '#7A37CC',
          700: '#5C2999',
          800: '#3D1B66',
          900: '#1F0E33',
        },
        black: '#060606',
        'card-bg': '#0F0F0F',
        'card-border': '#1A1A1A',
        muted: {
          DEFAULT: '#888888',
          foreground: '#888888',
        },
        border: '#1A1A1A',
        input: '#1A1A1A',
        ring: '#00C896',
        background: '#060606',
        foreground: '#FFFFFF',
        primary: {
          DEFAULT: '#00C896',
          foreground: '#060606',
        },
        secondary: {
          DEFAULT: '#9945FF',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#FF4444',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#0F0F0F',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#0F0F0F',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#0F0F0F',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 24px rgba(0, 200, 150, 0.45)' },
          '50%': { boxShadow: '0 0 48px rgba(0, 200, 150, 0.65)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        countUp: 'countUp 0.6s ease-out forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
