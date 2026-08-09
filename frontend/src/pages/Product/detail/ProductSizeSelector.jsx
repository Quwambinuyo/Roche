import React from "react";

const ProductSizeSelector = ({
  sizes,
  selectedSize,
  onSelectSize,
  isBundle,
  onOpenSizeGuide,
}) => (
  <div className="mt-6">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
        Size — {selectedSize?.size || "Select"}
      </p>
      {!isBundle && (
        <button
          onClick={onOpenSizeGuide}
          className="text-xs font-semibold text-secondary underline underline-offset-2 hover:text-tertiary-600 transition-colors"
        >
          Size guide
        </button>
      )}
    </div>
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const isOutOfStock = size.stock === 0;
        const isSelected = selectedSize?.size === size.size;

        return (
          <button
            key={size.size}
            onClick={() => !isOutOfStock && onSelectSize(size)}
            disabled={isOutOfStock}
            title={isOutOfStock ? `${size.size} — out of stock` : size.size}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              isSelected
                ? "bg-secondary text-primary"
                : "bg-secondary/5 text-secondary hover:bg-secondary/10"
            } ${
              isOutOfStock
                ? "opacity-40 cursor-not-allowed line-through"
                : "cursor-pointer"
            }`}
          >
            {size.size}
          </button>
        );
      })}
    </div>
  </div>
);

export default ProductSizeSelector;
