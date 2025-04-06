import type React from "react";
import { ScrollAnimatedText } from "./scroll-animated-text";

export function WhyAralectsContent(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div {...props}>
      <ScrollAnimatedText
        viewport={{
          once: true,
          amount: 1,
          margin: "0px 0px -25%",
        }}
        staggerDelay={0.025}
        className="font-space text-2xl font-bold md:text-5xl"
      >
        Why <span className="text-glow-xl text-purple-200">Aralects</span>?
      </ScrollAnimatedText>

      <ScrollAnimatedText
        viewport={{
          once: true,
          amount: 1,
          margin: "0px 0px -25%",
        }}
        staggerDelay={0.015}
        transition={{
          delay: 0.2,
        }}
        className="font-SpaceGroteskLight mt-6 font-thin text-gray-300 md:text-xl"
      >
        Learning Arabic today is challenging. Most apps focus on rigid lessons
        and miss the immersive, life-scenario conversations that bring Arabic to
        life.
      </ScrollAnimatedText>
      <ScrollAnimatedText
        viewport={{
          once: true,
          amount: 1,
          margin: "0px 0px -25%",
        }}
        staggerDelay={0.015}
        transition={{
          delay: 0.4,
        }}
        className="text-glow font-SpaceGroteskLight mt-4 font-light text-[#EADFFF] md:text-xl"
      >
        Aralects is changing that. We're creating an app that transforms how you
        connect with the language.
      </ScrollAnimatedText>
    </div>
  );
}
