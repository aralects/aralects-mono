import "./global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/Theme";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
