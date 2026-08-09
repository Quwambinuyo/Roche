import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { COLOR_PALETTE } from "../../mock/colors";

const ColorPicker = ({ value = [], onChange }) => {
  const [open, setOpen] = useState(false);

  const isSelected = (name) => value.some((c) => c.name === name);

  const toggleColor = (color) => {
    if (isSelected(color.name)) {
      onChange(value.filter((c) => c.name !== color.name));
    } else {
      onChange([...value, { name: color.name, hex: color.hex, stock: 0 }]);
    }
  };

  const updateStock = (name, stock) => {
    onChange(
      value.map((c) =>
        c.name === name ? { ...c, stock: Number(stock) || 0 } : c,
      ),
    );
  };

  const removeColor = (name) => {
    onChange(value.filter((c) => c.name !== name));
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
            ? "Select colors"
            : `${value.length} color${value.length > 1 ? "s" : ""} selected`}
        </span>
      </button>

      {value.length > 0 && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-2">
          {value.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full flex-shrink-0 border border-primary/10"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-sm text-primary/70 w-20 flex-shrink-0">
                {c.name}
              </span>
              <input
                type="number"
                min="0"
                value={c.stock}
                onChange={(e) => updateStock(c.name, e.target.value)}
                className="w-24 px-3 py-1.5 bg-secondary border border-primary/10 text-primary text-sm"
              />
              <button
                type="button"
                onClick={() => removeColor(c.name)}
                className="text-primary/40 hover:text-red-500"
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
              <h2 className="text-primary font-bold">Select Colors</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-primary/50 hover:text-primary"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {COLOR_PALETTE.map((color) => {
                const selected = isSelected(color.name);
                const isWhite = color.hex.toLowerCase() === "#ffffff";

                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border text-sm transition-colors duration-150 ${
                      selected
                        ? "border-primary/60 bg-primary/5 text-primary"
                        : "border-primary/10 text-primary/70 hover:border-primary/30"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isWhite ? "border border-primary/20" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selected && (
                        <FiCheck
                          size={10}
                          className={
                            isWhite || color.hex === "#FDE047"
                              ? "text-black"
                              : "text-white"
                          }
                        />
                      )}
                    </span>
                    <span className="truncate">{color.name}</span>
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

export default ColorPicker;
