import React from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { PRODUCTS } from "../../mock/clothing";

const ProductCard = ({ product, delay }) => {
  return (
    <Reveal delay={delay} className="group">
      <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-secondary/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.soldOut && (
          <span className="absolute top-3 right-3 bg-secondary text-primary text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
            Sold Out
          </span>
        )}
      </div>

      <div className="h-px w-10 bg-secondary mt-3" />

      <p className="text-sm font-medium text-secondary mt-3">{product.name}</p>

      <div className="flex items-center gap-2 mt-1">
        {product.originalPrice && (
          <span className="text-xs text-secondary/40 line-through">
            {product.originalPrice}
          </span>
        )}
        <span className="text-sm text-secondary/70">
          {product.soldOut ? "Sold Out" : product.price}
        </span>
      </div>

      {product.colors && (
        <p className="text-xs text-secondary/40 italic mt-0.5">
          {product.colors} Colors
        </p>
      )}
    </Reveal>
  );
};

const LandingProductGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <SectionHeader title="Latest" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.name} product={product} delay={i * 80} />
        ))}
      </div>
    </section>
  );
};

export default LandingProductGrid;
