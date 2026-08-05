import React from "react";
import { FiX } from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useTheme();

  return (
    <>
      <div
        onClick={closeSidebar}
        className={[
          "fixed inset-0 z-40 bg-secondary/40 transition-opacity hidden md:block",
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed top-0 left-0 z-50 hidden md:flex h-full w-72 flex-col bg-primary shadow-xl transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-tertiary-100 px-5 py-4">
          <span className="bricolage-grotesqu text-lg font-semibold text-secondary">
            Menu
          </span>
          <button
            onClick={closeSidebar}
            aria-label="Close menu"
            className="rounded-full p-2 text-secondary hover:bg-tertiary-50"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarLinks onLinkClick={closeSidebar} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
