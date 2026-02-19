/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5733',      // Books & Trunks primary action color
          burgundy: '#800020',    // Books & Trunks structural color
          cream: '#F4F1DE',
          peach: '#F2CC8F',
          brown: '#3D405B',
          green: '#81B29A',
        }
      },
      fontFamily: {
        marker: ['"Permanent Marker"', 'cursive'],
        hand: ['"Caveat"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
      },
      rotate: {
        '2': '2deg',
        '3': '3deg',
        '6': '6deg',
        '-2': '-2deg',
        '-3': '-3deg',
        '-6': '-6deg',
      }
    },
  },
  plugins: [],
}