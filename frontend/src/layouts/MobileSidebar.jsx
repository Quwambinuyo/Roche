import React from "react";
import { FiX } from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import SidebarLinks from "./SidebarLinks";

const MobileSidebar = () => {
  const { isSidebarOpen, closeSidebar } = useTheme();

  return (
    <>
      <div
        onClick={closeSidebar}
        aria-hidden="true"
        className={[
          "fixed inset-0 z-40 bg-secondary/30 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <div
        className={[
          "fixed inset-y-0 left-0 z-50 flex md:hidden h-full transition-transform duration-300 ease-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]",
        ].join(" ")}
      >
        <aside className="flex h-full w-[82vw] max-w-xs flex-col bg-primary shadow-2xl">
          <div className="flex items-center px-6 py-5">
            <span className="oldenburg-regular text-xl text-secondary">
              Zero Fugazi
            </span>
          </div>

          <div className="h-px w-full bg-tertiary-100" />

          <div className="flex-1 overflow-y-auto px-4 py-5">
            <SidebarLinks onLinkClick={closeSidebar} isOpen={isSidebarOpen} />
          </div>

          <div className="px-6 py-5 text-xs text-secondary/40">
            © {new Date().getFullYear()} ZF
          </div>
        </aside>

        <button
          onClick={closeSidebar}
          aria-label="Close menu"
          className="mt-5 ml-3 h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-primary text-secondary shadow-lg hover:bg-tertiary-50 transition-colors duration-200"
        >
          <FiX size={20} />
        </button>
      </div>
    </>
  );
};

export default MobileSidebar;
