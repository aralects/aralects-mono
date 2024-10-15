import "./src/styles/global.css";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider attribute="class">{element}</ThemeProvider>;
};
