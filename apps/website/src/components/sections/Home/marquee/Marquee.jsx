import React from 'react';

const data = [
  {
    text: "YAMANI",
    link: "https://x.com/naymur_dev",
    imgSrc: "/images/icon102.png",
  },
  {
    text: "EGYPTIAN",
    link: "https://www.youtube.com/naymurweb",
    imgSrc: "/images/icon102.png",
  },
  {
    text: "LEBANESE",
    link: "https://github.com/ui-layouts/uilayouts",
    imgSrc: "/images/icon102.png",
  },
  {
    text: "EMARATI",
    link: "https://x.com/naymur_dev",
    imgSrc: "/images/icon102.png",
  },
];

function Index() {
  return (
    <div className="w-full text-5xl py-8 inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] bg-[#8262b0] md:py-8 sm:flex justify-center items-center">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <ul
          key={index}
          className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll font-medium h-full flex-1 text-white border-b-2 border-transparent hover:border-purple-600 cursor-pointer"
        >
          {data.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.link}
                  className="bg-primary text-primary-foreground sm:grid hidden place-content-center p-2 rounded-md text-center Melodrama text-lg md:text-5xl"
                >
                  {item.text}
                </a>
              </li>
              <li>
                <img
                  src={item.imgSrc}
                  alt={`${item.text} icon`}
                  width={35}
                  height={35}
                  className="md:w-[18px] h-[20px] lg:h-[35px] lg:w-[35px]"
                />
              </li>
            </React.Fragment>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default Index;
