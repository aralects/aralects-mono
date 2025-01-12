import React from "react";
import { GoArrowRight } from "react-icons/go";

const HeroSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-between px-10 text-center md:space-y-8 md:pt-10 ">
      {/* Heading */}
      <h1 className="Melodrama mt-[8rem] text-3xl text-[#4e4e4e] md:text-6xl">
        Connecting cultures,
      </h1>

      {/* Subheading with Arabic and Dialect */}
      <h1 className="Melodrama text-3xl text-[#4e4e4e] md:text-6xl">
        one
        <span className="font-SpaceGrotesk ml-5 rounded-lg bg-[#8262b0] px-2 py-1 text-xl font-[500] text-white md:px-8 md:text-5xl">
          Arabic
        </span>
        <span className="font-SpaceGrotesk ml-5 rounded-lg bg-[#8262b0] px-2 py-1 text-xl font-[500] text-white md:px-8 md:text-5xl">
          dialect
        </span>
      </h1>

      {/* Closing Line */}
      <h1 className="Melodrama text-3xl text-[#4e4e4e] md:text-7xl">
        at a time.
      </h1>

      {/* Button */}
      {/* <button className="mt-6 border flex font-semibold gap-2 items-center border-[#8262b0] text-[#8262b0] w-fit px-6 py-2 rounded-full shadow-md transition-all">
        Sign up now <GoArrowRight/>
      </button> */}
    </section>
  );
};

export default HeroSection;
