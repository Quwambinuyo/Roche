import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiChevronDown, FiSearch, FiCheck, FiGlobe } from "react-icons/fi";
import countryList from "react-select-country-list";

const getFlagEmoji = (isoCode) =>
  isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));

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

  const selected = countries.find((c) => c.value === value);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-transparent border border-primary/20 rounded-full text-xs px-4 py-2 outline-none hover:border-primary/50 transition-colors duration-300"
      >
        {selected ? (
          <span className="text-sm leading-none">
            {getFlagEmoji(selected.value)}
          </span>
        ) : (
          <FiGlobe size={13} />
        )}
        <span>{selected ? selected.label : "Select country"}</span>
        <FiChevronDown
          size={13}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 w-64 max-h-72 bg-secondary border border-primary/15 rounded-2xl shadow-2xl overflow-hidden origin-bottom-left animate-dropdownIn z-50">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-primary/10">
            <FiSearch size={14} className="text-primary/40 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-primary/30"
            />
          </div>
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <p className="text-xs text-primary/40 px-4 py-3">
                No matches found.
              </p>
            )}
            {filtered.map((c) => {
              const isSelected = c.value === value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    onChange(c.value);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-primary/5 transition-colors duration-150 ${
                    isSelected ? "bg-primary/5" : ""
                  }`}
                >
                  <span className="text-sm leading-none w-4 shrink-0">
                    {getFlagEmoji(c.value)}
                  </span>
                  <span className="flex-1 truncate">{c.label}</span>
                  {isSelected && <FiCheck size={13} className="shrink-0" />}
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
