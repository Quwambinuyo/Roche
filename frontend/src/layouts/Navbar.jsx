import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiSun,
  FiMoon,
  FiX,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ROUTES, PRIMARY_NAV_LINKS } from "../constants/navLinks";
import logolight from "../assets/icons/zf-logo-light.jpg";
import darklight from "../assets/icons/zf-logo-dark.jpg";

const Navbar = () => {
  const { theme, toggleTheme, toggleSidebar } = useTheme();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
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

  if (isSearchOpen) {
    return (
      <header className="hidden md:flex sticky top-0 z-30 w-full items-center justify-between border-b border-tertiary-100 bg-primary px-8 py-4">
        <Link to={ROUTES.HOME} aria-label="ZF home">
          <img
            src={theme === "dark" ? darklight : logolight}
            alt="ZF"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-center gap-2 mx-8 max-w-md"
        >
          <div className="relative flex-1">
            <FiSearch
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-tertiary-100 bg-primary py-2 pl-9 pr-3 text-sm text-secondary focus:outline-none focus:ring-1 focus:ring-tertiary-300"
            />
          </div>
          <button
            type="button"
            onClick={closeSearch}
            className="text-sm font-medium text-secondary/60"
          >
            Cancel
          </button>
        </form>
      </header>
    );
  }

  return (
    <header className="hidden md:flex sticky top-0 z-30 w-full items-center justify-between border-b border-tertiary-100 bg-primary px-8 py-4">
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          aria-label="Open menu"
          className="rounded-full p-2 text-secondary hover:bg-tertiary-50"
        >
          <FiMenu size={20} />
        </button>

        <Link to={ROUTES.HOME} aria-label="ZF home">
          <img
            src={theme === "dark" ? darklight : logolight}
            alt="ZF"
            className="h-14 w-auto object-contain"
          />
        </Link>
      </div>

      <nav className="flex items-center gap-8">
        {PRIMARY_NAV_LINKS.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              [
                "text-sm font-medium transition-colors",
                isActive
                  ? "text-tertiary-700"
                  : "text-secondary hover:text-tertiary-600",
              ].join(" ")
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4">
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
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
          className="rounded-full p-2 text-secondary hover:bg-tertiary-50"
        >
          {theme === "light" ? <FiMoon size={19} /> : <FiSun size={19} />}
        </button>
        <Link
          to={ROUTES.WISHLIST}
          aria-label="Wishlist"
          className="relative rounded-full p-2 text-secondary hover:bg-tertiary-50"
        >
          <FiHeart size={19} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-tertiary-600 text-[10px] font-semibold text-primary">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link
          to={ROUTES.CART}
          aria-label="Cart"
          className="relative rounded-full p-2 text-secondary hover:bg-tertiary-50"
        >
          <FiShoppingCart size={19} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-tertiary-600 text-[10px] font-semibold text-primary">
              {itemCount}
            </span>
          )}
        </Link>
        <Link
          to={ROUTES.PROFILE}
          aria-label="Account"
          className="rounded-full p-2 text-secondary hover:bg-tertiary-50"
        >
          <FiUser size={19} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
