/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_APP_URL: string;
  readonly PUBLIC_DEMO_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 