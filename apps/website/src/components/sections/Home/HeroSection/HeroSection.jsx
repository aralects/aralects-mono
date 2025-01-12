import React from 'react';
import { GoArrowRight } from "react-icons/go";


const HeroSection = () => {
  return (
    <section className="text-center w-full flex flex-col md:pt-10 px-10 items-center justify-between md:space-y-8 ">
      {/* Heading */}
      <h1 className="text-3xl md:text-6xl mt-[8rem] text-[#4e4e4e] Melodrama">
        Connecting cultures,
      </h1>

      {/* Subheading with Arabic and Dialect */}
      <h1 className="text-3xl md:text-6xl text-[#4e4e4e] Melodrama">
        one
        <span className="text-white ml-5 text-xl md:text-5xl bg-[#8262b0] font-SpaceGrotesk font-[500] px-2 py-1 md:px-8 rounded-lg">
          Arabic
        </span>
        <span className="text-white font-SpaceGrotesk font-[500] ml-5 text-xl md:text-5xl bg-[#8262b0] px-2 py-1 md:px-8 rounded-lg">
          dialect
        </span>
      </h1>

      {/* Closing Line */}
      <h1 className="text-3xl md:text-7xl text-[#4e4e4e] Melodrama">
        at a time.
      </h1>

      {/* Button */}
      <button className="mt-6 border flex font-semibold gap-2 items-center border-[#8262b0] text-[#8262b0] w-fit px-6 py-2 rounded-full shadow-md transition-all">
        Sign up now <GoArrowRight/>
      </button>
    </section>
  );
};

export default HeroSection;
