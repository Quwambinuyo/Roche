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

const SidebarLinks = ({ onLinkClick, isOpen }) => {
  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map(({ label, path, icon: Icon }, index) => (
        <NavLink
          key={path}
          to={path}
          onClick={onLinkClick}
          style={{
            transitionDelay: isOpen ? `${index * 60 + 100}ms` : "0ms",
          }}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium oldenburg-regular",
              isOpen
                ? "motion-opacity-in-0 motion-translate-x-in-25 motion-duration-300 motion-ease-spring-smooth"
                : "opacity-0 -translate-x-3",
              isActive
                ? "bg-secondary text-primary"
                : "text-secondary hover:bg-secondary/5",
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
