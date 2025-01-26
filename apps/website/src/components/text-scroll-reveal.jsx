import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@repo/ui";

export default function TextScrollReveal({
  paragraph,
  offset,
  className,
  wordClassName,
  invisible,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
    layoutEffect: false,
  });

  const words = paragraph.split(" ");
  return (
    <p ref={containerRef} className={cn("relative flex flex-wrap", className)}>
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

const Word = ({ children, progress, range, className, invisible }) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <span className={cn("relative mr-1", className)}>
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

const Char = ({ children, progress, range, invisible }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span>
      <span className={cn("absolute", invisible ? "opacity-0" : "opacity-10")}>
        {children}
      </span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
