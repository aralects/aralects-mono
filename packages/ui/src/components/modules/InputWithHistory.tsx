import React from "react";
import { Input, InputProps } from "../core/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../core/tooltip";
import { History } from "lucide-react";

export type InputWithHistoryProps = InputProps & {
  history: string;
};

const InputWithHistory = React.forwardRef<
  HTMLInputElement,
  InputWithHistoryProps
>(({ history, ...inputProps }, ref) => {
  return (
    <Input
      ref={ref}
      {...inputProps}
      icon={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <History width={18} height={18} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{history}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    />
  );
});

InputWithHistory.displayName = "InputWithHistory";

export { InputWithHistory };
