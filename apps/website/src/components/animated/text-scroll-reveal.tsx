import { cn } from "@repo/ui";
import {
  useTransform,
  motion,
  MotionValue,
  useMotionTemplate,
} from "motion/react";
import { useScrollContext } from "./scroll-context";

export default function TextScrollReveal({
  paragraph,
  className,
  wordClassName,
  startScroll,
  endScroll,
}: {
  paragraph: string;
  className?: string;
  wordClassName?: string;
  startScroll: number;
  endScroll: number;
}) {
  const { scrollY } = useScrollContext();
  const words = paragraph.split(" ");

  const scrollYProgress = useTransform(
    scrollY,
    [startScroll, endScroll],
    [0, 1],
  );

  return (
    <p className={cn("relative", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            className={wordClassName}
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
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className={cn("relative mr-1 whitespace-nowrap xl:mr-4", className)}>
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;

        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
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
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [10, 0]);
  const x = useTransform(progress, range, [10, 0]);
  const y = useTransform(progress, range, [-15, 0]);
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <span className="inline-flex">
      <motion.span style={{ filter: blurFilter, opacity, x, y }}>
        {children}
      </motion.span>
    </span>
  );
};
