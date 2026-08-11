import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../Landing/Reveal";
import ProductCard from "../Home/ProductCard";
import { PRODUCTS } from "../../mock/clothing";

const FEATURED_COUNT = 8;

const NewArrival = () => {
  const featured = PRODUCTS.slice(0, FEATURED_COUNT);

  return (
    <div className="">
      <Reveal className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
            New Arrivals
          </p>
          <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
            Latest Drops
          </h1>
        </div>
        <Link
          to="/shop"
          className="text-sm font-semibold text-secondary hover:text-tertiary-600 transition-colors whitespace-nowrap"
        >
          View all
        </Link>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
        {featured.map((product, i) => (
          <Reveal key={product.slug} delay={i * 50}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
