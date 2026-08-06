import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiChevronDown, FiSearch, FiCheck, FiMapPin } from "react-icons/fi";
import { State } from "country-state-city";

const StatePicker = ({
  countryCode,
  value,
  onChange,
  placeholder = "Select state",
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const states = useMemo(
    () => (countryCode ? State.getStatesOfCountry(countryCode) : []),
    [countryCode],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return states;
    const q = query.toLowerCase();
    return states.filter((s) => s.name.toLowerCase().includes(q));
  }, [states, query]);

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

  const selected = states.find((s) => s.isoCode === value);
  const disabled = !countryCode || states.length === 0;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-2 bg-transparent border border-secondary/20 rounded-lg text-sm px-3.5 h-11 outline-none transition-colors duration-300 ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "hover:border-secondary/50"
        }`}
      >
        <FiMapPin size={14} className="text-secondary/40 shrink-0" />
        <span className="flex-1 text-left truncate">
          {selected
            ? selected.name
            : countryCode
              ? placeholder
              : "Select a country first"}
        </span>
        <FiChevronDown
          size={13}
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && !disabled && (
        <div className="absolute top-full mt-2 left-0 w-full min-w-64 max-h-72 bg-primary border border-secondary/15 rounded-2xl shadow-2xl overflow-hidden origin-top animate-dropdownIn z-50">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-secondary/10">
            <FiSearch size={14} className="text-secondary/40 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search state..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-secondary/30"
            />
          </div>
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <p className="text-xs text-secondary/40 px-4 py-3">
                No matches found.
              </p>
            )}
            {filtered.map((s) => {
              const isSelected = s.isoCode === value;
              return (
                <button
                  key={s.isoCode}
                  type="button"
                  onClick={() => {
                    onChange(s.isoCode, s.name);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-secondary/5 transition-colors duration-150 ${
                    isSelected ? "bg-secondary/5" : ""
                  }`}
                >
                  <span className="flex-1 truncate">{s.name}</span>
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

export default StatePicker;
