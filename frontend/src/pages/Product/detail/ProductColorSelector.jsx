import React from "react";
import { FiCheck } from "react-icons/fi";

const ProductColorSelector = ({
  isBundle,
  colors,
  selectedColor,
  selectedColorNames,
  onSelectColor,
  onToggleBundleColor,
  isOutOfStock,
}) => (
  <div className="mt-8">
    <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-3">
      {isBundle
        ? `Colors — ${
            selectedColorNames.length > 0
              ? `${selectedColorNames.length} selected`
              : "Select one or more"
          }`
        : `Color — ${selectedColor?.name || "Select"}`}
      {!isBundle && isOutOfStock && (
        <span className="normal-case tracking-normal text-secondary/40 font-normal">
          {" "}
          (out of stock)
        </span>
      )}
    </p>
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => {
        const isSelected = isBundle
          ? selectedColorNames.includes(color.name)
          : selectedColor?.name === color.name;
        const outOfStock = color.stock === 0;
        return (
          <div key={color.name} className="flex flex-col items-center gap-1">
            <button
              onClick={() =>
                isBundle
                  ? onToggleBundleColor(color.name)
                  : onSelectColor(color)
              }
              disabled={outOfStock}
              title={outOfStock ? `${color.name} — out of stock` : color.name}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isSelected
                  ? "ring-2 ring-offset-2 ring-secondary ring-offset-primary"
                  : "ring-1 ring-secondary/15"
              } ${outOfStock ? "opacity-30 cursor-not-allowed" : ""}`}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && !outOfStock && (
                <FiCheck
                  size={14}
                  className={
                    color.hex === "#f5f5f0" || color.hex === "#90EE90"
                      ? "text-secondary"
                      : "text-white"
                  }
                />
              )}
              {outOfStock && (
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <span className="absolute top-1/2 left-0 w-full h-px bg-secondary/60 -rotate-45" />
                </span>
              )}
            </button>
            {outOfStock && (
              <span className="text-[9px] leading-none text-secondary/40 whitespace-nowrap">
                Sold out
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default ProductColorSelector;
