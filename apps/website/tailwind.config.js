module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}',
    './components/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
            
  theme: {
    extend: {
      textShadow: {
        glow: '0 0 10px rgba(128, 0, 255, 0.7), 0 0 20px rgba(128, 0, 255, 0.5)',
      },
      fontFamily: {
        Melodrama: ['Melodrama', 'sans-serif'], 
        SpaceGrotesk: ['SpaceGrotesk', 'sans-serif'], 
        SpaceGroteskBold: ['SpaceGroteskBold', 'sans-serif'], 
        SpaceGroteskLight:['SpaceGroteskLight','sans-serif'],
        UnboundedRegular:['UnboundedRegular','sans-serif'],
        Satoshi:['Satoshi','sans-serif']

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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-glow': {
          textShadow: '0 0 10px rgba(128, 0, 255, 0.3), 0 0 20px rgba(128, 0, 255, 0.7)',
        },
      });
    },
  ],
};
