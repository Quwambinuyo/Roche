import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <FiSearch
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
      />
    </div>
  );
};

export default SearchInput;
