import React, { useState } from "react";
import { Input, InputProps } from "../core/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../core/tooltip";
import { History } from "lucide-react";
import { Kbd } from "../core/kbd";
import { TooltipPortal } from "@radix-ui/react-tooltip";

export type InputWithHistoryProps = InputProps & {
  history: string;
};

const InputWithHistory = React.forwardRef<
  HTMLInputElement,
  InputWithHistoryProps
>(({ history, onKeyDown, onBlur, ...inputProps }, ref) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (onKeyDown) onKeyDown(e);

    if (e.shiftKey && e.key === "H") {
      e.preventDefault();
      setShowTooltip((prev) => !prev);
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (onBlur) onBlur(e);

    if (showTooltip) setShowTooltip(false);
  };

  return (
    <Input
      ref={ref}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      {...inputProps}
      icon={
        <TooltipProvider delayDuration={0}>
          <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
            <TooltipTrigger onClick={(e) => e.preventDefault()} tabIndex={-1}>
              <History width={18} height={18} />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent className="flex items-center space-x-2">
                <p>{history}</p>
                <Kbd>Shift+H</Kbd>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      }
    />
  );
});

InputWithHistory.displayName = "InputWithHistory";

export { InputWithHistory };
