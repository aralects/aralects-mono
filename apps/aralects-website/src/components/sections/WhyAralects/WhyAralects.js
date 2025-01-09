import React from 'react';

const WhyAralects = () => {
    return (
        <section className="bg-[#272727] mt-10 text-white pb-20 w-full rounded-[2rem] lg:px-5 m-auto">
            {/* Header Section */}
            <img
                src="/images/ArtImage.png"
                alt=""
                className="m-auto w-full rounded-[2rem] object-cover"
            />

            {/* Why Aralects Content */}
            <div className="text-start mt-10 flex flex-col md:flex-row px-10 md:px-20  w-full justify-between items-center gap-8 m-auto">
                <div className="md:w-[45%]">
                    <h2 className="text-4xl mb-10 font-SpaceGrotesk font-bold">Why Aralects?</h2>
                    <p className="mt-4 md:text-[1.2rem] text-gray-300 max-w-2xl">
                        Let’s be honest, learning Arabic today is challenging.
                    </p>
                    <p className="mt-4 md:text-[1.2rem] font-SpaceGrotesk text-gray-300 max-w-2xl">
                        Most apps focus on rigid lessons and miss the immersive, life-scenario
                        conversations that bring Arabic to life.
                    </p>
                    <p className="mt-4 md:text-[1.2rem] font-SpaceGrotesk text-purple-300 max-w-2xl">
                        Aralects is changing that. With engaging, real-world lessons, we transform how
                        you connect with the language.
                    </p>
                </div>

                <div className="md:w-1/2 flex justify-center md:justify-end">
                    <img
                        className="w-[90%] md:w-[70%] opacity-25 h-auto object-contain"
                        src="/images/art334.png"
                        alt=""
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-10 md:px-20 w-full gap-5 mx-auto">
                {[
                    'All-in-one learning hub',
                    'Interactive Challenges',
                    'Self-Paced & Customized Learning',
                    'Spoken Content',
                    'Cultural Immersion',
                    'Life-Situations 101',
                    'Community-Centered Approach',
                    'Fun & Effective',
                ].map((feature, index) => (
                    <div
                        key={index}
                        className="bg-[#393939] relative transition-all flex aspect-square  text-start rounded-3xl p-6 border border-[#393939] justify-start overflow-hidden font-medium group"
                    >

                        <span class="w-[300px] h-[300px] rounded z-10 bg-[#a07ed1] absolute -top-[300px] right-0 translate-x-full ease-out duration-300 transition-all mb-9 ml-9 group-hover:mr-0 group-hover:mb-32 group-hover:translate-x-0 group-hover:translate-y-full"></span>
                        

                        <img
                            className="absolute object-contain right-5 top-5"
                            src="/images/ThoughtBubble.png"
                            alt=""
                            width={30}
                            height={30}
                        />
                        <h3 className="text-xl w-[90%] z-20 sm:text-2xl mt-5 font-SpaceGrotesk font-semibold">{feature}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyAralects;
