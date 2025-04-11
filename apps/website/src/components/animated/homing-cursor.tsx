import React from "react";
import { MotionValue, useMotionValue, useSpring } from "motion/react";

const HomingCursorContext = React.createContext<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
} | null>(null);

export const HomingCursorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  React.useEffect(() => {
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

  return (
    <HomingCursorContext.Provider value={{ mouseX: smoothX, mouseY: smoothY }}>
      {children}
    </HomingCursorContext.Provider>
  );
};

export const useHomingCursor = () => {
  const context = React.useContext(HomingCursorContext);
  if (!context) {
    throw new Error(
      "useHomingCursor must be used within a HomingCursorProvider",
    );
  }
  return context;
};
