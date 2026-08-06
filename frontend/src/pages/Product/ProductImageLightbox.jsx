import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
      if (e.key === "ArrowRight") onNavigate(activeIndex + 1);
      if (e.key === "ArrowLeft") onNavigate(activeIndex - 1);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, onClose, onNavigate]);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-primary flex items-center justify-center">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 rounded-full bg-secondary/5 text-sm font-semibold text-secondary">
        {activeIndex + 1} / {images.length}
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-secondary text-primary hover:bg-tertiary-800 flex items-center justify-center transition-colors shadow-md"
      >
        <X size={20} />
      </button>

      {images.length > 1 && (
        <button
          onClick={() => onNavigate(activeIndex - 1)}
          aria-label="Previous image"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary text-primary hover:bg-tertiary-800 flex items-center justify-center transition-colors shadow-md"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <img
        src={images[activeIndex]}
        alt={`${alt} ${activeIndex + 1}`}
        className="w-screen h-screen object-contain p-4 sm:p-8"
      />

      {images.length > 1 && (
        <button
          onClick={() => onNavigate(activeIndex + 1)}
          aria-label="Next image"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary text-primary hover:bg-tertiary-800 flex items-center justify-center transition-colors shadow-md"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>,
    document.body,
  );
};

export default ProductImageLightbox;
