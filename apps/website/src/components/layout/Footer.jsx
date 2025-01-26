import SocialSidebar from "@components/sections/Home/SocialSidebar";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-4 mt-5 flex overflow-hidden rounded-t-3xl bg-gray-100 text-gray-900 md:mt-[60px]">
      <div className="container relative mx-auto px-8 py-10">
        <SocialSidebar className="absolute right-8 top-12 z-[1] flex flex-col items-center gap-y-2 text-[#676767] hover:text-[#676767/90]" />
        <div className="flex max-w-6xl flex-col">
          {/* Arabic Dialects Header */}
          <div className="flex flex-col md:text-left">
            <h2 className="font-SpaceGroteskBold text-5xl font-extrabold tracking-wide text-[#8c8c8c] md:text-[80px] lg:text-[100px]">
              ARABIC
            </h2>
            <h3 className="font-SpaceGroteskLight text-5xl font-extralight tracking-wide text-[#8c8c8c] md:text-[80px] lg:text-[100px]">
              DIALECTS
            </h3>
          </div>
        </div>

        {/* Top Right Image */}
        <img
          src="/img/art227.png"
          alt=""
          className="absolute bottom-8 end-0 w-[60%] object-contain md:top-12 md:w-[620px]"
        />

        {/* bottom left aralects symbol */}
        <svg
          width="32"
          height="38"
          viewBox="0 0 32 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-12"
        >
          <path
            d="M24.2366 6.46195V9.9239H25.3798L25.8899 9.4138C26.4167 9.73635 27.0355 9.9239 27.6985 9.9239C29.6087 9.9239 31.1593 8.3745 31.1593 6.46195C31.1593 4.5494 29.6087 3 27.6973 3C25.786 3 24.2366 4.5494 24.2366 6.46195Z"
            fill="#676767"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 21.7171C0 14.3845 5.94086 8.43427 13.2735 8.43427C20.6062 8.43427 26.5564 14.3845 26.5564 21.7171V35H22.1661L20.2139 33.0477C18.1962 34.2808 15.8143 35 13.2735 35C5.9502 35 0 29.0498 0 21.7171ZM14.2263 29.4795H14.9362V16.4115C14.9362 15.9175 14.1889 14.7394 13.2642 14.7394H12.9921C12.5075 14.4857 11.956 14.3422 11.3711 14.3422H11.0903V25.9651C11.0903 26.6894 11.3104 27.3624 11.6873 27.9208C12.1593 28.8446 13.121 29.4795 14.2263 29.4795Z"
            fill="#676767"
          />
        </svg>

        {/* scroll to top button */}
        <button
          onClick={scrollToTop}
          className="group absolute bottom-6 right-6 flex items-center justify-center overflow-hidden rounded-full bg-gray-500 p-4 text-white transition-colors hover:bg-gray-500/90 lg:p-8"
        >
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
            className="h-4 w-4 transition-transform group-hover:scale-110"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Footer;
