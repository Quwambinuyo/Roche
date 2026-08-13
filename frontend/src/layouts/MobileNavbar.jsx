import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiShoppingCart, FiSun, FiMoon } from "react-icons/fi";
import logolight from "../assets/icons/zfz-logo-light.jpg";
import darklight from "../assets/icons/zfz-logo-dark.jpg";

import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { ROUTES } from "../constants/navLinks";

const MobileNavbar = () => {
  const { theme, toggleTheme, toggleSidebar } = useTheme();
  const { itemCount } = useCart();

  return (
    <header className=" flex md:hidden sticky top-0 z-30 w-full items-center justify-between border-b border-tertiary-100 bg-primary px-4 py-5">
      <button
        onClick={toggleSidebar}
        aria-label="Open menu"
        className="rounded-full p-2 text-secondary hover:bg-tertiary-50"
      >
        <FiMenu size={20} />
      </button>

      <Link
        to={ROUTES.HOME}
        aria-label="ZFZ home"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <img
          src={theme === "dark" ? darklight : logolight}
          alt="ZFZ"
          className="h-15 w-auto object-contain"
        />
      </Link>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
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
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-tertiary-600 text-[10px] font-semibold text-primary">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default MobileNavbar;
