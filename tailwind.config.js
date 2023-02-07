/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
      colors: {
          "grey": "#43465C",
          "white": "#FFFFFF",
          "background": "#181A25",
          "section-background": "#151823",
          "gradient-left": "#AF53FF",
          "gradient-right": "#6EACFE",
      }
    },
    plugins: [],
  }