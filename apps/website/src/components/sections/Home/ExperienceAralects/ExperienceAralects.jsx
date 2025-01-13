import React from "react";

const ExperienceAralects = () => {
  return (
    <div className="mb-10">
      {/* Top Section: Sign-Up Prompt */}
      <section className="bg-[#393939] mx-10 md:mx-20 py-5 relative text-white flex flex-col  justify-around items-center  h-auto lg:h-[330px] rounded-[2rem] overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/art226.png"
          alt=""
          className="absolute w-[300px] top-0 left-0 h-full object-cover"
        />

        <div className="flex flex-row items-start w-full px-6 md:px-12 lg:px-20">
          {/* Content Section */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-SpaceGrotesk font-semibold text md:text-left">
              Want to be the first to experience Aralects?
            </h2>
            <p className="mt-4 text-[16px] font-SpaceGrotesk md:text-[20px]  md:text-left">
              Step into a world where Arabic learning is real, personal, and
              alive.
            </p>
            <p className="mt-2 text-[16px] font-SpaceGrotesk md:text-[20px] text-purple-300  md:text-left">
              Sign up today and be part of our community as we prepare to
              launch!
            </p>
          </div>

          {/* Side Image */}
          <img
            src="/images/art225.png"
            alt=""
            className=" absolute right-0 top-0  object-contain ml-auto"
          />
        </div>

        {/* Email Input & Button */}
        <div className="relative  flex rounded-full mt-10 lg:mt-0 justify-between w-[90%] lg:w-[40%] text-[10px] md:text-[12px] mx-5 border border-purple-400 md:flex-row items-stretch ">
          <input
            type="email"
            placeholder="Email here"
            className=" bg-transparent w-[50%] text-gray-900 px-4 py-2 rounded-full focus:outline-none"
          />
          <button className="bg-[#a07ed1] w-[40%] md:w-fit text-white md:px-10 py-3 rounded-full font-medium">
            Sign up now
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExperienceAralects;
