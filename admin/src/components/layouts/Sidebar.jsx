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
} from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", icon: FiGrid },
  { label: "Products", to: "/products", icon: FiBox },
  { label: "Bundles", to: "/bundles", icon: FiPackage },
  { label: "Categories", to: "/categories", icon: FiTag },
  { label: "Orders", to: "/orders", icon: FiClipboard },
  { label: "Customers", to: "/customers", icon: FiUsers },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-secondary text-primary">
      <div className="px-6 pt-7 pb-6 border-b border-primary/10">
        <p className="text-lg font-bold tracking-tight uppercase">ZF</p>
      </div>

      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
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
  );
};

export default Sidebar;
