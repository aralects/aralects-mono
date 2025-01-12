import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const UnderConstruction = () => {
  return (
    <>
      {/* Add meta viewport tag to prevent unwanted zooming */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col items-center justify-center overflow-hidden bg-[#8262b0] pb-10 text-white">
        {/* Header Section */}
        <div className="mt-5 flex w-full items-center justify-between px-4 sm:px-6 lg:px-[150px]">
          {/* Logo */}
          <div className="flex flex-grow justify-center lg:justify-center">
            <img
              src="/images/logoForUnderCons.png"
              alt="Aralects Logo"
              className="h-auto w-[40%] object-contain sm:w-[30%] lg:w-52"
            />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="mb-40 flex flex-col items-center justify-between gap-8 px-6 sm:px-10 lg:mt-0 lg:flex-row lg:px-[150px]">
          {/* Text Content */}
          <div className="z-30 mt-10 text-left lg:mt-0 lg:w-1/2">
            <h1 className="font-SpaceGroteskLight mb-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-6xl">
              Page Under Construction
            </h1>
            <p className="font-SpaceGrotesk mb-5 text-base leading-relaxed text-white/80 sm:text-lg lg:text-lg">
              But don't worry, we're not just teaching the vocabulary for
              <span className="font-bold"> "patience"</span> in 10 different
              dialects—we're also busy building something amazing for you!
            </p>
            <p className="font-SpaceGrotesk text-base leading-relaxed text-white/80 sm:text-lg lg:text-lg">
              Stay tuned, and don't forget to brush up on your صبر (patience)
              skills while you wait. 😉
            </p>
          </div>

          {/* Mobile Image */}
          <div className="mx-auto flex w-full items-center justify-center lg:flex-1 lg:justify-end">
            <img
              src="/images/Mobile.png"
              alt="Mobile App Mockup"
              className="z-50 h-auto w-[300px]"
            />
          </div>
        </div>

        {/* Diagonal Construction Tape */}
        <div className="pointer-events-none absolute -bottom-[0.5rem] z-10 h-fit min-h-screen w-full overflow-hidden">
          <img
            src="/images/strip.png"
            alt=""
            className="absolute -right-[130px] bottom-0 h-auto w-full -rotate-3"
          />
          <img
            src="/images/strip2.png"
            alt=""
            className="absolute bottom-0 h-auto w-full"
          />
        </div>
      </div>
    </>
  );
};

export default UnderConstruction;
