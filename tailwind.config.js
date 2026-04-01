/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        cyan: '#00f5ff',
        orange: '#ff6b35',
      },
      fontFamily: {
        display: ['Montserrat', 'Arial', 'sans-serif'],
        mono: ['Open Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

