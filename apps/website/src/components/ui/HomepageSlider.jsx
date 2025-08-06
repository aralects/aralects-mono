import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "@components/ui/CarouselDot.jsx";

function HomepageSlider({ isFirstPromo = false }) {
  const [isClient, setIsClient] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    customPaging: (i) => (
      <div className={"dots-bg h-[9px] w-[9px] rounded-full"}></div>
    ),
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the slider on the client side
  if (!isClient) {
    return <div>Loading slider...</div>;
  }

  return (
    <section className="embla embla-small">
      <div className="embla__viewport" ref={emblaRef}>
        {isFirstPromo ? (
          <div className={"embla__container mt-[30px]"}>
            <div className="embla__slide">
              <img
                src="/img/homepage-promo-1-prompt.png"
                alt=""
                className="h-[56px] w-[150px] max-w-full translate-x-[-6px] object-contain"
              />
              <div className="font-LivvicMedium text-glow-xl text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-bold transition motion-safe:opacity-0 md:text-lg">
                AI-Powered Customization
              </div>
              <p className="font-SpaceGroteskLight md:text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-thin text-white transition motion-safe:opacity-0">
                Move at your own speed with customizable lessons.
              </p>
            </div>
            <div className="embla__slide">
              <img
                src="/img/homepage-promo-1-script.png"
                alt=""
                className="h-[56px] w-[100px] max-w-full translate-x-[-32px] object-contain"
              />
              <div className="font-LivvicMedium text-glow-xl text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-bold transition motion-safe:opacity-0 md:text-lg">
                Script Settings
              </div>
              <p className="font-SpaceGroteskLight md:text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-thin text-white transition motion-safe:opacity-0">
                Toggle between Arabic script, Latin transliteration, or a
                combined view so you learn in the format that works best for
                you.
              </p>
            </div>
            <div className="embla__slide">
              <img
                src="/img/homepage-promo-1-dialects.png"
                alt=""
                className="h-[56px] w-[190px] max-w-full translate-x-[-8px] object-contain"
              />
              <div className="font-LivvicMedium text-glow-xl text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-bold transition motion-safe:opacity-0 md:text-lg">
                Main & Secondary Dialect
              </div>
              <p className="font-SpaceGroteskLight md:text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-thin text-white transition motion-safe:opacity-0">
                Choose a primary and secondary dialect, every lesson dynamically
                shows vocabulary and phrases side‑by‑side.
              </p>
            </div>
          </div>
        ) : (
          <div className={"embla__container mt-[30px]"}>
            <div className="embla__slide">
              <img
                src="/img/homepage-promo-2-audio.png"
                alt=""
                className="h-[56px] w-[60px] max-w-full translate-x-[-12px] object-contain"
              />
              <div className="font-LivvicMedium text-glow-xl text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-bold transition motion-safe:opacity-0 md:text-lg">
                Audio Pronunciation
              </div>
              <p className="font-SpaceGroteskLight md:text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-thin text-white transition motion-safe:opacity-0">
                Hear every word and phrase spoken by native speakers.
              </p>
            </div>
            <div className="embla__slide">
              <img
                src="/img/homepage-promo-2-explain.png"
                alt=""
                className="h-[56px] w-[100px] max-w-full translate-x-[-10px] object-contain"
              />
              <div className="font-LivvicMedium text-glow-xl text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-bold transition motion-safe:opacity-0 md:text-lg">
                “Explain Answer” Feature
              </div>
              <p className="font-SpaceGroteskLight md:text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-thin text-white transition motion-safe:opacity-0">
                Tappable chat icon that opens the AI bot for an in‑depth
                breakdown, great for curious students who want more nuance.
              </p>
            </div>
            <div className="embla__slide">
              <img
                src="/img/homepage-promo-2-dialect.png"
                alt=""
                className="h-[56px] w-[190px] max-w-full translate-x-[-10px] object-contain"
              />
              <div className="font-LivvicMedium text-glow-xl text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-bold transition motion-safe:opacity-0 md:text-lg">
                Secondary Dialect
              </div>
              <p className="font-SpaceGroteskLight md:text-md intersect-once motion-safe:intersect:animate-fade-in-up mt-1 font-thin text-white transition motion-safe:opacity-0">
                Every lesson shows the word being learned in the secondary
                dialect chosen by you.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="embla__controls">
        <div className="embla__dots embla__dots__purple">
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

export default HomepageSlider;
