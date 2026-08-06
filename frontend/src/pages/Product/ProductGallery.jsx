import React, { useState } from "react";
import { ChevronRight, Eye } from "lucide-react";
import RevealImage from "../../components/UI/RevealImage";
import ProductImageLightbox from "./ProductImageLightbox";

const ProductGallery = ({ images, alt }) => {
  const [active, setActive] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goTo = (index) => {
    setActive((index + images.length) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
      <div className="relative order-1 md:order-2 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="group block w-full cursor-zoom-in"
        >
          <RevealImage
            key={active}
            src={images[active]}
            alt={alt}
            className="w-full aspect-square rounded-2xl"
            imgClassName="object-cover"
          />

          <span className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-secondary shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <Eye size={16} />
          </span>
        </button>

        {images.length > 1 && (
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-secondary hover:bg-primary transition-colors shadow-md"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[560px] shrink-0">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-2 transition-all ${
                active === index
                  ? "ring-secondary"
                  : "ring-secondary/10 opacity-70 hover:opacity-100"
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
