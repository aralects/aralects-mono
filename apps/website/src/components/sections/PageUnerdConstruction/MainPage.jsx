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
      
      <div className="flex flex-col md:pt-[100px] pb-[160px] -z-30 bg-[#8262b0] overflow-hidden mx-auto min-h-screen lg:min-h-[110vh] relative text-white">
        {/* Header Section */}
        <div className="w-full px-4 sm:px-6 lg:px-[150px] mt-5 flex justify-between items-center">
          {/* Back Button */}
          {/* <button
            className="w-[40px] aspect-auto  lg:w-24 lg:h-24 flex items-center justify-center bg-white text-[#8262b0] rounded-full"
            aria-label="Back"
          >
            <IoIosArrowRoundBack size={25} />
          </button> */}

          {/* Logo */}
          {/* <div className="flex justify-center flex-grow lg:justify-center">
            <img
              src="/images/logoundercons.svg"
              alt="Aralects Logo"
              className="w-[40%] sm:w-[30%] lg:w-52 h-auto object-contain"
            />
          </div> */}
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col mt-[100px] lg:mt-0 lg:flex-row px-6 sm:px-10 lg:px-[150px] items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-left z-30 lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl mt-5 lg:text-6xl font-SpaceGroteskLight font-semibold mb-5 leading-tight">
              Page Under Construction
            </h1>
            <p className="text-base sm:text-[20] lg:text-[18px] font-SpaceGrotesk text-white/80 mb-5 leading-relaxed">
            But don’t worry, we’re not just learning the vocabulary for “patience” in 10 different dialects — we’re also busy building something amazing for you!
            </p>
            <p className="text-base sm:text-[20] lg:text-[18px] font-SpaceGrotesk text-white/80 leading-relaxed">
            At Aralects, we’re crafting the ultimate gamified, self-paced language learning experience to make mastering Arabic dialects as fun as binge-watching your favorite series (but way more productive).
              
            </p>
            <p className="text-base sm:text-lg mt-5 lg:text-[18px] font-SpaceGrotesk text-white/80 leading-relaxed">
            Stay tuned, and don’t forget to brush up on your “صبر” (patience) skills while you wait. 😉
              
            </p>
          </div>

          {/* Mobile Image */}
          <div className="flex justify-center items-center w-full lg:justify-end lg:flex-1">
            <img
              src="/images/Mobile.png"
              alt="Mobile App Mockup"
              className="w-full sm:w-[50%] lg:w-[300px] h-auto z-30"
            />
          </div>
        </div>

        {/* Diagonal Construction Tape */}
        
          <img src="/images/strip.png" alt="" className="w-full h-auto absolute bottom-0 -rotate-3 -right-[130px]" />
          <img src="/images/strip2.png" alt="" className="w-full h-auto absolute top-10 -z-10" />
      
      </div>
    </>
  );
};

export default UnderConstruction;