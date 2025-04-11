import React from "react";
import { MotionValue, useScroll, useSpring } from "motion/react";

const ScrollContext = React.createContext<{
  scrollY: MotionValue<number>;
} | null>(null);

export const ScrollContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { scrollY: scrollYValue } = useScroll();
  const scrollY = useSpring(scrollYValue, { damping: 30, stiffness: 200 });

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = React.useContext(ScrollContext);
  if (!context) {
    throw new Error(
      "useScrollContext must be used within a ScrollContextProvider",
    );
  }
  return context;
};
