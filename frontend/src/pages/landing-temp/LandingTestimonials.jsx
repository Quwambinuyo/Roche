import React from "react";
import Reveal from "./Reveal";
import { TESTIMONIALS } from "../../mock/clothing";

const LandingTestimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <Reveal className="mb-8">
        <h2 className="font-bold text-2xl md:text-3xl text-secondary">
          From the Rotation
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <Reveal
            key={t.name}
            delay={i * 100}
            className="border border-secondary/10 rounded-xl p-6 hover:border-tertiary-700/40 transition-colors duration-300"
          >
            <p className="text-sm text-secondary/70 leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-xs font-semibold tracking-widest text-tertiary-700 mt-4">
              {t.name.toUpperCase()}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default LandingTestimonials;
