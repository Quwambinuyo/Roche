import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown } from "react-icons/fi";

const normalize = (opt) =>
  typeof opt === "string" ? { label: opt, value: opt } : opt;

const CustomSelect = ({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  disabled = false,
  position = "up",
}) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const normalized = options.map(normalize);
  const selected = normalized.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        listRef.current &&
        !listRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (!open || !containerRef.current) return;

    const updatePosition = () => {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top:
          position === "down"
            ? rect.bottom + window.scrollY
            : rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, position]);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-10 flex items-center justify-between px-3 bg-primary border border-primary text-left text-sm leading-none ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "text-secondary hover:border-primary/30"
        }`}
      >
        <span className={selected ? "text-secondary" : "text-secondary/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown
          size={15}
          className={`text-secondary transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open &&
        !disabled &&
        createPortal(
          <ul
            ref={listRef}
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
              width: coords.width,
              transform: position === "down" ? "none" : "translateY(-100%)",
              marginTop: position === "down" ? "4px" : "-4px",
            }}
            className="z-[9999] max-h-56 overflow-y-auto bg-primary border border-primary shadow-lg"
          >
            {normalized.length === 0 && (
              <li className="px-3 py-2 text-sm text-secondary">
                No options available
              </li>
            )}
            {normalized.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary/10 ${
                    opt.value === value
                      ? "text-secondary font-medium bg-primary/5"
                      : "text-secondary/50"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
};

export default CustomSelect;
