module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sitewidebackground: '#414141',
        navbarbuttonhighlight: '#F5F5F5',
        cardhover: '#08f78f',
        easy: '#00BFFF',
        medium: '#FF8C00',
        hard: '#B22222'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
