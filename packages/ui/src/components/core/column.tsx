import React, { Fragment } from "react";
import clsx from "clsx";
import { PropsOf } from "~/lib/utils";
import { Separator } from "./separator";

export type ColumnProps = PropsOf<HTMLDivElement>;

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("ui-flex ui-flex-col", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Column.displayName = "Column";

const ColumnWithDividers = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("ui-flex ui-flex-col", className)}
        {...props}
      >
        {React.Children.toArray(children).map((child, index, array) => (
          <Fragment key={index}>
            {child}
            {index < array.length - 1 ? <Separator /> : null}
          </Fragment>
        ))}
      </div>
    );
  },
);
ColumnWithDividers.displayName = "ColumnWithDividers";

export { Column, ColumnWithDividers };
