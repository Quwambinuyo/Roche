import React from "react";

const ProductSpecs = ({ product }) => (
  <div>
    <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-4">
      Specs
    </p>
    <div className="grid sm:grid-cols-3 gap-px bg-secondary/10 rounded-2xl overflow-hidden">
      <div className="bg-primary p-5">
        <p className="text-xs text-secondary/50">Fabric</p>
        <p className="text-sm font-semibold text-secondary mt-1">
          {product.fabric}
        </p>
      </div>
      <div className="bg-primary p-5">
        <p className="text-xs text-secondary/50">Size range</p>
        <p className="text-sm font-semibold text-secondary mt-1">
          {product.size}
        </p>
      </div>
      <div className="bg-primary p-5">
        <p className="text-xs text-secondary/50">Category</p>
        <p className="text-sm font-semibold text-secondary mt-1 capitalize">
          {product.category}
        </p>
      </div>
    </div>
  </div>
);

export default ProductSpecs;
