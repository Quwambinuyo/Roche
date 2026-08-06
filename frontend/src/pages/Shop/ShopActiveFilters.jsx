import React from "react";
import { X } from "lucide-react";
import { CATEGORIES, PRICE_RANGES } from "./shopFilterConfig";

const Chip = ({ label, onRemove }) => (
  <button
    onClick={onRemove}
    className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary bg-secondary/5 border border-secondary/10 rounded-full pl-3 pr-2 py-1.5 hover:border-secondary/30 transition-colors duration-200"
  >
    {label}
    <X size={12} />
  </button>
);

const ShopActiveFilters = ({
  category,
  size,
  priceRange,
  onRemove,
  onClearAll,
}) => {
  const categoryLabel = CATEGORIES.find((c) => c.value === category)?.label;
  const priceLabel = PRICE_RANGES.find((r) => r.value === priceRange)?.label;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {categoryLabel && (
        <Chip label={categoryLabel} onRemove={() => onRemove("category", "")} />
      )}
      {size && (
        <Chip label={`Size: ${size}`} onRemove={() => onRemove("size", "")} />
      )}
      {priceLabel && (
        <Chip label={priceLabel} onRemove={() => onRemove("price", "")} />
      )}
      <button
        onClick={onClearAll}
        className="text-xs font-semibold text-secondary/50 hover:text-secondary underline underline-offset-2"
      >
        Clear all
      </button>
    </div>
  );
};

export default ShopActiveFilters;
