import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Logo } from "@repo/ui";

const IndexRoute = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-y-8">
      <Link to="/">
        <Logo size="lg" />
      </Link>
      <div className="min-h-[430px]">
        <SignIn
          forceRedirectUrl="/app"
          routing="hash"
          appearance={{
            elements: {
              footer: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
};

export default IndexRoute;
