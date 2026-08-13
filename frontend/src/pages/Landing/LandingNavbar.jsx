import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const textColor = scrolled ? "text-secondary" : "text-white";
  const mutedText = scrolled ? "text-secondary/70" : "text-white/80";
  const hoverText = scrolled ? "hover:text-tertiary-700" : "hover:text-white";
  const iconBorder = scrolled ? "border-secondary/10" : "border-white/30";

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-primary/90 backdrop-blur border-secondary/10 shadow-sm"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-300",
          scrolled ? "h-14" : "h-16",
        ].join(" ")}
      >
        <span
          className={`font-bold text-lg tracking-tight ${textColor} transition-all duration-300 hover:-translate-y-0.5 cursor-pointer`}
        >
          ZF
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`relative text-sm font-medium ${mutedText} ${hoverText} transition-colors duration-200 group py-1`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-0.5 h-[1.5px] w-0 transition-all duration-300 ease-out group-hover:w-full ${
                  scrolled ? "bg-tertiary-700" : "bg-white"
                }`}
              />
            </button>
          ))}

          <Link
            to="/gallery"
            className={`relative text-sm font-medium ${mutedText} ${hoverText} transition-colors duration-200 group py-1`}
          >
            Gallery
            <span
              className={`absolute left-0 -bottom-0.5 h-[1.5px] w-0 transition-all duration-300 ease-out group-hover:w-full ${
                scrolled ? "bg-tertiary-700" : "bg-white"
              }`}
            />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 flex items-center justify-center rounded-full border ${iconBorder} ${textColor} hover:border-tertiary-700 transition-all duration-300 hover:rotate-12`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden w-9 h-9 flex items-center justify-center relative ${textColor}`}
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
        className={[
          "md:hidden grid transition-[grid-template-rows] duration-300 ease-in-out overflow-hidden border-t",
          scrolled
            ? "border-secondary/10 bg-primary"
            : "border-white/20 bg-black/60 backdrop-blur",
        ].join(" ")}
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium text-left ${textColor}`}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 300ms ease-out ${open ? i * 60 : 0}ms, transform 300ms ease-out ${open ? i * 60 : 0}ms`,
                }}
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/gallery"
              onClick={() => setOpen(false)}
              className={`text-sm font-medium text-left ${textColor}`}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-8px)",
                transition: `opacity 300ms ease-out ${open ? NAV_LINKS.length * 60 : 0}ms, transform 300ms ease-out ${open ? NAV_LINKS.length * 60 : 0}ms`,
              }}
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
