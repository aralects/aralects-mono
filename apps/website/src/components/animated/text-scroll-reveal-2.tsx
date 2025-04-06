import { cn } from "@repo/ui";
import {
  useTransform,
  motion,
  MotionValue,
  useMotionTemplate,
} from "motion/react";
import { useScrollContext } from "./scroll-context";

export default function TextScrollReveal2({
  paragraph,
  className,
  wordClassName,
  startScroll,
  endScroll,
  startHideScroll,
  endHideScroll,
}: {
  paragraph: string;
  className?: string;
  wordClassName?: string;
  startScroll: number;
  endScroll: number;
  startHideScroll: number;
  endHideScroll: number;
}) {
  const { scrollY } = useScrollContext();
  const words = paragraph.split(" ");

  const scrollYProgress = useTransform(
    scrollY,
    [startScroll, endScroll],
    [0, 1],
  );

  const hideScrollYProgress = useTransform(
    scrollY,
    [startHideScroll, endHideScroll],
    [0, 1],
  );

  return (
    <p className={cn("relative w-full break-words", className)}>
      {words.map((word, i) => {
        // Calculate sequential ranges for both entry and exit
        // Each word gets a proportional segment of the 0-1 range
        const wordRangeStart = i / words.length;
        const wordRangeEnd = (i + 1) / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            hideProgress={hideScrollYProgress}
            appearRange={[wordRangeStart, wordRangeEnd]}
            disappearRange={[wordRangeStart, wordRangeEnd]}
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
  hideProgress,
  appearRange,
  disappearRange,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  hideProgress: MotionValue<number>;
  appearRange: [number, number];
  disappearRange: [number, number];
  className?: string;
}) => {
  // For revealing: transform from 0 to 1 across the word's appear range
  const appearOpacity = useTransform(progress, appearRange, [0, 1]);
  const appearBlur = useTransform(progress, appearRange, [10, 0]);
  
  // For hiding: transform from 1 to 0 across the word's disappear range
  const disappearOpacity = useTransform(hideProgress, disappearRange, [1, 0]);
  const disappearBlur = useTransform(hideProgress, disappearRange, [0, 10]);
  
  // Combine the appear and disappear effects
  const opacity = useTransform<[number, number], number>(
    [appearOpacity, disappearOpacity] as unknown as MotionValue<[number, number]>,
    ([appear, disappear]) => Math.min(appear, disappear)
  );
  
  const blur = useTransform<[number, number], number>(
    [appearBlur, disappearBlur] as unknown as MotionValue<[number, number]>, 
    ([appear, disappear]) => Math.max(appear, disappear)
  );
  
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <span className={cn("inline-block mr-1 xl:mr-4", className)}>
      <motion.span style={{ filter: blurFilter, opacity }}>
        {children}
      </motion.span>
    </span>
  );
};
