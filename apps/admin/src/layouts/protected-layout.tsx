import { useUser } from "@clerk/clerk-react";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div className="m-auto">Loading...</div>;

  if (!isSignedIn) {
    // Redirect them to the /sign-in page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};
