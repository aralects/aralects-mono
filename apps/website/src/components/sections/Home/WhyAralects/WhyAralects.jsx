import React from 'react';

const WhyAralects = () => {
  const features = [
    "All-in-one learning hub",
    "Interactive Challenges", 
    "Self-Paced & Customized Learning",
    "Spoken Content",
    "Cultural Immersion",
    "Life-Situations 101",
    "Community-Centered Approach",
    "Fun & Effective"
  ];

  return (
    <section className="bg-[#272727] overflow-hidden w-full pt-2 md:pt-0 mt-10 text-white pb-12 rounded-[2rem] lg:px-5 m-auto">
      {/* Header Section */}
      <img
        src="/images/ArtImage.png"
        alt=""
        className="m-auto w-[98%] md:w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] md:px-0 md:shadow-none shadow-purple-500 rounded-[2rem] h-[439px] object-cover object-left-top md:object-cover"
      />

      {/* Why Aralects Content */}
      <div className="text-start mt-[30px] md:mt-[60px] flex flex-col md:flex-row px-5 md:px-20 w-full justify-between items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="md:text-[72px] text-[24px] mb-5 font-SpaceGroteskBold font-bold">
            Why <span className="md:text-purple-200 text-glow">Aralects</span>?
          </h2>
          <p className="text-[16px] md:text-[22px] font-[100] font-SpaceGroteskLight text-gray-300">
            Let's be honest, learning Arabic today is challenging. Most apps
            focus on rigid lessons and miss the immersive, life-scenario
            conversations that bring Arabic to life.
          </p>
          <p className="text-[16px] md:text-[22px] text-glow font-[300] mt-3 font-SpaceGroteskLight text-purple-300">
            Aralects is changing that. With engaging, real-world lessons, we
            transform how you connect with the language.
          </p>
        </div>

        <div className="md:w-1/2 hidden md:flex justify-center md:justify-end">
          <img
            className="w-[100%] md:w-[80%] self-end opacity-25 h-auto object-contain"
            src="/images/art334.png"
            alt=""
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="relative w-full px-5 md:px-0 mt-10 md:mt-0 overflow-hidden">
        <div className="md:grid md:w-full flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid-cols-4 md:px-20 px-10 hide-scrollbar" 
             style={{
               scrollbarWidth: 'none',
               msOverflowStyle: 'none',
               WebkitOverflowScrolling: 'touch'
             }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#272727] md:bg-[#393939] shrink-0 h-[240px] w-[244px] md:h-[240px] md:w-full p-3 md:p-5 pb-5 flex-col relative transition-all flex text-start rounded-3xl border border-[#9073b9] justify-start overflow-hidden font-medium group snap-start"
            >
              <span className="absolute w-full h-full rounded z-10 bg-[#a07ed1] top-0 right-0 transform translate-x-full -translate-y-full transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>

              <img
                className="absolute object-contain hidden md:block top-2 right-2 md:right-5 md:top-5"
                src="/images/ThoughtBubble.png"
                alt=""
                width={30}
                height={30}
              />
              <h3 className="text-[20px] w-full md:w-[90%] z-20 sm:text-2xl md:mt-5 font-SpaceGrotesk font-semibold">
                {feature}
              </h3>
              <p className="z-20 md:hidden text-[17px] leading-5 text-[#272727]">
                Say goodbye to switching between apps and resources—everything you
                need to master Arabic is in one place.
              </p>
            </div>
          ))}
        </div>
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