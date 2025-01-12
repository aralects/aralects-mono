module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}',
    './components/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
            
  theme: {
    extend: {
      fontFamily: {
        Melodrama: ['Melodrama', 'sans-serif'], 
        SpaceGrotesk: ['SpaceGrotesk', 'sans-serif'], 
        SpaceGroteskBold: ['SpaceGroteskBold', 'sans-serif'], 
        SpaceGroteskLight:['SpaceGroteskLight','sans-serif']
      },

      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
