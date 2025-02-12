import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@repo/ui";

const ArabicDialectsAnimation = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "font-SpaceGrotesk relative isolate inline-block select-none font-semibold text-[#8262b0]",
        // isHovered ? "pl-10" : "pl-4",
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
        <span>ara</span>

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

export default ArabicDialectsAnimation;
