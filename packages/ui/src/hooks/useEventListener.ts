// https://usehooks-ts.com/react-hook/use-event-listener

import { type RefObject, useEffect, useRef } from "react";

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  active?: boolean,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void;

// Element Event based useEventListener interface
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  active?: boolean,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void;

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  active?: boolean,
  element?: RefObject<Document>,
  options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KH,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event,
  ) => void,
  active = true,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  // create a ref that stores handler
  const savedHandler = useRef(handler);

  // update ref value if handler changes
  // this allows the effect below to always get latest handler
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // exit early if disabled
    if (!active) return;

    // define the listening target
    const targetElement: T | Window = element?.current ?? window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) =>
      savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener, options);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [active, eventName, element, options]);
}

export { useEventListener };
