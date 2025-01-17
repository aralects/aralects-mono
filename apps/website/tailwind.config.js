import baseConfig from "@repo/tailwind-config";

module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./components/**/*.{astro,html,js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        Melodrama: ["Melodrama", "sans-serif"],
        SpaceGrotesk: ["SpaceGrotesk", "sans-serif"],
        SpaceGroteskBold: ["SpaceGroteskBold", "sans-serif"],
        SpaceGroteskLight: ["SpaceGroteskLight", "sans-serif"],
        UnboundedRegular: ["UnboundedRegular", "sans-serif"],
        Rubbama: ["KoRubbama", "sans-serif"],
      },

      animation: {
        "infinite-scroll": "infinite-scroll 45s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".glow": {
          boxShadow:
            "0 0 16.3px rgba(128, 59, 227, 0.5), 0 0 2px rgba(189, 158, 235, 1)",
        },
        ".glow-xl": {
          boxShadow:
            "-0.8px -0.8px 0 #8262B0, 0.8px -0.8px 0 #8262B0, -0.8px 0.8px 0 #8262B0, 0.8px 0.8px 0 #8262B0, 0 0 16.3px rgba(128, 59, 227, 0.5), 0 0 2px rgba(189, 158, 235, 1)",
        },
        ".text-glow": {
          textShadow:
            "0 0 16.3px rgba(128, 59, 227, 0.5), 0 0 2px rgba(189, 158, 235, 1)",
        },
        ".text-glow-xl": {
          textShadow:
            "-0.8px -0.8px 0 #8262B0, 0.8px -0.8px 0 #8262B0, -0.8px 0.8px 0 #8262B0, 0.8px 0.8px 0 #8262B0, 0 0 16.3px rgba(128, 59, 227, 0.5), 0 0 2px rgba(189, 158, 235, 1)",
        },
      });
    },
  ],

  presets: [baseConfig],
};
