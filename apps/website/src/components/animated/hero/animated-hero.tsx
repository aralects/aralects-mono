import {
  motion,
  MotionValue,
  useMotionTemplate,
  useTransform,
} from "motion/react";
import { cn } from "@repo/ui";
import { useMeasureOnce } from "src/hooks/use-measure-once";
import { useScrollContext } from "../scroll-context";
import { useMediaQuery } from "@hooks/use-media-query";

import SVGMorph from "../svg-morph";
import type React from "react";
import { aralectsEnSvgData } from "./data/aralects-en-svg";
import { aralectsArSvgData } from "./data/aralects-ar-svg";

// V2 animation ranges
const WORDS_FADE_OUT_START = 300;
const WORDS_FADE_OUT_END = 1000;
const CENTERING_START = 500;
const CENTERING_END = 1000;
const FUSION_START = 700;
const FUSION_END = 1000;
const SWITCH_START = 1100;
const TRANSFORM_START = 1800;
const TRANSFORM_END = 2200;
// const ZOOM_START = 2000;
// const ZOOM_END = 3000;
// const HIDE_START = 2250;
// const HIDE_END = 3000;

// V2 word stagger configuration (for hiding words)
const FIRST_LINE_WORDS = [
  { text: "Connecting", staggerStart: 0, staggerEnd: 0.15 },
  { text: "cultures,", staggerStart: 0.1, staggerEnd: 0.25 },
];

const THIRD_LINE_WORDS = [
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
  className,
  ...props
}: {
  scrollY: MotionValue<number>;
  horizontalOffset?: number;
} & React.ComponentProps<typeof motion.div>) => {
  const isMobile = false; //useMediaQuery("(max-width: 768px)");

  // Fusion animation values for the arabic dialect part
  const fusionProgress = useTransform(
    scrollY,
    [FUSION_START, FUSION_END],
    [0, 1],
  );
  const fadeOut = useTransform(fusionProgress, [0, 1], [1, 0]);
  const fadeIn = useTransform(fusionProgress, [0, 1], [0, 1]);
  // const bg = useTransform(
  //   scrollY,
  //   [HIDE_START, HIDE_END],
  //   ["#8262b0", "#272727"],
  // );
  // const bg2 = useTransform(
  //   scrollY,
  //   [ZOOM_START, ZOOM_END],
  //   ["#ffffff", "#272727"],
  // );

  return (
    <>
      {/* <motion.div
        className="fixed inset-0 -z-[1]"
        style={{
          backgroundColor: bg2,
          willChange: "background-color",
        }}
      /> */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          show: { opacity: 1 },
        }}
        initial="initial"
        animate="show"
        className={cn("inline-flex", className)}
        {...props}
      >
        <motion.div
          className="inline-flex items-center justify-center"
          // style={{
          //   opacity: useTransform(scrollY, [HIDE_START, HIDE_END], [1, 0]),
          // }}
        >
          {/* arabic */}
          <motion.span className="font-SpaceGrotesk overflow-hidden bg-[#8262b0] py-2 pl-2 text-white">
            {/* ara */}
            <span className="inline-block">Ara</span>
            {/* bic */}
            <motion.span
              className="inline-block whitespace-nowrap"
              style={{
                opacity: fadeOut,
                scale: fadeOut,
                width: useTransform(
                  fusionProgress,
                  [0, 1],
                  [isMobile ? 44.6172 : 71.3828125, 0],
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
            className="font-SpaceGrotesk overflow-hidden bg-[#8262b0] py-2 pr-2 text-white"
            style={{
              x: useTransform(fusionProgress, [0, 1], [8, -1]),
              marginRight: useTransform(
                scrollY,
                [CENTERING_START, CENTERING_END],
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
                width: useTransform(
                  fusionProgress,
                  [0, 1],
                  [isMobile ? 43.9219 : 70.2734, 0],
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
      </motion.div>
    </>
  );
};

export const AnimatedHero = ({ className }: { className?: string }) => {
  const { scrollY } = useScrollContext();
  // Word hiding animation progress
  const wordHideProgress = useTransform(
    scrollY,
    [WORDS_FADE_OUT_START, WORDS_FADE_OUT_END],
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
  const horizontalOffset = ((oneWidth ?? 0) - 2) / 2;

  return (
    <motion.h1
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
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
        {FIRST_LINE_WORDS.map((word, index) => (
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
          className="inline-block pr-2"
          style={{
            opacity: useTransform(wordHideProgress, [0.2, 0.35], [1, 0]),
            filter: useMotionTemplate`blur(${useTransform(wordHideProgress, [0.2, 0.35], [0, 10])}px)`,
          }}
        >
          one
        </motion.span>

        {/* arabic dialect fusion animation */}
        <span className="-mx-[70px] -my-4 inline-block translate-y-1 scale-[0.6] sm:-mx-10 sm:scale-75 md:-my-0 md:mx-0 md:scale-100 md:translate-y-0">
          <motion.span
            className="relative isolate inline-block"
            style={{
              x: useTransform(
                scrollY,
                [CENTERING_START, CENTERING_END],
                [0, -horizontalOffset],
              ),
            }}
          >
            <AralectsFusionAnimationV2
              scrollY={scrollY}
              horizontalOffset={horizontalOffset}
              className="text-5xl"
              style={{
                opacity: useTransform(
                  scrollY,
                  [SWITCH_START + 1, SWITCH_START + 2],
                  [1, 0],
                ),
              }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 z-50"
              style={{
                opacity: useTransform(
                  scrollY,
                  [SWITCH_START - 1, SWITCH_START],
                  [0, 1],
                ),
              }}
            >
              <SVGMorph
                fromSvg={aralectsEnSvgData}
                toSvg={aralectsArSvgData}
                scrollY={scrollY}
                scrollStart={TRANSFORM_START}
                scrollEnd={TRANSFORM_END}
                width={205}
                height={64}
              />
            </motion.div>
          </motion.span>
        </span>
      </motion.span>

      {/* at a time. */}
      <motion.span
        style={{
          opacity: surroundingTextOpacity,
          filter: surroundingTextBlur,
        }}
      >
        {THIRD_LINE_WORDS.map((word, index) => (
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
