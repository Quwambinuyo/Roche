import React from "react";
import Reveal from "./Reveal";
import { PRODUCTS } from "../../mock/clothing";

const ProductCard = ({ product, delay }) => {
  return (
    <Reveal delay={delay} className="group">
      <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-secondary/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-primary rounded-lg px-3 py-2 shadow-lg origin-top-right transition-all duration-300 -rotate-6 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:rotate-0 group-hover:translate-y-0">
          <p className="text-[9px] font-semibold tracking-widest text-secondary/40">
            {product.fabric}
          </p>
          <p className="text-[9px] font-semibold tracking-widest text-tertiary-700 mt-0.5">
            {product.size}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-sm font-semibold text-secondary">{product.name}</p>
        <p className="text-sm font-semibold text-tertiary-700">
          {product.price}
        </p>
      </div>
    </Reveal>
  );
};

const LandingProductGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <Reveal className="mb-8">
        <h2 className="font-bold text-2xl md:text-3xl text-secondary">
          Featured Pieces
        </h2>
        <p className="text-secondary/50 text-sm mt-2">
          Hover to see fabric and fit.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.name} product={product} delay={i * 80} />
        ))}
      </div>
    </section>
  );
};

export default LandingProductGrid;
