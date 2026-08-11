import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const ProductImageLightbox = ({
  images,
  alt,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-primary flex items-center justify-center select-none">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 rounded-full bg-secondary/5 text-sm font-semibold text-secondary z-20 pointer-events-none">
        {activeIndex + 1} / {images.length}
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-secondary text-primary hover:bg-tertiary-800 flex items-center justify-center transition-colors shadow-md z-20 cursor-pointer"
      >
        <X size={20} />
      </button>

      {images.length > 1 && (
        <button
          aria-label="Previous image"
          className="lightbox-prev absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary text-primary hover:bg-tertiary-800 flex items-center justify-center transition-colors shadow-md z-20 cursor-pointer disabled:opacity-40 "
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {images.length > 1 && (
        <button
          aria-label="Next image"
          className="lightbox-next absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary text-primary hover:bg-tertiary-800 flex items-center justify-center transition-colors shadow-md z-20 cursor-pointer disabled:opacity-40 "
        >
          <ChevronRight size={20} />
        </button>
      )}

      <Swiper
        modules={[Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        initialSlide={activeIndex}
        onSlideChange={(swiper) => onNavigate(swiper.activeIndex)}
        navigation={{
          prevEl: ".lightbox-prev",
          nextEl: ".lightbox-next",
        }}
        speed={400}
        grabCursor={true}
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src={img}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-contain p-4 sm:p-8 pointer-events-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>,
    document.body,
  );
};

export default ProductImageLightbox;
