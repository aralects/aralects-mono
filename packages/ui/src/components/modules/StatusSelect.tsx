import React from "react";
import clsx from "clsx";

import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../core/select";
import { useAutoControlledValue } from "~/hooks/useAutoControlledValue";

import { STATUSES, STATUS_LOOKUP } from "~/constants/status";

export type StatusSelectProps = SelectProps & {
  className?: string;
};

const StatusSelect = React.forwardRef<HTMLButtonElement, StatusSelectProps>(
  ({ className, value: controlledValue, defaultValue, ...props }, ref) => {
    const [value, setValue] = useAutoControlledValue({
      name: "StatusSelect",
      controlledValue,
      defaultValue,
    });

    return (
      <Select value={value} onValueChange={setValue} {...props}>
        <SelectTrigger className={className} ref={ref}>
          <SelectValue placeholder="Status">
            {value !== undefined && STATUS_LOOKUP[value] !== undefined ? (
              <div className={clsx("flex flex-row items-center gap-1")}>
                <div
                  className={clsx("mr-1 h-4 w-4 shrink-0 rounded-full")}
                  style={{ backgroundColor: STATUS_LOOKUP[value].color }}
                />
                {STATUS_LOOKUP[value].label}
              </div>
            ) : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((status) => (
            <SelectItem
              key={status.value}
              value={status.value}
              auxiliary={
                <div
                  className={clsx("mr-1 h-4 w-4 shrink-0 rounded-full")}
                  style={{ backgroundColor: status.color }}
                />
              }
            >
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);
StatusSelect.displayName = "StatusSelect";

export { StatusSelect };
