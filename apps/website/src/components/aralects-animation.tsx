import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@repo/ui";
import { useMeasureOnce } from "src/hooks/use-measure-once";
import { useScrollContext } from "./scroll-context";
import { useMediaQuery } from "@hooks/use-media-query";
import useElementSize from "@hooks/use-element-size";

// V2 animation ranges
const V2_WORDS_FADE_OUT_START = 300;
const V2_WORDS_FADE_OUT_END = 1000;
const V2_CENTERING_START = 450;
const V2_CENTERING_END = 825;
const V2_FUSION_START = 1200;
const V2_FUSION_END = 1500;
const V2_ZOOM_START = 2000;
const V2_ZOOM_END = 3000;
const V2_HIDE_START = 2250;
const V2_HIDE_END = 3000;

// V2 word stagger configuration (for hiding words)
const V2_FIRST_LINE_WORDS = [
  { text: "Connecting", staggerStart: 0, staggerEnd: 0.15 },
  { text: "cultures,", staggerStart: 0.1, staggerEnd: 0.25 },
];

const V2_THIRD_LINE_WORDS = [
  { text: "at", staggerStart: 0.3, staggerEnd: 0.45 },
  { text: "a", staggerStart: 0.4, staggerEnd: 0.55 },
  { text: "time.", staggerStart: 0.5, staggerEnd: 0.65 },
];

// Reusable animated word component

// V2 version of AnimatedWord that starts visible and hides on scroll
const AnimatedWordV2 = ({
  text,
  staggerStart,
  staggerEnd,
  className,
  wordHideProgress,
}: {
  text: string;
  staggerStart: number;
  staggerEnd: number;
  className?: string;
  wordHideProgress: MotionValue<number>;
}) => {
  const wordProg = useTransform(
    wordHideProgress,
    [staggerStart, staggerEnd],
    [1, 0],
  );
  const wordBlur = useMotionTemplate`blur(${useTransform(wordProg, [0, 1], [10, 0])}px)`;

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{
        opacity: wordProg,
        filter: wordBlur,
      }}
    >
      {text}
    </motion.span>
  );
};

// arabic dialect / aralects fusion animation

// V2 version of the fusion animation that works with the reversed animation sequence
const AralectsFusionAnimationV2 = ({
  scrollY,
  horizontalOffset = 0,
}: {
  scrollY: MotionValue<number>;
  horizontalOffset?: number;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fusion animation values for the arabic dialect part
  const fusionProgress = useTransform(
    scrollY,
    [V2_FUSION_START, V2_FUSION_END],
    [0, 1],
  );
  const fadeOut = useTransform(fusionProgress, [0, 1], [1, 0]);
  const fadeIn = useTransform(fusionProgress, [0, 1], [0, 1]);
  const bg = useTransform(
    scrollY,
    [V2_HIDE_START, V2_HIDE_END],
    ["#8262b0", "#272727"],
  );

  const [containerRef, containerWidth, containerHeight] =
    useElementSize<HTMLDivElement>();
  const [bicRef, bicDimensions] = useMeasureOnce<HTMLSpanElement>();
  const [diaRef, diaDimensions] = useMeasureOnce<HTMLSpanElement>();

  return (
    <>
      <motion.div
        className="fixed inset-0 -z-[1] m-auto"
        style={{
          backgroundColor: bg,
          width: containerWidth.get(),
          height: containerHeight.get(),
          scale: useTransform(scrollY, [V2_ZOOM_START, V2_ZOOM_END], [0, 50]),
          willChange: "transform, width, height, background-color",
        }}
      />
      <motion.div
        ref={containerRef}
        className="inline-flex items-center justify-center gap-x-2 pl-2"
        style={{
          opacity: useTransform(scrollY, [V2_HIDE_START, V2_HIDE_END], [1, 0]),
          x: useTransform(
            scrollY,
            [V2_CENTERING_START, V2_CENTERING_END],
            [0, -horizontalOffset],
          ),
        }}
      >
        {/* arabic */}
        <motion.span
          className="font-SpaceGrotesk overflow-hidden py-2 pl-2 text-white"
          style={{
            backgroundColor: bg,
          }}
        >
          {/* ara */}
          <span className="inline-block">Ara</span>
          {/* bic */}
          <motion.span
            ref={bicRef}
            className="inline-block whitespace-nowrap"
            style={{
              opacity: fadeOut,
              scale: fadeOut,
              width: useTransform(
                fusionProgress,
                [0, 1],
                [bicDimensions.width, 0],
              ),
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
          className="font-SpaceGrotesk overflow-hidden py-2 pr-2 text-white"
          style={{
            x: useTransform(fusionProgress, [0, 1], [0, -9]),
            backgroundColor: bg,
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
            ref={diaRef}
            className="inline-block whitespace-nowrap"
            style={{
              opacity: fadeOut,
              scale: fadeOut,
              width: useTransform(
                fusionProgress,
                [0, 1],
                [diaDimensions.width, 0],
              ),
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
              width: useTransform(
                fusionProgress,
                [0, 1],
                [0, isMobile ? 14 : 25.3],
              ),
            }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="inline-block whitespace-nowrap"
          >
            s
          </motion.span>
        </motion.span>
      </motion.div>
    </>
  );
};

// V2 Animation - all text visible initially, then hides on scroll
export const AralectsAnimationV2 = ({ className }: { className?: string }) => {
  const { scrollY } = useScrollContext();
  // Word hiding animation progress
  const wordHideProgress = useTransform(
    scrollY,
    [V2_WORDS_FADE_OUT_START, V2_WORDS_FADE_OUT_END],
    [0, 1],
  );
  const blur = useTransform(wordHideProgress, [0.7, 1], [0, 10]);
  const surroundingTextBlur = useMotionTemplate`blur(${blur}px)`;
  const surroundingTextOpacity = useTransform(
    wordHideProgress,
    [0.7, 1],
    [1, 0],
  );

  const [oneRef, { width: oneWidth }] = useMeasureOnce<HTMLSpanElement>();
  const horizontalOffset = ((oneWidth ?? 0) - 8) / 2;

  return (
    <motion.h1
      className={cn(
        "font-UnboundedRegular relative isolate inline-block font-semibold",
        className,
      )}
    >
      {/* connecting cultures, */}
      <motion.span
        className="block"
        style={{
          opacity: surroundingTextOpacity,
          filter: surroundingTextBlur,
        }}
      >
        {V2_FIRST_LINE_WORDS.map((word, index) => (
          <AnimatedWordV2
            key={index}
            text={word.text}
            staggerStart={word.staggerStart}
            staggerEnd={word.staggerEnd}
            wordHideProgress={wordHideProgress}
            className={index > 0 ? "ml-2 md:ml-4" : ""}
          />
        ))}
      </motion.span>

      {/* one arabic dialect */}
      <motion.span className="block py-2">
        {/* one */}
        <motion.span
          ref={oneRef}
          className="inline-block"
          style={{
            opacity: useTransform(wordHideProgress, [0.2, 0.35], [1, 0]),
            filter: useMotionTemplate`blur(${useTransform(wordHideProgress, [0.2, 0.35], [0, 10])}px)`,
          }}
        >
          one
        </motion.span>

        {/* arabic dialect fusion animation */}
        <AralectsFusionAnimationV2
          scrollY={scrollY}
          horizontalOffset={horizontalOffset}
        />
      </motion.span>

      {/* at a time. */}
      <motion.span
        style={{
          opacity: surroundingTextOpacity,
          filter: surroundingTextBlur,
        }}
      >
        {V2_THIRD_LINE_WORDS.map((word, index) => (
          <AnimatedWordV2
            key={index}
            text={word.text}
            staggerStart={word.staggerStart}
            staggerEnd={word.staggerEnd}
            wordHideProgress={wordHideProgress}
            className={index > 0 ? "ml-2 md:ml-4" : ""}
          />
        ))}
      </motion.span>
    </motion.h1>
  );
};
