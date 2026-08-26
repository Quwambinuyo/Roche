import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useTheme();

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeSidebar();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <>
      <div
        onClick={closeSidebar}
        className={[
          "fixed inset-0 z-40 hidden md:block backdrop-blur-sm bg-secondary/30 transition-opacity duration-500 ease-out",
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed top-0 left-0 z-50 hidden md:flex h-full w-80 flex-col bg-primary shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="oldenburg-regular text-lg font-semibold text-secondary tracking-tight">
              Zero Fugazi
            </span>
          </div>
          <button
            onClick={closeSidebar}
            aria-label="Close menu"
            className="group rounded-full p-2 text-secondary/60 hover:text-secondary hover:bg-secondary/5 transition-colors duration-200"
          >
            <FiX
              size={18}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </button>
        </div>

        <div className="h-px mx-6 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent" />

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <SidebarLinks onLinkClick={closeSidebar} isOpen={isSidebarOpen} />
        </div>

        <div className="px-6 py-5 border-t border-secondary/10">
          <p className="text-[11px] text-secondary/40 tracking-wide">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
