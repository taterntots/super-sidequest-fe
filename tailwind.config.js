module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        taterpurple: '#483D8B',
        profileone: '#483D8B',
        profiletwo: '#3E828C',
        purplebutton: '#9370DB',
        graybutton: '#374151',
        complete: '#F59E0B',
        active: '#374151',
        logintext: '#BA55D3',
        sitewidebackground: '#1F2937',
        navbarbuttonhighlight: '#9CA3AF',
        navbarmobilehighlight: '#374151',
        texthighlight: '#C4B5FD',
        texthighlighthover: '#A78BFA',
        adventure: '#86C31F',
        multiplayer: '#7C39BD',
        removered: '#F87171',
        addgreen: '#34D399',
        cardhover: '#08f78f',
        easy: '#00BFFF',
        medium: '#FF8C00',
        hard: '#B22222',
        discord: '#4E62EE',
        twitch: '#8C45F7',
        twitter: '#1DA1F2',
        youtube: '#FF0000'
      }
    }
  },
  variants: {
    extend: {
      visibility: ['hover', 'focus'],
      display: ['hover', 'focus']
    },
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}
