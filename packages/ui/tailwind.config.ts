import type { Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.tsx", "./src/styles.css"],
  prefix: "ui-",
  presets: [require("@repo/tailwind-config")],
};

export default config;
