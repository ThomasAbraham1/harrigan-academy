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
        'brand-purple': '#904ba2',
        'brand-purple-dark': '#7a3f8a',
        'brand-purple-light': '#a661b7',
        'brand-purple-hero': '#904ba2',
        'brand-mint': '#DCF0ED',
        'brand-mint-dark': '#C5E8E3',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'antique': ['Antique Olive', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'brand-logo': ['1.5rem', { lineHeight: '1.2' }], // 24px
        'hero-h': ['clamp(1.75rem, 5vw, 2rem)', { lineHeight: '1.12' }], // 28px -> 32px
        'hero-p': ['clamp(1rem, 2.5vw, 1.125rem)', { lineHeight: '1.6' }], // 16px -> 18px
        'section-h': ['1.9rem', { lineHeight: '1.2' }], 
        'section-p': ['1rem', { lineHeight: '1.6' }],    // 16px
        'section-p-large': ['1.125rem', { lineHeight: '1.6' }], // 18px
        'hero-cta': ['clamp(1rem, 2.5vw, 1.125rem)', { lineHeight: '1.2' }],     // 24px
      },
      fontWeight: {
        'brand-logo': '700',
        'hero-h': '700',
        'hero-p': '500',
        'section-h': '300',
        'section-p': '400',
        'section-p-large': '500',
        'hero-cta': '600',
      },
    },
  },
  plugins: [],
}
