import React from "react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { ColorModeSelect } from "@repo/ui";
import clsx from "clsx";

export type NavbarProps = React.HtmlHTMLAttributes<HTMLDivElement>;

const Navbar = React.forwardRef(
  ({ className, children, ...rest }: NavbarProps) => {
    return (
      <nav
        className={clsx("flex flex-row items-center gap-4 p-4", className)}
        {...rest}
      >
        {children}
        <div className="ml-auto">
          <ColorModeSelect />
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    );
  },
);
Navbar.displayName = "Navbar";

export default Navbar;
