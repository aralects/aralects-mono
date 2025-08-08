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
                Chat with your personal tutor to customize lessons that fit your
                immediate needs and interests—right when you need them. Update
                your focus anytime, and your plan instantly adapts.
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
                Switch seamlessly between the Arabic and Latin alphabet, or both
                at once, so you can learn in the format that feels most natural
                to you, and that helps you meet your goals.
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
                Pick your primary and secondary dialect, and see vocabulary and
                phrases displayed side-by-side in every lesson—making
                comparisons effortless and learning faster.
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
                Hear every word and phrase spoken by native speakers for
                authentic pronunciation and natural rhythm.
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
                Tap the chat icon to get an AI-powered breakdown of your
                answer—perfect for learners who want deeper insights and
                context.
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
                See every new word in your chosen secondary dialect, making it
                easier to compare and connect across dialects as you learn.
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
