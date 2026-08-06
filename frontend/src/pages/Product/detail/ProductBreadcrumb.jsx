import React from "react";
import { Link } from "react-router-dom";

const ProductBreadcrumb = ({ product }) => (
  <div className="flex items-center gap-2 text-xs text-secondary/50">
    <Link to="/shop" className="hover:text-secondary transition-colors">
      Shop
    </Link>
    <span>/</span>
    <Link
      to={`/shop?category=${product.category}`}
      className="capitalize hover:text-secondary transition-colors"
    >
      {product.category}
    </Link>
    <span>/</span>
    <span className="text-secondary">{product.name}</span>
  </div>
);

export default ProductBreadcrumb;
