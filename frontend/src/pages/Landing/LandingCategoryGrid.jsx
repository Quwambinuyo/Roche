import React, { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Reveal from "./Reveal";
import RevealImage from "../../components/UI/RevealImage";
import { CATEGORIES } from "../../mock/clothing";

const LandingCategoryGrid = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <style>{`
        .category-pagination .swiper-pagination-bullet {
          background: var(--color-secondary, #000);
          opacity: 0.3;
          width: 6px;
          height: 6px;
          transition: all 300ms ease;
        }
        .category-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 9999px;
        }
      `}</style>

      <Reveal className="flex items-end justify-between mb-8">
        <h2 className="font-bold text-2xl md:text-3xl text-secondary">
          Shop by Category
        </h2>
        <a
          href="#"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-tertiary-700"
        >
          View all <ArrowUpRight size={14} />
        </a>
      </Reveal>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          768: { slidesPerView: 4, spaceBetween: 16 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          el: paginationRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.params.pagination.el = paginationRef.current;
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
      >
        {CATEGORIES.map((cat) => (
          <SwiperSlide key={cat.name}>
            <div className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer">
              <RevealImage
                src={cat.image}
                alt={cat.name}
                className="w-full h-full"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-secondary-900/0 to-secondary-900/0" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-primary font-semibold text-base">
                  {cat.name}
                </p>
                <p className="text-primary/70 text-xs mt-0.5">
                  {cat.count} pieces
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          ref={prevRef}
          aria-label="Previous"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary/20 text-secondary hover:border-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
        >
          <ChevronLeft size={16} />
        </button>
        <div
          ref={paginationRef}
          className="category-pagination flex items-center gap-2 static"
        />
        <button
          ref={nextRef}
          aria-label="Next"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary/20 text-secondary hover:border-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default LandingCategoryGrid;
