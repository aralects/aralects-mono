import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
