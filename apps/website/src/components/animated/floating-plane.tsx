import { motion, useTransform, type HTMLMotionProps } from "motion/react";
import { cn } from "@repo/ui";
import { useHomingCursor } from "./homing-cursor";

export const FloatingPlane = ({
  zIndex,
  movementFactor,
  children,
  className,
  style,
  ...props
}: {
  zIndex: number;
  movementFactor: number;
} & HTMLMotionProps<"div">) => {
  const { mouseX, mouseY } = useHomingCursor();
  const x = useTransform(mouseX, (latest) => latest * movementFactor);
  const y = useTransform(mouseY, (latest) => latest * movementFactor);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* nested to prevent overflow */}
      <motion.div
        className={cn("absolute inset-0", className)}
        style={{ zIndex, x, y, ...style }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};
