import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@repo/ui";
import { useMeasureOnce } from "@/hooks/use-measure-once";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LargeBlob } from "@/assets/large-blob";
import { ScrollContextProvider, useScrollContext } from "./scroll-context";

import { useRef } from "react";
import IllustrationTransition from "./illutration-transition";

import { AralectsFusion } from "./aralects-fusion";
import { FloatingPlane } from "./floating-plane";
import { HomingCursorProvider } from "./homing-cursor";
import TextScrollReveal from "./text-scroll-reveal";

const BLOBS_DELAY = 0.3;
const WORDS_FADE_OUT_START = 120;
const WORDS_FADE_OUT_END = 1200;
const CENTERING_START = 600;
const CENTERING_END = 1200;
const FUSION_START = 840;
const FUSION_END = 1200;
const SWITCH_START = 1200;
const TRANSFORM_START = 1680;
const TRANSFORM_END = 2400;
const HIDE_START = 1680;
const HIDE_END = 1920;
const ZOOM_START = 1440;
const ZOOM_END = 4400;
const BLUR_START = 3300;
const BLUR_END = 5500;
const TYPEWRITER_START = 3600;
const TYPEWRITER_END = 5150;
const TOTAL_HEIGHT = 6500;
const TOTAL_HEIGHT_MOBILE = 6000;

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

// starts visible and hides on scroll
const AnimatedWord = ({
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

const FloatingEllipses = (props: HTMLMotionProps<"div">) => {
  return (
    <FloatingPlane zIndex={0} movementFactor={60} {...props}>
      <motion.div
        className="absolute right-1/4 top-20 md:top-40 2xl:right-1/3"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img
          src="/img/hero/ellipse-2.png"
          className="scale-50 md:opacity-100"
        />
      </motion.div>
      <motion.div
        className="absolute left-[10%] top-[600px] hidden 2xl:block"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img
          src="/img/hero/ellipse-1.png"
          className="scale-50 opacity-50 md:opacity-100"
        />
      </motion.div>
      <motion.div
        className="absolute left-1/4 top-[1200px]"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img
          src="/img/hero/ellipse-1.png"
          className="rotate-[60deg] scale-50 opacity-50 md:opacity-100"
        />
      </motion.div>
      <motion.div
        className="absolute right-1/4 top-[1400px] hidden md:block"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img
          src="/img/hero/ellipse-2.png"
          className="rotate-[70deg] scale-50 opacity-50 md:opacity-100"
        />
      </motion.div>
      <motion.div
        className="absolute left-1/3 top-[900px] 2xl:left-[unset] 2xl:right-1/3"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img
          src="/img/hero/ellipse-2.png"
          className="rotate-45 scale-50 opacity-50 md:opacity-100"
        />
      </motion.div>
    </FloatingPlane>
  );
};

const FloatingBlobs = (props: HTMLMotionProps<"div">) => {
  return (
    <FloatingPlane
      zIndex={0}
      movementFactor={40}
      // className="blur-sm"
      {...props}
    >
      <motion.div
        className="absolute left-1/4 top-10 hidden md:block"
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img src="/img/hero/blob-medium.png" className="rotate-45 scale-75" />
      </motion.div>
      <motion.div
        className="absolute -right-14 top-96 md:right-20 md:top-60 2xl:right-[15%] 2xl:top-[480px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img src="/img/hero/blob-small.png" className="scale-[80%]" />
      </motion.div>
      <motion.div
        className="absolute -left-12 top-[9%] md:left-[unset] md:right-80 md:top-[900px] 2xl:right-1/3 2xl:top-[1100px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img
          src="/img/hero/blob-medium.png"
          className="scale-[80%] md:scale-90"
        />
      </motion.div>
      <motion.div
        className="absolute left-1/3 top-[1600px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img src="/img/hero/blob-medium.png" className="rotate-90 scale-75" />
      </motion.div>
    </FloatingPlane>
  );
};

const LargeFloatingBlobs = (props: HTMLMotionProps<"div">) => {
  return (
    <FloatingPlane
      zIndex={0}
      movementFactor={20}
      // className="blur-[8px]"
      {...props}
    >
      <motion.div
        className="absolute left-20 top-[700px] 2xl:left-1/4 2xl:top-[820px]"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <LargeBlob className="opacity-15 sm:scale-150 xl:scale-[200%]" />
      </motion.div>
      <motion.div
        className="absolute left-[10%] top-[1400px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img src="/img/hero/blob-small.png" className="rotate-[145deg]" />
      </motion.div>
      <motion.div
        className="absolute -left-20 top-[1750px] sm:left-20 sm:top-[1700px] 2xl:left-[unset] 2xl:right-1/3 2xl:top-[1820px]"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <LargeBlob className="rotate-45 opacity-15 sm:scale-125" />
      </motion.div>
      <motion.div
        className="absolute right-[15%] top-[2000px] scale-90 md:top-[1800px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: BLOBS_DELAY, type: "spring" }}
      >
        <img src="/img/hero/blob-small.png" className="rotate-[105deg]" />
      </motion.div>
    </FloatingPlane>
  );
};

const getScale = (isMobile: boolean, isTablet: boolean) => {
  if (isMobile) return 3;
  if (isTablet) return 4;
  return 6;
};

const getTranslationFactor = (isMobile: boolean, isTablet: boolean) => {
  if (isMobile) return -40;
  if (isTablet) return -20;
  return 0;
};

const AnimatedHeroInner = () => {
  const { scrollY } = useScrollContext();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const wordHideProgress = useTransform(
    scrollY,
    [WORDS_FADE_OUT_START, WORDS_FADE_OUT_END],
    [0, 1],
  );

  const surroundingTextBlur = useMotionTemplate`blur(${useTransform(wordHideProgress, [0.7, 1], [0, 10])}px)`;
  const surroundingTextOpacity = useTransform(
    wordHideProgress,
    [0.7, 1],
    [1, 0],
  );

  const [oneRef, { width: oneWidth }] = useMeasureOnce<HTMLSpanElement>();
  const horizontalOffset =
    ((oneWidth ?? 0) - getTranslationFactor(isMobile, isTablet)) / 2;

  const aralectsFusionRef = useRef<HTMLDivElement>(null);
  const illustrationTransitionRef = useRef<HTMLDivElement>(null);
  const switchted = useRef(false);

  const typewriterState = useMotionValue<"hidden" | "visible">("hidden");

  const bgOpacity = useTransform(
    scrollY,
    [FUSION_START, TRANSFORM_END],
    [0, 1],
  );

  // switch between aralects fusion and illustration transition
  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > SWITCH_START && !switchted.current) {
      aralectsFusionRef.current?.classList.add("invisible");
      illustrationTransitionRef.current?.classList.remove("hidden");
      switchted.current = true;
    } else if (value < SWITCH_START && switchted.current) {
      aralectsFusionRef.current?.classList.remove("invisible");
      illustrationTransitionRef.current?.classList.add("hidden");
      switchted.current = false;
    } else if (value > TYPEWRITER_START) {
      typewriterState.set("visible");
    } else {
      typewriterState.set("hidden");
    }
  });

  return (
    <div className="relative isolate">
      <div
        className="w-full"
        style={{
          height: isMobile ? TOTAL_HEIGHT_MOBILE : TOTAL_HEIGHT,
        }}
      >
        {/* -- blobs -- */}
        <FloatingEllipses />
        <FloatingBlobs />
        <LargeFloatingBlobs />

        {/* -- background -- */}
        <motion.div
          className="absolute inset-0 bg-[#272727]"
          style={{ opacity: bgOpacity }}
        />

        {/* -- content -- */}
        <div className="sticky top-0 z-10 flex h-svh items-center justify-center overflow-hidden">
          {/* connecting cultures, one arabic dialect at a time */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className={cn(
              "font-LivvicMedium relative isolate inline-block font-semibold",
              "text-center text-2xl text-[#393939] sm:text-3xl md:text-5xl xl:scale-125",
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
                <AnimatedWord
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

              {/* arabic dialect fusion animation + illustration */}
              <motion.span className="-mx-[70px] -my-4 inline-block translate-y-1 scale-[0.6] sm:-mx-10 sm:scale-75 md:-my-0 md:mx-0 md:translate-y-0 md:scale-100">
                <motion.span
                  className="relative isolate inline-block"
                  style={{
                    opacity: useTransform(
                      scrollY,
                      [BLUR_START, BLUR_END],
                      [1, 0.3],
                    ),
                    filter: useMotionTemplate`blur(${useTransform(
                      scrollY,
                      [BLUR_START, BLUR_END],
                      [0, 14],
                    )}px)`,
                    scale: useTransform(
                      scrollY,
                      [ZOOM_START, ZOOM_END],
                      [1, getScale(isMobile, isTablet)],
                    ),
                    x: useTransform(
                      scrollY,
                      [CENTERING_START, CENTERING_END],
                      [0, -horizontalOffset],
                    ),
                  }}
                >
                  {/* arabic + dialects = aralects */}
                  <AralectsFusion
                    ref={aralectsFusionRef}
                    scrollY={scrollY}
                    className="text-5xl"
                    fusionStart={FUSION_START}
                    fusionEnd={FUSION_END}
                    centeringStart={CENTERING_START}
                    centeringEnd={CENTERING_END}
                  />

                  {/* illustration */}
                  <IllustrationTransition
                    ref={illustrationTransitionRef}
                    startScroll={TRANSFORM_START}
                    endScroll={TRANSFORM_END}
                    hideStart={HIDE_START}
                    hideEnd={HIDE_END}
                    className="font-space absolute inset-0 z-50 hidden p-2 text-5xl font-semibold text-white"
                  />
                </motion.span>
              </motion.span>
            </motion.span>

            {/* at a time. */}
            <motion.span
              style={{
                opacity: surroundingTextOpacity,
                filter: surroundingTextBlur,
              }}
            >
              {THIRD_LINE_WORDS.map((word, index) => (
                <AnimatedWord
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

          <motion.span
            className="absolute inset-0 flex items-center justify-center p-8 md:p-24"
            style={{
              opacity: useTransform(
                scrollY,
                [TYPEWRITER_START - 50, TYPEWRITER_START + 50],
                [0, 1],
              ),
            }}
          >
            <TextScrollReveal
              startScroll={TYPEWRITER_START}
              endScroll={TYPEWRITER_END}
              className="font-LivvicMedium max-w-[1400px] text-xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              <span className="text-glow-xl text-purple-200">Aralects</span>{" "}
              transforms the way Arabic is learned, spoken, and understood.
              Empower your language journey with{" "}
              <span className="text-glow-xl text-purple-200">personalized</span>{" "}
              experiences, designed for real-world Arabic learning.
            </TextScrollReveal>
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export const AnimatedHero = () => {
  return (
    <ScrollContextProvider>
      <HomingCursorProvider>
        <AnimatedHeroInner />
      </HomingCursorProvider>
    </ScrollContextProvider>
  );
};
