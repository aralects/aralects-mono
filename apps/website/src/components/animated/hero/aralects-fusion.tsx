import { motion, useTransform, type MotionValue } from "motion/react";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const AralectsFusion = forwardRef<
  HTMLDivElement,
  {
    scrollY: MotionValue<number>;
    fusionStart: number;
    fusionEnd: number;
    centeringStart: number;
    centeringEnd: number;
  } & ComponentProps<typeof motion.div>
>(
  (
    {
      scrollY,
      className,
      fusionStart,
      fusionEnd,
      centeringStart,
      centeringEnd,
      ...props
    },
    ref,
  ) => {
    // Fusion animation values for the arabic dialect part
    const fusionProgress = useTransform(
      scrollY,
      [fusionStart, fusionEnd],
      [0, 1],
    );
    const fadeOut = useTransform(fusionProgress, [0, 1], [1, 0]);
    const fadeIn = useTransform(fusionProgress, [0, 1], [0, 1]);

    return (
      <motion.div
        ref={ref}
        variants={{
          initial: { opacity: 0 },
          show: { opacity: 1 },
        }}
        initial="initial"
        animate="show"
        className={cn("font-space inline-flex", className)}
        {...props}
      >
        <motion.div
          className="inline-flex items-center justify-center"
          // style={{
          //   opacity: useTransform(scrollY, [HIDE_START, HIDE_END], [1, 0]),
          // }}
        >
          {/* arabic */}
          <motion.span className="overflow-hidden bg-[#8262b0] py-2 pl-2 text-white">
            {/* ara */}
            <span className="inline-block">Ara</span>
            {/* bic */}
            <motion.span
              className="inline-block whitespace-nowrap"
              style={{
                opacity: fadeOut,
                scale: fadeOut,
                width: useTransform(fusionProgress, [0, 1], [71.3828125, 0]),
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            >
              bic
            </motion.span>
            {/* variable padding */}
            <motion.span
              className="inline-block h-full"
              style={{
                opacity: fadeOut,
                scale: fadeOut,
                width: useTransform(fusionProgress, [0, 1], [8, 0]),
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            />
          </motion.span>
          {/* dialects */}
          <motion.span
            className="overflow-hidden bg-[#8262b0] py-2 pr-2 text-white"
            style={{
              x: useTransform(fusionProgress, [0, 1], [8, -0.3]),
              marginRight: useTransform(
                scrollY,
                [centeringStart, centeringEnd],
                [8, 0],
              ),
            }}
          >
            {/* variable padding */}
            <motion.span
              className="inline-block h-full"
              style={{
                opacity: fadeOut,
                scale: fadeOut,
                width: useTransform(fusionProgress, [0, 1], [8, 0]),
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            />
            {/* dia */}
            <motion.span
              className="inline-block whitespace-nowrap"
              style={{
                opacity: fadeOut,
                scale: fadeOut,
                width: useTransform(fusionProgress, [0, 1], [70.2734, 0]),
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            >
              dia
            </motion.span>
            {/* lect */}
            <span className="inline-block">lect</span>
            {/* s */}
            <motion.span
              style={{
                opacity: fadeIn,
                scale: fadeIn,
                width: useTransform(fusionProgress, [0, 1], [0, 25.3]),
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="inline-block whitespace-nowrap"
            >
              s
            </motion.span>
          </motion.span>
        </motion.div>
      </motion.div>
    );
  },
);
