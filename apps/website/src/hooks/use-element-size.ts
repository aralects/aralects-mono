import { useRef, useEffect, type RefObject } from "react";
import { useMotionValue, MotionValue } from "framer-motion";

type ElementSize = [
  ref: RefObject<HTMLElement>,
  width: MotionValue<number>,
  height: MotionValue<number>,
];

type Opts = {
  useObserver?: boolean;
};

function useElementSize<T extends HTMLElement = HTMLDivElement>({
  useObserver = true,
}: Opts = {}): ElementSize {
  // Create motion values for width and height
  const width = useMotionValue<number>(0);
  const height = useMotionValue<number>(0);

  // Create ref to attach to the element with proper typing
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Initialize with current size
    width.set(element.offsetWidth);
    height.set(element.offsetHeight);

    if (useObserver) {
      // Create ResizeObserver to track size changes
      // Create ResizeObserver to track size changes
      const resizeObserver = new ResizeObserver(
        (entries: ResizeObserverEntry[]) => {
          for (const entry of entries) {
            width.set(entry.contentRect.width);
            height.set(entry.contentRect.height);
          }
        },
      );

      // Start observing
      resizeObserver.observe(element);

      // Clean up
      return () => resizeObserver.disconnect();
    }
  }, [width, height, useObserver]);

  return [ref, width, height];
}

export default useElementSize;
