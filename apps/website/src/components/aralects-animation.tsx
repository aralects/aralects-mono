import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@repo/ui";
import { useMeasureOnce } from "src/hooks/use-measure-once";

export const AralectsAnimation = ({ className }: { className?: string }) => {
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [100, 400], [0, 1]);

  const fadeOut = useTransform(progress, [0, 1], [1, 0]);
  const fadeIn = useTransform(progress, [0, 1], [0, 1]);

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
      <span className="block">
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.5,
            y: {
              delay: 0.1,
              duration: 1,
              ease: "easeOut",
            },
          }}
        >
          Connecting
        </motion.span>
        <motion.span
          className="ml-2 inline-block md:ml-4"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.4,
            duration: 1.5,
            y: {
              delay: 0.5,
              duration: 1,
              ease: "easeOut",
            },
          }}
        >
          cultures,
        </motion.span>
      </span>

      {/* one arabic dialect */}
      <span className="block py-2">
        <motion.span
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 2,
            duration: 1.5,
            y: {
              delay: 2,
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          className="inline-block"
        >
          one
        </motion.span>
        <div className="inline-flex items-center justify-center ml-2 gap-x-2">
          {/* arabic */}
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 2.15,
              duration: 1.5,
              y: {
                delay: 2.15,
                duration: 0.5,
                ease: "easeOut",
              },
            }}
            className="font-SpaceGrotesk overflow-hidden bg-[#8262b0] py-2 pl-2 text-white"
          >
            <span className="inline-block">Ara</span>
            <motion.span
              ref={bicRef}
              className="inline-block whitespace-nowrap"
              style={{
                opacity: fadeOut,
                scale: fadeOut,
                width: useTransform(progress, [0, 1], [bicDimensions.width, 0]),
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
                width: useTransform(progress, [0, 1], [8, 0]),
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            />
          </motion.span>

          {/* dialects */}
          <motion.span
            className="font-SpaceGrotesk overflow-hidden bg-[#8262b0] py-2 pr-2 text-white"
            style={{ x: useTransform(progress, [0, 1], [0, -8]) }}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 2.3,
              duration: 1.5,
              y: {
                delay: 2.3,
                duration: 0.5,
                ease: "easeOut",
              },
            }}
          >
            {/* variable padding */}
            <motion.span
              className="inline-block h-full"
              style={{
                opacity: fadeOut,
                scale: fadeOut,
                width: useTransform(progress, [0, 1], [8, 0]),
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            />
            <motion.span
              ref={diaRef}
              className="inline-block whitespace-nowrap"
              style={{
                opacity: fadeOut,
                scale: fadeOut,
                width: useTransform(progress, [0, 1], [diaDimensions.width, 0]),
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
                width: useTransform(progress, [0, 1], [0, 25.3]),
              }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="inline-block whitespace-nowrap"
            >
              s
            </motion.span>
          </motion.span>
        </div>
      </span>

      {/* at a time */}
      <span>
        <motion.span
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 2.45,
            duration: 1.5,
            y: {
              delay: 2.45,
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          className="inline-block"
        >
          at
        </motion.span>
        <motion.span
          className="ml-2 inline-block md:ml-4"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 2.6,
            duration: 1.5,
            y: {
              delay: 2.6,
              duration: 0.5,
              ease: "easeOut",
            },
          }}
        >
          a
        </motion.span>
        <motion.span
          className="ml-2 inline-block md:ml-4"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 2.75,
            duration: 1.5,
            y: {
              delay: 2.75,
              duration: 0.5,
              ease: "easeOut",
            },
          }}
        >
          time.
        </motion.span>
      </span>
    </motion.h1>
  );
};
