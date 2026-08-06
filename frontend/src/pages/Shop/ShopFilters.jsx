import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, SIZES, PRICE_RANGES } from "./shopFilterConfig";

const FilterGroup = ({ title, children }) => (
  <div className="py-5 border-b border-secondary/10">
    <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-3">
      {title}
    </p>
    {children}
  </div>
);

const FilterContent = ({ category, size, priceRange, onChange }) => {
  return (
    <>
      <FilterGroup title="Category">
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() =>
                onChange("category", category === c.value ? "" : c.value)
              }
              className={`text-left text-sm py-1 transition-colors duration-200 ${
                category === c.value
                  ? "text-secondary font-semibold"
                  : "text-secondary/60 hover:text-secondary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => onChange("size", size === s ? "" : s)}
              className={`w-9 h-9 rounded-full border text-xs font-medium transition-all duration-200 ${
                size === s
                  ? "bg-secondary text-primary border-secondary"
                  : "border-secondary/20 text-secondary/70 hover:border-secondary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() =>
                onChange("price", priceRange === r.value ? "" : r.value)
              }
              className={`text-left text-sm py-1 transition-colors duration-200 ${
                priceRange === r.value
                  ? "text-secondary font-semibold"
                  : "text-secondary/60 hover:text-secondary"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </FilterGroup>
    </>
  );
};

const ShopFilters = ({ category, size, priceRange, onChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden flex items-center gap-2 text-sm font-semibold text-secondary border border-secondary/20 rounded-full px-4 py-2 mb-6 w-fit"
      >
        <SlidersHorizontal size={14} />
        Filters
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
        <FilterContent
          category={category}
          size={size}
          priceRange={priceRange}
          onChange={onChange}
        />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-primary p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-lg text-secondary">Filters</p>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-secondary/20 text-secondary"
              >
                <X size={14} />
              </button>
            </div>
            <FilterContent
              category={category}
              size={size}
              priceRange={priceRange}
              onChange={onChange}
            />
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-full bg-secondary text-primary text-sm font-semibold tracking-widest uppercase py-3.5 rounded-full mt-6"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopFilters;
