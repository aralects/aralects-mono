"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

import React, { type PropsWithChildren, useEffect, useState } from "react";
// import { useScrollContext } from "./scroll-context";

const baseDelay = 0.5;

const Plane = ({
  zIndex,
  mouseX,
  mouseY,
  movementFactor,
  children,
}: PropsWithChildren<{
  zIndex: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  movementFactor: number;
}>) => {
  const x = useTransform(mouseX, (latest) => latest * movementFactor);
  const y = useTransform(mouseY, (latest) => latest * movementFactor);

  return (
    <motion.div className="absolute inset-0" style={{ zIndex, x, y }}>
      {children}
    </motion.div>
  );
};

export const FloatingBlobs = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
  }, []);

  // const { scrollY } = useScrollContext();
  // const parallaxSm = useTransform(scrollY, [0, 1000], [0, -50]);
  // const parallaxMd = useTransform(scrollY, [0, 1000], [0, -150]);
  // const parallaxLg = useTransform(scrollY, [0, 1000], [0, -250]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to be between -1 and 1
      mouseX.set((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2));
      mouseY.set(
        (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2),
      );
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set(
          (e.touches[0]!.clientX - window.innerWidth / 2) /
            (window.innerWidth / 2),
        );
        mouseY.set(
          (e.touches[0]!.clientY - window.innerHeight / 2) /
            (window.innerHeight / 2),
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

  if (!didMount) {
    return null;
  }

  return (
    <div {...props}>
      <Plane mouseX={smoothX} mouseY={smoothY} movementFactor={20} zIndex={1}>
        <motion.div
          className="absolute left-1/2 top-20"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img
            src="/img/hero/ellipse-2.png"
            className="scale-50 opacity-50 md:scale-100 md:opacity-100"
          />
        </motion.div>
        <motion.div
          className="absolute left-32 top-[1200px]"
          initial={{ opacity: 0, y: -100, rotate: 120, scale: 0.8 }}
          animate={{ y: 0, opacity: 0.8, rotate: 120, scale: 0.8 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/blob-small.png" />
        </motion.div>
        <motion.div
          className="absolute left-1/3 top-[1200px]"
          initial={{ y: -40, opacity: 0, rotate: 140, scale: 0.65 }}
          animate={{ y: 0, opacity: 1, rotate: 140, scale: 0.65 }}
          transition={{ duration: 2, delay: baseDelay + 0.1, type: "spring" }}
        >
          <img src="/img/hero/blob-large.png" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-[1900px]"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img src="/img/hero/ellipse-1.png" />
        </motion.div>
        <motion.div
          className="absolute right-[10%] top-[2000px]"
          initial={{ y: -40, opacity: 0, rotate: 40, scale: 0.65 }}
          animate={{ y: 0, opacity: 1, rotate: 40, scale: 0.65 }}
          transition={{ duration: 2, delay: baseDelay + 0.1, type: "spring" }}
        >
          <img src="/img/hero/blob-large.png" />
        </motion.div>
        <motion.div
          className="absolute right-[10%] top-[2400px]"
          initial={{ y: -40, opacity: 0, rotate: 40, scale: 0.65 }}
          animate={{ y: 0, opacity: 1, rotate: 40, scale: 0.65 }}
          transition={{ duration: 2, delay: baseDelay + 0.1, type: "spring" }}
        >
          <img src="/img/hero/blob-medium.png" />
        </motion.div>
        <motion.div
          className="absolute left-[20%] top-[2400px]"
          initial={{ y: -40, opacity: 0, rotate: 100, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.6, rotate: 100, scale: 0.9 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/blob-small.png" />
        </motion.div>
        <motion.div
          className="absolute left-[5%] top-[3000px]"
          initial={{ y: -40, opacity: 0, rotate: 45, scale: 0.3 }}
          animate={{ y: 0, opacity: 1, rotate: 45, scale: 0.3 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img src="/img/hero/ellipse-1.png" />
        </motion.div>
        <motion.div
          className="absolute left-[18%] top-[3650px]"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img src="/img/hero/ellipse-2.png" />
        </motion.div>
      </Plane>

      <Plane mouseX={smoothX} mouseY={smoothY} movementFactor={40} zIndex={2}>
        <motion.div
          className="absolute -right-1/3 top-20 md:right-20 md:top-60"
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img
            src="/img/hero/blob-small.png"
            className="scale-75 md:scale-100"
          />
        </motion.div>
        <motion.div
          className="absolute -left-24 top-60 md:left-20 md:top-96"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: baseDelay + 0.1, type: "spring" }}
        >
          <img
            src="/img/hero/blob-large.png"
            className="scale-[0.4] md:scale-100"
          />
        </motion.div>
        <motion.div
          className="absolute right-1/4 top-[1150px]"
          initial={{ y: -40, opacity: 0, rotate: 250, scale: 0.75 }}
          animate={{ y: 0, opacity: 0.5, rotate: 250, scale: 0.75 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img src="/img/hero/ellipse-2.png" />
        </motion.div>
        <motion.div
          className="absolute left-60 top-[1650px]"
          initial={{ y: -40, opacity: 0, rotate: 100, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.6, rotate: 100, scale: 0.9 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/blob-medium.png" />
        </motion.div>
        <motion.div
          className="absolute left-[15%] top-[2200px]"
          initial={{ y: -40, opacity: 0, rotate: 100, scale: 0.6 }}
          animate={{ y: 0, opacity: 1, rotate: 100, scale: 0.6 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img src="/img/hero/ellipse-1.png" />
        </motion.div>
        <motion.div
          className="absolute right-[15%] top-[2700px]"
          initial={{ y: -40, opacity: 0, rotate: 100, scale: 0.6 }}
          animate={{ y: 0, opacity: 1, rotate: 100, scale: 0.6 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img src="/img/hero/ellipse-2.png" />
        </motion.div>
        <motion.div
          className="absolute right-[14%] top-[3250px]"
          initial={{ y: -40, opacity: 0, rotate: 100, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.6, rotate: 100, scale: 0.9 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/blob-small.png" />
        </motion.div>
        <motion.div
          className="absolute right-[14%] top-[3650px]"
          initial={{ y: -40, opacity: 0, rotate: 100, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.9, rotate: 100, scale: 0.9 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/blob-large.png" />
        </motion.div>
      </Plane>

      <Plane mouseX={smoothX} mouseY={smoothY} movementFactor={60} zIndex={3}>
        <motion.div
          className="absolute left-1/4 top-[500px] md:top-[700px]"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img
            src="/img/hero/ellipse-1.png"
            className="scale-[0.7] md:scale-100"
          />
        </motion.div>
        <motion.div
          className="absolute -right-20 top-80 md:right-60 md:top-[650px]"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img
            src="/img/hero/blob-medium.png"
            className="scale-[0.7] md:scale-100"
          />
        </motion.div>
        <motion.div
          className="absolute left-1/3 top-[1500px]"
          initial={{ y: -40, opacity: 0, scale: 0.5, rotate: 120 }}
          animate={{ y: 0, opacity: 0.8, scale: 0.5, rotate: 120 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/ellipse-2.png" />
        </motion.div>
        <motion.div
          className="absolute right-32 top-[1700px]"
          initial={{ opacity: 0, y: -100, rotate: 200, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.8, rotate: 200, scale: 0.9 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/blob-small.png" />
        </motion.div>
        <motion.div
          className="absolute left-1/4 top-[2700px]"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: baseDelay, type: "spring" }}
        >
          <img src="/img/hero/ellipse-1.png" />
        </motion.div>
        <motion.div
          className="absolute right-[20%] top-[2850px]"
          initial={{ y: -40, opacity: 0, scale: 0.5, rotate: 150 }}
          animate={{ y: 0, opacity: 1, scale: 0.5, rotate: 150 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/blob-large.png" />
        </motion.div>
        <motion.div
          className="absolute left-[18%] top-[3250px]"
          initial={{ y: -40, opacity: 0, scale: 0.5, rotate: 150 }}
          animate={{ y: 0, opacity: 1, scale: 0.5, rotate: 150 }}
          transition={{ duration: 2, delay: baseDelay + 0.2, type: "spring" }}
        >
          <img src="/img/hero/blob-medium.png" />
        </motion.div>
      </Plane>
    </div>
  );
};
