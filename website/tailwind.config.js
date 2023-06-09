/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#71BCF9',
        'blue-light': '#F1F8FE',
        'blue-dark': '#478DCE',
        'blue-medium': '#D8ECFD',
        'red': '#E03131',
        'red-light': '#FDE8E8',
        'red-dark': '#C92C2C',
        'green': '#3A9E44',
      }
    },
  },
  plugins: [],
}
