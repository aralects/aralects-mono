export const DEMO_CONTENT = {
  TITLE: {
    MAIN: "Get a taste of",
    SUB: "Aralects",
  },
  DESCRIPTION:
    'Say hello (or rather, "مرحبا"!) to a tiny taste of what Aralects has in store. This interactive pronunciation demo gives you instant feedback on your Arabic accent across multiple dialects.',
  SECOND_DESCRIPTION:
    "Heads up: This demo is just a glimpse into the magic we're cooking up at Aralects. It's still a work in progress, so bear with us as we tweak and fine-tune to perfection. Dive in, test your skills, and stay tuned for the full experience!",
  BUTTON: {
    START: "Start Demo!",
    BACK: "Back",
  },
} as const;

export const DEMO_COLORS = {
  TITLE: "#3D2B66",
  DESCRIPTION: "text-4xl md:text-5xl font-SpaceGrotesk text-[#3D2B66]",
  BACKGROUND: "#8262B0",
  BUTTON: {
    HOVER: "#6B4E9E",
  },
} as const;

export const DEMO_LAYOUT = {
  PHONE_FRAME: {
    WIDTH: {
      DEFAULT: "w-[250px]",
    },
  },
  LOGO: {
    SIZE: {
      DEFAULT: "w-16 h-16",
      SM: "sm:w-20 sm:h-20",
      MD: "md:w-24 md:h-24",
      LG: "lg:w-28 lg:h-28",
    },
  },
} as const;
