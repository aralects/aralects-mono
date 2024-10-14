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
      <SelectTrigger className="ui-relative ui-w-auto" ref={ref}>
        <Sun className="ui-mr-1 ui-h-5 ui-w-5 ui-rotate-0 ui-scale-100 ui-transition-all dark:ui--rotate-90 dark:ui-scale-0" />
        <Moon className="ui-absolute ui-mr-1 ui-h-5 ui-w-5 ui-rotate-90 ui-scale-0 ui-transition-all dark:ui-rotate-0 dark:ui-scale-100" />
        <span className="ui-sr-only">Toggle theme</span>
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
