import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Reveal from "../Landing/Reveal";
import ProductCard from "./ProductCard";
import RailEmptyState from "./RailEmptyState";

const ProductRail = ({
  title,
  subtitle,
  products,
  viewAllHref = "#",
  emptyMessage,
  emptyCtaLabel,
  emptyCtaHref = "#",
}) => {
  const [paginationEl, setPaginationEl] = useState(null);
  const isEmpty = !products || products.length === 0;

  return (
    <section className="mx-auto py-10">
      <Reveal className="flex items-end justify-between mb-6">
        <div>
          {subtitle && (
            <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
              {subtitle}
            </p>
          )}
          <h2 className="font-bold text-xl md:text-2xl text-secondary mt-1">
            {title}
          </h2>
        </div>
        {!isEmpty && (
          <Link
            to={viewAllHref}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-tertiary-700"
          >
            View all <ArrowUpRight size={14} />
          </Link>
        )}
      </Reveal>

      {isEmpty ? (
        <RailEmptyState
          message={emptyMessage}
          ctaLabel={emptyCtaLabel}
          ctaHref={emptyCtaHref}
        />
      ) : (
        <>
          {paginationEl && (
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                768: { slidesPerView: 4, spaceBetween: 20 },
              }}
              pagination={{
                clickable: true,
                el: paginationEl,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={products.length > 4}
            >
              {products.map((product, i) => (
                <SwiperSlide key={`${product.name}-${i}`}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="flex items-center justify-center mt-6">
            <div
              ref={setPaginationEl}
              className="product-pagination flex items-center gap-2 static"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ProductRail;
