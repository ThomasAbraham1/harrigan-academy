/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#7B2D8B',
        'brand-purple-dark': '#5E1A6E',
        'brand-purple-light': '#9B3EAB',
        'brand-mint': '#DCF0ED',
        'brand-mint-dark': '#C5E8E3',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
