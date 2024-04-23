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
          50: "#67748e",
          100: "#212529",
          200: "#623ce7",
          300:"#EAEAEA",
          400:"#FEFEFE",
          500:"#4222B1"
        },
      },
      fontFamily:{
        Syne:"Syne",
        Poppins:"Poppins",
      }
    },
  },
  plugins: [require("daisyui")],
}