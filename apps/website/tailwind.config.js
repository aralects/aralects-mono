import baseConfig from "@repo/tailwind-config";
import plugin from "tailwindcss/plugin";

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
        LivvicMedium: ["LivvicMedium", "sans-serif"],
        LivvicBold: ["LivvicBold", "sans-serif"],
        LivvicSemiBold: ["LivvicSemiBold", "sans-serif"],
      },

      animation: {
        "fade-in": "fadeIn 0.5s both",
        "fade-in-up": "fadeInUp 0.5s both",
        "fade-in-down": "fadeInDown 0.5s both",
        "fade-in-left": "fadeInLeft 0.5s both",
        "fade-in-right": "fadeInRight 0.5s both",
        "infinite-scroll": "infinite-scroll 45s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(-2rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translateX(2rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
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
