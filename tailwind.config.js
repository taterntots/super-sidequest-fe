module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        taterpurple: '#483D8B',
        profileone: '#3E828C',
        profiletwo: '#483D8B',
        purplebutton: '#9370DB',
        logintext: '#BA55D3',
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
  plugins: [
    // require('@tailwindcss/forms')
  ],
}
