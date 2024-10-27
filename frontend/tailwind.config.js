/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend : {
      fontFamily : {
      sans : ['Roboto', 'sans-serif']
      },
      colors : {
        "light-blue" : "#37AFE1",
        "orange-juice" : "#ffb703",
        "ayran" : "#ffff",
      },
    },
  },
  plugins: [],
}