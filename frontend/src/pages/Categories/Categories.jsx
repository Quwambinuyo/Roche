import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Reveal from "../Landing/Reveal";
import RevealImage from "../../components/UI/RevealImage";
import { CATEGORIES, PRODUCTS } from "../../mock/clothing";

const Categories = () => {
  return (
    <div className="">
      <Reveal className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Browse
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          Shop by Category
        </h1>
        <p className="text-sm text-secondary/50 mt-2 max-w-md">
          Every piece, sorted by department. Pick where you want to start.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {CATEGORIES.map((cat, i) => {
          const items = PRODUCTS.filter((p) => p.category === cat.slug);

          return (
            <Reveal key={cat.slug} delay={i * 50}>
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group relative block rounded-2xl overflow-hidden aspect-[3/4]"
              >
                <div className="absolute inset-0 z-0">
                  {items.length > 0 ? (
                    <Swiper
                      modules={[Autoplay]}
                      slidesPerView={1}
                      loop={items.length > 1}
                      autoplay={{
                        delay: 2200,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      allowTouchMove={false}
                      className="w-full h-full"
                    >
                      {items.map((item) => (
                        <SwiperSlide key={item.slug}>
                          <RevealImage
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full"
                            imgClassName="transition-transform duration-500 group-hover:scale-110"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <RevealImage
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-5 pointer-events-none">
                  <p className="text-white font-semibold text-base md:text-lg">
                    {cat.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-white/70 text-xs">{cat.count} pieces</p>
                    <span className="w-7 h-7 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <FiArrowUpRight size={13} className="text-white" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
