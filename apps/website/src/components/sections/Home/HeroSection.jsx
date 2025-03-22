import { ArabicDialectsAnimationV2 } from "@components/aralects-animation";
import { TextReveal } from "@components/text-reveal";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[1750px] w-full">
      {/* <img
        src="/img/imgUnav1.png"
        alt=""
        className="absolute h-[60px] object-contain opacity-40"
      />
      <img
        src="/img/imgUnav2.png"
        alt=""
        className="absolute h-20 object-contain opacity-50 lg:h-[130px]"
      />
      <img
        src="/img/art222.png"
        alt=""
        className="absolute w-[130px] object-contain lg:w-[210px]"
      />
      <img
        src="/img/imgUhero1.png"
        alt=""
        className="absolute h-[100px] object-contain md:h-[140px]"
      />
      <img
        src="/img/imgUhero2.png"
        alt=""
        className="absolute h-[200px] w-auto object-contain md:h-[260px]"
      /> */}

      {/* Subheading with Arabic and Dialect */}
      <div className="font-Melodrama md:font-UnboundedRegular sticky top-1/2 flex -translate-y-1/2 select-none flex-col items-center text-center text-4xl text-[#393939] md:text-5xl">
        <h1>
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.5,
              y: {
                delay: 0.1,
                duration: 1,
                ease: 'easeOut',
              },
            }}
            className="inline-block"
          >
            Connecting
          </motion.span>
          <motion.span
            className="ml-2 md:ml-4 inline-block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.4,
              duration: 1.5,
              y: {
                delay: 0.5,
                duration: 1,
                ease: 'easeOut',
              },
            }}
          >
            cultures,
          </motion.span>
        </h1>
        <h1 className="py-2">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 2,
              duration: 1.5,
              y: {
                delay: 2,
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
            className="inline-block"
          >
            one
          </motion.span>
          <ArabicDialectsAnimationV2 className="ml-2" />
        </h1>
        <h1>
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 2.45,
              duration: 1.5,
              y: {
                delay: 2.45,
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
            className="inline-block"
          >
            at
          </motion.span>
          <motion.span
            className="ml-2 md:ml-4 inline-block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 2.6,
              duration: 1.5,
              y: {
                delay: 2.6,
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
          >
            a
          </motion.span>
          <motion.span
            className="ml-2 md:ml-4 inline-block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 2.75,
              duration: 1.5,
              y: {
                delay: 2.75,
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
          >
            time.
          </motion.span>
        </h1>
      </div>
    </section>
  );
};
{
  /* <button
  onClick={() => smoothScrollTo("newsletter", 80)}
  className="font-SpaceGrotesk tex-lg group mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#8262b0] px-5 py-2 text-[#8262b0] shadow-md transition-all hover:bg-[#8262b0] hover:text-white md:text-xl"
>
  Join waiting list
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-2 -translate-x-1 transition-transform group-hover:translate-x-0"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
</button>; */
}

export default HeroSection;
