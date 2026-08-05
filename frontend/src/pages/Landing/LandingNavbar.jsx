import React, { useState } from "react";
import { Menu, X, Sun, Moon, ShoppingBag } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NAV_LINKS } from "../../mock/clothing";

const LandingNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/10 bg-primary/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight text-secondary">
          Roche&nbsp;<span className="text-tertiary-700">CO.</span>
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-secondary/70 hover:text-tertiary-700 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-secondary/10 text-secondary hover:border-tertiary-700 transition-colors duration-200"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-secondary/10 text-secondary hover:border-tertiary-700 transition-colors duration-200">
            <ShoppingBag size={16} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-secondary"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-secondary/10 px-6 py-4 flex flex-col gap-4 bg-primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-secondary"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
