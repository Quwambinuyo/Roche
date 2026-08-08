import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiChevronDown, FiSearch, FiCheck, FiDollarSign } from "react-icons/fi";
import currencyCodes from "currency-codes";

const ALL_CURRENCIES = currencyCodes.data
  .filter((c) => c.currency && c.code)
  .map((c) => ({ value: c.code, label: `${c.currency} (${c.code})` }))
  .sort((a, b) => a.label.localeCompare(b.label));

const CurrencyPicker = ({ value, onChange, currencies }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const CURRENCIES = useMemo(() => {
    if (!currencies || currencies.length === 0) return ALL_CURRENCIES;
    const allowed = new Set(currencies.map((c) => c.toUpperCase()));
    return ALL_CURRENCIES.filter((c) => allowed.has(c.value));
  }, [currencies]);

  const filtered = useMemo(() => {
    if (!query.trim()) return CURRENCIES;
    const q = query.toLowerCase();
    return CURRENCIES.filter((c) => c.label.toLowerCase().includes(q));
  }, [CURRENCIES, query]);

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

  const selected = CURRENCIES.find((c) => c.value === value);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 h-11 bg-secondary text-primary border border-secondary/20 rounded-full text-xs px-4 py-2 outline-none hover:border-secondary/50 transition-colors duration-300"
      >
        <FiDollarSign size={13} className="shrink-0" />
        <span className="truncate">
          {selected ? selected.value : "Currency"}
        </span>
        <FiChevronDown
          size={12}
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 w-64 max-h-72 bg-primary border border-secondary/15 rounded-2xl shadow-2xl overflow-hidden origin-bottom animate-dropdownIn z-50">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-secondary/10">
            <FiSearch size={14} className="text-secondary/40 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search currency..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-secondary/30 text-secondary"
            />
          </div>
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <p className="text-xs text-secondary/40 px-4 py-3">
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
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-secondary/5 transition-colors duration-150 text-secondary ${
                    isSelected ? "bg-secondary/5" : ""
                  }`}
                >
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

export default CurrencyPicker;
