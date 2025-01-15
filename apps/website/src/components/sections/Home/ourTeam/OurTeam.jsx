import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const OurTeam = () => {
  return (
    <section className="bg-[#272727] w-full rounded-t-[2rem] pt-2 md:pt-10  text-white ">
      {/* New Content Section */}
      <div className="md:mt-16 text-center mx-auto">
        <div className="md:px-20 ">
          <div className="bg-[#222222] m-1 md:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-sm md:border-2 md:border-[#8262B0] shadow-[#C8AED340] lg:h-[180px] md:h-[200px] overflow-hidden relative flex justify-between items-center text-start rounded-[2rem]">
            <p className="lg:text-[1.5rem] m-5 text-[22px] text-gray-300 font-thin md:ml-10 align-middle w-full font-SpaceGroteskLight">
              <span className="lg:text-[2rem] font-Melodrama">50%</span> of
              learners struggle to find quality resources for{" "}
              <span className="md:font-semibold">
                Arabic <br className="hidden md:block"/> dialects
              </span>{" "}
              , compared to just{" "}
              <span className="lg:text-[2rem] Melodrama">25%</span> for{" "}
              <span className="md:font-semibold">Standard Arabic</span> (Fusha).
            </p>
            <img
              src="/images/art221.png"
              alt="Our Team"
              className=" md:mt-0 md:w-[30%] md:mx-auto h-full absolute md:relative top-0 end-0 object-contain  md:max-w-md rounded-lg"
            />
          </div>

          <img
            src="/images/OurTeamImage.png"
            alt="image12"
            width={700}
            height={300}
            className="md:w-full w-[98%] m-auto mt-10 object-cover rounded-lg"
          />

          <div className="flex flex-col md:flex-row items-center px-5 md:px-0 justify-between w-full overflow-hidden h-auto gap-6">
            <div className="text-start md:w-[50%] w-full">
              <h3 className="text-[25px] md:text-[72px] py-5 md:py-0 mt-3 md:mt-0 mb-5 font-SpaceGrotesk font-bold">
                Our Team
              </h3>
              <p className="mt:5 md:mt-5 font-SpaceGroteskLight text-[16px] md:text-[24px] font-[300] md:leading-8 text-[#D6D6D6]">
                Aralects is being designed by a team of experts <br className="hidden md:block"/> in{" "}
                <span className="font-[500] font-SpaceGroteskBold md:text-white">
                  linguistics, generative AI
                </span>{" "}
                , and{" "}
                <span className="font-[500] font-SpaceGroteskBold md:text-white">
                  contextual learning
                </span>{" "}
                who are determined to make Arabic learning engaging and
                authentic.
              </p>
              <p className="mt-4 text-[16px] text-glow md:text-[25px] font-[300] md:leading-8 font-SpaceGroteskLight text-[#EADFFF]">
                We believe the best way to learn a language is to live it—and
                that’s exactly the journey we’re creating for you.
              </p>
            </div>
            <img
              src="/images/art222.png"
              alt="artimage"
              className="w-full md:w-[40%] hidden md:block md:h-full object-contain"
            />
          </div>
        </div>

        <img
          src="/images/art223.png"
          alt=""
          className="mt-8 w-[90%] m-auto md:w-full  object-cover rounded-lg"
        />

        <div className="px-2 md:px-20 ">
          <div className="mt-5 h-fit relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] shadow-[#C8AED340] bg-[#222222] flex justify-between md:flex-row py-3 rounded-3xl overflow-hidden border border-gray-700 text-center items-center">
            <div className="w-1/2 hidden md:block"></div>
            <img
              src="/images/art224.png"
              alt=""
              className="h-[150px] absolute hidden md:block left-0 md:h-full object-contain"
            />

            <div className=" flex-1 md:w-[60%] relative float-right w-full h-full justify-center text-start flex flex-col gap-4 px-4 md:px-5">
              <img src="/images/imgUnav2.png" alt="" className=" absolute md:hidden -top-3 -left-3 w-[120px] opacity-60 rotate-45"/>
              <img src="/images/imgUnav2.png" alt="" className=" absolute md:hidden -bottom-12 -right-12 w-[120px] opacity-60 -rotate-90"/>

              <h4 className=" text-lg md:text-[65px] leading-tight font-SpaceGrotesk font-bold">
                We’re not just teaching Arabic
              </h4>
              <p className="text-gray-400 md:text-[24px] font-[300] font-SpaceGrotesk">
                We’re building a global community where learners from all
                backgrounds can connect, share stories, and dive into the
                language in all its forms.
              </p>
              <p className=" text-[#EADFFF] text-glow md:text-[24px] font-[300] font-SpaceGrotesk">
                Start learning Arabic for free, with access to all the tools and
                lessons you need!
              </p>
              <button className="border font-SpaceGrotesk mt-10 flex items-center justify-between space-x-2 border-purple-400 w-fit text-purple-300 px-6 py-2 rounded-full">
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
                  class="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialect Navigation Section */}
      {/* <div className=" bg-[#8262b0] mt-10 w-full  md:mt-[150px] md:py-8 hidden sm:flex justify-center items-center">
                {['YAMANI', 'EGYPTIAN', 'LEBANESE', 'EMARATI'].map((dialect, index) => (
                    <div
                        key={dialect}
                        className="font-medium  h-full flex items-center justify-around flex-1 text-white border-b-2 border-transparent hover:border-purple-600 cursor-pointer"
                    >
                        <h1 className="text-center Melodrama text-lg md:text-5xl">
                            {dialect}
                        </h1>
                        {index === 3 ? "" : <img src="/images/icon102.png" alt="" width={35} height={35} className='md:w-[18px] h-[20px] lg:h-[35px] lg:w-[35px]' />}
                    </div>
                ))}
            </div> */}
    </section>
  );
};

export default OurTeam;
