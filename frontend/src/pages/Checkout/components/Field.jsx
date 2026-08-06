import React from "react";

export const inputClass =
  "w-full h-11 rounded-lg border border-secondary/15 bg-primary px-3.5 text-sm text-secondary placeholder:text-secondary/30 focus:outline-none focus:border-secondary/40 transition-colors";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="text-xs font-medium text-secondary/60 mb-1.5 block">
      {label}
    </span>
    {children}
  </label>
);

export default Field;
