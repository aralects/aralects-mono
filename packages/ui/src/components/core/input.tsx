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
        className={cn("ui-relative", full && "ui-w-full", containerClassName)}
        {...otherContainerProps}
      >
        <input
          type={type}
          className={cn(
            "ui-flex ui-h-10 ui-w-full ui-rounded-md ui-border ui-border-input ui-bg-background ui-px-3 ui-py-2 ui-text-sm ui-ring-offset-background ui-file:border-0 ui-file:bg-transparent ui-file:text-sm ui-file:font-medium ui-file:text-foreground ui-placeholder:text-muted-foreground ui-focus-visible:outline-none ui-focus-visible:ring-2 ui-focus-visible:ring-ring ui-focus-visible:ring-offset-2 ui-disabled:cursor-not-allowed ui-disabled:opacity-50",
            icon && iconPosition === "left" && "ui-pl-10",
            icon && iconPosition === "right" && "ui-pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn(
              "ui-absolute ui-top-1/2 ui-flex ui--translate-y-1/2 ui-transform ui-items-center ui-justify-center ui-text-muted-foreground",
              iconPosition === "left" ? "ui-left-3" : "ui-right-3",
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
