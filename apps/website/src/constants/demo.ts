export const DEMO_CONTENT = {
  TITLE: {
    MAIN: 'Get a hint of',
    SUB: 'Aralects'
  },
  DESCRIPTION: "Let's be honest, learning Arabic today is challenging. Most apps focus on rigid lessons and miss the immersive, real-world conversations that bring Arabic to life.",
  SECOND_DESCRIPTION: "Aralects is a new way to learn Arabic. It's a voice-based learning app that uses your voice to teach you Arabic. It's like having a personal Arabic tutor in your pocket.",
  BUTTON: {
    START: 'Start Demo!',
    BACK: 'Back'
  }
} as const;

export const DEMO_COLORS = {
  TITLE: '#3D2B66',
  DESCRIPTION:'text-4xl md:text-5xl font-SpaceGrotesk text-[#3D2B66]',
  BACKGROUND: '#8262B0',
  BUTTON: {
    HOVER: '#6B4E9E'
  }
} as const;

export const DEMO_LAYOUT = {
  PHONE_FRAME: {
    WIDTH: {
      DEFAULT: 'w-[180px]',
      SM: 'sm:w-[250px]',
      MD: 'md:w-[280px]',
      LG: 'lg:w-[320px]'
    },
    POSITION: {
      RIGHT: {
        DEFAULT: 'right-[5%]',
        MD: 'md:right-[10%]',
        LG: 'lg:right-[15%]'
      },
      TOP: {
        DEFAULT: 'top-[15%]',
        SM: 'sm:top-[15%]',
        MD: 'md:top-[15%]',
        LG: 'lg:top-[15%]'
      }
    }
  },
  LOGO: {
    SIZE: {
      DEFAULT: 'w-16 h-16',
      SM: 'sm:w-20 sm:h-20',
      MD: 'md:w-24 md:h-24',
      LG: 'lg:w-28 lg:h-28'
    }
  }
} as const; 