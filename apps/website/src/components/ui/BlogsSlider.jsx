import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "@components/ui/CarouselDot.jsx";

function BlogsSlider() {
  const [isClient, setIsClient] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the slider on the client side
  if (!isClient) {
    return <div>Loading slider...</div>;
  }

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide" key={3}>
            <div className={`relative flex flex-col items-center`} key={3}>
              <div
                className={`flex flex-col items-center rounded-[25px] bg-white p-6 text-center shadow-xl transition-all duration-300`}
              >
                <div className="relative mb-5 h-60 w-full overflow-visible rounded-[25px] border border-[#8262b0]">
                  <img
                    src="/img/blogs-1.jpg"
                    alt="Card image"
                    className="h-full w-full rounded-[25px] object-cover"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#8262b0] px-3 py-1 text-xs text-white shadow-md">
                    SPOTLIGHTS
                  </div>
                </div>

                <h3 className="mb-3 mt-2 text-lg font-semibold text-black">
                  What is the Best Arabic Dialect for You to Learn
                </h3>
                <p className="mb-5 text-left text-xs text-gray-500">
                  Choosing a dialect to learn depends on your goals - choosing
                  what works for your goals will always be right for you.
                </p>

                <div className="mb-5 flex items-center justify-center gap-1 text-sm text-[#8262b0]">
                  <img
                    src="/img/message-text.svg"
                    alt="Comments"
                    className="h-4 w-4"
                  />
                  <span>20 comments</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#8262b0]">
                  <span>23 Jan 2025</span>
                  <span className="font-bold">·</span>
                  <img
                    src="/img/maskot.svg"
                    alt="Author"
                    className="h-5 w-5 object-contain"
                  />
                  <span>Aralects</span>
                </div>
              </div>
            </div>
          </div>
          <div className="embla__slide" key={1}>
            <div className={`relative flex flex-col items-center`}>
              <div
                className={`flex flex-col items-center rounded-[25px] bg-white p-6 text-center shadow-xl transition-all duration-300`}
              >
                <div className="relative mb-5 h-60 w-full overflow-visible rounded-[25px] border border-[#8262b0]">
                  <img
                    src="/img/blogs-2.jpg"
                    alt="Card image"
                    className="h-full w-full rounded-[25px] object-cover"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#8262b0] px-3 py-1 text-xs text-white shadow-md">
                    SPOTLIGHTS
                  </div>
                </div>

                <h3 className="mb-3 mt-2 text-lg font-semibold text-black">
                  Mapping Palestinian <br /> Arabic
                </h3>
                <p className="mb-5 text-left text-xs text-gray-500">
                  This article recounts the author’s efforts with the Maknuune
                  project - an open lexicon dedicated to documenting and..
                </p>

                <div className="mb-5 flex items-center justify-center gap-1 text-sm text-[#8262b0]">
                  <img
                    src="/img/message-text.svg"
                    alt="Comments"
                    className="h-4 w-4"
                  />
                  <span>12 comments</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#8262b0]">
                  <span>12 Feb 2025</span>
                  <span className="font-bold">·</span>
                  <img
                    src="/img/maskot.svg"
                    alt="Author"
                    className="h-5 w-5 object-contain"
                  />
                  <span>Aralects</span>
                </div>
              </div>
            </div>
          </div>

          <div className="embla__slide" key={2}>
            <div className={`relative flex flex-col items-center`}>
              <div
                className={`flex flex-col items-center rounded-[25px] bg-white p-6 text-center shadow-xl transition-all duration-300`}
              >
                <div className="relative mb-5 h-60 w-full overflow-visible rounded-[25px] border border-[#8262b0]">
                  <img
                    src="/img/blogs-1.jpg"
                    alt="Card image"
                    className="h-full w-full rounded-[25px] object-cover"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#8262b0] px-3 py-1 text-xs text-white shadow-md">
                    SPOTLIGHTS
                  </div>
                </div>

                <h3 className="mb-3 mt-2 text-lg font-semibold text-black">
                  Standard Arabic vs Dialects: What Should You Learn First?
                </h3>
                <p className="mb-5 text-left text-xs text-gray-500">
                  Standard Arabic suits formal reading and a dialect handles
                  daily talk. Either works—choose what meets your goals.
                </p>

                <div className="mb-5 flex items-center justify-center gap-1 text-sm text-[#8262b0]">
                  <img
                    src="/img/message-text.svg"
                    alt="Comments"
                    className="h-4 w-4"
                  />
                  <span>32 comments</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#8262b0]">
                  <span>2 April 2025</span>
                  <span className="font-bold">·</span>
                  <img
                    src="/img/maskot.svg"
                    alt="Author"
                    className="h-5 w-5 object-contain"
                  />
                  <span>Aralects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : "",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogsSlider;
