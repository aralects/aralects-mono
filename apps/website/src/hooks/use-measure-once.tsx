import React from "react";

export function useMeasureOnce<T extends Element>(): [
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

  const nodeRef = React.useRef<T | null>(null);
  const measured = React.useRef(false);

  const measureNode = React.useCallback(() => {
    if (nodeRef.current?.nodeType === Node.ELEMENT_NODE) {
      const { width, height } = nodeRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      measured.current = true;
    }
  }, []);

  React.useEffect(() => {
    // Handle window resize events
    const handleResize = () => {
      if (nodeRef.current) {
        measureNode();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [measureNode]);

  const customRef = React.useCallback(
    (node: T | null) => {
      nodeRef.current = node;

      if (node?.nodeType === Node.ELEMENT_NODE && !measured.current) {
        // Initial measurement
        measureNode();
      }
    },
    [measureNode],
  );

  return [customRef, dimensions];
}
