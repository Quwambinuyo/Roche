import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { FiChevronDown, FiSearch, FiCheck } from "react-icons/fi";
import currencyCodes from "currency-codes";

const getCurrencySymbol = (code) => {
  if (!code) return "$";
  try {
    const parts = new Intl.NumberFormat("en", {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
    }).formatToParts(0);
    const symbolPart = parts.find((p) => p.type === "currency");
    return symbolPart ? symbolPart.value : code;
  } catch {
    return code;
  }
};

const ALL_CURRENCIES = currencyCodes.data
  .filter((c) => c.currency && c.code)
  .map((c) => ({ value: c.code, label: `${c.currency} (${c.code})` }))
  .sort((a, b) => a.label.localeCompare(b.label));

const CurrencyPicker = ({
  value,
  onChange,
  currencies,
  searchThreshold = 10,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [coords, setCoords] = useState(null);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  const CURRENCIES = useMemo(() => {
    if (!currencies || currencies.length === 0) return ALL_CURRENCIES;
    const allowed = new Set(currencies.map((c) => c.toUpperCase()));
    return ALL_CURRENCIES.filter((c) => allowed.has(c.value));
  }, [currencies]);

  const showSearch = CURRENCIES.length >= searchThreshold;

  const filtered = useMemo(() => {
    if (!showSearch || !query.trim()) return CURRENCIES;
    const q = query.toLowerCase();
    return CURRENCIES.filter((c) => c.label.toLowerCase().includes(q));
  }, [CURRENCIES, query, showSearch]);

  const updateCoords = () => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setCoords({
      left: rect.left,
      bottom: window.innerHeight - rect.top + 8,
      width: rect.width,
    });
  };

  useLayoutEffect(() => {
    if (open) updateCoords();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleReposition = () => updateCoords();
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedTrigger = wrapperRef.current?.contains(e.target);
      const clickedDropdown = dropdownRef.current?.contains(e.target);
      if (!clickedTrigger && !clickedDropdown) {
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
    <div ref={wrapperRef} className="relative w-full max-w-xs">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center gap-2 border border-primary/20 bg-transparent px-3.5 text-sm text-primary outline-none transition-colors duration-200 hover:border-primary/40"
      >
        <span className="shrink-0 font-mono text-xs text-primary/60">
          {getCurrencySymbol(value)}
        </span>
        <span className="flex-1 truncate text-left">
          {selected ? selected.label : "Select currency"}
        </span>
        <FiChevronDown
          size={13}
          className={`shrink-0 text-primary/40 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              left: coords.left,
              bottom: coords.bottom,
              width: Math.max(coords.width, 256),
            }}
            className="z-[1000] max-h-72 border border-primary/20 bg-secondary shadow-lg"
          >
            {showSearch && (
              <div className="flex items-center gap-2 border-b border-primary/10 px-3 py-2.5">
                <FiSearch size={13} className="shrink-0 text-primary/40" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search currency..."
                  className="w-full bg-transparent font-mono text-xs text-primary outline-none placeholder:text-primary/40"
                />
              </div>
            )}

            <div className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <p className="px-4 py-3 font-mono text-xs text-primary/40">
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
                    className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-primary transition-colors duration-150 hover:bg-primary/5 ${
                      isSelected ? "bg-primary/5" : ""
                    }`}
                  >
                    <span className="flex-1 truncate">{c.label}</span>
                    {isSelected && (
                      <FiCheck size={13} className="shrink-0 text-primary/60" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default CurrencyPicker;
