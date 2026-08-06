import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import RevealImage from "../../components/UI/RevealImage";
import { PRODUCTS } from "../../mock/clothing";

const ProductCard = ({ product }) => {
  return (
    <Reveal className="group">
      <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-secondary/5">
        <RevealImage
          src={product.image}
          alt={product.name}
          className="w-full h-full"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        {product.soldOut && (
          <span className="absolute top-3 right-3 bg-secondary text-primary text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
            Sold Out
          </span>
        )}
      </div>

      <div className="h-px w-10 bg-secondary mt-3" />

      <p className="text-sm font-medium text-secondary mt-3">{product.name}</p>

      <div className="flex items-center gap-2 mt-1">
        {product.originalPrice && (
          <span className="text-xs text-secondary/40 line-through">
            {product.originalPrice}
          </span>
        )}
        <span className="text-sm text-secondary/70">
          {product.soldOut ? "Sold Out" : product.price}
        </span>
      </div>
    </Reveal>
  );
};

const LandingProductGrid = () => {
  const [paginationEl, setPaginationEl] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <SectionHeader title="Latest" />

      {paginationEl && (
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
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
          {PRODUCTS.map((product) => (
            <SwiperSlide key={product.name}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex items-center justify-center mt-8">
        <div
          ref={setPaginationEl}
          className="product-pagination flex items-center gap-2 static"
        />
      </div>
    </section>
  );
};

export default LandingProductGrid;
