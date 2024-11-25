import React from "react";
import { cn } from "~/lib/utils";

const Kbd = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "border-border text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.75rem] font-medium",
        className,
      )}
      {...props}
    />
  );
});
Kbd.displayName = "Kbd";

export { Kbd };
