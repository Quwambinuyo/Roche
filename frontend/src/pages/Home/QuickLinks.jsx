import React from "react";
import { Heart, MapPin, CreditCard, Settings, Package } from "lucide-react";

const QUICK_LINKS = [
  { label: "Orders", icon: Package, href: "#" },
  { label: "Wishlist", icon: Heart, href: "#" },
  { label: "Addresses", icon: MapPin, href: "#" },
  { label: "Payment", icon: CreditCard, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
];

const QuickLinks = () => {
  return (
    <section className="mx-auto py-10">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {QUICK_LINKS.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-secondary/10 py-5 text-secondary/70 hover:text-secondary hover:border-secondary/30 transition-colors duration-300"
          >
            <Icon size={18} />
            <span className="text-xs font-medium">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
