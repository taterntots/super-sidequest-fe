module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        navbarbuttonhighlight: '#F5F5F5'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
