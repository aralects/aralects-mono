import { smoothScrollTo } from "src/utils/newsletter";

const HeroSection = () => {
  return (
    <section className="relative flex w-full flex-col items-center justify-between overflow-hidden px-5 pb-20 pt-40 text-center md:px-10 md:pb-0">
      {/* Background 2 images under navbar */}
      <div className="absolute -end-[80px] top-10 -z-[1] mt-0 flex w-screen justify-around lg:-top-[30px] lg:left-[45%] lg:w-1/2 lg:justify-between">
        <img
          src="/img/imgUnav1.png"
          alt=""
          className="mb-5 h-[60px] self-end object-contain opacity-40 md:mb-0 md:self-auto lg:h-[100%]"
        />
        <img
          src="/img/imgUnav2.png"
          alt=""
          className="mt-10 h-[80px] object-contain opacity-50 lg:h-[130px]"
        />
      </div>

      {/* Background Image in the middle */}
      <div className="absolute -left-8 top-[45%] -z-[1] h-full w-full lg:left-[4%] lg:top-[25%]">
        <img
          src="/img/art222.png"
          alt=""
          className="w-[130px] object-contain lg:w-[210px]"
        />
      </div>

      {/* Heading */}
      <h1 className="font-Melodrama md:font-UnboundedRegular text-4xl text-[#393939] md:text-7xl">
        Connecting cultures,
      </h1>

      {/* Subheading with Arabic and Dialect */}
      <h1 className="font-Melodrama md:font-UnboundedRegular text-4xl text-[#393939] md:py-5 md:text-7xl">
        one
        <span className="font-SpaceGrotesk ml-5 rounded-lg text-4xl font-[600] text-[#8262b0] md:bg-[#8262b0] md:px-5  md:text-7xl md:text-white">
          Arabic
        </span>
        <span className="font-SpaceGrotesk ml-3 rounded-lg text-4xl font-[600] text-[#8262b0] md:bg-[#8262b0] md:px-5 md:text-7xl md:text-white">
          dialect
        </span>
      </h1>

      {/* Closing Line */}
      <h1 className="font-Melodrama md:font-UnboundedRegular text-4xl text-[#393939] md:text-7xl">
        at a time.
      </h1>

      <div className="absolute -end-5 top-[60%] -z-[1] flex w-screen justify-between md:end-[10%] md:top-[52%] lg:w-[70%] ">
        <img
          src="/img/imgUhero1.png"
          alt=""
          className="-z-[1] mb-10 h-[100px] self-end object-contain md:h-[140px]"
        />
        <img
          src="/img/imgUhero2.png"
          alt=""
          className="-z-[1] h-[200px] w-auto object-contain md:h-[260px]"
        />
      </div>

      {/* Button */}
      <button
        onClick={() => smoothScrollTo("newsletter", 80)}
        className="font-SpaceGrotesk tex-lg group mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#8262b0] px-5 py-2 text-[#8262b0] shadow-md transition-all hover:bg-[#8262b0] hover:text-white md:text-2xl"
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
    </section>
  );
};

export default HeroSection;
