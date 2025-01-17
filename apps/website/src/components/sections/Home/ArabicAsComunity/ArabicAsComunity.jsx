function ArabicAsComunity() {
  return (
    <div className="relative flex w-full flex-col justify-between px-5 py-10 md:flex-row md:px-20 md:py-16 lg:px-20">
      {/* Background Image */}
      <img
        src="/img/ArabicAsComunityBg.jpg"
        alt=""
        className="absolute bottom-0 left-0 -z-10 w-[150%]"
      />

      {/* Text Content */}
      <div className="z-30 flex w-full flex-col justify-center gap-4 text-white md:w-[60%]">
        <h2 className="font-SpaceGrotesk text-4xl font-bold md:text-7xl">
          Arabic, as a community, for the community.
        </h2>

        <p className="font-SpaceGroteskLight w-full font-thin md:w-[80%] md:text-2xl">
          Want to be the first to experience Aralects? Sign up now to be among
          the first to explore Aralects as we get ready to launch!
        </p>
        <button className="font-SpaceGrotesk mt-6 flex w-fit items-center rounded-full bg-gray-100 px-5 py-2 font-medium text-[#8262B0] md:text-xl">
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
            className="ml-2"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </button>
      </div>

      {/* Mobile Image */}
      <div className="mt-8 hidden justify-center md:mt-0 md:flex">
        <img
          src="/img/PhoneMockup.png"
          alt=""
          className="w-[80%] max-w-sm md:w-auto"
        />
      </div>
    </div>
  );
}

export default ArabicAsComunity;
