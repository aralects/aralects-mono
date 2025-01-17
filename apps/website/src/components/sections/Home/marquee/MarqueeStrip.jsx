import { Fragment } from "react";

const gridAreaTemplateStyle = {
  gridTemplateAreas: "'stack'",
};
const gridAreaStyle = { gridArea: "stack" };

const data = [
  {
    english: "Standard",
    arabic: "فصحى",
  },
  {
    english: "Egyptian",
    arabic: "مصري",
  },
  {
    english: "Syrian",
    arabic: "سوري",
  },
  {
    english: "Moroccan",
    arabic: "مغربي",
  },
  {
    english: "Lebanese",
    arabic: "لبناني",
  },
  {
    english: "Iraqi",
    arabic: "عراقي",
  },
  {
    english: "Palestinian",
    arabic: "فلسطيني",
  },
  {
    english: "Saudi",
    arabic: "سعودي",
  },
  {
    english: "Algerian",
    arabic: "جزائري",
  },
  {
    english: "Tunisian",
    arabic: "تونسي",
  },
  {
    english: "Sudanese",
    arabic: "سوداني",
  },
  {
    english: "Yemeni",
    arabic: "يمني",
  },
  {
    english: "Kuwaiti",
    arabic: "كويتي",
  },
  {
    english: "Jordanian",
    arabic: "أردني",
  },
  {
    english: "Libyan",
    arabic: "ليبي",
  },
  {
    english: "Emirati",
    arabic: "إماراتي",
  },
  {
    english: "Qatari",
    arabic: "قطري",
  },
  {
    english: "Bahraini",
    arabic: "بحريني",
  },
  {
    english: "Omani",
    arabic: "عماني",
  },
];

function MarqueeStrip() {
  return (
    <div className="group inline-flex w-full select-none flex-nowrap items-center justify-center overflow-hidden border-y-2 border-[#8262b0] bg-[#8262b0] text-5xl transition-all [perspective:1000px] hover:bg-[#F3F3F3] sm:flex">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <ul
          key={index}
          className="animate-infinite-scroll flex h-full flex-1 items-center justify-center border-b-2 border-transparent font-medium text-white group-hover:text-[#8262b0] md:justify-start [&_img]:max-w-none [&_li]:mx-4 sm:[&_li]:mx-8"
        >
          {data.map((item, itemIndex) => (
            <Fragment key={itemIndex}>
              <li
                className="relative grid overflow-hidden py-4 md:py-6"
                style={gridAreaTemplateStyle}
              >
                <h1
                  rel="noopener noreferrer"
                  className="text-primary-foreground Melodrama translate-y-0.5 p-2 text-center text-2xl uppercase transition-all duration-300 [backface-visibility:hidden] [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] md:translate-y-3 md:text-5xl"
                  style={gridAreaStyle}
                >
                  {item.english}
                </h1>
                <h1
                  rel="noopener noreferrer"
                  className="font-Rubbama text-primary-foreground p-2 text-center text-3xl transition-all duration-300  [backface-visibility:hidden] [transform-style:preserve-3d] [transform:rotateX(180deg)] group-hover:[transform:rotateX(0deg)] md:text-7xl md:group-hover:[transform:rotateX(0deg)_translateY(-18px)]"
                  style={gridAreaStyle}
                >
                  {item.arabic}
                </h1>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="59"
                  height="58"
                  viewBox="0 0 59 58"
                  fill="none"
                  className="h-[20px] object-contain transition-colors md:w-[18px] lg:h-[35px] lg:w-[35px]"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M58.75 57.5049V29C58.75 13.2525 45.7688 0.495117 29.755 0.495117C13.7412 0.495117 0.75 13.2525 0.75 29C0.75 44.7476 13.7412 57.5049 29.745 57.5049C35.2998 57.5049 40.4843 55.9607 44.8981 53.3049L49.1717 57.5049H58.75ZM31.5729 11.9531C30.2989 11.2197 28.5896 11.2197 25.171 11.2197V37.0618C25.171 40.4804 25.171 42.1898 25.9044 43.4638C26.3884 44.3045 27.0862 45.0023 27.9269 45.4863C29.2009 46.2197 30.9103 46.2197 34.3289 46.2197V20.3776C34.3289 16.959 34.3289 15.2497 33.5954 13.9757C33.1114 13.1349 32.4137 12.4372 31.5729 11.9531Z"
                    fill="currentColor"
                  />
                </svg>
              </li>
            </Fragment>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default MarqueeStrip;
