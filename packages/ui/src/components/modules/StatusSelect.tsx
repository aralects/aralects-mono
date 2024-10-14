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
import useAutoControlledValue from "~/hooks/useAutoControlledValue";

import { STATUSES, STATUS_LOOKUP } from "~/constants/status";

export type StatusSelectProps = SelectProps & {};

const StatusSelect = React.forwardRef<HTMLButtonElement, StatusSelectProps>(
  ({ value: controlledValue, defaultValue, ...props }, ref) => {
    const [value, setValue] = useAutoControlledValue({
      name: "StatusSelect",
      controlledValue,
      defaultValue,
    });

    return (
      <Select value={value} onValueChange={setValue} {...props}>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Status">
            {value !== undefined && STATUS_LOOKUP[value] !== undefined ? (
              <div
                className={clsx("ui-flex ui-flex-row ui-items-center ui-gap-1")}
              >
                <div
                  className={clsx(
                    "ui-mr-1 ui-h-4 ui-w-4 ui-shrink-0 ui-rounded-full"
                  )}
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
                  className={clsx(
                    "ui-mr-1 ui-h-4 ui-w-4 ui-shrink-0 ui-rounded-full"
                  )}
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
  }
);
StatusSelect.displayName = "StatusSelect";

export { StatusSelect };
