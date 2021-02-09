const colors = require('tailwindcss/colors')

const width = {
  'sm-icon': '50px',
  'md-icon': '75px',
  'lg-icon': '100px',
  '1/4': '25%',
  '1/3': '33.3%',
  '1/2': '50%',
  '3/4': '75%'
}

module.exports = {
  // purge: [['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}']],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      vblue: '#2c3e50',
      vgreen: '#42b983'
    },
    width,
    maxWidth: { ...width },
    screens: {
      xs: '418px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
