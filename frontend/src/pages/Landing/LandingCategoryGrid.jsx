import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Reveal from "./Reveal";
import RevealImage from "../../components/UI/RevealImage";
import { CATEGORIES } from "../../mock/clothing";

const LandingCategoryGrid = () => {
  const [paginationEl, setPaginationEl] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
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

      {paginationEl && (
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            768: { slidesPerView: 4, spaceBetween: 16 },
          }}
          pagination={{
            clickable: true,
            el: paginationEl,
            dynamicBullets: true,
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
      )}

      <div className="flex items-center justify-center mt-8">
        <div
          ref={setPaginationEl}
          className="category-pagination flex items-center gap-2 static"
        />
      </div>
    </section>
  );
};

export default LandingCategoryGrid;
