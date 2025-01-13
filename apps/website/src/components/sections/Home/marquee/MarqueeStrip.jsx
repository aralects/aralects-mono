import React, { useState } from "react";

const data = [
  {
    text: "YAMANI",
    arabic: "يمني",
    link: "",
    imgSrc: "/images/icon102.png",
  },
  {
    text: "EGYPTIAN",
    arabic: "مصرية",
    link: "",
    imgSrc: "/images/icon102.png",
  },
  {
    text: "LEBANESE",
    arabic: "لبناني",
    link: "",
    imgSrc: "/images/icon102.png",
  },
  {
    text: "EMARATI",
    arabic: "إماراتي",
    link: "",
    imgSrc: "/images/icon102.png",
  },
];

function MarqueeStrip() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full text-5xl inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] bg-[#8262b0] sm:flex justify-center items-center">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <ul
          key={index}
          className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll font-medium h-full flex-1 text-white border-b-2 border-transparent"
        >
          {data.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              <li
                onMouseEnter={() => setHoveredIndex(itemIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="h-full md:w-[200px] md:py-8"
              >
                <h1
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground grid place-content-center p-2 rounded-md text-center Melodrama text-2xl md:text-5xl"
                >
                  {hoveredIndex === itemIndex ? item.arabic : item.text}
                </h1>
              </li>
              <li>
                <img
                  src={item.imgSrc}
                  alt={`${item.text} icon`}
                  width={35}
                  height={35}
                  className="md:w-[18px] h-[20px] lg:h-[35px] object-contain lg:w-[35px]"
                />
              </li>
            </React.Fragment>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default MarqueeStrip;
