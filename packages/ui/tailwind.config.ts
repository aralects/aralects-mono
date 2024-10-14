// required for tailwind extension to work as expected

import type { Config } from "tailwindcss";

const config: Pick<Config, "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  presets: [require("@repo/tailwind-config")],
};

export default config;
