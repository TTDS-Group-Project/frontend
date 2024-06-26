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
          "formInputBorder": "#303241",
          "tag-bg-color": "rgba(34, 212, 159, 0.3)",
          "tag-text-color": "#22D49F"
      }
    },
    plugins: [],
  }