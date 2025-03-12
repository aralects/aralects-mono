const APP_URL = import.meta.env.PUBLIC_APP_URL;
const DEMO_PATH = import.meta.env.PUBLIC_DEMO_PATH || 'https://demo.aralects.com';

export const URLS = {
  DEMO: {
    IFRAME: `${DEMO_PATH}`,
  },
  WEB:{
    APP: `${APP_URL}`,
  },
  SOCIAL: {
    FACEBOOK: 'https://www.facebook.com/people/Aralects/61572407105723/',
    INSTAGRAM: 'https://www.instagram.com/ara.lects/',
    TELEGRAM: '#',
    VK: '#'
  }
} as const; 