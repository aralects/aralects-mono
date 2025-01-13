import React from "react";
import { CiCirclePlus } from "react-icons/ci";

function TextSection() {
  return (
    <div className=" w-full flex  relative flex-col gap-3 items-center m-auto mt-10 px-5">
      <img
        src="/images/art123.png"
        alt=""
        className=" absolute -z-10 -top-20"
      />
      {/* Sign-Up Button */}
      <button className="bg-[#9e9e9e] text-gray-100 flex items-center py-2 px-4 rounded-full hover:bg-gray-700 transition-all">
        Sign Up
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-circle-plus ml-2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      </button>

      {/* Heading */}
      <h1 className="text-[1.2rem] md:text-[2rem] leading-5 mt-5 text-gray-600 font-Melodrama text-center font-medium ">
        Arabic is a world of dialects, stories, and connections
      </h1>

      {/* Subheading */}
      <h2 className="font-SpaceGrotesk text-center md:mb-10 text-[0.7rem] md:mt-5 md:text-[1.4rem] leading-6 font-normal text-gray-600  md:max-w-[700px]">
        While learners focus on Standard Arabic{" "}
        <span
          className={`bg-[url("/public/images/FushaBG.png")] font-SpaceGrotesk bg-no-repeat bg-center bg-contain inline-block w-fit px-4 py-1 text-white`}
        >
          Fusha
        </span>
        <br /> the real <span className="Melodrama">magic</span> lies in spoken
        Arabic{" "}
        <span
          className={`bg-[url("/public/images/AmmiyyaBG.png")] font-SpaceGrotesk bg-no-repeat bg-center bg-contain inline-block w-fit px-4 py-2 text-white`}
        >
          Ammiyya
        </span>
        –<br />
        the <span className="font-Melodrama ">jokes, slang</span>, and{" "}
        <span className="font-Melodrama">warmth</span> of everyday life
      </h2>
    </div>
  );
}

export default TextSection;
