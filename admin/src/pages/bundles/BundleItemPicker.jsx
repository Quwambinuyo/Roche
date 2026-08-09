import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { PRODUCTS } from "../../mock/product";

const BundleItemPicker = ({ value = [], onChange }) => {
  const [open, setOpen] = useState(false);

  const selectedProducts = PRODUCTS.filter((p) => value.includes(p.slug));

  const isSelected = (slug) => value.includes(slug);

  const toggleItem = (slug) => {
    if (isSelected(slug)) {
      onChange(value.filter((s) => s !== slug));
    } else {
      onChange([...value, slug]);
    }
  };

  const removeItem = (slug) => {
    onChange(value.filter((s) => s !== slug));
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-3 py-2 bg-secondary border border-primary/10 text-left text-sm text-primary hover:border-primary/30"
      >
        <span
          className={value.length === 0 ? "text-primary/40" : "text-primary"}
        >
          {value.length === 0
            ? "Select products"
            : `${value.length} product${value.length > 1 ? "s" : ""} selected`}
        </span>
      </button>

      {selectedProducts.length > 0 && (
        <div className="mt-3 border border-primary/10 divide-y divide-primary/10">
          {selectedProducts.map((p) => (
            <div key={p.slug} className="flex items-center gap-3 px-3 py-2.5">
              <img
                src={p.image}
                alt={p.name}
                className="w-8 h-8 object-cover flex-shrink-0 bg-primary/5"
              />
              <span className="text-sm text-primary/70 flex-1 min-w-0 truncate">
                {p.name}
              </span>
              <span className="text-xs text-primary/40 flex-shrink-0">
                {p.price}
              </span>
              <button
                type="button"
                onClick={() => removeItem(p.slug)}
                className="flex-shrink-0 text-primary/40 hover:text-red-500"
                aria-label={`Remove ${p.name}`}
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-secondary border border-primary/10 max-w-lg w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-primary font-bold">Select Products</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-primary/50 hover:text-primary"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {PRODUCTS.map((p) => {
                const selected = isSelected(p.slug);
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => toggleItem(p.slug)}
                    className={`w-full flex items-center gap-3 px-3 py-2 border text-left transition-colors duration-150 ${
                      selected
                        ? "border-primary/60 bg-primary/5"
                        : "border-primary/10 hover:border-primary/30"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-9 h-9 object-cover flex-shrink-0 bg-primary/5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-primary truncate">{p.name}</p>
                      <p className="text-xs text-primary/40">{p.price}</p>
                    </div>
                    {selected && (
                      <FiCheck
                        size={16}
                        className="text-primary flex-shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 w-full px-4 py-2 bg-primary text-secondary text-sm font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BundleItemPicker;
