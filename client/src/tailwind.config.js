module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#829eff',
            DEFAULT: '#6e8efb',
            dark: '#5a7ad9'
          },
          secondary: {
            light: '#ff8f8f',
            DEFAULT: '#FF6B6B',
            dark: '#FF5252'
          },
          dark: '#2c3e50',
        },
        fontFamily: {
          sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }