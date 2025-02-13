import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@repo/ui";

export const ArabicDialectsAnimationV1 = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "font-SpaceGrotesk relative isolate inline-block select-none font-semibold text-[#8262b0]",
        className,
      )}
    >
      {/* this guy is very important */}
      {/* without it, the animation will stutter when hovering at the edges */}
      <div
        className={cn("absolute z-[1]", isHovered ? "-inset-20" : "-inset-4")}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      />

      <div className="flex items-center justify-center">
        <span>Ara</span>

        <AnimatePresence>
          {!isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              bic dia
            </motion.span>
          )}
        </AnimatePresence>

        <span>lect</span>

        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              s
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const ArabicDialectsAnimationV2 = ({ className }) => {
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsToggled(true);
      } else {
        setIsToggled(false);
      }
    };

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll);

    // Check scroll position on mount in case the user is already scrolled down
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className={cn(
        "font-SpaceGrotesk relative isolate inline-block select-none font-semibold text-[#8262b0]",
        className,
      )}
    >
      {/* text wrapper */}
      <div className="flex items-center justify-center gap-x-3">
        {/* arabic */}
        <span className="overflow-hidden bg-[#8262b0] py-2 pl-2 text-white">
          <span className="inline-block">Ara</span>

          <AnimatePresence>
            {!isToggled && (
              <motion.span
                className="inline-block whitespace-nowrap"
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  scale: {
                    bounce: 0.1,
                  },
                }}
                // v2
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto", scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0 }}
                // replace with this for a v3
                // initial={{ x: 0, width: 0 }}
                // animate={{ x: 0, width: "auto" }}
                // exit={{ x: 100, width: 0 }}
              >
                bic
              </motion.span>
            )}

            {/* variable padding */}
            {!isToggled && (
              <motion.span
                initial={{ opacity: 0, width: 0, scale: 0 }}
                animate={{ opacity: 1, width: 8, scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  scale: {
                    bounce: 0.1,
                  },
                }}
                className="inline-block h-full"
              />
            )}
          </AnimatePresence>
        </span>

        {/* dialects */}
        <motion.span
          className="overflow-hidden bg-[#8262b0] py-2 pr-2 text-white"
          initial={{ x: -12 }}
          animate={{ x: isToggled ? -12 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
        >
          <AnimatePresence>
            {/* variable padding */}
            {!isToggled && (
              <motion.span
                initial={{ opacity: 0, width: 0, scale: 0 }}
                animate={{ opacity: 1, width: 8, scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  scale: {
                    bounce: 0.1,
                  },
                }}
                className="inline-block h-full"
              />
            )}
            {!isToggled && (
              <motion.span
                className="inline-block whitespace-nowrap"
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  scale: {
                    bounce: 0.1,
                  },
                }}
                // v2
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto", scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0 }}
                // replace with this for a v3
                // initial={{ x: 0, width: 0 }}
                // animate={{ x: 0, width: "auto" }}
                // exit={{ x: -100, width: 0 }}
              >
                dia
              </motion.span>
            )}
          </AnimatePresence>
          <span className="inline-block">lect</span>

          <motion.span
            variants={{
              show: {
                opacity: 1,
                width: "auto",
              },
              hide: {
                opacity: 0,
                width: 0,
              },
            }}
            initial="show"
            animate={isToggled ? "show" : "hide"}
            exit={{ opacity: 0, width: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="inline-block whitespace-nowrap"
          >
            s
          </motion.span>
        </motion.span>
      </div>
    </motion.div>
  );
};
