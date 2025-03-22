import {
  motion,
  useMotionTemplate,
  useScroll,
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

export const AralectsAnimation = ({ className }: { className?: string }) => {
  const { scrollY } = useScroll();

  // Word appearance animation progress
  const wordAppearProg = useTransform(
    scrollY,
    [WORDS_FADE_IN_START, WORDS_FADE_IN_END],
    [0, 1],
  );

  // Individual word progress values with stagger
  const connectingProg = useTransform(wordAppearProg, [0, 0.1], [0, 1]);
  const connectingBlur = useMotionTemplate`blur(${useTransform(connectingProg, [0, 1], [10, 0])}px)`;

  const culturesProg = useTransform(wordAppearProg, [0.1, 0.2], [0, 1]);
  const culturesBlur = useMotionTemplate`blur(${useTransform(culturesProg, [0, 1], [10, 0])}px)`;

  const oneProg = useTransform(wordAppearProg, [0.2, 0.3], [0, 1]);
  const arabicProg = useTransform(wordAppearProg, [0.3, 0.4], [0, 1]);
  const dialectProg = useTransform(wordAppearProg, [0.4, 0.5], [0, 1]);
  const atProg = useTransform(wordAppearProg, [0.5, 0.6], [0, 1]);
  const aProg = useTransform(wordAppearProg, [0.6, 0.7], [0, 1]);
  const timeProg = useTransform(wordAppearProg, [0.7, 0.8], [0, 1]);

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
  const centeringProg = useTransform(
    scrollY,
    [CENTERING_START, CENTERING_END],
    [0, 1],
  );
  const [oneRef, oneDimensions] = useMeasureOnce<HTMLSpanElement>();
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
  const fadeOut = useTransform(fusionProgress, [0, 1], [1, 0]);
  const fadeIn = useTransform(fusionProgress, [0, 1], [0, 1]);

  const [bicRef, bicDimensions] = useMeasureOnce<HTMLSpanElement>();
  const [diaRef, diaDimensions] = useMeasureOnce<HTMLSpanElement>();

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
        <motion.span
          className="inline-block"
          style={{
            opacity: connectingProg,
            filter: connectingBlur,
          }}
        >
          Connecting
        </motion.span>
        <motion.span
          className="ml-2 inline-block md:ml-4"
          style={{
            opacity: culturesProg,
            filter: culturesBlur,
          }}
        >
          cultures,
        </motion.span>
      </motion.span>

      {/* one arabic dialect */}
      <motion.span className="block py-2">
        {/* one */}
        <motion.span
          ref={oneRef}
          className="inline-block"
          style={{
            opacity: useTransform(
              [oneProg, surroundingTextOpacity],
              ([progress, opacity]) => progress * opacity,
            ),
            filter: useMotionTemplate`blur(${useTransform(
              [oneProg, blur],
              ([progress, blurValue]) =>
                progress === 1 ? blurValue : 10 * (1 - progress),
            )}px)`,
          }}
        >
          one
        </motion.span>

        {/* arabic dialect */}
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
      </motion.span>

      {/* at a time. */}
      <motion.span
        style={{
          opacity: surroundingTextOpacity,
          filter: surroundingTextBlur,
        }}
      >
        {/* at */}
        <motion.span
          className="inline-block"
          style={{
            opacity: atProg,
            filter: useMotionTemplate`blur(${useTransform(
              atProg,
              [0, 1],
              [10, 0],
            )}px)`,
          }}
        >
          at
        </motion.span>

        {/* a */}
        <motion.span
          className="ml-2 inline-block md:ml-4"
          style={{
            opacity: aProg,
            filter: useMotionTemplate`blur(${useTransform(
              aProg,
              [0, 1],
              [10, 0],
            )}px)`,
          }}
        >
          a
        </motion.span>

        {/* time. */}
        <motion.span
          className="ml-2 inline-block md:ml-4"
          style={{
            opacity: timeProg,
            filter: useMotionTemplate`blur(${useTransform(
              timeProg,
              [0, 1],
              [10, 0],
            )}px)`,
          }}
        >
          time.
        </motion.span>
      </motion.span>
    </motion.h1>
  );
};
