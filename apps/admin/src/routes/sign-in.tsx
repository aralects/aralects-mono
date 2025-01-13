import { SignIn } from "@clerk/clerk-react";

export default function SignInRoute() {
  return (
    <div className="flex grow items-center justify-center">
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            footer: "hidden",
          },
        }}
      />
    </div>
  );
}
