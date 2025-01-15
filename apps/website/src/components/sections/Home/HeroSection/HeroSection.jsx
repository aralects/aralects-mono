import { MoveRight } from "lucide";
import React from "react";

const HeroSection = () => {
  return (
    <section className="text-center relative pb-[80px] md:pb-0 leading-10 w-full pt-[100px] overflow-hidden flex flex-col px-5 md:px-10 items-center justify-between md:space-y-11 ">

      {/* Background 2 images under navbar */}
      <div className="mt-0 absolute flex w-screen lg:w-1/2 justify-around lg:justify-between -end-[80px] lg:left-[45%] top-10 lg:-top-[30px]">
        <img src="/images/imgUnav1.png" alt="" className="lg:h-[100%] self-end md:self-auto mb-5 md:mb-0 h-[60px] object-contain opacity-40" />
        <img
          src="/images/imgUnav2.png"
          alt=""
          className="mt-10 lg:h-[130px] h-[80px] object-contain opacity-50"
        />
      </div>

      {/* Background Image in the middle */}
      <div className="absolute top-[45%] lg:top-[25%] -left-8 lg:left-[4%] w-full h-full">
        <img src="/images/art222.png" alt="" className="w-[130px] object-contain lg:w-[210px]" />
      </div>
      
      {/* Heading */}
      <h1 className="text-[34px] md:text-[80px] text-[#393939] mt-[4rem]  font-[400] font-Melodrama md:font-UnboundedRegular">
        Connecting cultures,
      </h1>

      {/* Subheading with Arabic and Dialect */}
      <h1 className="text-[34px] md:text-[80px] text-[#393939]  md:py-5 font-[400] font-Melodrama md:font-UnboundedRegular">
        one
        <span className="md:text-white text-[#8262b0] ml-5 text-[34px] md:text-[80px] md:bg-[#8262b0] font-SpaceGrotesk font-[600]  md:px-5 rounded-lg">
          Arabic
        </span>
        <span className="md:text-white text-[#8262b0] font-SpaceGrotesk font-[600] ml-3 text-[34px] md:text-[80px] md:bg-[#8262b0] md:px-5 rounded-lg">
          dialect
        </span>
      </h1>

      {/* Closing Line */}
      <h1 className="text-[34px] md:text-[70px] text-[#393939] md:mt-[7rem] font-[400] font-Melodrama md:font-UnboundedRegular">
        at a time.
      </h1>

      <div className="lg:w-[70%] w-screen absolute top-[60%] md:top-[52%] -end-5 md:end-[10%] flex justify-between ">
        <img
          src="/images/imgUhero1.png"
          alt=""
          className=" md:h-[140px] h-[100px] object-contain self-end mb-10"
        />
        <img src="/images/imgUhero2.png" alt="" className="md:h-[260px] h-[200px]  w-auto object-contain" />
      </div>

      {/* Button */}
      <button className="mt-6 border font-SpaceGrotesk tex-[17px] lg:text-[29px] flex gap-2 items-center border-[#8262b0] text-[#8262b0] w-fit px-5 md:px-5 md:py-2 rounded-full shadow-md transition-all">
        Join waiting list
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-right"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>

      <button className="md:bg-[#9e9e9e] w-[150px] text-[14px] md:text-gray-100 text-start font-SpaceGrotesk  px-5 rounded-full">
      Join waiting list
        
      </button>
    </section>
  );
};

export default HeroSection;
