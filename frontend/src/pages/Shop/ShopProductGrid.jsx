import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import RailEmptyState from "../Home/RailEmptyState";

const ShopProductGrid = ({ products, onClearFilters }) => {
  if (products.length === 0) {
    return (
      <RailEmptyState
        message="No products match your current filters."
        ctaLabel="Clear Filters"
        ctaHref="#"
        onCtaClick={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
      {products.map((product) => (
        <Link key={product.slug} to={`/shop/${product.slug}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ShopProductGrid;
