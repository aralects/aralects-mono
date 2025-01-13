import React from "react";
import clsx from "clsx";
import { SearchIcon, XIcon } from "lucide-react";
import { Input, InputProps } from "./input";
import { Button } from "./button";

const Search = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon" | "type"> & {
    onClear?: (
      event:
        | React.MouseEvent<HTMLElement>
        | React.KeyboardEvent<HTMLInputElement>,
    ) => void;
  }
>(({ onClear, value, ...props }, ref) => {
  const isEmpty = value === undefined || value === "";

  return (
    <Input
      ref={ref}
      value={value}
      {...props}
      onKeyDown={(e) => {
        if (typeof onClear === "function" && e.key === "Escape" && !isEmpty) {
          e.preventDefault();
          onClear(e);
        }
      }}
      icon={
        <>
          <SearchIcon
            className={clsx(
              "text-muted-foreground h-4 w-4 transition-all",
              isEmpty ? "rotate-0 scale-100" : "-rotate-90 scale-0",
            )}
          />
          <Button
            className={clsx(
              "text-muted-foreground absolute h-5 w-5 transition-all",
              isEmpty ? "-rotate-90 scale-0" : "rotate-0 scale-100",
            )}
            size="icon"
            variant="ghost"
            tabIndex={isEmpty ? -1 : 0}
            onClick={onClear}
          >
            <XIcon />
          </Button>
        </>
      }
    />
  );
});
Search.displayName = "Search";

export { Search };
