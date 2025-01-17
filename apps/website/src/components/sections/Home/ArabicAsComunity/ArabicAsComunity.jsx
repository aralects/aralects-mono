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
    <div className="relative isolate">
      <IphoneSvg className="w-96" />
      <div className="absolute inset-x-8 inset-y-[7.5rem] -z-[1] flex overflow-hidden rounded-[2.85rem] bg-white">
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
    <div className="relative flex w-full flex-col justify-between px-5 py-10 md:flex-row md:px-20 md:py-16 lg:px-20">
      {/* Background Image */}
      <img
        src="/img/ArabicAsComunityBg.jpg"
        alt=""
        className="absolute bottom-0 left-0 -z-10 w-[150%]"
      />

      {/* Text Content */}
      <div className="z-30 flex w-full flex-col justify-center gap-4 text-white md:w-[60%]">
        <h2 className="font-SpaceGrotesk text-4xl font-bold md:text-7xl">
          Arabic, as a community, for the community.
        </h2>

        <p className="font-SpaceGroteskLight w-full font-thin md:w-[80%] md:text-2xl">
          Want to be the first to experience Aralects? Sign up now to be among
          the first to explore Aralects as we get ready to launch!
        </p>
        <button className="font-SpaceGrotesk mt-6 flex w-fit items-center rounded-full bg-gray-100 px-5 py-2 font-medium text-[#8262B0] md:text-xl">
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
            className="ml-2"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </button>
      </div>

      {/* Mobile Image */}
      <div className="mt-8 hidden justify-center md:mt-0 md:flex">
        <PhoneMockup />
      </div>
    </div>
  );
}

export default ArabicAsComunity;
