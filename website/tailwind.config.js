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
        'blue-dark': '#1E3A8A',
        'blue-medium': '#D8ECFD',
      }
    },
  },
  plugins: [],
}
