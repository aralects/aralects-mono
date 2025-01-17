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
    <div className="group inline-flex w-full flex-nowrap items-center justify-center overflow-hidden bg-[#8262b0] text-5xl [perspective:1000px] sm:flex">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <ul
          key={index}
          className="animate-infinite-scroll flex h-full flex-1 items-center justify-center border-b-2 border-transparent font-medium text-white md:justify-start [&_img]:max-w-none [&_li]:mx-4 sm:[&_li]:mx-8"
        >
          {data.map((item, itemIndex) => (
            <Fragment key={itemIndex}>
              <li
                className="relative grid overflow-hidden py-6"
                style={gridAreaTemplateStyle}
              >
                <h1
                  rel="noopener noreferrer"
                  className="text-primary-foreground Melodrama translate-y-3 p-2 text-center text-2xl uppercase transition-all duration-300 [backface-visibility:hidden] [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] md:text-5xl"
                  style={gridAreaStyle}
                >
                  {item.english}
                </h1>
                <h1
                  rel="noopener noreferrer"
                  className="font-Rubbama text-primary-foreground p-2 text-center text-2xl transition-all  duration-300 [backface-visibility:hidden] [transform-style:preserve-3d] [transform:rotateX(180deg)]  group-hover:[transform:rotateX(0deg)_translateY(-18px)] md:text-7xl"
                  style={gridAreaStyle}
                >
                  {item.arabic}
                </h1>
              </li>
              <li>
                <img
                  src="/img/icon102.png"
                  alt=""
                  width={35}
                  height={35}
                  className="h-[20px] object-contain md:w-[18px] lg:h-[35px] lg:w-[35px]"
                />
              </li>
            </Fragment>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default MarqueeStrip;
