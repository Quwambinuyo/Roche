import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiGrid,
  FiShoppingCart,
  FiHeart,
  FiPackage,
  FiUser,
  FiPhone,
} from "react-icons/fi";

import { ROUTES } from "../constants/navLinks";

const LINKS = [
  { label: "Home", path: ROUTES.HOME, icon: FiHome },
  { label: "Shop", path: ROUTES.SHOP, icon: FiShoppingBag },
  { label: "Categories", path: ROUTES.CATEGORIES, icon: FiGrid },
  { label: "Cart", path: ROUTES.CART, icon: FiShoppingCart },
  { label: "Wishlist", path: ROUTES.WISHLIST, icon: FiHeart },
  { label: "My Orders", path: ROUTES.ORDERS, icon: FiPackage },
  { label: "Profile", path: ROUTES.PROFILE, icon: FiUser },
  { label: "Contact", path: ROUTES.CONTACT, icon: FiPhone },
];

const SidebarLinks = ({ onLinkClick }) => {
  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          onClick={onLinkClick}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "bg-tertiary-500 text-primary"
                : "text-secondary hover:bg-tertiary-50",
            ].join(" ")
          }
        >
          <Icon size={18} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default SidebarLinks;
