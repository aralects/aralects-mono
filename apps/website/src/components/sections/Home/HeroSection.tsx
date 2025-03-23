import { AralectsAnimationV2 } from "@components/aralects-animation";
import { FloatingBlobs } from "@components/floating-blobs";
import { ScrollContextProvider } from "@components/scroll-context";
import TextScrollReveal from "@components/text-scroll-reveal";

const HeroSection = () => {
  return (
    <ScrollContextProvider>
      <FloatingBlobs className="absolute inset-0 z-0 overflow-hidden" />
      <div className="sticky inset-x-0 top-0 flex h-svh items-center justify-center overflow-hidden">
        <AralectsAnimationV2 className="text-center text-3xl text-[#393939] md:text-5xl" />
      </div>

      {/* <TextScrollReveal
          paragraph="Arabic is a world of dialects, stories, and connections."
          className="font-UnboundedRegular text-center mt-[3000px] container px-4 mx-auto text-3xl text-white md:text-4xl"
          offset={["start 0.9", "start 0.4"]}
        />

        <TextScrollReveal
          paragraph="While the focus is generally on Standard Arabic (Fusha), the real magic lies in spoken Arabic (Ammiyya) - the jokes, slang, and warmth of everyday life."
          className="font-UnboundedRegular text-center container px-4 mx-auto mt-[800px] text-xl md:text-4xl text-white"
          offset={["start 0.9", "start 0.4"]}
        /> */}
    </ScrollContextProvider>
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
