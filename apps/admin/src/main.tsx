import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/Theme";

import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";

import IndexRoute from "./routes";
import SignUpRoute from "./routes/sign-up";
import SignInRoute from "./routes/sign-in";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/sign-up/*", element: <SignUpRoute /> },
      { path: "/sign-in/*", element: <SignInRoute /> },
      {
        element: <DashboardLayout />,
        path: "/",
        children: [{ path: "/", element: <IndexRoute /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
