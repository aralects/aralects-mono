import React, { useState } from "react";
import { cn } from "@repo/ui";

import { AnimatedText } from "../animated-text";
import { useScrollContext } from "../scroll-context";
import { motion, useTransform } from "motion/react";
import TextScrollReveal2 from "../text-scroll-reveal-2";
import TextScrollReveal from "../text-scroll-reveal";
import { ScrollAnimatedText } from "../scroll-animated-text";

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
    <div
      className={cn(
        "relative flex flex-col bg-[#272727] py-40",
        // 'before:content-[" "] before:absolute before:inset-0 before:-translate-y-full before:bg-gradient-to-b before:from-transparent before:to-[#272727]',
        className,
      )}
      {...props}
    >
      <ScrollAnimatedText
        viewport={{
          once: true,
          amount: 1,
          margin: "0px 0px -25%",
        }}
        staggerDelay={0.025}
        className="font-space container mx-auto inline-block px-10 text-center text-3xl font-semibold text-white md:px-20 md:text-4xl xl:text-6xl"
      >
        <span className="text-glow-xl text-purple-200">Aralects</span>{" "}
        transforms the way Arabic is learned, spoken, and understood.
      </ScrollAnimatedText>

      <ScrollAnimatedText
        className="font-space container mx-auto mt-60 inline-block px-10 text-center text-3xl font-semibold text-white md:px-20 md:text-4xl xl:text-6xl"
        viewport={{
          once: true,
          amount: 1,
          margin: "0px 0px -25%",
        }}
        staggerDelay={0.015}
        transition={{
          delay: 0.2,
        }}
      >
        Empower your language journey with{" "}
        <span className="text-glow-xl text-purple-200">personalized</span>{" "}
        experiences, designed for real-world Arabic learning.
      </ScrollAnimatedText>

      {/* <AnimatedText className="font-unbounded mx-auto max-w-4xl px-4 text-center text-3xl text-white md:text-4xl xl:text-5xl">
       
      </AnimatedText> */}
    </div>
  );
}

export default AnimatedHero2;
