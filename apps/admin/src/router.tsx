import { createBrowserRouter } from "react-router-dom";

import IndexRoute from "./routes";
import SignUpRoute from "./routes/sign-up";
import SignInRoute from "./routes/sign-in";
import { AuthProvider } from "./contexts/Auth";
import { ProtectedLayout } from "./layouts/protected-layout";
import { LoaderLayout } from "./layouts/loader-layout";
import { ErrorRoute } from "./routes/error";
import { AppLayout } from "./routes/app";
import { RootAnnotator } from "./routes/root-annotator";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <LoaderLayout />
      </AuthProvider>
    ),
    errorElement: <ErrorRoute />,
    children: [
      { path: "/", element: <IndexRoute /> },
      { path: "/sign-up/*", element: <SignUpRoute /> },
      { path: "/sign-in/*", element: <SignInRoute /> },
      {
        element: (
          <ProtectedLayout>
            <AppLayout />
          </ProtectedLayout>
        ),
        path: "/app",
        children: [
          {
            path: "/app/root-annotator",
            element: <RootAnnotator />,
          },
        ],
      },
    ],
  },
]);
