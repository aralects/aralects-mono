const WhyAralects = () => {
  const features = [
    {
      title: "All-in-one learning hub",
      description:
        "Say goodbye to switching between apps and resources — everything you need to master Arabic is in one place.",
    },
    {
      title: "Interactive Challenges",
      description:
        "Engage with other users, track your progress on leaderboards, and share cultural insights along the way.",
    },
    {
      title: "Self-Paced & Customized Learning",
      description:
        "Move at your own speed with customizable lessons and the ability to create flashcard decks from what you learned.",
    },
    {
      title: "Spoken Content",
      description:
        "Experience Arabic through high-quality audio; click on words, hear their pronounciation, and immerse yourself in authentic speech.",
    },
    {
      title: "Cultural Immersion",
      description:
        "Dive into the heart of Arabic culture with phrases and stories that locals use every day.",
    },
    {
      title: "Life-Situations 101",
      description:
        "Master the essentials of everyday conversations - whether it's ordering coffee, haggling at the market, or navigating those tricky in-law interactions.",
    },
    {
      title: "Community-Centered Approach",
      description:
        "Connect with fellow learners, native speakers, and cultural enthusiasts for shared growth.",
    },
    {
      title: "Fun & Effective",
      description:
        "Enjoy gamified challenges that keep you motivated while learning Arabic - practical, fun, and focused on real progress. ",
    },
  ];

  return (
    <section className="m-auto mt-10 w-full overflow-hidden rounded-[2rem] bg-[#272727] text-white">
      {/* Header Section */}
      <div className="p-4">
        <img
          src="/img/ArtImage.png"
          alt=""
          className="h-[800px] rounded-[2rem] object-cover object-left-top shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-purple-500 md:object-cover md:shadow-none"
        />
      </div>

      {/* Why Aralects Content */}
      <div className="mt-[30px] flex w-full flex-col items-center justify-between gap-8 px-5 text-start md:mt-[60px] md:flex-row md:px-20">
        <div className="md:w-1/2">
          <h2 className="font-SpaceGroteskBold text-2xl font-bold md:text-7xl">
            Why <span className="text-glow-xl text-purple-200">Aralects</span>?
          </h2>
          <p className="font-SpaceGroteskLight mt-6 font-thin text-gray-300 md:text-2xl">
            Let's be honest, learning Arabic today is challenging. Most apps
            focus on rigid lessons and miss the immersive, life-scenario
            conversations that bring Arabic to life.
          </p>
          <p className="text-glow font-SpaceGroteskLight mt-4 font-light text-purple-300 md:text-2xl">
            Aralects is changing that. We’re creating an app that transforms how
            you connect with the language.
          </p>
        </div>

        <div className="hidden justify-center md:flex md:w-1/2 md:justify-end">
          <img
            className="h-auto w-[100%] self-end object-contain opacity-25 md:w-[80%]"
            src="/img/art334.png"
            alt=""
          />
        </div>
      </div>

      {/* Features Section */}
      <div
        className="flex snap-x snap-mandatory scroll-px-10 gap-5 overflow-x-auto py-10 xl:grid xl:grid-cols-4 xl:px-10"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative flex h-[260px] w-[295px] shrink-0 snap-start flex-col justify-start overflow-hidden rounded-3xl border border-[#9073b9] bg-[#272727] p-5 text-start font-medium transition-all first:ml-5 last:mr-5 md:first:ml-10 md:last:mr-10 xl:w-full xl:bg-[#393939] xl:first:ml-0 xl:last:mr-0"
          >
            <span className="absolute bottom-[35%] left-[36%] hidden h-full w-full scale-0 rounded-full bg-[#a07ed1] transition-transform duration-500 ease-out group-hover:scale-[250%] xl:block"></span>

            <img
              className="absolute right-2 top-2 hidden object-contain md:right-5 md:top-5 md:block"
              src="/img/ThoughtBubble.png"
              alt=""
              width={30}
              height={30}
            />
            <h3 className="font-SpaceGrotesk z-20 min-h-16 max-w-[80%] text-2xl font-bold transition-all xl:group-hover:-translate-y-6 xl:group-hover:opacity-0">
              {feature.title}
            </h3>
            <h3 className="font-SpaceGrotesk absolute top-6 z-20 hidden max-w-[80%] translate-x-6 scale-125 text-lg font-extrabold opacity-0 transition-all group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 xl:block">
              {feature.title}
            </h3>
            <p className="font-SpaceGrotesk z-20 mt-10 font-light leading-5 text-white transition-all xl:mt-0 xl:translate-x-4 xl:scale-110 xl:opacity-0 xl:group-hover:translate-x-0 xl:group-hover:scale-100 xl:group-hover:opacity-100">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default WhyAralects;
