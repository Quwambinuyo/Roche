import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Eye } from "lucide-react";
import RevealImage from "../../components/UI/RevealImage";
import ProductImageLightbox from "./ProductImageLightbox";
import "swiper/css";

const ProductGallery = ({ images, alt }) => {
  const [active, setActive] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const swiperRef = useRef(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const goTo = (index) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className="w-full">
      <div className="md:hidden relative w-screen left-1/2 right-1/2 -mx-[50vw]">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActive(swiper.activeIndex)}
          grabCursor
          resistance
          resistanceRatio={0.3}
          speed={250}
          slidesPerView={1}
          className="w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative block w-full cursor-zoom-in p-0 m-0 border-0 outline-none"
              >
                <RevealImage
                  src={img}
                  alt={alt}
                  className="w-full aspect-[4/5] overflow-hidden p-0 m-0 block"
                  imgClassName="object-cover w-full h-full block pointer-events-none select-none"
                />

                <span className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-secondary shadow-md z-20">
                  <Eye size={16} />
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(index);
                }}
                aria-label={`Go to image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === index ? "w-5 bg-white shadow" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:grid grid-cols-2">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative block w-full overflow-hidden cursor-zoom-in p-0 m-0 border-0 outline-none"
          >
            <RevealImage
              src={img}
              alt={`${alt} ${index + 1}`}
              className="w-full aspect-[4/5] overflow-hidden p-0 m-0 block"
              imgClassName="object-cover w-full h-full block transition-transform duration-500 group-hover:scale-105"
              delay={index * 60}
            />

            <span className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-secondary shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <Eye size={16} />
            </span>
          </button>
        ))}
      </div>

      {isLightboxOpen && (
        <ProductImageLightbox
          images={images}
          alt={alt}
          activeIndex={lightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default ProductGallery;
