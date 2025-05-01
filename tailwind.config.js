/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Quintessential:["Quintessential", "serif"]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}