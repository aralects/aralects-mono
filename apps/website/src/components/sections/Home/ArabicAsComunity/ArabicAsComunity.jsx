import React from "react";

import { GoArrowRight } from "react-icons/go";

function ArabicAsComunity() {
  return (
    <div className=" lg:px-[5.5rem] w-full px-10 md:px-20 py-16 flex flex-col md:flex-row justify-between relative">
      {/* Background Image */}
      <img
        src="/images/ArabicAsComunityBg.jpg"
        alt=""
        className="absolute w-full -bottom-10 left-0 -z-10"
      />

      {/* Text Content */}
      <div className="flex flex-col gap-7 px-1 justify-center text-white md:w-1/2">
        <h2 className="text-2xl md:text-[40px] font-SpaceGrotesk leading-[50px] font-[600]">
          Arabic, as a community, <br /> for the community.
        </h2>

        <p className="text-lg font-SpaceGrotesk font-light md:text-[1.3rem]">
          Want to be the first to experience Aralects? <br />
          Sign up now to be among the first to explore Aralects as we get ready
          to launch!
        </p>
        <button className="rounded-full font-medium flex text-purple-500 font-SpaceGrotesk w-fit items-center px-5 py-2 bg-gray-100">
          Try Demo now{" "}
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
            class="lucide lucide-move-right ml-2"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </button>
      </div>

      {/* Mobile Image */}
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          src="/images/Mobile.png"
          alt=""
          className="w-[80%] md:w-auto max-w-sm"
        />
      </div>
    </div>
  );
}

export default ArabicAsComunity;
