/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/client/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite'
      }
    }
  },
  plugins: []
}
