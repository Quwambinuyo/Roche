import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Thumbs,
  Autoplay,
  EffectCreative,
  Keyboard,
} from "swiper/modules";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiMaximize,
  FiPlay,
  FiPause,
  FiHome,
} from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-creative";

import { GALLERY_IMAGES } from "../../mock/gallery";
import RevealImage from "../../components/UI/RevealImage";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mainSwiperRef = useRef(null);
  const lightboxRef = useRef(null);

  const isOpen = activeIndex !== null;

  const openAt = (index) => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const close = () => {
    setActiveIndex(null);
    setThumbsSwiper(null);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && document.body) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (document.body) document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    if (!lightboxRef.current) return;
    if (!document.fullscreenElement) {
      lightboxRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const togglePlay = () => {
    const swiper = mainSwiperRef.current;
    if (!swiper) return;

    if (isPlaying) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-primary text-secondary pb-24">
      <div className="px-6 pt-10 pb-8 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
          Lookbook
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-1 px-6 pb-16 md:px-10">
        {GALLERY_IMAGES.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openAt(index)}
            className="aspect-square overflow-hidden bg-tertiary-50"
            aria-label={`View ${image.alt} in lookbook`}
          >
            <RevealImage
              src={image.src}
              alt={image.alt}
              className="h-full w-full"
              imgClassName="transition-transform duration-300 hover:scale-105"
              delay={(index % 4) * 80}
            />
          </button>
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-secondary/10 bg-primary/95 backdrop-blur">
        <div className="flex items-center justify-center py-2">
          <Link
            to="/"
            aria-label="Back to home"
            className="flex flex-col items-center gap-1 px-6 py-1 text-secondary/70 transition-colors duration-200 hover:text-tertiary-700"
          >
            <FiHome size={22} />
            <span className="text-xs font-medium">Home</span>
          </Link>
        </div>
      </nav>

      {isOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Lookbook image viewer"
        >
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => mainSwiperRef.current?.slidePrev()}
                aria-label="Previous image"
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => mainSwiperRef.current?.slideNext()}
                aria-label="Next image"
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <FiChevronRight size={20} />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={close}
                aria-label="Back to grid view"
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <FiGrid size={18} />
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Toggle fullscreen"
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <FiMaximize size={18} />
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close viewer"
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 pb-4">
            <div className="h-[420px] w-[300px] border-8 border-white bg-white shadow-2xl">
              <Swiper
                modules={[
                  Navigation,
                  Thumbs,
                  Autoplay,
                  EffectCreative,
                  Keyboard,
                ]}
                effect="creative"
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: [0, 0, -500],
                    rotate: [0, 0, -25],
                    opacity: 0,
                  },
                  next: {
                    translate: ["120%", 0, 0],
                    rotate: [0, 0, 20],
                    opacity: 0,
                  },
                }}
                speed={650}
                keyboard={{ enabled: true, onlyInViewport: false }}
                autoplay={{ delay: 2200, disableOnInteraction: false }}
                thumbs={{ swiper: thumbsSwiper }}
                initialSlide={activeIndex}
                onSwiper={(swiper) => {
                  mainSwiperRef.current = swiper;
                  swiper.autoplay.stop();
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full w-full"
              >
                {GALLERY_IMAGES.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="px-4 pb-4">
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView="auto"
              spaceBetween={8}
              watchSlidesProgress
              className="w-full"
            >
              {GALLERY_IMAGES.map((image, index) => (
                <SwiperSlide key={image.id} className="!w-16">
                  <button
                    type="button"
                    onClick={() =>
                      mainSwiperRef.current?.slideToLoop?.(index) ??
                      mainSwiperRef.current?.slideTo(index)
                    }
                    className={`h-20 w-16 overflow-hidden border-2 transition-colors ${
                      index === activeIndex
                        ? "border-white"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Go to ${image.alt}`}
                    aria-current={index === activeIndex}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
