/**
 * TypeScript implementation of the Intersection Observer for animation effects
 * Inspired by: https://github.com/heidkaemper/tailwindcss-intersect
 */

// Extend HTMLElement to include the _intersectionThreshold property
declare global {
  interface HTMLElement {
    _intersectionThreshold: number;
  }
}

interface ObserverInterface {
  observer: IntersectionObserver | null;
  delayBetweenAnimations: number;
  animationCounter: number;
  start: () => void;
  reset: () => void;
}

const Observer: ObserverInterface = {
  observer: null,
  delayBetweenAnimations: 50,
  animationCounter: 0,

  /**
   * Starts the intersection observer and registers all elements with intersect classes
   */
  start(): void {
    const selectors = [
      '[class*=" intersect:"]',
      '[class*=":intersect:"]',
      '[class^="intersect:"]',
      '[class="intersect"]',
      '[class*=" intersect "]',
      '[class^="intersect "]',
      '[class$=" intersect"]',
    ];

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(",")),
    );

    const getThreshold = (element: HTMLElement): number => {
      if (element.classList.contains("intersect-full")) return 0.99;
      if (element.classList.contains("intersect-half")) return 0.5;
      if (element.classList.contains("intersect-quarter")) return 0.25;
      return 0;
    };

    elements.forEach((el) => {
      // Make sure elements start with no-intersect attribute
      el.setAttribute("no-intersect", "");
      el._intersectionThreshold = getThreshold(el);

      // Also clear any previously set animation state
      if (el.hasAttribute("data-animated")) {
        el.removeAttribute("data-animated");
      }
    });

    const callback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        requestAnimationFrame(() => {
          const target = entry.target as HTMLElement;
          const intersectionRatio = entry.intersectionRatio;
          const threshold = target._intersectionThreshold;

          if (target.classList.contains("intersect-no-queue")) {
            if (entry.isIntersecting) {
              target.removeAttribute("no-intersect");
              if (target.classList.contains("intersect-once")) {
                this.observer?.unobserve(target);
              }
            } else {
              target.setAttribute("no-intersect", "");
            }
            return;
          }

          if (entry.isIntersecting && intersectionRatio >= threshold) {
            if (!target.hasAttribute("data-animated")) {
              target.removeAttribute("no-intersect");
              target.setAttribute("data-animated", "true");

              // Check if there's a custom delay set on the element
              let delay: number;
              if (target.hasAttribute("data-transition-delay")) {
                delay = parseInt(
                  target.getAttribute("data-transition-delay") || "0",
                  10,
                );
              } else {
                delay = this.animationCounter * this.delayBetweenAnimations;
                this.animationCounter++;
              }

              target.style.transitionDelay = `${delay}ms`;
              target.style.animationDelay = `${delay}ms`;

              if (target.classList.contains("intersect-once")) {
                this.observer?.unobserve(target);
              }
            }
          } else {
            target.setAttribute("no-intersect", "");
            target.removeAttribute("data-animated");
            target.style.transitionDelay = "";
            target.style.animationDelay = "";

            this.animationCounter = 0;
          }
        });
      });
    };

    this.observer = new IntersectionObserver(callback.bind(this), {
      threshold: [0, 0.25, 0.5, 0.99],
      rootMargin: "0px 0px -5% 0px",
    });

    elements.forEach((el) => {
      this.observer?.observe(el);
    });
  },

  /**
   * Resets the observer and disconnects any active observations
   */
  reset(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.animationCounter = 0;
  },
};

export default Observer;
