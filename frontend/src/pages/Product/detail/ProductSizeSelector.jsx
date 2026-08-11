import React, { useEffect, useRef, useState } from "react";

const ProductSizeSelector = ({
  sizes,
  selectedSize,
  onSelectSize,
  isBundle,
  onOpenSizeGuide,
}) => {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  useEffect(() => {
    const selectedEl = buttonRefs.current[selectedSize?.size];
    const containerEl = containerRef.current;

    if (!selectedEl || !containerEl) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const containerRect = containerEl.getBoundingClientRect();
    const buttonRect = selectedEl.getBoundingClientRect();

    setIndicator({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
      visible: true,
    });
  }, [selectedSize, sizes]);

  return (
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

      <div ref={containerRef} className="relative flex flex-wrap gap-2">
        <div
          className="absolute top-0 h-full rounded-full bg-secondary transition-all duration-300 ease-out"
          style={{
            left: 0,
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
            opacity: indicator.visible ? 1 : 0,
          }}
        />

        {sizes.map((size) => {
          const isOutOfStock = size.stock === 0;
          const isSelected = selectedSize?.size === size.size;

          return (
            <button
              key={size.size}
              ref={(el) => (buttonRefs.current[size.size] = el)}
              onClick={() => !isOutOfStock && onSelectSize(size)}
              disabled={isOutOfStock}
              title={isOutOfStock ? `${size.size} — out of stock` : size.size}
              className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                isSelected
                  ? "text-primary"
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
};

export default ProductSizeSelector;
