import React, { useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import SocialIcons from "./socialicons/SocialIcons";

const Footer = () => {
  return (
    <>
      {/* Bottom Section: Arabic Dialects */}
      <section className="bg-gray-100 text-gray-900 m-auto  py-6 px-6 md:px-20 mt-6 relative rounded-[2rem]">

        <SocialIcons/>

        <div className="max-w-6xl mt-2">
          {/* Arabic Dialects Header */}
          <div className=" flex flex-col md:gap-[10px] md:text-left">
            <h2 className="text-[50px] md:text-[80px] lg:text-[100px] text-[#8c8c8c] font-extrabold tracking-wide font-SpaceGroteskBold">
              ARABIC
            </h2>
            <h3 className="text-[50px] md:text-[80px] lg:text-[100px] text-[#8c8c8c] font-extralight font-SpaceGroteskLight tracking-wide mt-2">
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

        <div className="flex  md:justify-between relative items-center h-fit md:mt-[100px] pt-8">
          <div className="h-fit">
            <img
              src="/images/iconBottom.svg"
              alt=""
              className="w-[40px] h-fit"
            />
          </div>
          {/* Social Media Links */}
          <div className="hidden w-full md:flex flex-wrap justify-center  gap-2 md:gap-4">
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
          <div className="font-SpaceGrotesk mt-1 text-[10px] md:w-[10%] text-gray-600">
            © 2023 — Copyright
          </div>

          <div className=" md:hidden absolute right-0 rounded-full h-[50px] w-[50px] md:h-[80px] md:w-[80px] self-end overflow-hidden end-5 top-5 bg-gray-500">
            <a
              href="#top"
              className="flex justify-center items-center w-full h-full text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-up"
              >
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
            </a>
          </div>
        </div>

        {/* fab */}
        <div className="hidden md:block rounded-full h-[50px] w-[50px] md:h-[80px] md:w-[80px] absolute overflow-hidden end-5 top-5 bg-gray-500">
          <a
            href="#top"
            className="flex justify-center items-center w-full h-full text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-up"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
};

export default Footer;
