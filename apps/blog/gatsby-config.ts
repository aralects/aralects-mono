import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~": path.resolve(__dirname, "../../packages/ui/src"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`@repo/ui`],
      },
    },
  ],
};

export default config;
