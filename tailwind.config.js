/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFFFFF",
          100: "#4825C2",
          200: "#4825C2",
          300:"#4825E7",
          400:"#FEFEFE",
          500:"#4222B1"
        },
        hover:{
          400: "#e8edfc",
        }
      },
      fontFamily:{
        Syne:"Syne",
        Poppins:"Poppins",
      }
    },
  },
  plugins: [require("daisyui")],
}