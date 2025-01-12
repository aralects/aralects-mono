import React, { useState } from 'react';
import { IoIosArrowRoundUp } from "react-icons/io";

const Footer = () => {

    return (
        <>
            {/* Bottom Section: Arabic Dialects */}
            < section className="bg-gray-100 text-gray-900  py-6 px-6 mt-6 relative md:px-12 rounded-[2rem]" >
                <div className="max-w-6xl mt-2 mx-auto">
                    {/* Arabic Dialects Header */}
                    <div className="text-center flex flex-col md:gap-[80px] md:text-left">
                        <h2 className="text-5xl md:text-[80px] lg:text-[100px] text-[#8c8c8c] font-extrabold tracking-wide font-SpaceGroteskBold">
                            ARABIC
                        </h2>
                        <h3 className="text-4xl md:text-[80px] lg:text-[100px] text-[#8c8c8c] font-extralight font-SpaceGroteskLight tracking-wide mt-2">
                            DIALECTS
                        </h3>
                    </div>

                    {/* Top Right Image */}
                    <img
                        src="/images/art227.png"
                        alt=""
                        className="absolute end-0 top-12 w-[200px] md:w-[250px] lg:w-[700px] object-contain"
                    />

                    {/* Icon at Bottom Left */}

                </div>

                <div className='flex justify-between flex-col md:flex-row items-center h-fit md:mt-[200px] pt-8'>
                    <div className="  h-fit hidden md:flex">
                        <img src="/images/iconBottom.png" alt="" className="w-[40px] h-fit" />
                    </div>
                    {/* Social Media Links */}
                    <div className=" flex flex-wrap justify-center  gap-2 md:gap-4">
                        <a
                            href="#"
                            className="text-gray-500 border border-gray-700 px-4 py-1 rounded-full hover:text-gray-700"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 border border-gray-700 px-4 py-1 rounded-full hover:text-gray-700"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 border border-gray-700 px-4 py-1 rounded-full hover:text-gray-700"
                        >
                            Facebook
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 border border-gray-700 px-4 py-1 rounded-full hover:text-gray-700"
                        >
                            YouTube
                        </a>
                    </div>
                    <div className='font-SpaceGrotesk mt-10 md:mt-0 text-[10px] text-gray-600'>
                        © 2023 — Copyright
                    </div>
                </div>

                {/* fab */}
                <div className=' rounded-full h-[50px] w-[50px] md:h-[80px] md:w-[80px] absolute overflow-hidden end-5 top-5 bg-gray-500'>
                    <a href="#top" className='flex justify-center items-center w-full h-full text-white'><IoIosArrowRoundUp /></a>
                </div>
            </section >
        </>
    );
};

export default Footer;
