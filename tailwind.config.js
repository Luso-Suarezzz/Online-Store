/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        azul: "#0F2940",
        marron: "#733703",
        "marron-calro": "#A6550F",
        blanco: "#F2F2F2",
        gris: "#E0E0E0",
        negro: "#202020"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        hanuman: ["Hanuman", "serif"]
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

