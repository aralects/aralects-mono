import { smoothScrollTo } from "src/utils/newsletter";
import IphoneSvg from "../../../../assets/iphone-svg";
import { cn } from "@repo/ui";

const UnderConstructionMarquee = ({ className }) => {
  return (
    <div
      className={cn(
        "overflow-hidden border border-[#BDA3E2] bg-[#42463B] py-2 capitalize text-[#BDA3E2]",
        className,
      )}
    >
      <div className="animate-infinite-scroll flex flex-nowrap items-center gap-x-8">
        <span className="whitespace-nowrap text-xl font-semibold">
          UNDER CONSTRUCTION
        </span>
        <span className="text-xs">x</span>
        <span className="whitespace-nowrap text-xl font-semibold">
          UNDER CONSTRUCTION
        </span>
        <span className="text-xs">x</span>
        <span className="whitespace-nowrap text-xl font-semibold">
          UNDER CONSTRUCTION
        </span>
        <span className="text-xs">x</span>
        <span className="whitespace-nowrap text-xl font-semibold">
          UNDER CONSTRUCTION
        </span>
        <span className="text-xs">x</span>
        <span className="whitespace-nowrap text-xl font-semibold">
          UNDER CONSTRUCTION
        </span>
      </div>
    </div>
  );
};

const PhoneMockup = () => {
  return (
    // py is 24px in reality (the iphone has an invisible margin)
    <div className="relative isolate py-[5px]">
      <IphoneSvg className="h-[756px] w-96" />
      <div className="absolute inset-6 -z-[1] flex overflow-hidden rounded-[4rem] bg-white shadow-[0px_10px_10px_rgb(0_0_0_/_0.4)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="141"
          height="145"
          viewBox="0 0 141 145"
          fill="none"
          className="z-[1] m-auto -translate-y-14 translate-x-2 scale-125"
        >
          <path
            d="M59.7256 24.952C26.7315 24.952 0 51.7255 0 84.7196C0 117.714 26.7736 144.487 59.7256 144.487C71.158 144.487 81.8758 141.251 90.9544 135.703L99.7389 144.487H119.493V84.7196C119.493 51.7255 92.7197 24.952 59.7256 24.952ZM67.2071 119.647H64.0128C56.9516 119.647 51.1934 113.889 51.1934 106.828V53.3227H59.6836C63.8446 53.3227 67.2071 56.6851 67.2071 60.8462V119.647Z"
            fill="#8262B0"
          />
          <path
            d="M109.059 16.0774V31.6548H114.203L116.499 29.3596C118.869 30.8109 121.653 31.6548 124.637 31.6548C133.232 31.6548 140.209 24.6831 140.209 16.0774C140.209 7.47167 133.232 0.5 124.631 0.5C116.031 0.5 109.059 7.47167 109.059 16.0774Z"
            fill="#F26B6D"
          />
        </svg>

        <UnderConstructionMarquee className="absolute -left-1/2 -right-1/2 top-[70%] origin-center -rotate-[30deg]" />
        <UnderConstructionMarquee className="absolute -left-1/2 -right-1/2 top-[60%] origin-center rotate-[30deg]" />
      </div>
    </div>
  );
};

function ArabicAsComunity() {
  return (
    <div className="relative my-10 flex w-full flex-col justify-between px-5 md:my-9 md:flex-row md:px-20 lg:px-20">
      {/* Background Image */}
      <img
        src="/img/ArabicAsComunityBg.jpg"
        alt=""
        className="absolute bottom-0 left-0 -z-10 hidden w-[150%] md:block"
      />

      {/* Text Content */}
      <div className="z-30 flex w-full flex-col justify-center text-white md:w-[60%]">
        <h2 className="font-SpaceGrotesk max-w-[540px] text-2xl font-bold md:text-6xl">
          Arabic, as a community, for the community.
        </h2>

        <p className="font-SpaceGroteskLight mt-6 w-full font-thin md:w-[80%] md:text-2xl">
          Want to be the first to experience Aralects? Sign up now to be among
          the first to explore Aralects as we get ready to launch!
        </p>
        <button
          onClick={() => smoothScrollTo("newsletter", 80)}
          className="font-SpaceGrotesk tex-lg group mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#8262b0] bg-white px-5 py-2 text-[#8262b0] shadow-md transition-all hover:bg-white/90 md:text-2xl"
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
        </button>
      </div>

      {/* Mobile Image */}
      <div className="hidden justify-center md:flex">
        <PhoneMockup />
      </div>
    </div>
  );
}

export default ArabicAsComunity;
