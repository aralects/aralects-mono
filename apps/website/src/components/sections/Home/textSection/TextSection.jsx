import React from "react";
import { CiCirclePlus } from "react-icons/ci";

function TextSection() {
  return (
    <div className=" md:w-full flex rounded-2xl  relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] md:shadow-none w-[90%] flex-col gap-3 items-center m-auto md:px-5">
      <img
        src="/images/art123.png"
        alt=""
        className=" absolute -z-10 -top-[100px]"
      />
      {/* Sign-Up Button */}
    

      {/* Heading */}
      <h1 className="text-[25px] md:text-[30px] leading-5 mt-5 text-gray-600 font-Melodrama font-[700] md:font-UnboundedRegular text-center md:font-[400] ">
        Arabic is a world of dialects, <br className="md:hidden"/> stories, and connections
      </h1>

      {/* Subheading */}
      <h2 className="font-SpaceGrotesk text-center md:mb-10 text-[15px] md:mt-5 md:text-[1.4rem] md:leading-6 font-normal text-gray-600  md:max-w-[700px]">
        While learners focus on Standard Arabic{" "}<br className="md:hidden"/>
        <span
          className={`bg-[url("/images/FushaBG.png")] font-SpaceGrotesk bg-no-repeat bg-center bg-contain inline-block w-fit px-1 md:px-4 py-1 text-white`}
        >
          Fusha
        </span>
        <br className="hidden md:block" /> the real magic lies in spoken
        Arabic{" "}<br className="md:hidden"/>
        <span
          className={`bg-[url("/images/AmmiyyaBG.png")] font-SpaceGrotesk bg-no-repeat bg-center bg-contain inline-block w-fit px-1 md:px-4 py-2 text-white`}
        >
          Ammiyya
        </span>
        –<br className="hidden md:block"/>
        the jokes, slang, and warmth of <br className="md:hidden"/> everyday life
      </h2>
    </div>
  );
}

export default TextSection;
