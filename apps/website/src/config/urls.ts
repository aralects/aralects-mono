const APP_URL = import.meta.env.PUBLIC_APP_URL || 'http://localhost:4321';
const DEMO_PATH = import.meta.env.PUBLIC_DEMO_PATH || '/?iframe=true';

export const URLS = {
  DEMO: {
    IFRAME: `${APP_URL}${DEMO_PATH}`,
  },
  SOCIAL: {
    FACEBOOK: 'https://www.facebook.com/people/Aralects/61572407105723/',
    INSTAGRAM: 'https://www.instagram.com/ara.lects/',
    TELEGRAM: '#',
    VK: '#'
  }
} as const; 