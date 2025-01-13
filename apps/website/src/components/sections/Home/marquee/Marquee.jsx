import React from "react";

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
    <div className="inline-flex w-full flex-nowrap items-center justify-center overflow-hidden bg-[#8262b0] py-8 text-5xl [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] sm:flex md:py-8">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <ul
          key={index}
          className="animate-infinite-scroll flex h-full flex-1 items-center justify-center font-medium text-white md:justify-start [&_img]:max-w-none [&_li]:mx-4 sm:[&_li]:mx-8"
        >
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <li className="bg-primary text-primary-foreground Melodrama hidden place-content-center rounded-md p-2 text-center text-lg sm:grid md:text-5xl">
                {item.text}
              </li>
              <li>
                <img
                  src={item.imgSrc}
                  alt={`${item.text} icon`}
                  width={35}
                  height={35}
                  className="h-[20px] md:w-[18px] lg:h-[35px] lg:w-[35px]"
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
