import React from "react";
import { useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiBell, FiUser } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/bundles": "Bundles",
  "/categories": "Categories",
  "/orders": "Orders",
  "/customers": "Customers",
  "/settings": "Settings",
};

const getPageTitle = (pathname) => {
  const match = Object.keys(PAGE_TITLES).find((path) =>
    pathname.startsWith(path),
  );
  return match ? PAGE_TITLES[match] : "Dashboard";
};

const Topbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const title = getPageTitle(location.pathname);

  return (
    <header className="flex items-center justify-between px-6 py-4  bg-secondary/10 text-primary">
      <div>
        <h1 className="text-lg font-bold text-primary tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className="w-9 h-9 flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
        >
          {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
        >
          <FiBell size={16} />
        </button>

        <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-primary/10">
          <div className="w-8 h-8 flex items-center justify-center bg-primary/5 text-primary/60">
            <FiUser size={15} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
