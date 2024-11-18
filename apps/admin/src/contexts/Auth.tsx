import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk publishable key. You can find it by visiting https://dashboard.clerk.com and then navigating to the app's Configure > API Keys page.",
  );
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      signInForceRedirectUrl="/app"
      signUpForceRedirectUrl="/app"
      afterSignOutUrl="/sign-in"
      // appearance={{
      //   baseTheme: dark,
      // }}
    >
      {children}
    </ClerkProvider>
  );
};
