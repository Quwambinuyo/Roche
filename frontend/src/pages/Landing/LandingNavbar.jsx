import React, { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NAV_LINKS } from "../../mock/clothing";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const LandingNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b bg-primary/90 backdrop-blur transition-all duration-300",
        scrolled ? "border-secondary/10 shadow-sm" : "border-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-300",
          scrolled ? "h-14" : "h-16",
        ].join(" ")}
      >
        <span className="font-bold text-lg tracking-tight text-secondary transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer">
          BSTRT
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className="relative text-sm font-medium text-secondary/70 hover:text-tertiary-700 transition-colors duration-200 group py-1"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-tertiary-700 transition-all duration-300 ease-out group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-secondary/10 text-secondary hover:border-tertiary-700 transition-all duration-300 hover:rotate-12"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-secondary relative"
          >
            <Menu
              size={18}
              className={`absolute transition-all duration-300 ${
                open
                  ? "opacity-0 rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              size={18}
              className={`absolute transition-all duration-300 ${
                open
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className="md:hidden grid transition-[grid-template-rows] duration-300 ease-in-out overflow-hidden border-t border-secondary/10 bg-primary"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="text-sm font-medium text-secondary text-left"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 300ms ease-out ${open ? i * 60 : 0}ms, transform 300ms ease-out ${open ? i * 60 : 0}ms`,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
