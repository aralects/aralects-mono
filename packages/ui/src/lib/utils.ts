import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  prefix: "ui-",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PropsOf<T> =
  T extends React.ComponentType<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : T extends HTMLElement
        ? React.HTMLAttributes<T>
        : never;
