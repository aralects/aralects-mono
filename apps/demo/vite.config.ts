import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables from monorepo root
  process.env = {
    ...process.env,
    ...loadEnv(mode, path.resolve(__dirname, "../../")),
  };

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
      rollupOptions: {
        input: {
          main: "./index.html",
        },
      },
    },
    publicDir: "public", // Ensure Vite serves files correctly
    server: {
      host: "0.0.0.0", // This allows access from your phone
      port: 4322,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
