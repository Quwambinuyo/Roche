import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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

      {product.colors && (
        <p className="text-xs text-secondary/40 italic mt-0.5">
          {product.colors} Colors
        </p>
      )}
    </Reveal>
  );
};

const LandingProductGrid = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <style>{`
        .product-pagination .swiper-pagination-bullet {
          background: var(--color-secondary, #000);
          opacity: 0.3;
          width: 6px;
          height: 6px;
          transition: all 300ms ease;
        }
        .product-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 9999px;
        }
      `}</style>

      <SectionHeader title="Latest" />

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 4, spaceBetween: 20 },
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
        {PRODUCTS.map((product) => (
          <SwiperSlide key={product.name}>
            <ProductCard product={product} />
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
          className="product-pagination flex items-center gap-2 static"
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

export default LandingProductGrid;
