import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { SelectProps } from "@radix-ui/react-select";
import { Moon, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../core/select";

export type ColorModeSelectProps = Omit<
  SelectProps,
  "value" | "onValueChange"
> & {};

const ColorModeSelect = React.forwardRef<
  HTMLButtonElement,
  ColorModeSelectProps
>((props, ref) => {
  const { theme, setTheme } = useTheme();

  // @see https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // @todo add skeleton loader
  if (!mounted) return null;

  return (
    <Select {...props} value={theme} onValueChange={setTheme}>
      <SelectTrigger
        hideChevron
        className="hover:bg-background relative h-auto w-auto rounded-full border-none bg-transparent p-2"
        ref={ref}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <SelectContent align="center">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
});
ColorModeSelect.displayName = "ColorModeSelect";

export { ColorModeSelect };
