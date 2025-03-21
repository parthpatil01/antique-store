/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        customBrown: '#873e23',
        lightBrown: '#DEB887',
        lightGray:'#F5F5F5'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("tw-elements/dist/plugin.cjs"),
  ],
}