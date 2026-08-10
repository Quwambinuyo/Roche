import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiChevronDown, FiSearch, FiCheck, FiGlobe } from "react-icons/fi";
import countryList from "react-select-country-list";
import "flag-icons/css/flag-icons.min.css";

const CountryPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const countries = useMemo(() => countryList().getData(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return countries;
    const q = query.toLowerCase();
    return countries.filter((c) => c.label.toLowerCase().includes(q));
  }, [countries, query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selected = countries.find(
    (c) => c.value === value || c.label === value,
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center gap-2 border border-primary/20 bg-transparent px-3.5 text-sm text-primary outline-none transition-colors duration-200 hover:border-primary/40"
      >
        {selected ? (
          <span
            className={`fi fi-${selected.value.toLowerCase()} h-3 w-4 shrink-0 rounded-sm bg-cover bg-center`}
          />
        ) : (
          <FiGlobe size={14} className="shrink-0 text-primary/40" />
        )}
        <span className="flex-1 truncate text-left">
          {selected ? selected.label : "Select country"}
        </span>
        <FiChevronDown
          size={13}
          className={`shrink-0 text-primary/40 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-2 max-h-72 w-full min-w-64 border border-primary/20 bg-secondary">
          <div className="flex items-center gap-2 border-b border-primary/10 px-3 py-2.5">
            <FiSearch size={13} className="shrink-0 text-primary/40" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-transparent font-mono text-xs text-primary outline-none placeholder:text-primary/40"
            />
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <p className="px-4 py-3 font-mono text-xs text-primary/40">
                No matches found.
              </p>
            )}

            {filtered.map((c) => {
              const isSelected = c.value === value || c.label === value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    onChange(c.value, c.label);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-primary transition-colors duration-150 hover:bg-primary/5 ${
                    isSelected ? "bg-primary/5" : ""
                  }`}
                >
                  <span
                    className={`fi fi-${c.value.toLowerCase()} h-3 w-4 shrink-0 rounded-sm bg-cover bg-center`}
                  />
                  <span className="flex-1 truncate">{c.label}</span>
                  {isSelected && (
                    <FiCheck size={13} className="shrink-0 text-primary/60" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryPicker;
