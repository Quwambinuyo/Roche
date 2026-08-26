import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiSearch,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { ROUTES } from "../constants/navLinks";

const MobileNavbar = () => {
  const { theme, toggleTheme, toggleSidebar } = useTheme();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const openSearch = () => {
    setIsSearchOpen(true);
    navigate(ROUTES.SEARCH);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(trimmed)}`);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
    navigate(ROUTES.HOME);
  };

  return (
    <header className="sticky top-0 z-30 flex md:hidden items-center w-full border-b border-tertiary-100 bg-primary px-4 py-4 gap-2">
      {isSearchOpen ? (
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-2 w-full"
        >
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Back"
            className="rounded-full p-2 text-secondary hover:bg-tertiary-50 shrink-0"
          >
            <FiArrowLeft size={19} />
          </button>

          <div className="relative flex-1">
            <FiSearch
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-tertiary-100 py-2.5 pl-10 pr-9 text-sm text-secondary  focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:bg-primary transition-colors duration-200"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-secondary/40 hover:text-secondary hover:bg-tertiary-100"
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 w-full">
          <button
            onClick={toggleSidebar}
            aria-label="Open menu"
            className="rounded-full p-2 text-secondary hover:bg-tertiary-50 justify-self-start"
          >
            <FiMenu size={20} />
          </button>

          <Link
            to={ROUTES.HOME}
            aria-label="ZF home"
            className="justify-self-center"
          >
            <span className="oldenburg-regular text-5xl text-secondary">
              ZF
            </span>
          </Link>

          <div className="flex items-center gap-0.5 justify-self-end">
            <button
              onClick={openSearch}
              aria-label="Open search"
              className="rounded-full p-2 text-secondary hover:bg-tertiary-50"
            >
              <FiSearch size={19} />
            </button>

            <button
              onClick={toggleTheme}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              className="rounded-full p-2 text-secondary hover:bg-tertiary-50"
            >
              {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
            </button>

            <Link
              to={ROUTES.CART}
              aria-label="Cart"
              className="relative rounded-full p-2 text-secondary hover:bg-tertiary-50"
            >
              <FiShoppingCart size={19} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-800 text-[10px] font-semibold text-primary">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default MobileNavbar;
