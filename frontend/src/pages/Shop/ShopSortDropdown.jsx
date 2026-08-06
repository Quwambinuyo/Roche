import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { SORT_OPTIONS } from "./shopFilterConfig";

const ShopSortDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const activeOption = SORT_OPTIONS.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-transparent border border-secondary/20 rounded-full pl-4 pr-3 py-2 text-sm text-secondary cursor-pointer hover:border-secondary/40 transition-colors duration-200"
      >
        {activeOption?.label}
        <ChevronDown
          size={14}
          className={`text-secondary/50 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[190px] rounded-xl border border-secondary/10 bg-primary shadow-lg overflow-hidden z-20">
          {SORT_OPTIONS.map((opt) => {
            const isActive = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 text-left text-sm px-4 py-2.5 transition-colors duration-150 ${
                  isActive
                    ? "text-secondary font-semibold bg-secondary/5"
                    : "text-secondary/70 hover:bg-secondary/5 hover:text-secondary"
                }`}
              >
                {opt.label}
                {isActive && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShopSortDropdown;
