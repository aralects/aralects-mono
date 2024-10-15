// Snatched from MUI
// see https://github.com/mui/material-ui/blob/v5.11.5/packages/mui-utils/src/useControlled.js

import React, { useRef, useState } from "react";

export type UseAutoControlledProps<T = unknown> = {
  /**
   * Holds the component value when it's controlled.
   */
  controlledValue: T | undefined;
  /**
   * The default value when uncontrolled.
   */
  defaultValue: T | undefined;
  /**
   * The component name displayed in warnings.
   */
  name: string;
  /**
   * The name of the state variable displayed in warnings.
   */
  state?: string;
};

export function useAutoControlledValue<T>({
  controlledValue,
  defaultValue,
  name,
  state = "value",
}: UseAutoControlledProps<T>): [
  T | undefined,
  (newValue: T | undefined) => void,
] {
  const { current: isControlled } = useRef(controlledValue !== undefined);
  const [valueState, setValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : valueState;

  const { current: _defaultValue } = React.useRef(defaultValue);

  if (process.env.NODE_ENV === "development") {
    if (isControlled !== (controlledValue !== undefined)) {
      console.error(
        [
          `A component is changing the ${
            isControlled ? "" : "un"
          }controlled ${state} state of ${name} to be ${
            isControlled ? "un" : ""
          }controlled.`,
          "Elements should not switch from uncontrolled to controlled (or vice versa).",
          `Decide between using a controlled or uncontrolled ${name} ` +
            "element for the lifetime of the component.",
          "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
          "More info: https://fb.me/react-controlled-components",
        ].join("\n"),
      );
    }

    if (!isControlled && _defaultValue !== defaultValue) {
      console.error(
        [
          `A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
            `To suppress this warning opt to use a controlled ${name}.`,
        ].join("\n"),
      );
    }
  }

  const setValueIfUncontrolled = React.useCallback(
    (newValue: T | undefined) => {
      if (!isControlled) {
        setValue(newValue);
      }
    },
    [isControlled],
  );

  return [value, setValueIfUncontrolled];
}
