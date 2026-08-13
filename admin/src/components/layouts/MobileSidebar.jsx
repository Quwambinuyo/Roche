import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBox,
  FiPackage,
  FiTag,
  FiClipboard,
  FiUsers,
  FiSettings,
  FiX,
} from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", icon: FiGrid },
  { label: "Products", to: "/products", icon: FiBox },
  { label: "Bundles", to: "/bundles", icon: FiPackage },
  { label: "Categories", to: "/categories", icon: FiTag },
  { label: "Orders", to: "/orders", icon: FiClipboard },
  { label: "Customers", to: "/customers", icon: FiUsers },
];

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-visibility ${
        isOpen ? "" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-secondary/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute inset-y-0 left-0 w-full flex flex-col bg-secondary text-primary transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-7 pb-6 border-b border-primary/10">
          <p className="text-lg font-bold tracking-tight uppercase">ZF</p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
          >
            <FiX size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-primary/60 hover:bg-primary/5 hover:text-primary"
                    }`
                  }
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-3 py-4 border-t border-primary/10">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-primary/60 hover:bg-primary/5 hover:text-primary"
              }`
            }
          >
            <FiSettings size={16} className="shrink-0" />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
