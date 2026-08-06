import React, { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") setDrawerOpen(false);
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      const timeout = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [drawerOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden flex items-center gap-2 text-sm font-semibold text-secondary border border-secondary/20 rounded-full px-4 py-2 mb-6 w-fit hover:border-secondary transition-colors duration-200"
      >
        <SlidersHorizontal size={14} />
        Filters
      </button>

      <aside className="hidden md:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
        <FilterContent
          category={category}
          size={size}
          priceRange={priceRange}
          onChange={onChange}
        />
      </aside>

      {mounted && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setDrawerOpen(false)}
            className={`absolute inset-0 backdrop-blur-sm bg-black/40 transition-opacity duration-500 ease-out ${
              drawerOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-primary shadow-2xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              drawerOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <p className="font-bold text-lg text-secondary tracking-tight">
                Filters
              </p>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="group rounded-full p-2 text-secondary/60 hover:text-secondary hover:bg-secondary/5 transition-colors duration-200"
              >
                <X
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
              </button>
            </div>

            <div className="h-px mx-6 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent" />

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <FilterContent
                category={category}
                size={size}
                priceRange={priceRange}
                onChange={onChange}
              />
            </div>

            <div className="px-6 py-5 border-t border-secondary/10">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-secondary text-primary text-sm font-semibold tracking-widest uppercase py-3.5 rounded-full hover:opacity-90 transition-opacity duration-300"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopFilters;
