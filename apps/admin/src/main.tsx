import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./contexts/Theme";
import App from "./app/App";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Clerk Publishable Key is missing. Please add it to your .env.local file.",
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </ThemeProvider>
  </StrictMode>,
);
