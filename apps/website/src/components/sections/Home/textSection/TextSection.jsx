import React from "react";
import { CiCirclePlus } from "react-icons/ci";

function TextSection() {
  return (
    <div className=" relative m-auto  mt-10 flex w-full flex-col items-center gap-3 px-5">
      <img
        src="/images/art123.png"
        alt=""
        className=" absolute -top-20 -z-10"
      />
      {/* Sign-Up Button */}
      {/* <button className="bg-[#9e9e9e] text-gray-100 flex items-center py-2 px-4 rounded-full hover:bg-gray-700 transition-all">
        Sign Up
        <CiCirclePlus color="#fff" size={20} className="ml-2" />
      </button> */}

      {/* Heading */}
      <h1 className="font-Melodrama mt-5 text-center text-[1.2rem] font-medium leading-5 text-gray-600 md:text-[2rem] ">
        Arabic is a world of dialects, stories, and connections
      </h1>

      {/* Subheading */}
      <h2 className="font-SpaceGrotesk text-center text-[0.7rem] font-normal leading-6 text-gray-600 md:mb-10 md:mt-5 md:max-w-[700px]  md:text-[1.4rem]">
        While learners focus on Standard Arabic{" "}
        <span
          className={`font-SpaceGrotesk inline-block w-fit bg-[url("/public/images/FushaBG.png")] bg-contain bg-center bg-no-repeat px-4 py-1 text-white`}
        >
          Fusha
        </span>
        <br /> the real <span className="Melodrama">magic</span> lies in spoken
        Arabic{" "}
        <span
          className={`font-SpaceGrotesk inline-block w-fit bg-[url("/public/images/AmmiyyaBG.png")] bg-contain bg-center bg-no-repeat px-4 py-2 text-white`}
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
