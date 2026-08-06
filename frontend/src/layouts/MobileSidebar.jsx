import React from "react";
import { FiX } from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import SidebarLinks from "./SidebarLinks";

const MobileSidebar = () => {
  const { isSidebarOpen, closeSidebar } = useTheme();

  return (
    <aside
      className={[
        "fixed inset-0 z-50 flex md:hidden h-full w-full flex-col bg-primary transition-transform duration-300",
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
  );
};

export default MobileSidebar;
