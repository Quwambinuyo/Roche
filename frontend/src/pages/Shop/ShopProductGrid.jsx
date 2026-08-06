import React from "react";
import ProductCard from "../Home/ProductCard";
import RailEmptyState from "../Home/RailEmptyState";

const ShopProductGrid = ({ products, onClearFilters }) => {
  if (products.length === 0) {
    return (
      <RailEmptyState
        message="No products match your current filters."
        ctaLabel="Clear Filters"
        ctaHref="#"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
      {products.map((product, i) => (
        <ProductCard key={`${product.name}-${i}`} product={product} />
      ))}
    </div>
  );
};

export default ShopProductGrid;
