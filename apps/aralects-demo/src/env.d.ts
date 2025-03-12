interface ImportMetaEnv {
    readonly VITE_WEBSITE_URL: string
    readonly VITE_API_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }