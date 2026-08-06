import React from "react";
import { FiShield, FiTruck } from "react-icons/fi";

const ProductInfoBadges = () => (
  <div className="mt-8 pt-6 border-t border-secondary/10 space-y-3">
    <div className="flex items-center gap-2 text-sm text-secondary/60">
      <FiTruck size={16} className="text-secondary/40" />
      Delivered in 2–4 business days
    </div>
    <div className="flex items-center gap-2 text-sm text-secondary/60">
      <FiShield size={16} className="text-secondary/40" />
      7-day return on unworn items
    </div>
  </div>
);

export default ProductInfoBadges;
