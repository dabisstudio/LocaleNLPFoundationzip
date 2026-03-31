import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        sora: ['var(--font-space-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #F5F5F3 0%, #FAFAFA 50%, #F5F5F3 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(12,12,12,0.02) 0%, rgba(12,12,12,0.0) 100%)',
        'glow-ochre': 'radial-gradient(circle at center, rgba(217,92,20,0.08) 0%, transparent 70%)',
        'glow-navy': 'radial-gradient(circle at center, rgba(10,25,49,0.06) 0%, transparent 70%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'monumental': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'widest': '0.1em',
      },
      colors: {
        // ── Monumental Institutional palette ──────────────────────────
        base: {
          stone: '#F5F5F3',
          paper: '#FAFAFA',
          pure: '#FFFFFF',
          archive: '#EAEAEA',
        },
        ink: {
          monument: '#0C0C0C',
          steel: '#4A4A56',
          muted: '#8C8C9A',
        },

        // ── Brand tokens (updated to light theme) ─────────────────────
        brand: {
          deep: '#F5F5F3',
          surface: '#FFFFFF',
          elevated: '#F5F5F3',
        },

        // ── Heritage accents ─────────────────────────────────────────
        'accent-ochre': '#D95C14',
        'accent-navy': '#0A1931',
        'accent-emerald': '#0F763D',
        // accent-clay and accent-cyan kept for legacy components
        'accent-clay': '#E07A5F',
        'accent-cyan': '#00E5FF',

        // ── Semantic text tokens (now light-theme values) ─────────────
        'text-primary': '#0C0C0C',
        'text-secondary': '#4A4A56',
        'text-tertiary': '#8C8C9A',

        // ── Legacy palettes kept for backward compat ──────────────────
        midnight: {
          DEFAULT: '#1a1a2e',
          50: '#f5f5f7',
          100: '#e8e8ed',
          200: '#c5c5d3',
          300: '#a2a2b9',
          400: '#5c5c84',
          500: '#1a1a2e',
          600: '#171729',
          700: '#131322',
          800: '#09090E',
          900: '#04040A',
          950: '#020205',
        },
        royal: {
          DEFAULT: '#6B1F77',
          50: '#f9f5fa',
          100: '#f3eaf5',
          200: '#e4cce8',
          300: '#d4adda',
          400: '#a066a4',
          500: '#6B1F77',
          600: '#601c6b',
          700: '#501759',
          800: '#401248',
          900: '#340f3b',
        },
        ochre: {
          DEFAULT: '#D95C14',
          50: '#fef5ed',
          100: '#fde3c8',
          200: '#fbc690',
          300: '#f7a058',
          400: '#D95C14',
          500: '#c2520f',
          600: '#a3430b',
          700: '#7d330a',
          800: '#5e2708',
          900: '#491e07',
        },
        forest: {
          DEFAULT: '#0F763D',
          50: '#f0faf5',
          100: '#d9f2e6',
          200: '#b0e5cd',
          300: '#7fd0ae',
          400: '#43b285',
          500: '#0F763D',
          600: '#0d6a36',
          700: '#0b5a2d',
          800: '#094826',
          900: '#073b1f',
        },

        // ── Shadcn CSS-var tokens ─────────────────────────────────────
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      boxShadow: {
        'editorial': '0 1px 2px rgba(12,12,12,0.05), 0 4px 12px rgba(12,12,12,0.06)',
        'harsh': '4px 4px 0px 0px rgba(12,12,12,0.9)',
        'card': '0 1px 3px rgba(12,12,12,0.08), 0 8px 24px rgba(12,12,12,0.05)',
        'float': '0 20px 40px rgba(12,12,12,0.12)',
        'glow-ochre': '0 0 20px rgba(217,92,20,0.25)',
        'glow-navy': '0 0 20px rgba(10,25,49,0.2)',
        // Legacy shadows kept for any dark-context components
        'glass': '0 4px 30px rgba(0,0,0,0.5)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(217,92,20,0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(217,92,20,0.45)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-down': 'slide-down 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
