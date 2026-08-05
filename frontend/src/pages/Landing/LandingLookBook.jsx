import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Reveal from "./Reveal";
import RevealImage from "../../components/UI/RevealImage";
import studio from "../../assets/images/landing/studio.jfif";
import rooftop from "../../assets/images/landing/rooftop.jfif";
import waxxed from "../../assets/images/landing/waxxed.jfif";
import loadingdock from "../../assets/images/landing/loadingdock.jfif";
import footwear from "../../assets/images/landing/footwear1.jfif";
import bottom from "../../assets/images/landing/bottom.jfif";
import outwear from "../../assets/images/landing/outwear.jfif";

const ENTRIES = [
  {
    number: "01",
    title: "Waxed for the Coast",
    copy: "Shot on the Lagos waterfront in the canvas jacket that started it all. Salt air, low light, no retouching.",
    image: waxxed,
  },
  {
    number: "02",
    title: "Studio, Late",
    copy: "The heavyweight cotton set, styled the way it's actually worn after a twelve hour shoot.",
    image: studio,
  },
  {
    number: "03",
    title: "Morning Run",
    copy: "Testing the chino's give at 6am before the light turned flat.",
    image: footwear,
  },
  {
    number: "04",
    title: "Back Alley",
    copy: "Raw concrete, raw denim. No styling beyond what was already in the bag.",
    image: bottom,
  },
  {
    number: "05",
    title: "Rooftop, Dusk",
    copy: "Last frames of the day, shot on the roof of the studio building.",
    image: loadingdock,
  },
  {
    number: "06",
    title: "Loading Dock",
    copy: "Where the canvas jacket actually gets worn, not just photographed.",
    image: outwear,
  },
];

const LandingLookBook = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-primary py-20">
      <style>{`
        .lookbook-swiper .swiper-pagination-bullet {
          background: var(--color-secondary, #fff);
          opacity: 0.3;
          width: 6px;
          height: 6px;
          transition: all 300ms ease;
        }
        .lookbook-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 9999px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
              Roche Notes
            </p>
            <h2 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
              Dispatches from the last shoot
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              ref={prevRef}
              aria-label="Previous"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary/20 text-secondary hover:border-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              ref={nextRef}
              aria-label="Next"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary/20 text-secondary hover:border-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </Reveal>

        <Reveal>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            className="lookbook-swiper pb-12"
          >
            {ENTRIES.map((entry) => (
              <SwiperSlide key={entry.number}>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <RevealImage
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-secondary/60 text-xs font-semibold tracking-widest">
                      {entry.number}
                    </p>
                    <p className="text-secondary font-bold text-xl mt-1">
                      {entry.title}
                    </p>
                    <p className="text-secondary/70 text-sm mt-2 max-w-sm leading-relaxed">
                      {entry.copy}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
};

export default LandingLookBook;
