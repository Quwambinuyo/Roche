import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const LandingHero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <Reveal className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-tertiary-700 border border-tertiary-700/30 rounded-full px-3 py-1">
          FW&apos;26 — UTILITY COLLECTION
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-extrabold text-5xl md:text-6xl leading-[1.02] tracking-tight text-secondary mt-5">
            Built for the
            <br />
            day, worn
            <br />
            <span className="text-tertiary-700">into the night.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-secondary/60 mt-6 max-w-md text-base leading-relaxed">
            Heavy cottons, waxed canvas, and ripstop cut into everyday
            Rochewear. No seasonal filler, just pieces that earn their place in
            rotation.
          </p>
        </Reveal>

        <Reveal delay={300} className="flex items-center gap-4 mt-8">
          <button className="group inline-flex items-center gap-2 bg-secondary text-primary font-semibold text-sm px-6 py-3 rounded-full hover:bg-tertiary-900 transition-colors duration-300">
            Shop the Collection
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
          <a
            href="#"
            className="text-sm font-semibold text-secondary border-b border-secondary/30 hover:border-tertiary-700 pb-0.5 transition-colors duration-300"
          >
            View Lookbook
          </a>
        </Reveal>
      </div>

      <Reveal delay={150} className="relative">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
            alt="Roche jacket on model"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-primary border border-secondary/10 rounded-xl px-5 py-4 shadow-xl hidden sm:block">
          <p className="text-[10px] font-semibold tracking-widest text-secondary/40">
            FABRIC
          </p>
          <p className="text-sm font-semibold text-secondary mt-1">
            Waxed Cotton Canvas
          </p>
          <p className="text-[10px] font-semibold tracking-widest text-tertiary-700 mt-2">
            MADE IN LAGOS
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default LandingHero;
