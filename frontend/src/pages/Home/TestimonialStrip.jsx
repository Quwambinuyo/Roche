import React from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Reveal from "../Landing/Reveal";

const TestimonialStrip = ({ testimonials }) => {
  const safeTestimonials = (testimonials || []).filter(Boolean);
  if (safeTestimonials.length === 0) return null;

  return (
    <Reveal className="py-10">
      <h2 className="font-bold text-xl md:text-2xl text-secondary mb-6">
        What Our Customers Say
      </h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{ 768: { slidesPerView: 3 } }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={safeTestimonials.length > 3}
      >
        {safeTestimonials.map((testimonial, i) => (
          <SwiperSlide key={testimonial.id ?? i}>
            <div className="rounded-xl border border-secondary/10 p-5 h-full">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className={
                      idx < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-secondary/20"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-secondary/80 mb-4">
                {testimonial.quote}
              </p>
              <p className="text-xs font-semibold text-secondary">
                {testimonial.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Reveal>
  );
};

export default TestimonialStrip;
