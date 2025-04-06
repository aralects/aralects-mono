import React, {
  type ReactNode,
  type CSSProperties,
  type ReactElement,
} from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";

// Transform children into animatable characters with proper typing
const transformChildren = (
  node: ReactNode,
  charVariants: Variants,
  charIndex: { current: number },
  index?: number,
): ReactNode => {
  if (typeof node === "string") {
    return (
      <span className="inline">
        {node.split("").map((char, i) => {
          const key = `char-${(charIndex.current += 1)}-${i}`;

          return (
            <motion.span key={key} variants={charVariants}>
              {char}
            </motion.span>
          );
        })}
      </span>
    );
  }

  if (Array.isArray(node)) {
    // Process each child in the array
    return node.map((child, index) =>
      transformChildren(child, charVariants, charIndex, index),
    );
  }

  if (React.isValidElement(node)) {
    // Properly handle React elements with correct typing
    const element = node as ReactElement<{ children?: ReactNode }>;
    // Clone the element and recursively transform its children
    const transformedChildren = transformChildren(
      element.props.children,
      charVariants,
      charIndex,
    );

    return React.cloneElement(element, { key: index }, transformedChildren);
  }

  // Return other types (null, undefined, boolean, number) as is
  return node;
};

export type ScrollAnimatedTextProps = {
  children: ReactNode;
  as?: keyof typeof motion;
  className?: string;
  style?: CSSProperties;
  staggerDelay?: number; // Time between each character animation (seconds)
  animationDuration?: number; // Duration of each character animation (seconds)
  // once?: boolean; // Trigger animation only once when in view
  // viewport?: MotionProps["viewport"]; // Framer Motion viewport options
} & HTMLMotionProps<"div">;

export function ScrollAnimatedText({
  children,
  as = "p",
  className,
  style,
  staggerDelay = 0.015,
  animationDuration = 0.4,
  ...props
}: ScrollAnimatedTextProps) {
  const MotionTag = motion[as] as React.ElementType;

  // Define variants for individual characters (blur effect)
  const charVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: animationDuration,
        ease: "easeOut",
      },
    },
  };

  // Define container variants for staggering children
  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  // Use a ref to track character index across recursive calls
  const charIndex = React.useRef(0);
  // Reset index on each render
  charIndex.current = 0;

  // Transform children structure for animation
  const animatedChildren = transformChildren(children, charVariants, charIndex);

  return (
    <MotionTag
      className={className}
      style={{
        ...style,
        wordBreak: "keep-all",
        wordWrap: "normal",
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      {...props}
    >
      {animatedChildren}
    </MotionTag>
  );
}
