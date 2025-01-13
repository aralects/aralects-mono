import { SignUp } from "@clerk/clerk-react";

export default function SignUpRoute() {
  return (
    <div className="flex grow items-center justify-center">
      <SignUp
        path="/sign-up"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            footer: "hidden",
          },
        }}
      />
    </div>
  );
}
