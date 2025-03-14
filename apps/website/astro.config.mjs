// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321, // Changed to match environment variables
    host: '0.0.0.0' // This allows external connections
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
  ],
  output: "static",
  base: "/",
});
