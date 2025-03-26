import React, { useRef } from "react";
import { cn } from "@repo/ui";
import { useTransform, motion, MotionValue, useScroll } from "motion/react";
import type { UseScrollOptions } from "motion/react";
export default function TextScrollReveal({
  paragraph,
  className,
  wordClassName,
  invisible,
  offset = ["start 0.9", "start 0.25"],
}: {
  paragraph: string;
  className?: string;
  wordClassName?: string;
  invisible?: boolean;
  offset?: UseScrollOptions["offset"];
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  const words = paragraph.split(" ");

  return (
    <p ref={containerRef} className={cn("relative", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            className={wordClassName}
            invisible={invisible}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({
  children,
  progress,
  range,
  className,
  invisible,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  invisible?: boolean;
}) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className={cn("relative mr-1 whitespace-nowrap", className)}>
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;

        return (
          <Char
            key={`c_${i}`}
            progress={progress}
            range={[start, end]}
            invisible={invisible}
          >
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({
  children,
  progress,
  range,
  invisible,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  invisible?: boolean;
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="inline-flex">
      <span className={cn("absolute", invisible ? "opacity-0" : "opacity-10")}>
        {children}
      </span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
