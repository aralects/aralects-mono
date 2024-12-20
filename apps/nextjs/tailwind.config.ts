import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/pages/**/*.tsx",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],

  presets: [require("@repo/tailwind-config")],
};

export default config;
