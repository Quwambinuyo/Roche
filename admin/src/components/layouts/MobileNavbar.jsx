import React from "react";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const MobileNavbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex md:hidden items-center justify-between px-4 py-3.5 border-b border-primary/10 bg-secondary text-primary">
      <div>
        <p className="text-base font-bold text-primary tracking-tight uppercase">
          BODESTRT
        </p>
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
