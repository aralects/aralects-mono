import React from "react";

export function useMeasure<T extends Element>(): [
  (node: T | null) => void,
  { width: number | null; height: number | null },
] {
  const [dimensions, setDimensions] = React.useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  const previousObserver = React.useRef<ResizeObserver | null>(null);

  const customRef = React.useCallback((node: T | null) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];

          setDimensions({ width: width as number, height: height as number });
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, dimensions];
}
