import * as React from "react";

import { cn, PropsOf } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerProps?: PropsOf<HTMLDivElement>;
  full?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      iconPosition = "right",
      containerProps,
      full,
      ...props
    },
    ref,
  ) => {
    const { className: containerClassName, ...otherContainerProps } =
      containerProps ?? {};

    return (
      <div
        className={cn("relative", full && "w-full", containerClassName)}
        {...otherContainerProps}
      >
        <input
          type={type}
          className={cn(
            "border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn(
              "text-muted-foreground absolute top-1/2 flex -translate-y-1/2 transform items-center justify-center",
              iconPosition === "left" ? "left-3" : "right-3",
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
