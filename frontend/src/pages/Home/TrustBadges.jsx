import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";
import Reveal from "../Landing/Reveal";

const BADGES = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over ₦50,000" },
  { icon: RotateCcw, label: "Easy Returns", desc: "30-day return window" },
  { icon: ShieldCheck, label: "Secure Payment", desc: "Encrypted checkout" },
  { icon: Headset, label: "24/7 Support", desc: "We're here to help" },
];

const TrustBadges = () => {
  return (
    <Reveal className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BADGES.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-2 rounded-xl border border-secondary/10 px-4 py-5"
          >
            <Icon size={22} className="text-tertiary-700" />
            <p className="text-sm font-semibold text-secondary">{label}</p>
            <p className="text-xs text-secondary/50">{desc}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
};

export default TrustBadges;
