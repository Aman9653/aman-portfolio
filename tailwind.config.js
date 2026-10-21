/** @type {import('tailwindcss').Config} */

/**
 * Design system for the Aman Yadav portfolio.
 *
 * Theme colours are driven by CSS custom properties (defined in src/index.css)
 * so switching between light and dark mode can be *animated* with a CSS
 * transition instead of snapping instantly. Each variable holds a space
 * separated RGB triplet so Tailwind's `<alpha-value>` opacity modifiers
 * (e.g. `bg-card/60`) keep working.
 */
const withOpacity = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1320px',
      },
    },
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        /* ---- Brand ramp (theme independent) ---- */
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          DEFAULT: '#8B5CF6',
        },
        sky: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          DEFAULT: '#3B82F6',
        },
        cyan: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
          DEFAULT: '#22D3EE',
        },

        /* Semantic brand aliases (theme aware) */
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
        accent: withOpacity('--color-accent'),

        /* ---- Theme aware surfaces ---- */
        canvas: withOpacity('--color-bg'),
        'canvas-alt': withOpacity('--color-bg-alt'),
        card: withOpacity('--color-card'),
        'card-alt': withOpacity('--color-card-alt'),
        elevated: withOpacity('--color-elevated'),

        /* ---- Theme aware content ---- */
        content: {
          DEFAULT: withOpacity('--color-text'),
          strong: withOpacity('--color-text-strong'),
          muted: withOpacity('--color-text-muted'),
          subtle: withOpacity('--color-text-subtle'),
          inverted: withOpacity('--color-text-inverted'),
        },

        /* ---- Theme aware lines ---- */
        line: {
          DEFAULT: withOpacity('--color-border'),
          strong: withOpacity('--color-border-strong'),
          soft: withOpacity('--color-border-soft'),
        },
      },

      fontFamily: {
        display: ['Satoshi', 'General Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },

      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.06em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl': ['4.75rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },

      letterSpacing: {
        tighter: '-0.035em',
        label: '0.14em',
      },

      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      boxShadow: {
        soft: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.12)',
        card: '0 2px 6px rgb(15 23 42 / 0.04), 0 18px 40px -24px rgb(15 23 42 / 0.25)',
        lifted: '0 8px 20px -8px rgb(15 23 42 / 0.16), 0 32px 64px -32px rgb(15 23 42 / 0.35)',
        glow: '0 0 0 1px rgb(139 92 246 / 0.18), 0 12px 40px -12px rgb(139 92 246 / 0.45)',
        'glow-sm': '0 6px 20px -8px rgb(139 92 246 / 0.5)',
        'glow-cyan': '0 12px 40px -14px rgb(34 211 238 / 0.55)',
        'inner-line': 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },

      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #8B5CF6 0%, #6366F1 40%, #3B82F6 70%, #22D3EE 100%)',
        'brand-gradient-soft':
          'linear-gradient(120deg, rgb(139 92 246 / 0.16), rgb(59 130 246 / 0.14) 55%, rgb(34 211 238 / 0.16))',
        'brand-sheen': 'linear-gradient(110deg, transparent 20%, rgb(255 255 255 / 0.35) 50%, transparent 80%)',
        'grid-light':
          'linear-gradient(to right, rgb(15 23 42 / 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42 / 0.055) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgb(148 163 184 / 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.09) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(ellipse at center, rgb(139 92 246 / 0.22), transparent 65%)',
      },

      backgroundSize: {
        grid: '56px 56px',
        'grid-sm': '32px 32px',
        shimmer: '200% 100%',
        'gradient-pan': '200% 200%',
      },

      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      transitionDuration: {
        400: '400ms',
        600: '600ms',
        700: '700ms',
      },

      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -9px, 0) rotate(1.5deg)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '150% 0' },
          '100%': { backgroundPosition: '-50% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
        'wave-scroll': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'blob-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(3%, -4%, 0) scale(1.06)' },
          '66%': { transform: 'translate3d(-3%, 3%, 0) scale(0.96)' },
        },
        'caret-blink': {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'marquee-x': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },

      animation: {
        'float-slow': 'float-slow 7s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'float-soft': 'float-soft 5.5s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'gradient-pan': 'gradient-pan 9s ease infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        'wave-slow': 'wave-scroll 26s linear infinite',
        'wave-mid': 'wave-scroll 18s linear infinite',
        'wave-fast': 'wave-scroll 12s linear infinite',
        'blob-drift': 'blob-drift 18s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.1s step-end infinite',
        'scroll-hint': 'scroll-hint 1.9s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'marquee-x': 'marquee-x 32s linear infinite',
      },

      zIndex: {
        nav: '60',
        overlay: '70',
        toast: '80',
      },
    },
  },
  plugins: [],
};
