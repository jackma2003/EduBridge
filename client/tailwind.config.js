/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da8ff',
          DEFAULT: '#1a73e8',
          dark: '#0b4595',
        },
        secondary: {
          light: '#f7fafc',
          DEFAULT: '#edf2f7',
          dark: '#cbd5e0',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}