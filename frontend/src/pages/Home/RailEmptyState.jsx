import React from "react";
import { ArrowUpRight, Compass } from "lucide-react";

const RailEmptyState = ({ message, ctaLabel, ctaHref = "#" }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-secondary/15 py-12 px-6">
      <span className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center mb-3">
        <Compass size={16} className="text-secondary/40" />
      </span>
      <p className="text-sm text-secondary/50 max-w-xs">{message}</p>
      {ctaLabel && (
        <a
          href={ctaHref}
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-tertiary-700"
        >
          {ctaLabel} <ArrowUpRight size={12} />
        </a>
      )}
    </div>
  );
};

export default RailEmptyState;
