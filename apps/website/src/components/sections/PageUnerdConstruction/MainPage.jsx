const UnderConstruction = () => {
  return (
    <>
      <div className="relative -z-30 mx-auto flex min-h-screen flex-col overflow-hidden bg-[#8262b0] pb-[160px] text-white md:pt-[100px] lg:min-h-[110vh]">
        {/* Main Content Section */}
        <div className="mt-[100px] flex flex-col items-center justify-between gap-8 px-6 sm:px-10 lg:mt-0 lg:flex-row lg:px-[150px]">
          {/* Text Content */}
          <div className="z-30 text-left lg:w-1/2">
            <h1 className="font-SpaceGroteskLight mb-5 mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-6xl">
              Page Under Construction
            </h1>
            <p className="font-SpaceGrotesk mb-5 text-base leading-relaxed text-white/80 sm:text-[20] lg:text-[18px]">
              But don’t worry, we’re not just learning the vocabulary for
              “patience” in 10 different dialects — we’re also busy building
              something amazing for you!
            </p>
            <p className="font-SpaceGrotesk text-base leading-relaxed text-white/80 sm:text-[20] lg:text-[18px]">
              At Aralects, we’re crafting the ultimate gamified, self-paced
              language learning experience to make mastering Arabic dialects as
              fun as binge-watching your favorite series (but way more
              productive).
            </p>
            <p className="font-SpaceGrotesk mt-5 text-base leading-relaxed text-white/80 sm:text-lg lg:text-[18px]">
              Stay tuned, and don’t forget to brush up on your “صبر” (patience)
              skills while you wait. 😉
            </p>
          </div>

          {/* Mobile Image */}
          <div className="flex w-full items-center justify-center lg:flex-1 lg:justify-end">
            <img
              src="/img/Mobile.png"
              alt="Mobile App Mockup"
              className="z-30 h-auto w-full sm:w-[50%] lg:w-[300px]"
            />
          </div>
        </div>

        {/* Diagonal Construction Tape */}

        <img
          src="/img/strip.png"
          alt=""
          className="absolute -right-[130px] bottom-0 h-auto w-full -rotate-3"
        />
        <img
          src="/img/strip2.png"
          alt=""
          className="absolute top-10 -z-10 h-auto w-full"
        />
      </div>
    </>
  );
};

export default UnderConstruction;
