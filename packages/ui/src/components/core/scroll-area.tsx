import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { motion, useScroll, useTransform } from "motion/react";

import { cn } from "~/lib/utils";
import clsx from "clsx";

type ScrollAreaProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
>;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const FancyScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps & { orientation?: "horizontal" | "vertical" }
>(({ children, className, orientation = "vertical", ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const isHorizontal = orientation === "horizontal";

  const { scrollXProgress, scrollX, scrollYProgress, scrollY } = useScroll({
    container: scrollContainerRef,
    axis: isHorizontal ? "x" : "y",
  });
  const scrollProgress = isHorizontal ? scrollXProgress : scrollYProgress;
  const scroll = isHorizontal ? scrollX : scrollY;

  const leftTranslate = useTransform(scrollProgress, [0, 0.05], [-100, -1], {
    mixer(from, to) {
      return (progress) => {
        if (scroll.get() === 0) {
          return "-100%";
        }
        return lerp(from, to, progress) + "%";
      };
    },
  });
  const rightTranslate = useTransform(
    scrollProgress,
    [0.95, 1],
    ["1%", "100%"],
  );

  return (
    <ScrollArea
      className={cn("relative", isHorizontal ? "h-full" : "w-full")}
      {...props}
      ref={ref}
    >
      <div
        className={cn(
          "whitespace-nowrap",
          isHorizontal ? "h-full overflow-x-auto" : "w-full overflow-y-auto",
          className,
        )}
        ref={scrollContainerRef}
      >
        {children}
      </div>
      <motion.div
        className={clsx(
          "from-background pointer-events-none absolute z-10 to-transparent",
          isHorizontal
            ? "left-0 top-0 h-full w-10 bg-gradient-to-r"
            : "left-0 top-0 h-10 w-full bg-gradient-to-b",
        )}
        style={{
          [isHorizontal ? "translateX" : "translateY"]: leftTranslate,
        }}
      />
      <motion.div
        className={clsx(
          "from-background pointer-events-none absolute z-10 to-transparent",
          isHorizontal
            ? "right-0 top-0 h-full w-10 bg-gradient-to-l"
            : "bottom-0 right-0 h-10 w-full bg-gradient-to-t",
        )}
        style={{
          [isHorizontal ? "translateX" : "translateY"]: rightTranslate,
        }}
      />
    </ScrollArea>
  );
});

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className="h-full w-full rounded-[inherit]"
      ref={ref}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, FancyScrollArea, ScrollBar };
