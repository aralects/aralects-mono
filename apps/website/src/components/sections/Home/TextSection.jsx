import React from "react";
import { CiCirclePlus } from "react-icons/ci";

function TextSection() {
  return (
    <div className="relative mx-auto flex w-[90%] flex-col items-center gap-3 rounded-2xl py-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] md:mt-12 md:w-full md:px-5 md:shadow-none">
      <img
        src="/img/art123.png"
        alt=""
        className=" absolute -top-[100px] -z-10"
      />
      {/* Sign-Up Button */}

      {/* Heading */}
      <h1 className="font-Melodrama md:font-UnboundedRegular max-w-[340px] text-center text-2xl font-bold text-[#393939] md:max-w-[unset] md:text-xl">
        Arabic is a world of dialects, stories, and connections
      </h1>

      {/* Subheading */}
      <h2 className="font-SpaceGrotesk mt-8 max-w-[360px] text-center text-gray-600 md:max-w-[740px] md:text-xl">
        While learners focus on Standard Arabic{" "}
        <span
          className={`font-SpaceGrotesk inline-block w-fit bg-[url("/img/FushaBG.png")] bg-contain bg-center bg-no-repeat px-1 py-1 text-white md:px-4`}
        >
          Fusha
        </span>
        , the real magic lies in spoken Arabic{" "}
        <span
          className={`font-SpaceGrotesk inline-block w-fit bg-[url("/img/AmmiyyaBG.png")] bg-contain bg-center bg-no-repeat px-1 py-2 text-white md:px-4`}
        >
          Ammiyya
        </span>{" "}
        - the jokes, slang, and warmth of everyday life.
      </h2>
    </div>
  );
}

export default TextSection;
