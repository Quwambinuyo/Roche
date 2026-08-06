import React from "react";
import { Check } from "lucide-react";

const OptionCard = ({
  active,
  onClick,
  icon: Icon,
  label,
  detail,
  trailing,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-3 rounded-lg border p-3.5 text-left transition-colors ${
      active
        ? "border-secondary bg-secondary/5"
        : "border-secondary/15 hover:border-secondary/30"
    }`}
  >
    <div
      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
        active
          ? "bg-secondary text-primary"
          : "bg-secondary/5 text-secondary/60"
      }`}
    >
      <Icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-secondary">{label}</p>
      <p className="text-xs text-secondary/50 mt-0.5">{detail}</p>
    </div>
    {trailing}
    <div
      className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
        active ? "bg-secondary border-secondary" : "border-secondary/25"
      }`}
    >
      {active && <Check size={12} className="text-primary" />}
    </div>
  </button>
);

export default OptionCard;
