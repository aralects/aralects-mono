"use client";

import { useMemo } from "react";
import { motion, type MotionValue, useTransform } from "framer-motion";
import { interpolate } from "@/lib/flubber";
import type { PropsOf } from "~/lib/utils";

export interface PathData {
  d: string;
  fill: string;
  stroke: string;
  strokeWidth: string;
}

export interface SVGData {
  paths: PathData[];
  viewBox: string;
  width: number;
  height: number;
}

export type SVGMorphProps = {
  fromSvg: SVGData;
  toSvg: SVGData;
  scrollY: MotionValue<number>;
  scrollStart?: number;
  scrollEnd?: number;
  width?: number;
  height?: number;
} & PropsOf<typeof motion.svg>;

const getIndex = (_: any, index: number) => index;

// flubber interpolation
function useFlubber(progress: MotionValue<number>, paths: string[]) {
  return useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 5 }),
  });
}

// Inner component to handle path morphing
function MorphPath({
  fromPath,
  toPath,
  progress,
}: {
  fromPath: PathData;
  toPath: PathData;
  progress: MotionValue<number>;
}) {
  const morphPaths = [fromPath.d, toPath.d];
  const morphedPath = useFlubber(progress, morphPaths);

  // Interpolate between colors
  const fill = useTransform(progress, [0, 1], [fromPath.fill, toPath.fill]);
  const stroke = useTransform(
    progress,
    [0, 1],
    [fromPath.stroke, toPath.stroke],
  );
  const strokeWidth = useTransform(
    progress,
    [0, 1],
    [
      Number.parseFloat(fromPath.strokeWidth),
      Number.parseFloat(toPath.strokeWidth),
    ],
  );

  return (
    <motion.path
      d={morphedPath}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeMiterlimit="10"
    />
  );
}

export default function SVGMorph({
  fromSvg,
  toSvg,
  scrollY,
  scrollStart = 0,
  scrollEnd = 1000,
  width,
  height,
  ...props
}: SVGMorphProps) {
  const progress = useTransform(scrollY, [scrollStart, scrollEnd], [0, 1], {
    clamp: true,
  });

  const paths = useMemo(() => {
    const components = [];
    const pathCount = Math.min(fromSvg.paths.length, toSvg.paths.length);

    for (let i = 0; i < pathCount; i++) {
      // Match paths by index
      const fromPath = fromSvg.paths[i];
      const toPath = toSvg.paths[i];

      components.push(
        <MorphPath
          key={i}
          fromPath={fromPath}
          toPath={toPath}
          progress={progress}
        />,
      );
    }

    return components;
  }, [fromSvg.paths, toSvg.paths, progress]);

  // Use provided dimensions or default to the SVG's original dimensions
  const finalWidth = width ?? fromSvg.width;
  const finalHeight = height ?? fromSvg.height;

  return (
    <motion.svg
      {...props}
      width={finalWidth}
      height={finalHeight}
      viewBox={fromSvg.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths}
    </motion.svg>
  );
}
