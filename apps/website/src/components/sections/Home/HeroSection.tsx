import { AralectsAnimation } from "@components/aralects-animation";
const HeroSection = () => {
  return (
    <section className="relative h-[4000px] w-full">
      {/* <img
        src="/img/imgUnav1.png"
        alt=""
        className="absolute h-[60px] object-contain opacity-40"
      />
      <img
        src="/img/imgUnav2.png"
        alt=""
        className="absolute h-20 object-contain opacity-50 lg:h-[130px]"
      />
      <img
        src="/img/art222.png"
        alt=""
        className="absolute w-[130px] object-contain lg:w-[210px]"
      />
      <img
        src="/img/imgUhero1.png"
        alt=""
        className="absolute h-[100px] object-contain md:h-[140px]"
      />
      <img
        src="/img/imgUhero2.png"
        alt=""
        className="absolute h-[200px] w-auto object-contain md:h-[260px]"
      /> */}

      {/* Subheading with Arabic and Dialect */}
      <div className="sticky top-1/2 -translate-y-1/2 text-center text-4xl text-[#393939] md:text-5xl">
        <AralectsAnimation />
      </div>
    </section>
  );
};
{
  /* <button
  onClick={() => smoothScrollTo("newsletter", 80)}
  className="font-SpaceGrotesk tex-lg group mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#8262b0] px-5 py-2 text-[#8262b0] shadow-md transition-all hover:bg-[#8262b0] hover:text-white md:text-xl"
>
  Join waiting list
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-2 -translate-x-1 transition-transform group-hover:translate-x-0"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
</button>; */
}

export default HeroSection;
