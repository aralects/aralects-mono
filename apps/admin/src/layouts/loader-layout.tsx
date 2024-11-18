import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Logo } from "@repo/ui";

export const LoaderLayout = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded)
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-y-8">
        <Logo size="lg" />
        <div className="mx-auto flex h-[430px] flex-col justify-center">
          <Loader2 className="animate-spin" size={80} />
        </div>
      </div>
    );

  return <Outlet />;
};
