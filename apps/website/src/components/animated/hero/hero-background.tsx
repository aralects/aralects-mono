import { motion, useMotionValue, useTransform } from "motion/react";
import React, { useEffect, useRef } from "react";
import { useScrollContext } from "../scroll-context";

const HeroBackground = ({ children }: { children?: React.ReactNode }) => {
  const { scrollY } = useScrollContext();

  // const isHidden = useRef(true);
  // const paddingWidth = useMotionValue(0);

  // const screenWidth = useMotionValue(window.innerWidth);

  // const translateProgress = useTransform(scrollY, [2600, 3000], [0, 1]);
  // translateProgress.on("change", (value) => {
  //   console.log("translateProgress", value);
  // });
  // const xLeft = useTransform(
  //   translateProgress,
  //   [0, 1],
  //   [`-${screenWidth.get()}px`, `-${screenWidth.get() - paddingWidth.get()}px`],
  // );

  // const xRight = useTransform(
  //   translateProgress,
  //   [0, 1],
  //   [`${screenWidth.get()}px`, `${screenWidth.get() - paddingWidth.get()}px`],
  // );

  const opacity = useTransform(scrollY, [700, 1000], [0, 1]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 1536 && !isHidden.current) {
  //       console.log("hiding padding");
  //       paddingWidth.set(0);
  //       isHidden.current = true;
  //       return;
  //     } else if (window.innerWidth >= 1536) {
  //       console.log("showing padding");
  //       const width = window.innerWidth;
  //       screenWidth.set(width);
  //       const containerWidth = 1533;
  //       const padding = (width - containerWidth) / 2;
  //       paddingWidth.set(padding);
  //       isHidden.current = false;
  //     }
  //   };
  //   handleResize();

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <>
      <motion.div
        className="absolute inset-0 bg-[#272727]"
        style={{ opacity }}
      />
      {children}
      {/* <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-10 bg-white"
          style={{ x: xLeft }}
        />
        <motion.div
          className="absolute inset-0 z-10 bg-white"
          style={{ x: xRight }}
        />
      </div> */}
    </>
  );
};

// const HeroBackground = ({

//   children,
// }: {

//   children?: React.ReactNode;
// }) => {
//   const { scrollY } = useScrollContext();
//   const hideStart = 1400;
//   const hideEnd = 1600;

//   const bg = useTransform(
//     scrollY,
//     [hideStart, hideEnd],
//     ["#ffffff", "#272727"],
//   );

//   return (
//     <motion.div
//       className="absolute inset-0 isolate z-0 overflow-hidden xl:container xl:mx-auto"
//       style={{ backgroundColor: bg }}
//     >
//       {children}
//     </motion.div>
//   );
// };

export default HeroBackground;
