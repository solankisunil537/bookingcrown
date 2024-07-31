/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", "./src/components/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        themeColor: '#14b8a6',
        themeLight: '#f3fbfa',
        customeBg: "#f8fafc"
      },
    },
  },
  plugins: [],
}
