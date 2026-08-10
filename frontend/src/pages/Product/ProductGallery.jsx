import React, { useState } from "react";
import { ChevronRight, Eye } from "lucide-react";
import RevealImage from "../../components/UI/RevealImage";
import ProductImageLightbox from "./ProductImageLightbox";

const ProductGallery = ({ images, alt }) => {
  const [active, setActive] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (index) => {
    const nextIndex = (index + images.length) % images.length;
    if (nextIndex === active) return;
    setIsAnimating(true);
    setActive(nextIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 250);
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4 w-full">
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="group block w-full cursor-zoom-in"
        >
          <div
            className={`transition-all duration-200 ease-in-out ${
              isAnimating ? "opacity-40 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <RevealImage
              key={active}
              src={images[active]}
              alt={alt}
              className="w-full aspect-square rounded-2xl overflow-hidden"
              imgClassName="object-cover w-full h-full"
            />
          </div>

          <span className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-secondary shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <Eye size={16} />
          </span>
        </button>

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-secondary hover:bg-primary transition-colors shadow-md z-10"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex flex-row gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-2 transition-all duration-200 cursor-pointer ${
                active === index
                  ? "ring-secondary scale-105 shadow-sm"
                  : "ring-secondary/10 opacity-70 hover:opacity-100 hover:scale-100"
              }`}
            >
              <img
                src={img}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && (
        <ProductImageLightbox
          images={images}
          alt={alt}
          activeIndex={active}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={goTo}
        />
      )}
    </div>
  );
};

export default ProductGallery;
