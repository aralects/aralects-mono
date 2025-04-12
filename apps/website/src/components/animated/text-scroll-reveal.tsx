import { cn } from "@repo/ui";
import React, { type ReactNode, type ReactElement } from "react";
import {
  useTransform,
  motion,
  type MotionValue,
  useMotionTemplate,
} from "motion/react";
import { useScrollContext } from "./scroll-context";

// Helper function to count total characters in ReactNode
const countCharacters = (node: ReactNode): number => {
  if (typeof node === "string") {
    return node.length;
  }

  if (Array.isArray(node)) {
    return node.reduce((sum, child) => sum + countCharacters(child), 0);
  }

  if (React.isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return countCharacters(element.props.children);
  }

  return 0;
};

// Helper function to transform children for character animation
const transformChildren = (
  node: ReactNode,
  progress: MotionValue<number>,
  totalChars: number,
  charIndex: { current: number },
): ReactNode => {
  if (typeof node === "string") {
    const parts: ReactNode[] = [];
    let currentWordChars: ReactNode[] = [];
    let currentWordStartIndex = -1; // Index in totalChars where the current word starts

    for (let i = 0; i < node.length; i++) {
      const char = node[i];
      const currentTotalCharIndex = charIndex.current; // Global index before processing this char

      if (char === " ") {
        // If we were building a word, finalize it
        if (currentWordChars.length > 0) {
          parts.push(
            // Wrap the word to prevent breaking
            <span
              key={`word-${currentWordStartIndex}`}
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              {currentWordChars}
            </span>,
          );
          currentWordChars = []; // Reset word buffer
          currentWordStartIndex = -1;
        }
        // Add the space to allow natural line breaks between words
        parts.push(" ");
        charIndex.current++; // Increment global index for the space
      } else {
        // Start of a new word
        if (currentWordChars.length === 0) {
          currentWordStartIndex = currentTotalCharIndex;
        }
        // Create the animated character
        const start = currentTotalCharIndex / totalChars;
        const end = (currentTotalCharIndex + 1) / totalChars;
        currentWordChars.push(
          <Char
            key={`char-${currentTotalCharIndex}`}
            progress={progress}
            range={[start, end]}
          >
            {char}
          </Char>,
        );
        charIndex.current++; // Increment global index for the non-space character
      }
    }

    // Finalize any trailing word at the end of the string
    if (currentWordChars.length > 0) {
      parts.push(
        <span
          key={`word-${currentWordStartIndex}`}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {currentWordChars}
        </span>,
      );
    }

    // Return the array of word spans and spaces
    return parts;
  }

  if (Array.isArray(node)) {
    // Process each child in the array recursively
    // Using flatMap ensures nested arrays are handled correctly
    return node.flatMap((child) =>
      transformChildren(child, progress, totalChars, charIndex),
    );
  }

  if (React.isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    // Recursively transform the children of the element
    const transformedChildren = transformChildren(
      element.props.children,
      progress,
      totalChars,
      charIndex,
    );

    // Clone the element with its original props and the transformed children
    return React.cloneElement(
      element,
      // Ensure a unique key, prioritize existing key
      { key: element.key ?? `el-${charIndex.current}-${Math.random()}` },
      transformedChildren,
    );
  }

  // Return nodes that are not strings, arrays, or elements as is
  return node;
};

export default function TextScrollReveal({
  children,
  className,
  startScroll,
  endScroll,
}: {
  children: ReactNode;
  className?: string;
  startScroll: number;
  endScroll: number;
}) {
  const { scrollY } = useScrollContext();

  const scrollYProgress = useTransform(
    scrollY,
    [startScroll, endScroll],
    [0, 1],
  );

  // Calculate total characters and prepare for transformation
  const totalChars = countCharacters(children);
  const charIndex = React.useRef(0);
  // Reset index on each render
  charIndex.current = 0;

  const animatedChildren = transformChildren(
    children,
    scrollYProgress,
    totalChars,
    charIndex,
  );

  return <p className={cn("relative", className)}>{animatedChildren}</p>;
}

const Char = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [10, 0]);

  // Calculate intermediate points for the y-transform animation
  const [rStart, rEnd] = range;
  const rDuration = rEnd - rStart;
  const quarterPoint = rStart + rDuration / 4;
  const midPoint = rStart + rDuration / 2;
  const threeQuarterPoint = rStart + (rDuration * 3) / 4;
  const translateAmount = 5; // Adjust this value as needed

  const y = useTransform(
    progress,
    [rStart, quarterPoint, midPoint, threeQuarterPoint, rEnd],
    [0, translateAmount, 0, -translateAmount, 0], // Up-and-down motion
  );
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.span
      className="inline-block"
      style={{ filter: blurFilter, opacity, y }}
    >
      {children}
    </motion.span>
  );
};
