import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import { Flag } from "lucide-react";

const Flaggable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    fieldId: string;
  }
>(({ className, children, fieldId: _, ...props }, ref) => {
  const [isFlagged, setIsFlagged] = useState(false);

  const handleFlag: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsFlagged((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center rounded-md border",
        isFlagged
          ? "border-destructive bg-destructive text-destructive-foreground "
          : "border-transparent",
        className,
      )}
      {...props}
    >
      {children}
      <Button
        className="mx-1 h-auto w-auto p-3"
        variant={isFlagged ? "destructive" : "ghost"}
        onClick={handleFlag}
      >
        <Flag className="h-3 w-3 shrink-0" />
      </Button>
    </div>
  );
});
Flaggable.displayName = "Flaggable";

export { Flaggable };
