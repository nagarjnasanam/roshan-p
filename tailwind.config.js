/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      "trs-blue": "#12327a",
      "trs-blue-light": "#2a4787",
      "hex-blue": "#1378a4",
      "theme-red": "#AD0303"
    },
    extend: {},
  },
  plugins: [],
}