/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      colors: {
        brand: {
          red: '#E50914',
          redDark: '#B0060F',
          black: '#141414',
          near: '#181818',
          card: '#232323',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-fade':
          'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, rgba(20,20,20,0.7) 85%, rgba(20,20,20,1) 100%)',
        'top-fade': 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
      },
    },
  },
  plugins: [],
}
