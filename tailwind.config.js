/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': {"max": "450px"},
        'md': {"max": "768px"},
        'lg': {"max": "1024px"},
        'xl': {"max": "1280px"},
       },
      fontFamily: {
        poppins: [ "Poppins", "Montserrat", 'serif']
      }
    },
  },
  plugins: [],
}

