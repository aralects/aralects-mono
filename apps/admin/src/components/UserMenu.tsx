import { UserButton } from "@clerk/clerk-react";
import { cn } from "~/lib/utils";

export const UserMenu = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <UserButton
        appearance={{
          layout: {
            shimmer: false,
          },
          elements: {
            userButtonPopoverFooter: "hidden",
          },
        }}
      />
    </div>
  );
};
