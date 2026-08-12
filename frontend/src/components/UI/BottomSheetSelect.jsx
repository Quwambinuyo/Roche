import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX, FiCheck, FiChevronDown } from "react-icons/fi";

const BottomSheetSelect = ({
  value,
  onChange,
  options = [],
  title = "Select",
  placeholder = "Select",
  searchable = false,
  searchLabel = "Value",
  renderOption,
  renderTrigger,
  triggerClassName = "",
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      setQuery("");
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  const filtered =
    searchable && query
      ? options.filter(
          (o) =>
            o.label.toLowerCase().includes(query.toLowerCase()) ||
            String(o.value).includes(query),
        )
      : options;

  const closeSheet = () => setOpen(false);

  const handleSelect = (val) => {
    onChange(val);
    closeSheet();
  };

  const handleSearchKeyDown = (e) => {
    if (e.key !== "Enter" || !query) return;
    const match = options.find((o) => String(o.value) === query);
    if (match && !match.disabled) {
      handleSelect(match.value);
    } else if (!isNaN(Number(query)) && Number(query) > 0) {
      handleSelect(query);
    }
  };

  return (
    <>
      {renderTrigger ? (
        <div onClick={() => setOpen(true)}>{renderTrigger(selected)}</div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`flex items-center gap-1 h-8 px-2.5 min-w-[80px] border border-secondary/15 text-xs font-medium text-secondary hover:border-secondary/30 transition-colors ${triggerClassName}`}
        >
          {selected ? selected.label : placeholder}
          <FiChevronDown size={12} className="text-secondary/50" />
        </button>
      )}

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-end justify-center">
            <div
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeSheet}
            />
            <div
              className={`relative w-full max-w-md bg-primary rounded-t-2xl max-h-[75vh] flex flex-col transition-transform duration-300 ease-out ${
                mounted ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/10 shrink-0">
                <h3 className="text-base font-semibold text-secondary">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={closeSheet}
                  aria-label="Close"
                  className="text-secondary/50 hover:text-secondary transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {searchable && (
                <div className="px-5 py-3 shrink-0">
                  <div className="flex items-center gap-2 h-11 px-3 rounded-lg border border-secondary/15">
                    <span className="text-sm font-medium text-secondary/70 shrink-0">
                      {searchLabel}
                    </span>
                    <span className="w-px h-4 bg-secondary/15" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder={`Please enter your ${searchLabel.toLowerCase()}`}
                      className="flex-1 bg-transparent text-sm text-secondary placeholder:text-secondary/40 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="overflow-y-auto flex-1 no-scrollbar">
                {filtered.length === 0 && (
                  <p className="px-5 py-6 text-sm text-secondary/40 text-center">
                    No options found
                  </p>
                )}
                {filtered.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={opt.disabled}
                      onClick={() => !opt.disabled && handleSelect(opt.value)}
                      className={`w-full flex items-center justify-between px-5 py-4 border-b border-secondary/5 text-left transition-colors ${
                        opt.disabled
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-secondary/5"
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          isSelected
                            ? "font-semibold text-tertiary-600"
                            : "text-secondary"
                        }`}
                      >
                        {renderOption ? renderOption(opt) : opt.label}
                      </span>
                      {isSelected && (
                        <FiCheck
                          size={16}
                          className="text-tertiary-600 shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default BottomSheetSelect;
