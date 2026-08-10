import React from "react";
import { useLocation } from "react-router-dom";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { getPageTitle } from "../../utils/getPageTitle";

const MobileNavbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <header className="flex md:hidden items-center justify-between px-4 py-3.5 border-b border-primary/10 bg-secondary text-primary">
      <div>
        <h1 className="text-base font-bold text-primary tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className="w-9 h-9 flex items-center justify-center text-primary/70 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="w-9 h-9 flex items-center justify-center text-primary/70 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
        >
          <FiMenu size={20} />
        </button>
      </div>
    </header>
  );
};

export default MobileNavbar;
