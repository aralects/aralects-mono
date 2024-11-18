import { SignIn } from "@clerk/clerk-react";

export default function SignInRoute() {
  return (
    <div className="mx-auto flex grow items-center">
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
