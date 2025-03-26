import SvgPath from "svgpath";
import { svgPathProperties } from "svg-path-properties";
import { polygonArea, polygonLength } from "d3-polygon";

interface Point {
  x: number;
  y: number;
}

interface RingResult {
  ring: [number, number][];
  skipBisect?: boolean;
}

interface InterpolatorOptions {
  maxSegmentLength?: number;
  string?: boolean;
}

interface SVGPathElement {
  getTotalLength(): number;
  getPointAtLength(distance: number): Point;
}

const INVALID_INPUT = "Invalid input";

export function isFiniteNumber(number: number): boolean {
  return typeof number === "number" && isFinite(number);
}

export function addPoints(ring: Array<[number, number]>, numPoints: number) {
  const desiredLength = ring.length + numPoints,
    step = polygonLength(ring) / numPoints;

  let i = 0,
    cursor = 0,
    insertAt = step / 2;

  while (ring.length < desiredLength) {
    let a = ring[i],
      b = ring[(i + 1) % ring.length],
      segment = distance(a, b);

    if (insertAt <= cursor + segment) {
      ring.splice(
        i + 1,
        0,
        segment
          ? pointAlong(a, b, (insertAt - cursor) / segment)
          : [a[0], a[1]],
      );
      insertAt += step;
      continue;
    }

    cursor += segment;
    i++;
  }
}

export function bisect(
  ring: Array<[number, number]>,
  maxSegmentLength = Infinity,
) {
  for (let i = 0; i < ring.length; i++) {
    let a = ring[i],
      b = i === ring.length - 1 ? ring[0] : ring[i + 1];

    // Could splice the whole set for a segment instead, but a bit messy
    while (distance(a, b) > maxSegmentLength) {
      b = pointAlong(a, b, 0.5);
      ring.splice(i + 1, 0, b);
    }
  }
}

export function interpolatePoints(
  a: [number, number][],
  b: [number, number][],
  string: boolean,
) {
  let interpolators = a.map((d, i) => interpolatePoint(d, b[i]));

  return function (t: number) {
    let values = interpolators.map((fn) => fn(t));
    return string ? toPathString(values) : values;
  };
}

export function interpolatePoint(a: [number, number], b: [number, number]) {
  return function (t: number): [number, number] {
    return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
  };
}

export function distance(a: [number, number], b: [number, number]) {
  return Math.sqrt(
    (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]),
  );
}

export function samePoint(a: [number, number], b: [number, number]) {
  return distance(a, b) < 1e-9;
}

export function pointAlong(
  a: [number, number],
  b: [number, number],
  pct: number,
): [number, number] {
  return [a[0] + (b[0] - a[0]) * pct, a[1] + (b[1] - a[1]) * pct];
}

function parse(str: string) {
  return new SvgPath(str).abs();
}

function split(parsed: ReturnType<typeof parse>) {
  return parsed
    .toString()
    .split("M")
    .map((d: string, i: number) => {
      d = d.trim();
      return i && d ? "M" + d : d;
    })
    .filter((d: string) => d);
}

export function toPathString(ring: Array<[number, number]>): string {
  return "M" + ring.join("L") + "Z";
}

export function splitPathString(str: string) {
  return split(parse(str));
}

function exactRing(parsed: ReturnType<typeof parse>): RingResult | false {
  let segments = (parsed as any).segments || [],
    ring: [number, number][] = [];

  if (!segments.length || segments[0][0] !== "M") {
    return false;
  }

  for (let i = 0; i < segments.length; i++) {
    let [command, x, y] = segments[i];
    if ((command === "M" && i) || command === "Z") {
      break;
    } else if (command === "M" || command === "L") {
      ring.push([x, y]);
    } else if (command === "H") {
      ring.push([x, ring[ring.length - 1][1]]);
    } else if (command === "V") {
      ring.push([ring[ring.length - 1][0], x]);
    } else {
      return false;
    }
  }

  return ring.length ? { ring } : false;
}

function measure(d: string) {
  // Use native browser measurement if running in browser
  if (typeof window !== "undefined" && window && window.document) {
    try {
      let path = window.document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttributeNS(null, "d", d);
      return path;
    } catch (e) {
      console.error(e);
    }
  }
  // Fall back to svg-path-properties
  return new svgPathProperties(d);
}

function approximateRing(
  parsed: ReturnType<typeof parse>,
  maxSegmentLength?: number,
): RingResult {
  let ringPath = split(parsed)[0],
    ring: [number, number][] = [],
    len: number,
    m: SVGPathElement,
    numPoints = 3;

  if (!ringPath) {
    throw new TypeError(INVALID_INPUT);
  }

  m = measure(ringPath);
  len = m.getTotalLength();

  if (
    maxSegmentLength &&
    isFiniteNumber(maxSegmentLength) &&
    maxSegmentLength > 0
  ) {
    numPoints = Math.max(numPoints, Math.ceil(len / maxSegmentLength));
  }

  for (let i = 0; i < numPoints; i++) {
    let p = m.getPointAtLength((len * i) / numPoints);
    ring.push([p.x, p.y]);
  }

  return {
    ring,
    skipBisect: true,
  };
}

export function pathStringToRing(
  str: string,
  maxSegmentLength?: number,
): RingResult {
  let parsed = parse(str);

  return exactRing(parsed) || approximateRing(parsed, maxSegmentLength);
}

export function normalizeRing(
  ring: string | [number, number][],
  maxSegmentLength?: number,
): [number, number][] {
  let points: [number, number][], area: number, skipBisect: boolean | undefined;

  if (typeof ring === "string") {
    let converted = pathStringToRing(ring, maxSegmentLength);
    ring = converted.ring;
    skipBisect = converted.skipBisect || false;
  } else if (!Array.isArray(ring)) {
    throw new TypeError(INVALID_INPUT);
  }

  points = ring.slice(0);

  if (!validRing(points)) {
    throw new TypeError(INVALID_INPUT);
  }

  if (points.length > 1 && samePoint(points[0], points[points.length - 1])) {
    points.pop();
  }

  area = polygonArea(points);

  if (area > 0) {
    points.reverse();
  }

  if (
    !skipBisect &&
    maxSegmentLength &&
    isFiniteNumber(maxSegmentLength) &&
    maxSegmentLength > 0
  ) {
    bisect(points, maxSegmentLength);
  }

  return points;
}

function validRing(ring: [number, number][]): boolean {
  return ring.every(function (point: [number, number]) {
    return (
      Array.isArray(point) &&
      point.length >= 2 &&
      isFiniteNumber(point[0]) &&
      isFiniteNumber(point[1])
    );
  });
}

export function rotate(
  ring: Array<[number, number]>,
  vs: Array<[number, number]>,
) {
  let len = ring.length,
    min = Infinity,
    bestOffset: number | undefined,
    sumOfSquares = 0,
    spliced: [number, number][] | undefined;

  for (let offset = 0; offset < len; offset++) {
    sumOfSquares = 0;

    vs.forEach(function (p, i) {
      let d = distance(ring[(offset + i) % len], p);
      sumOfSquares += d * d;
    });

    if (sumOfSquares < min) {
      min = sumOfSquares;
      bestOffset = offset;
    }
  }

  if (bestOffset) {
    spliced = ring.splice(0, bestOffset);
    ring.splice(ring.length, 0, ...spliced);
  }
}

export function interpolateRing(
  fromRing: [number, number][],
  toRing: [number, number][],
  string: boolean,
) {
  let diff: number;

  diff = fromRing.length - toRing.length;

  addPoints(fromRing, diff < 0 ? diff * -1 : 0);
  addPoints(toRing, diff > 0 ? diff : 0);

  rotate(fromRing, toRing);

  return interpolatePoints(fromRing, toRing, string);
}

export function interpolate(
  fromShape: string | [number, number][],
  toShape: string | [number, number][],
  { maxSegmentLength = 10, string = true }: InterpolatorOptions = {},
) {
  let fromRing = normalizeRing(fromShape, maxSegmentLength),
    toRing = normalizeRing(toShape, maxSegmentLength),
    interpolator = interpolateRing(fromRing, toRing, string);

  // console.log({ fromShape, fromRing, toShape, toRing });

  if (
    !string ||
    (typeof fromShape !== "string" && typeof toShape !== "string")
  ) {
    return interpolator;
  }

  return (t: number) => {
    if (t < 1e-4 && typeof fromShape === "string") {
      return fromShape;
    }
    if (1 - t < 1e-4 && typeof toShape === "string") {
      return toShape;
    }
    return interpolator(t);
  };
}
