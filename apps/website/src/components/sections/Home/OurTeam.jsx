import Blob from "src/assets/blob";
import Blobs from "src/assets/blobs";
import { smoothScrollTo } from "src/utils/newsletter";
import { useState } from "react";

const OurTeam = () => {
  const [selectedDialect, setSelectedDialect] = useState(null);

  const handleDialectClick = (dialect) => {
    setSelectedDialect(dialect);
  };

  return (
    <section class="w-full rounded-t-3xl bg-[#272727] pt-2 text-white md:pt-[60px]">
      <div class="px-2 xl:container md:px-20 xl:mx-auto">
        <div className="md:glow relative flex items-center justify-between overflow-hidden rounded-2xl border-[#8262B0] bg-[#222222] text-start shadow-[0px_0px_8px_#C8AED340] md:h-[200px] md:border-2 lg:h-[160px]">
          <p className="font-SpaceGroteskLight m-5 w-full align-middle text-lg font-thin text-gray-300 md:ml-10 lg:text-2xl">
            <span className="font-Melodrama lg:text-3xl">50%</span> of learners
            struggle to find quality resources for{" "}
            <span className="font-SpaceGroteskBold font-bold">
              Arabic dialects
            </span>{" "}
            , compared to just{" "}
            <span className="Melodrama lg:text-3xl">16%</span> for{" "}
            <span className="font-SpaceGroteskBold font-bold">
              Standard Arabic
            </span>{" "}
            (Fusha).
          </p>
          <img
            src="/img/art221.png"
            alt="Our Team"
            className=" absolute end-0 top-0 h-full rounded-lg object-contain md:relative md:mx-auto md:mt-0  md:w-[30%] md:max-w-md"
          />
        </div>

        <div className="flex h-auto w-full flex-col items-center justify-between gap-6 overflow-hidden px-5 md:flex-row md:px-0">
          <div className="flex w-full flex-col py-5 text-start md:w-[50%] md:py-[60px]">
            <h3 className="font-LivvicMedium intersect-once intersect-half motion-safe:intersect:animate-fade-in-up text-2xl font-bold transition motion-safe:opacity-0 md:text-5xl">
              Our Team
            </h3>
            <p className="font-SpaceGroteskLight intersect-once intersect-half motion-safe:intersect:animate-fade-in-up mt-6 font-light text-[#D6D6D6] transition motion-safe:opacity-0 md:text-xl">
              Aralects is being designed by a team of experts in{" "}
              <span className="font-SpaceGroteskBold font-medium md:text-white">
                linguistics, generative AI
              </span>{" "}
              , and{" "}
              <span className="font-SpaceGroteskBold font-medium md:text-white">
                contextual learning
              </span>{" "}
              who are determined to make Arabic learning engaging and authentic.
            </p>
            <p className="text-glow font-SpaceGroteskLight intersect-once intersect-half motion-safe:intersect:animate-fade-in-up mt-4 font-light text-[#EADFFF] transition motion-safe:opacity-0 md:text-xl">
              We believe the best way to learn a language is to live it—and
              that’s exactly the journey we’re creating for you.
            </p>
          </div>
          <Blob className="hidden w-full object-contain md:block md:h-full md:w-[40%]" />
        </div>
      </div>

      <Blobs className="-my-6 mx-auto w-[95%] object-cover md:my-12" />

      <div class="px-2 pb-2 md:px-20 md:pb-12">
        <div class="relative flex h-fit items-center justify-between overflow-hidden rounded-3xl border border-gray-700 bg-[#222222] py-5 text-center shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] shadow-[#C8AED340] xl:container md:flex-row md:py-[60px] xl:mx-auto">
          <div className="relative hidden w-1/2 items-center justify-center md:flex">
            <img
              src="/img/dialect-team.png"
              alt="dialect"
              className="intersect-once intersect-half motion-safe:intersect:animate-fade-in-up z-10 transition motion-safe:opacity-0"
            />

            {/* Buttons overlay on the image */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-[130px]">
              <div className="mb-3 flex gap-2">
                <button
                  className={`intersect-once intersect-half motion-safe:intersect:animate-fade-in-up font-SpaceGroteskBold rounded-full border border-white bg-transparent px-6 py-1.5 text-[22px] text-white transition motion-safe:opacity-0 ${selectedDialect === "LEVANTINE" ? "bg-[#252424] text-white" : "hover:bg-[#222222] hover:text-[#fffff]"}`}
                  onClick={() => handleDialectClick("LEVANTINE")}
                >
                  LEVANTINE
                </button>
                <button
                  className={`intersect-once intersect-half motion-safe:intersect:animate-fade-in-up font-SpaceGroteskBold rounded-full border border-white bg-transparent px-6 py-1.5 text-[22px] text-white transition motion-safe:opacity-0 ${selectedDialect === "EGYPTIAN" ? "bg-[#252424] text-white" : "hover:bg-[#222222] hover:text-[#fffff]"}`}
                  onClick={() => handleDialectClick("EGYPTIAN")}
                >
                  EGYPTIAN
                </button>
              </div>

              <div className="mb-3 flex gap-2">
                <button
                  className={`intersect-once intersect-half motion-safe:intersect:animate-fade-in-up font-SpaceGroteskBold rounded-full border border-white bg-transparent px-6 py-1.5 text-[22px] text-white transition motion-safe:opacity-0 ${selectedDialect === "GULF" ? "bg-[#252424] text-white" : "hover:bg-[#222222] hover:text-[#fffff]"}`}
                  onClick={() => handleDialectClick("GULF")}
                >
                  GULF
                </button>
                <button
                  className={`intersect-once intersect-half motion-safe:intersect:animate-fade-in-up font-SpaceGroteskBold rounded-full border border-white bg-transparent px-6 py-1.5 text-[22px] text-white transition motion-safe:opacity-0 ${selectedDialect === "MAGHREBI" ? "bg-[#252424] text-white" : "hover:bg-[#222222] hover:text-[#fffff]"}`}
                  onClick={() => handleDialectClick("MAGHREBI")}
                >
                  MAGHREBI
                </button>
              </div>

              <div>
                <button
                  className={`intersect-once intersect-half motion-safe:intersect:animate-fade-in-up font-SpaceGroteskBold rounded-full border border-white bg-transparent px-6 py-1.5 text-[22px] text-white transition motion-safe:opacity-0 ${selectedDialect === "STANDARD ARABIC" ? "bg-[#252424] text-white" : "hover:bg-[#222222] hover:text-[#fffff]"}`}
                  onClick={() => handleDialectClick("STANDARD ARABIC")}
                >
                  STANDARD ARABIC
                </button>
              </div>
            </div>
          </div>
          <img
            src="/img/art224.png"
            alt=""
            className="absolute bottom-0 left-0 hidden h-[750px] object-contain md:block lg:h-full"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="115"
            height="96"
            viewBox="0 0 115 96"
            fill="none"
            className="absolute left-0 top-0 w-[120px] md:hidden"
          >
            <g opacity="0.25">
              <path
                d="M-0.289822 28.511C-0.687584 43.9067 5.62138 58.8094 14.7673 69.3352C23.9132 79.8611 35.6555 86.4214 47.672 90.7739C58.9584 94.8619 71.1125 97.1319 82.4464 93.2475C102.8 86.272 116.288 58.6828 113.678 32.9009C111.067 7.11924 93.9832 -14.7866 73.5946 -21.6044C46.1268 -30.7895 0.794383 -13.4514 -0.289822 28.511Z"
                fill="#6C49A7"
                stroke="#1F1F1F"
                strokeWidth="0.173713"
                strokeMiterlimit="10"
              />
              <path
                d="M79.9632 58.9722C80.7052 55.4699 80.8928 51.7018 80.7004 48.1133C79.4705 25.1773 61.1511 -1.65727 40.8113 -0.528801C24.3699 0.383385 2.57435 15.6496 5.60047 38.2158C7.27107 50.6737 15.6057 60.5821 25.0487 65.7642C34.4916 70.9463 45.0173 72.2045 55.3269 73.395C61.9958 74.1651 69.4103 74.6835 74.6558 69.6052C77.4084 66.9405 79.0792 63.1449 79.9632 58.9722Z"
                fill="#222222"
                stroke="#1F1F1F"
                strokeWidth="0.173713"
                strokeMiterlimit="10"
              />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="67"
            height="97"
            viewBox="0 0 67 97"
            fill="none"
            className="absolute bottom-0 right-0 w-[120px] md:hidden"
          >
            <g opacity="0.25">
              <path
                d="M115.29 53.511C115.688 68.9067 109.379 83.8094 100.233 94.3352C91.0868 104.861 79.3445 111.421 67.328 115.774C56.0416 119.862 43.8875 122.132 32.5536 118.248C12.2002 111.272 -1.28772 83.6828 1.32248 57.9009C3.93265 32.1192 21.0168 10.2134 41.4054 3.39559C68.8732 -5.78954 114.206 11.5486 115.29 53.511Z"
                fill="#6C49A7"
                stroke="#1F1F1F"
                strokeWidth="0.173713"
                strokeMiterlimit="10"
              />
              <path
                d="M35.0368 83.9722C34.2948 80.4699 34.1072 76.7018 34.2996 73.1133C35.5295 50.1773 53.8489 23.3427 74.1887 24.4712C90.6301 25.3834 112.426 40.6496 109.4 63.2158C107.729 75.6737 99.3943 85.5821 89.9513 90.7642C80.5084 95.9463 69.9827 97.2045 59.6731 98.395C53.0042 99.1651 45.5897 99.6835 40.3442 94.6052C37.5916 91.9405 35.9208 88.1449 35.0368 83.9722Z"
                fill="#222222"
                stroke="#1F1F1F"
                strokeWidth="0.173713"
                strokeMiterlimit="10"
              />
            </g>
          </svg>

          <div className="relative flex h-full w-full flex-1 flex-col justify-center gap-4 px-4 text-start md:w-[50%] md:px-12">
            <h4 className="font-LivvicMedium intersect-once intersect-half motion-safe:intersect:animate-fade-in-up text-2xl font-bold transition motion-safe:opacity-0 md:text-6xl">
              We're not just teaching Arabic
            </h4>
            <p className="font-SpaceGrotesk intersect-once intersect-half motion-safe:intersect:animate-fade-in-up font-thin text-gray-300 transition motion-safe:opacity-0 md:mt-6 md:text-xl">
              We're building a global community where learners from all
              backgrounds can connect, share stories, and dive into the language
              in all its forms.
            </p>
            <p className="text-glow font-SpaceGrotesk intersect-once intersect-half motion-safe:intersect:animate-fade-in-up font-light text-[#EADFFF] transition motion-safe:opacity-0 md:mt-4 md:text-xl">
              Start learning Arabic for free, with access to all the tools and
              lessons you need!
            </p>
            <button
              onClick={() => smoothScrollTo("newsletter", 80)}
              className="font-SpaceGrotesk tex-lg intersect-once intersect-half motion-safe:intersect:animate-fade-in-up group flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#8262b0] px-5 py-2 text-[#8262b0] shadow-md transition hover:bg-[#8262b0] hover:text-white motion-safe:opacity-0 md:mt-6 md:text-xl"
            >
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
                className="ml-2 -translate-x-1 rotate-90 transition-transform group-hover:translate-x-0"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
