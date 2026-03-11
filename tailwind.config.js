/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      colors: {
        'brand-purple': '#7B2D8B',
        'brand-purple-dark': '#5E1A6E',
        'brand-purple-light': '#9B3EAB',
        'brand-purple-hero': '#B55AC8',  /* Lighter purple for hero title */
        'brand-mint': '#DCF0ED',
        'brand-mint-dark': '#C5E8E3',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'brand-logo': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // 20px to 24px
        'brand-hero-title': ['clamp(2.5rem, 5vw, 4.25rem)', { lineHeight: '1.15' }], // 40px to 68px
        'brand-hero-subtitle': ['clamp(1.125rem, 2vw, 1.375rem)', { lineHeight: '1.5' }], // 18px to 22px
        'brand-section-title': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2' }], // 32px to 48px
        'brand-nav-link': ['1rem', { lineHeight: '1.5' }], // 16px
        'brand-button': ['1rem', { lineHeight: '1.5' }], // 16px
        'brand-feature-label': ['clamp(0.875rem, 1.5vw, 1.125rem)', { lineHeight: '1.2' }], // 14px to 18px
        'brand-body': ['1rem', { lineHeight: '1.6' }], // 16px
      },
      fontWeight: {
        'brand-logo': '800',
        'brand-hero-title': '600',
        'brand-section-title': '700',
        'brand-nav-link': '400',
        'brand-button': '600',
        'brand-hero-subtitle': '400',
        'brand-feature-label': '600',
        'brand-body': '400',
      },
    },
  },
  plugins: [],
}
