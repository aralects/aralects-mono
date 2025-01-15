import React from "react";

const ExperienceAralects = () => {
  return (
    <div className="mb-10">
      {/* Top Section: Sign-Up Prompt */}
      <section className="bg-[#393939] mx-2 md:mx-20 py-5 relative text-white flex flex-col  justify-around items-center rounded-2xl overflow-hidden">

      <img src="/images/imgUnav2.png" alt="" className=" absolute md:hidden -top-3 -left-3 w-[120px] opacity-60 rotate-45"/>
      <img src="/images/imgUnav2.png" alt="" className=" absolute md:hidden -bottom-12 -right-12 w-[120px] opacity-60 -rotate-90"/>
        {/* Background Image */}
        <img
          src="/images/letters33.png"
          alt=""
          className="absolute w-[60%]  hidden md:block top-20 left-0 h-full object-contain"
        />

        <div className="flex flex-row items-start w-full px-5 md:px-12 lg:px-20">
          {/* Content Section */}
          <div className="w-full md:w-[70%]  md:py-10">
            <h2 className="text-[24px] md:text-[60px] md:leading-[3rem] font-SpaceGroteskBold font-bold text md:text-left">
              Want to be the first to experience Aralects?
            </h2>

            <div className="md:w-[70%] flex flex-col md:gap-3">
              <p className="mt-4 text-[15px] md:w-[90%] font-SpaceGrotesk md:text-[20px]  md:text-left">
                Step into a world where Arabic learning is real, personal, and
                alive.
              </p>
              <p className="md:mt-2 text-[15px] md:w-[90%] font-SpaceGrotesk md:text-[20px] text-[#EADFFF] text-glow md:text-left">
                Sign up today and be part of our community as we prepare to
                launch!
              </p>

              <div className="relative mt-5  md:w-[90%] h-[50px] md:h-[40px] flex rounded-full justify-between text-[10px] md:text-[12px]  border border-purple-400 md:flex-row items-stretch ">
                <input
                  type="email"
                  placeholder="Email here"
                  className=" bg-transparent w-[50%] font-Satoshi text-[17px] text-gray-900 px-4 py-2 rounded-full focus:outline-none"
                />

                <button className="bg-[#a07ed1] w-[50%] md:w-fit h-full text-[17px] font-SpaceGrotesk text-white md:px-5 rounded-full font-medium">
                Join waiting list
                </button>
              </div>
            </div>
          </div>

          {/* Side Image */}
          <img
            src="/images/art225.png"
            alt=""
            className=" absolute right-0 top-0 h-full hidden md:block object-contain ml-auto"
          />
        </div>

        {/* Email Input & Button */}
      </section>
    </div>
  );
};

export default ExperienceAralects;
