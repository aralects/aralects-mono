import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const OurTeam = () => {
  return (
    <section className="w-full rounded-t-[2rem] bg-[#272727] pt-2 text-white  md:pt-10 ">
      {/* New Content Section */}
      <div className="mx-auto text-center md:mt-16">
        <div className="md:px-20 ">
          <div className="relative flex items-center justify-between overflow-hidden rounded-[2rem] bg-[#222222] text-start shadow-sm shadow-[#C8AED340] md:h-[200px] md:border-2 md:border-[#8262B0] md:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] lg:h-[160px]">
            <p className="font-SpaceGroteskLight m-5 w-full align-middle text-[22px] font-thin text-gray-300 md:ml-10 lg:text-[1.5rem]">
              <span className="font-Melodrama lg:text-[2rem]">50%</span> of
              learners struggle to find quality resources for{" "}
              <span className="md:font-semibold">Arabic dialects</span> ,
              compared to just{" "}
              <span className="Melodrama lg:text-[2rem]">25%</span> for{" "}
              <span className="md:font-semibold">Standard Arabic</span> (Fusha).
            </p>
            <img
              src="/img/art221.png"
              alt="Our Team"
              className=" absolute end-0 top-0 h-full rounded-lg object-contain md:relative md:mx-auto md:mt-0  md:w-[30%] md:max-w-md"
            />
          </div>

          <img
            src="/img/OurTeamImage.png"
            alt="image12"
            width={700}
            height={300}
            className="m-auto mt-10 w-[98%] rounded-lg object-cover md:w-full"
          />

          <div className="flex h-auto w-full flex-col items-center justify-between gap-6 overflow-hidden px-5 md:flex-row md:px-0">
            <div className="flex w-full flex-col gap-4 py-12 text-start md:w-[50%]">
              <h3 className="font-SpaceGrotesk text-2xl font-bold md:mt-0 md:py-0 md:text-7xl">
                Our Team
              </h3>
              <p className="font-SpaceGroteskLight font-light text-[#D6D6D6] md:text-2xl">
                Aralects is being designed by a team of experts in{" "}
                <span className="font-SpaceGroteskBold font-[500] md:text-white">
                  linguistics, generative AI
                </span>{" "}
                , and{" "}
                <span className="font-SpaceGroteskBold font-[500] md:text-white">
                  contextual learning
                </span>{" "}
                who are determined to make Arabic learning engaging and
                authentic.
              </p>
              <p className="text-glow font-SpaceGroteskLight font-light text-[#EADFFF] md:text-2xl">
                We believe the best way to learn a language is to live it—and
                that’s exactly the journey we’re creating for you.
              </p>
            </div>
            <img
              src="/img/art222.png"
              alt="artimage"
              className="hidden w-full object-contain md:block md:h-full md:w-[40%]"
            />
          </div>
        </div>

        <img
          src="/img/art223.png"
          alt=""
          className="m-auto mt-8 w-[90%] rounded-lg  object-cover md:w-full"
        />

        <div className="px-2 md:px-20">
          <div className="relative flex h-fit items-center justify-between overflow-hidden rounded-t-3xl border border-gray-700 bg-[#222222] py-12 text-center shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] shadow-[#C8AED340] md:flex-row">
            <div className="hidden w-1/2 md:block"></div>
            <img
              src="/img/art224.png"
              alt=""
              className="absolute left-0 hidden h-[150px] object-contain md:block md:h-full"
            />

            <div className="relative float-right flex h-full w-full flex-1 flex-col justify-center gap-4 px-4 text-start md:w-[60%] md:px-12">
              <img
                src="/img/imgUnav2.png"
                alt=""
                className=" absolute -left-3 -top-3 w-[120px] rotate-45 opacity-60 md:hidden"
              />
              <img
                src="/img/imgUnav2.png"
                alt=""
                className=" absolute -bottom-12 -right-12 w-[120px] -rotate-90 opacity-60 md:hidden"
              />

              <h4 className="font-SpaceGrotesk text-lg font-bold md:text-6xl">
                We’re not just teaching Arabic
              </h4>
              <p className="font-SpaceGrotesk font-light text-gray-400 md:text-2xl">
                We’re building a global community where learners from all
                backgrounds can connect, share stories, and dive into the
                language in all its forms.
              </p>
              <p className="text-glow font-SpaceGrotesk font-light text-[#EADFFF] md:text-2xl">
                Start learning Arabic for free, with access to all the tools and
                lessons you need!
              </p>
              <button className="font-SpaceGrotesk mt-6 flex w-fit items-center justify-between space-x-2 rounded-full border border-purple-400 px-6 py-2 text-purple-300">
                Join waiting list
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
