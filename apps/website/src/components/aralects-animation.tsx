import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@repo/ui";
import { useMeasureOnce } from "src/hooks/use-measure-once";

// Animation sequence ranges (scroll position in pixels)
const WORDS_FADE_IN_START = 0;
const WORDS_FADE_IN_END = 1000;
const SURROUNDING_FADE_OUT_START = 1500;
const SURROUNDING_FADE_OUT_END = 2000;
const CENTERING_START = 1750;
const CENTERING_END = 2000;
const FUSION_START = 2300;
const FUSION_END = 3000;

// Word stagger configuration
const FIRST_LINE_WORDS = [
  { text: "Connecting", staggerStart: 0, staggerEnd: 0.1 },
  { text: "cultures,", staggerStart: 0.1, staggerEnd: 0.2 },
];

const THIRD_LINE_WORDS = [
  { text: "at", staggerStart: 0.5, staggerEnd: 0.6 },
  { text: "a", staggerStart: 0.6, staggerEnd: 0.7 },
  { text: "time.", staggerStart: 0.7, staggerEnd: 0.8 },
];

// Reusable animated word component
const AnimatedWord = ({
  text,
  staggerStart,
  staggerEnd,
  className,
  wordAppearProg,
  blurOverride,
  opacityOverride,
}: {
  text: string;
  staggerStart: number;
  staggerEnd: number;
  className?: string;
  wordAppearProg: any;
  blurOverride?: any;
  opacityOverride?: any;
}) => {
  const wordProg = useTransform(
    wordAppearProg,
    [staggerStart, staggerEnd],
    [0, 1],
  );
  const wordBlur = useMotionTemplate`blur(${useTransform(wordProg, [0, 1], [10, 0])}px)`;

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{
        opacity: opacityOverride ?? wordProg,
        filter: blurOverride ?? wordBlur,
      }}
    >
      {text}
    </motion.span>
  );
};

// Reusable component for the arabic dialect / aralects fusion animation
const AralectsFusionAnimation = ({
  arabicProg,
  dialectProg,
  fusionProgress,
  centerX,
}: {
  arabicProg: any;
  dialectProg: any;
  fusionProgress: any;
  centerX: any;
}) => {
  const fadeOut = useTransform(fusionProgress, [0, 1], [1, 0]);
  const fadeIn = useTransform(fusionProgress, [0, 1], [0, 1]);
  
  const [bicRef, bicDimensions] = useMeasureOnce<HTMLSpanElement>();
  const [diaRef, diaDimensions] = useMeasureOnce<HTMLSpanElement>();

  return (
    <motion.div
      className="ml-2 inline-flex items-center justify-center gap-x-2"
      style={{ x: centerX }}
    >
      {/* arabic */}
      <motion.span
        className="font-SpaceGrotesk overflow-hidden bg-[#8262b0] py-2 pl-2 text-white"
        style={{
          opacity: arabicProg,
          filter: useMotionTemplate`blur(${useTransform(
            arabicProg,
            [0, 1],
            [10, 0],
          )}px)`,
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
        className="font-SpaceGrotesk overflow-hidden bg-[#8262b0] py-2 pr-2 text-white"
        style={{
          x: useTransform(fusionProgress, [0, 1], [0, -9]),
          opacity: dialectProg,
          filter: useMotionTemplate`blur(${useTransform(
            dialectProg,
            [0, 1],
            [10, 0],
          )}px)`,
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
            width: useTransform(fusionProgress, [0, 1], [0, 25.3]),
          }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          className="inline-block whitespace-nowrap"
        >
          s
        </motion.span>
      </motion.span>
    </motion.div>
  );
};

export const AralectsAnimation = ({ className }: { className?: string }) => {
  const { scrollY: scrollYValue } = useScroll();
  const scrollY = useSpring(scrollYValue, { damping: 25, stiffness: 200 });

  // Word appearance animation progress
  const wordAppearProg = useTransform(
    scrollY,
    [WORDS_FADE_IN_START, WORDS_FADE_IN_END],
    [0, 1],
  );

  // Opacity values for the surrounding text (connecting cultures, one / at a time)
  const fadeOutProgress = useTransform(
    scrollY,
    [SURROUNDING_FADE_OUT_START, SURROUNDING_FADE_OUT_END],
    [0, 1],
  );
  const surroundingTextOpacity = useTransform(fadeOutProgress, [0, 1], [1, 0]);
  const blur = useTransform(fadeOutProgress, [0, 1], [0, 10]);
  const surroundingTextBlur = useMotionTemplate`blur(${blur}px)`;

  // Transform values for centering the "arabic dialect" part
  const [oneRef, oneDimensions] = useMeasureOnce<HTMLSpanElement>();
  const centeringProg = useTransform(
    scrollY,
    [CENTERING_START, CENTERING_END],
    [0, 1],
  );
  const centerX = useTransform(
    centeringProg,
    [0, 1],
    [0, -((oneDimensions.width ?? 0) + 8) / 2],
  );

  // Fusion animation values for the arabic dialect part
  const fusionProgress = useTransform(
    scrollY,
    [FUSION_START, FUSION_END],
    [0, 1],
  );

  // Arabic/dialect animation values
  const arabicProg = useTransform(wordAppearProg, [0.3, 0.4], [0, 1]);
  const dialectProg = useTransform(wordAppearProg, [0.4, 0.5], [0, 1]);

  return (
    <motion.h1
      className={cn(
        "font-Melodrama md:font-UnboundedRegular relative isolate inline-block select-none font-semibold",
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
          <AnimatedWord
            key={index}
            text={word.text}
            staggerStart={word.staggerStart}
            staggerEnd={word.staggerEnd}
            wordAppearProg={wordAppearProg}
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
            opacity: useTransform(
              [
                useTransform(wordAppearProg, [0.2, 0.3], [0, 1]),
                surroundingTextOpacity,
              ] as const,
              ([progress, opacity]) =>
                (progress as number) * (opacity as number),
            ),
            filter: useMotionTemplate`blur(${useTransform(
              [useTransform(wordAppearProg, [0.2, 0.3], [0, 1]), blur] as const,
              ([progress, blurValue]) =>
                (progress as number) === 1
                  ? blurValue
                  : 10 * (1 - (progress as number)),
            )}px)`,
          }}
        >
          one
        </motion.span>

        {/* arabic dialect fusion animation */}
        <AralectsFusionAnimation
          arabicProg={arabicProg}
          dialectProg={dialectProg}
          fusionProgress={fusionProgress}
          centerX={centerX}
        />
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
            wordAppearProg={wordAppearProg}
            className={index > 0 ? "ml-2 md:ml-4" : ""}
          />
        ))}
      </motion.span>
    </motion.h1>
  );
};
