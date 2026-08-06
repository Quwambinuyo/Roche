import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../Landing/Reveal";
import ProductCard from "../Home/ProductCard";
import { FOR_YOU } from "../../mock/home";

const ForYou = () => {
  const isEmpty = !FOR_YOU || FOR_YOU.length === 0;

  return (
    <div className="">
      <Reveal className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
            For You
          </p>
          <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
            Picked For You
          </h1>
        </div>
        <Link
          to="/shop"
          className="text-sm font-semibold text-secondary hover:text-tertiary-600 transition-colors whitespace-nowrap"
        >
          Browse shop
        </Link>
      </Reveal>

      {isEmpty ? (
        <div className="rounded-lg border border-dashed border-secondary/20 py-16 text-center">
          <p className="text-sm text-secondary/50">
            We're still learning your style. Explore a few pieces so we can
            tailor this for you.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-4 text-sm font-semibold text-secondary hover:text-tertiary-600 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {FOR_YOU.map((product, i) => (
            <Reveal key={product.slug} delay={i * 50}>
              <Link to={`/shop/${product.slug}`}>
                <ProductCard product={product} />
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForYou;
