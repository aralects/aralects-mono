import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { cn } from "@repo/ui";
import { useMeasureOnce } from "src/hooks/use-measure-once";

export const AralectsAnimation = ({ className }: { className?: string }) => {
  const { scrollY } = useScroll();

  // Animation sequence ranges (scroll position in pixels)
  const WORDS_FADE_IN_START = 0;
  const WORDS_FADE_IN_END = 300;
  const SURROUNDING_FADE_OUT_START = 350;
  const SURROUNDING_FADE_OUT_END = 500;
  const CENTERING_START = 550;
  const CENTERING_END = 700;
  const FUSION_START = 750;
  const FUSION_END = 900;

  // Word appearance animation progress
  const wordsAppearProgress = useTransform(
    scrollY,
    [WORDS_FADE_IN_START, WORDS_FADE_IN_END],
    [0, 1],
    { clamp: true }
  );

  // Individual word progress values with stagger
  const connectingProgress = useTransform(
    wordsAppearProgress,
    [0, 0.1],
    [0, 1],
    { clamp: true }
  );
  const culturesProgress = useTransform(
    wordsAppearProgress,
    [0.1, 0.2],
    [0, 1],
    { clamp: true }
  );
  const oneProgress = useTransform(
    wordsAppearProgress,
    [0.2, 0.3],
    [0, 1],
    { clamp: true }
  );
  const arabicProgress = useTransform(
    wordsAppearProgress,
    [0.3, 0.4],
    [0, 1],
    { clamp: true }
  );
  const dialectProgress = useTransform(
    wordsAppearProgress,
    [0.4, 0.5],
    [0, 1],
    { clamp: true }
  );
  const atProgress = useTransform(
    wordsAppearProgress,
    [0.5, 0.6],
    [0, 1],
    { clamp: true }
  );
  const aProgress = useTransform(
    wordsAppearProgress,
    [0.6, 0.7],
    [0, 1],
    { clamp: true }
  );
  const timeProgress = useTransform(
    wordsAppearProgress,
    [0.7, 0.8],
    [0, 1],
    { clamp: true }
  );

  // Opacity values for the surrounding text (connecting cultures, one / at a time)
  const fadeOutProgress = useTransform(
    scrollY,
    [SURROUNDING_FADE_OUT_START, SURROUNDING_FADE_OUT_END],
    [0, 1],
    { clamp: true }
  );
  const surroundingTextOpacity = useTransform(fadeOutProgress, [0, 1], [1, 0]);
  const blur = useTransform(fadeOutProgress, [0, 1], [0, 10]);
  const surroundingTextBlur = useMotionTemplate`blur(${blur}px)`;

  // Transform values for centering the "arabic dialect" part
  const centeringProgress = useTransform(
    scrollY,
    [CENTERING_START, CENTERING_END],
    [0, 1],
    { clamp: true }
  );
  const [oneRef, oneDimensions] = useMeasureOnce<HTMLSpanElement>();
  const centerX = useTransform(
    centeringProgress,
    [0, 1],
    [0, -((oneDimensions.width ?? 0) + 8) / 2],
  );

  // Fusion animation values for the arabic dialect part
  const fusionProgress = useTransform(
    scrollY,
    [FUSION_START, FUSION_END],
    [0, 1],
    { clamp: true }
  );
  const fadeOut = useTransform(fusionProgress, [0, 1], [1, 0]);
  const fadeIn = useTransform(fusionProgress, [0, 1], [0, 1]);

  const [bicRef, bicDimensions] = useMeasureOnce<HTMLSpanElement>();
  const [diaRef, diaDimensions] = useMeasureOnce<HTMLSpanElement>();

  // Combine oneProgress and surroundingTextOpacity
  const oneOpacity = useTransform(
    oneProgress,
    (value) => value * surroundingTextOpacity.get()
  );

  // Creating a custom blur effect for oneProgress
  const oneBlur = useTransform(
    oneProgress,
    (value) => value === 1 ? blur.get() : 10 * (1 - value)
  );
  const oneBlurTemplate = useMotionTemplate`blur(${oneBlur}px)`;

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
            opacity: connectingProgress,
            filter: useMotionTemplate`blur(${useTransform(
              connectingProgress,
              [0, 1],
              [10, 0]
            )}px)`,
          }}
        >
          Connecting
        </motion.span>
        <motion.span
          className="ml-2 inline-block md:ml-4"
          style={{
            opacity: culturesProgress,
            filter: useMotionTemplate`blur(${useTransform(
              culturesProgress,
              [0, 1],
              [10, 0]
            )}px)`,
          }}
        >
          cultures,
        </motion.span>
      </motion.span>

      {/* one arabic dialect */}
      <motion.span className="block py-2">
        <motion.span
          ref={oneRef}
          className="inline-block"
          style={{
            opacity: oneOpacity,
            filter: oneBlurTemplate,
          }}
        >
          one
        </motion.span>
        <motion.div
          className="ml-2 inline-flex items-center justify-center gap-x-2"
          style={{ x: centerX }}
        >
          {/* arabic */}
          <motion.span
            className="font-SpaceGrotesk overflow-hidden bg-[#8262b0] py-2 pl-2 text-white"
            style={{
              opacity: arabicProgress,
              filter: useMotionTemplate`blur(${useTransform(
                arabicProgress,
                [0, 1],
                [10, 0]
              )}px)`,
            }}
          >
            <span className="inline-block">Ara</span>
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
              x: useTransform(fusionProgress, [0, 1], [0, -8]),
              opacity: dialectProgress,
              filter: useMotionTemplate`blur(${useTransform(
                dialectProgress,
                [0, 1],
                [10, 0]
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
            <span className="inline-block">lect</span>
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

      {/* at a time */}
      <motion.span
        style={{
          opacity: surroundingTextOpacity,
          filter: surroundingTextBlur,
        }}
      >
        <motion.span
          className="inline-block"
          style={{
            opacity: atProgress,
            filter: useMotionTemplate`blur(${useTransform(
              atProgress,
              [0, 1],
              [10, 0]
            )}px)`,
          }}
        >
          at
        </motion.span>
        <motion.span
          className="ml-2 inline-block md:ml-4"
          style={{
            opacity: aProgress,
            filter: useMotionTemplate`blur(${useTransform(
              aProgress,
              [0, 1],
              [10, 0]
            )}px)`,
          }}
        >
          a
        </motion.span>
        <motion.span
          className="ml-2 inline-block md:ml-4"
          style={{
            opacity: timeProgress,
            filter: useMotionTemplate`blur(${useTransform(
              timeProgress,
              [0, 1],
              [10, 0]
            )}px)`,
          }}
        >
          time.
        </motion.span>
      </motion.span>
    </motion.h1>
  );
};
