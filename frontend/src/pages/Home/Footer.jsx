import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Categories", href: "/categories" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Order History", href: "/orders" },
      { label: "Returns", href: "/contact" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Profile", href: "/profile" },
      { label: "Settings", href: "/profile" },
      { label: "Cart", href: "/cart" },
    ],
  },
];

const Footer = ({ onLogout }) => {
  return (
    <footer className="mt-10 border-t border-secondary/10 pt-10 pb-8 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg text-secondary mb-3">BSTRT</h3>
          <p className="text-sm text-secondary/50">
            Considered pieces, built to last beyond a season.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-secondary/50 hover:text-tertiary-700"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-secondary/50 hover:text-tertiary-700"
            >
              <FiTwitter size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-secondary/50 hover:text-tertiary-700"
            >
              <FiFacebook size={18} />
            </a>
          </div>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.heading}>
            <h4 className="text-xs font-semibold tracking-widest text-secondary/40 uppercase mb-3">
              {group.heading}
            </h4>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary/70 hover:text-tertiary-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {group.heading === "Account" && (
              <button
                type="button"
                onClick={onLogout}
                className="text-sm text-secondary/70 hover:text-tertiary-700 mt-2 text-left"
              >
                Logout
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-secondary/10 text-xs text-secondary/40">
        © {new Date().getFullYear()} BSTRT. All rights reserved.
      </div>

      <div className="mt-6 select-none w-full">
        <svg
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <text
            x="0"
            y="150"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-secondary font-extrabold uppercase"
            style={{ fontSize: "180px" }}
          >
            BSTRT
          </text>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
