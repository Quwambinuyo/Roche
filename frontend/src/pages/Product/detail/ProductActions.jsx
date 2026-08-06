import React from "react";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";

const ProductActions = ({
  qty,
  onDecrease,
  onIncrease,
  onAddToCart,
  isOutOfStock,
  canAddBundleToCart,
  currentLineQty,
  wishlisted,
  onToggleWishlist,
}) => (
  <div className="mt-6 flex items-center gap-4">
    <div className="flex items-center rounded-full border border-secondary/15">
      <button
        onClick={onDecrease}
        className="w-9 h-9 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
      >
        <FiMinus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-secondary">
        {qty}
      </span>
      <button
        onClick={onIncrease}
        className="w-9 h-9 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
      >
        <FiPlus size={14} />
      </button>
    </div>

    <button
      onClick={onAddToCart}
      disabled={isOutOfStock || !canAddBundleToCart}
      className={`flex-1 h-11 rounded-full text-sm font-semibold transition-colors ${
        isOutOfStock || !canAddBundleToCart
          ? "bg-secondary/10 text-secondary/40 cursor-not-allowed"
          : "bg-secondary text-primary hover:bg-tertiary-800"
      }`}
    >
      {isOutOfStock
        ? "Out of stock"
        : !canAddBundleToCart
          ? "Select a color"
          : currentLineQty > 0
            ? `Add more (${currentLineQty} in cart)`
            : "Add to cart"}
    </button>

    <button
      onClick={onToggleWishlist}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center border transition-colors ${
        wishlisted
          ? "bg-secondary text-primary border-secondary"
          : "border-secondary/15 text-secondary hover:bg-secondary/5"
      }`}
    >
      <FiHeart size={18} className={wishlisted ? "fill-current" : ""} />
    </button>
  </div>
);

export default ProductActions;
