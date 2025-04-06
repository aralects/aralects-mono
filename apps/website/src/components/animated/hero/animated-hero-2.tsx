import React, { useState } from "react";
import { cn } from "@repo/ui";

import { AnimatedText } from "../animated-text";
import { useScrollContext } from "../scroll-context";
import { motion, useTransform } from "motion/react";
import TextScrollReveal2 from "../text-scroll-reveal-2";
import TextScrollReveal from "../text-scroll-reveal";

const blurSlideVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.01 },
    },
    exit: {
      transition: { staggerChildren: 0.01, staggerDirection: 1 },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(10px) brightness(0%)",
      y: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px) brightness(100%)",
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(10px) brightness(0%)",
      transition: {
        duration: 0.4,
      },
    },
  },
};

// function AnimatedHero2({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const { scrollY } = useScrollContext();

//   const zoom = useTransform(scrollY, [3400, 3600], [1, 1.5]);
//   const opacity = useTransform(scrollY, [3500, 3600], [1, 0]);

//   const zoom2 = useTransform(scrollY, [4000, 4400], [1, 1.5]);
//   const opacity2 = useTransform(scrollY, [4000, 4400], [1, 0]);

//   return (
//     <div className={cn("absolute inset-0", className)} {...props}>
//       <motion.div
//         className="absolute inset-0 flex items-center justify-center"
//         style={{ scale: zoom, opacity }}
//       >
//         <TextScrollReveal
//           paragraph="Aralects transforms the way Arabic is learned, spoken, and understood."
//           className="font-unbounded mx-auto max-w-4xl px-4 text-center text-3xl text-white md:text-4xl xl:text-5xl"
//           startScroll={3000}
//           endScroll={3400}
//         />
//       </motion.div>
//       <motion.div
//         className="absolute inset-0 flex items-center justify-center"
//         style={{ scale: zoom2, opacity: opacity2 }}
//       >
//         <TextScrollReveal
//           paragraph="Empower your language journey with personalized, immersive experiences designed for real-world Arabic learning."
//           className="font-unbounded mx-auto max-w-4xl px-4 text-center text-3xl text-white md:text-4xl xl:text-5xl"
//           startScroll={3600}
//           endScroll={4000}
//         />
//       </motion.div>

//       {/* <div ref={containerRef2} className={cn("h-[700px]", className)}>
//         <TextScrollReveal
//           paragraph="Empower your language journey with personalized, immersive experiences designed for real-world Arabic learning."
//           className="font-unbounded container sticky top-1/2 mx-auto -translate-y-1/2 px-4 text-center text-3xl text-white md:text-4xl xl:text-6xl"
//           scrollYProgress={scrollYProgress2}
//         />
//       </div> */}
//     </div>
//   );
// }

function AnimatedHero2({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-[#272727]", className)} {...props}>
      <div className="flex flex-row items-center">
        <AnimatedText
          per="char"
          preset="blur"
          speedReveal={1}
          className="font-unbounded mx-auto inline-block px-4 text-center text-3xl text-white md:text-4xl xl:text-5xl"
        >
          Aralects
        </AnimatedText>
        <AnimatedText
          per="char"
          preset="blur"
          speedReveal={1}
          className="font-unbounded mx-auto inline-block max-w-4xl px-4 text-center text-3xl text-white md:text-4xl xl:text-5xl"
        >
          transforms the way Arabic is learned, spoken, and understood.
        </AnimatedText>
      </div>
      {/* <AnimatedText className="font-unbounded mx-auto max-w-4xl px-4 text-center text-3xl text-white md:text-4xl xl:text-5xl">
        Empower your language journey with personalized, immersive experiences
        designed for real-world Arabic learning.
      </AnimatedText> */}
    </div>
  );
}

export default AnimatedHero2;
