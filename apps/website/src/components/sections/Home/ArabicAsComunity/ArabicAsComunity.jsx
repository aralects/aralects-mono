import React from "react";

import { GoArrowRight } from "react-icons/go";

function ArabicAsComunity() {
  return (
    <div className=" lg:px-[5.5rem] w-full px-5 md:px-20 py-10 md:py-16 flex flex-col md:flex-row justify-between relative">
      {/* Background Image */}
      <img
        src="/images/ArabicAsComunityBg.jpg"
        alt=""
        className="absolute w-[150%] bottom-0 left-0 -z-10"
      />

      {/* Text Content */}
      <div className="flex flex-col gap-5 md:gap-5 px-1 z-30 justify-center text-white w-full md:w-[60%]">
        <h2 className="text-[34px] md:text-[72px] font-SpaceGrotesk md:leading-[70px] font-[700]">
        Arabic, as a community, for the community.
        </h2>

        <p className="text-[17px] font-SpaceGroteskLight font-[100] md:text-[24px] w-full md:w-[80%] md:leading-8">
          Want to be the first to experience Aralects?
          Sign up now to be among the first to explore Aralects as we get ready
          to launch!
        </p>
        <button className="rounded-full font-[500] mt-5 text-[17px] md:text-[20px] flex text-[#8262B0] font-SpaceGrotesk w-fit items-center px-5 py-2 bg-gray-100">
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
            class="lucide lucide-move-right ml-2"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </button>
      </div>

      {/* Mobile Image */}
      <div className=" hidden md:flex justify-center mt-8 md:mt-0">
        <img
          src="/images/PhoneMockup.png"
          alt=""
          className="w-[80%] md:w-auto max-w-sm"
        />
      </div>
    </div>
  );
}

export default ArabicAsComunity;
