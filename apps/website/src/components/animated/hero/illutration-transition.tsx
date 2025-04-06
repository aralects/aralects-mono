import {
  useTransform,
  motion,
  type MotionValue,
  type HTMLMotionProps,
  useMotionTemplate,
} from "motion/react";
import React, { forwardRef, useMemo, type CSSProperties } from "react";
import { useScrollContext } from "../scroll-context";
import { illustrationTemplate } from "./illustration-template";
import { cn } from "~/lib/utils";

const input = "Aralects".split("");
const output = illustrationTemplate;

type Props = {
  startScroll: number;
  endScroll: number;
  hideStart: number;
  hideEnd: number;
  elementClassName?: string;
} & HTMLMotionProps<"div">;

const translateAmount = -25; // Pixels to move up/down
const maxBlur = 20; // Max blur in pixels
const staggerDelay = 50;

type IllustrationTransitionItemProps = {
  input: React.ReactNode;
  output: React.ReactNode;
  scrollY: MotionValue<number>;
  startScroll: number;
  endScroll: number;
  index: number;
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const IllustrationTransitionItem = ({
  input,
  output,
  scrollY,
  startScroll,
  endScroll,
  index,
  style,
  className,
  ...props
}: IllustrationTransitionItemProps) => {
  // Calculate staggered start and end points based on index
  const itemStartScroll = startScroll + index * staggerDelay;
  const itemQuarterScroll = itemStartScroll + (endScroll - startScroll) / 4;
  const itemMidScroll = itemStartScroll + (endScroll - startScroll) / 2;
  const itemThreeQuarterScroll = itemMidScroll + (endScroll - startScroll) / 4;
  const itemEndScroll = endScroll + index * staggerDelay;

  // Transform values for animation
  const translateY = useTransform(
    scrollY,
    [
      itemStartScroll,
      itemQuarterScroll,
      itemMidScroll,
      itemThreeQuarterScroll,
      itemEndScroll,
    ],
    [0, translateAmount, 0, translateAmount * -1, 0],
  );

  const blur = useTransform(
    scrollY,
    [itemStartScroll, itemMidScroll, itemEndScroll],
    [0, maxBlur, 0],
  );

  const inputOpacity = useTransform(
    scrollY,
    [itemStartScroll, itemEndScroll],
    [1, 0],
  );

  const outputOpacity = useTransform(
    scrollY,
    [itemMidScroll, itemEndScroll],
    [0, 1],
  );

  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <motion.div
        className="absolute inset-0 m-auto inline-block"
        style={{
          y: translateY,
          filter: blurFilter,
          opacity: inputOpacity,
        }}
      >
        {input}
      </motion.div>

      <motion.div
        className="absolute inset-0 m-auto inline-block"
        style={{
          y: translateY,
          filter: blurFilter,
          opacity: outputOpacity,
          ...style,
        }}
      >
        {output}
      </motion.div>

      {/* Invisible spacer element to maintain layout space */}
      <div className="invisible inline-block">{input}</div>
    </div>
  );
};

const IllustrationTransition = forwardRef<HTMLDivElement, Props>(
  (
    {
      startScroll,
      endScroll,
      className,
      hideEnd,
      hideStart,
      elementClassName,
      ...props
    },
    ref,
  ) => {
    const { scrollY } = useScrollContext();

    const items = useMemo(
      () =>
        input.map((inputItem, index) => {
          const { svg, style } = output[index] ?? {};

          return (
            <IllustrationTransitionItem
              key={index}
              input={inputItem}
              output={svg}
              scrollY={scrollY}
              startScroll={startScroll}
              endScroll={endScroll}
              index={index}
              style={style}
              className={elementClassName}
            />
          );
        }),
      [input, output, scrollY, startScroll, endScroll],
    );

    const opacity = useTransform(scrollY, [hideStart, hideEnd], [1, 0]);
    const blur = useTransform(scrollY, [hideStart, hideEnd], [0, maxBlur / 2]);
    const blurFilter = useMotionTemplate`blur(${blur}px)`;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative inline whitespace-nowrap tracking-[-0.3px]",
          className,
        )}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-[#8262b0]"
          style={{
            opacity,
            filter: blurFilter,
          }}
        />
        {items}
      </motion.div>
    );
  },
);

IllustrationTransition.displayName = "IllustrationTransition";

export default IllustrationTransition;
