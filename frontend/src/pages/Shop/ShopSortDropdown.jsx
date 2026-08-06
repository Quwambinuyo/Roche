import React from "react";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "./shopFilterConfig";

const ShopSortDropdown = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent border border-secondary/20 rounded-full pl-4 pr-9 py-2 text-sm text-secondary cursor-pointer focus:outline-none focus:border-secondary"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50 pointer-events-none"
      />
    </div>
  );
};

export default ShopSortDropdown;
