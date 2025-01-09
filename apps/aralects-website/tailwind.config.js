/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Melodrama: ['Melodrama', 'sans-serif'], 
        SpaceGrotesk: ['SpaceGrotesk', 'sans-serif'], 
        SpaceGroteskBold: ['SpaceGroteskBold', 'sans-serif'], 
        SpaceGroteskLight:['SpaceGroteskLight','sans-serif']
      },
    },
    variants: {
      extend: {
        scrollBehavior: ['responsive'],
      },
    },
  },
  plugins: [],
}

