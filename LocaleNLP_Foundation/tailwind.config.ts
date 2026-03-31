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
        // Space Grotesk for all display/heading use
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        // sora alias retained for backward compatibility with existing components
        sora: ['var(--font-space-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #04040A 0%, #09090E 50%, #04040A 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.0) 100%)',
        'glow-ochre': 'radial-gradient(circle at center, rgba(245,166,35,0.15) 0%, transparent 70%)',
        'glow-cyan': 'radial-gradient(circle at center, rgba(0,229,255,0.1) 0%, transparent 70%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      colors: {
        // New brand tokens
        brand: {
          deep: '#04040A',
          surface: '#09090E',
          elevated: '#12121A',
        },
        'accent-ochre': '#F5A623',
        'accent-clay': '#E07A5F',
        'accent-cyan': '#00E5FF',
        'text-primary': '#FAFAFA',
        'text-secondary': '#8F8F9D',
        'text-tertiary': '#787890',

        // Legacy palette kept for backward compat; midnight-900 and midnight-800 updated
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
          DEFAULT: '#F5A623',
          50: '#fffbf0',
          100: '#fef3d0',
          200: '#fde69f',
          300: '#fbd362',
          400: '#F5A623',
          500: '#e8921a',
          600: '#c57310',
          700: '#9d590d',
          800: '#7a4410',
          900: '#643810',
        },
        forest: {
          DEFAULT: '#2D6A4F',
          50: '#f4f9f7',
          100: '#e9f3ef',
          200: '#c8e1d6',
          300: '#a7cfbd',
          400: '#6aab8c',
          500: '#2D6A4F',
          600: '#295f47',
          700: '#224f3b',
          800: '#1b3f2f',
          900: '#163427',
        },

        // Shadcn CSS-var tokens
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
        'glow-ochre': '0 0 20px rgba(245, 166, 35, 0.35)',
        'glow-cyan': '0 0 20px rgba(0, 229, 255, 0.25)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'float': '0 20px 40px rgba(0, 0, 0, 0.4)',
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
          '0%, 100%': { boxShadow: '0 0 8px rgba(245,166,35,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(245,166,35,0.6)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-down': 'slide-down 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
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
