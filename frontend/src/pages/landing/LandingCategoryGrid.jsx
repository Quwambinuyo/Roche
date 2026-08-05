import React from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { CATEGORIES } from "../../mock/clothing";

const LandingCategoryGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <Reveal className="flex items-end justify-between mb-8">
        <h2 className="font-bold text-2xl md:text-3xl text-secondary">
          Shop by Category
        </h2>
        <a
          href="#"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-tertiary-700"
        >
          View all <ArrowUpRight size={14} />
        </a>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, i) => (
          <Reveal
            key={cat.name}
            delay={i * 80}
            className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-secondary-900/0 to-secondary-900/0" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-primary font-semibold text-base">{cat.name}</p>
              <p className="text-primary/70 text-xs mt-0.5">
                {cat.count} pieces
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default LandingCategoryGrid;
