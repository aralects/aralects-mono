import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';

const OurTeam = () => {
    return (
        <section className="bg-[#272727] w-full rounded-t-[2rem] pb-10 sm:pb-0 pt-10 text-white ">
            {/* New Content Section */}
            <div className="mt-16 text-center mx-auto">

                <div className='md:px-20 px-10'>
                    <div className="bg-[#222222] py-10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] shadow-gray-600 lg:h-[150px] md:h-[150px] overflow-hidden relative flex justify-between items-center text-start rounded-[2rem]">
                        <p className="lg:text-[1.5rem]  text-gray-300 font-thin ml-5 align-middle lg:w-[80%] w-full font-SpaceGrotesk">
                            <span className="lg:text-[2rem] font-Melodrama">50%</span> of learners struggle to find quality resources for Arabic dialects, compared to just <span className="lg:text-[2rem] Melodrama">25%</span> for Standard Arabic (Fusha).
                        </p>
                        <img
                            src="/images/art221.png"
                            alt="Our Team"
                            className="mt-4 md:mt-0 md:mx-auto absolute md:relative top-0 end-0 object-contain max-w-xs md:max-w-md rounded-lg"
                        />
                    </div>

                    <img
                        src="/images/OurTeamImage.png"
                        alt="image12"
                        width={700}
                        height={300}
                        className="w-full mt-10 object-cover rounded-lg"
                    />

                    <div className="flex flex-col md:flex-row items-center justify-between w-full overflow-hidden h-auto gap-6">
                        <div className="text-start md:w-[60%] w-full">
                            <h3 className="text-3xl md:text-5xl mt-5 font-SpaceGrotesk font-bold">Our Team</h3>
                            <p className="mt-4 font-SpaceGrotesk md:text-[20px] text-gray-400">
                                Aralects is being designed by a team of experts in linguistics, education, and software engineering who are determined to make Arabic learning engaging and authentic.
                            </p>
                            <p className="mt-4 md:text-[20px] font-SpaceGrotesk text-purple-300">
                                We believe the best way to learn a language is to live it—and that’s exciting. The journey we’re creating is for you.
                            </p>
                        </div>
                        <img
                            src="/images/art222.png"
                            alt="artimage"
                            className="w-full md:w-[30%]  md:h-full object-contain"
                        />
                    </div>
                </div>




                <img
                    src="/images/art223.png"
                    alt=""
                    className="mt-8 w-full object-cover rounded-lg"
                />

                <div className='px-10 md:px-20 '>
                    <div className="mt-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] shadow-[#313338] bg-[#222222] relative flex justify-between md:flex-row py-5 lg:h-[350px] rounded-3xl overflow-hidden border border-gray-700 text-center items-center">
                        <img
                            src="/images/art224.png"
                            alt=""
                            className="h-[150px] left-0 md:h-full absolute md:static  object-contain"
                        />
                        <div className="md:w-[50%] flex-1 float-right lg:ml-[100px] w-full h-full justify-center text-start flex flex-col gap-4 px-4 md:px-10">
                            <h4 className=" text-lg md:text-5xl font-SpaceGrotesk font-bold">We’re not just teaching Arabic</h4>
                            <p className="text-gray-400 md:text-xl font-SpaceGrotesk">
                                We’re building a global community where learners feel at home, connect, share stories, and dive into the Arabic-speaking world.
                            </p>
                            <p className=" text-purple-300 md:text-xl font-SpaceGrotesk">
                                Start learning Arabic for free, with access to all the tools and lessons you need.
                            </p>
                            <button className="border font-SpaceGrotesk flex items-center justify-between space-x-2 border-purple-400 w-fit text-purple-300 px-6 py-2 rounded-full">
                                Sign up for free <MdArrowRightAlt className="ml-2" size={20} />
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
