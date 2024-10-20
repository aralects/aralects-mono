import { SignUp } from "@clerk/clerk-react";

export default function SignUpRoute() {
  return (
    <div className="mx-auto flex grow items-center">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
