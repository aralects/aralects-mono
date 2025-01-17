import React from "react";

const ExperienceAralects = () => {
  return (
    <div className="rounded-2xl bg-[#393939] md:mx-20">
      <section className="relative isolate flex flex-col items-center justify-around overflow-hidden text-white">
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
        {/* Background Image */}
        <img
          src="/img/letters33.png"
          alt=""
          className="absolute bottom-0 left-0 -z-[1] hidden object-contain xl:block"
        />

        <div className="flex w-full flex-row items-start px-5 py-[60px] md:px-12 xl:px-16">
          {/* Content Section */}
          <div className="w-full lg:w-[70%]">
            <h2 className="font-SpaceGroteskBold text text-2xl font-bold md:text-left md:text-6xl">
              Want to be the first to experience Aralects?
            </h2>

            <div className="mt-6 flex flex-col gap-4 md:w-[70%]">
              <p className="font-SpaceGrotesk md:w-[90%] md:text-left md:text-xl">
                Step into a world where Arabic learning is real, personal, and
                alive.
              </p>
              <p className="font-SpaceGrotesk text-glow text-[#EADFFF] md:w-[90%] md:text-left md:text-xl">
                Sign up today and be part of our community as we prepare to
                launch!
              </p>
            </div>

            <div className="relative mt-6 flex w-fit flex-row items-stretch justify-between rounded-full border border-purple-400">
              <input
                type="email"
                placeholder="Your email"
                className="font-SpaceGrotesk w-60 rounded-full bg-transparent px-4 py-2 text-white focus:outline-none"
              />

              <button className="font-SpaceGrotesk whitespace-nowrap rounded-full bg-[#a07ed1] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#a07ed1]/90 md:w-fit">
                Join waiting list
              </button>
            </div>
          </div>

          {/* Side Image */}
          <img
            src="/img/art225.png"
            alt=""
            className="absolute right-0 top-0 -z-[1] ml-auto hidden h-full object-contain lg:block"
          />
        </div>
      </section>
    </div>
  );
};

export default ExperienceAralects;
