import React from "react";

const AuthSidePanel = ({ eyebrow, title, tagline, listLabel, items }) => {
  return (
    <div className="hidden lg:flex lg:w-[42%] lg:fixed lg:left-0 lg:top-0 lg:h-screen bg-secondary text-primary flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
        }}
      />

      <div className="relative px-12 w-full max-w-md">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary/50">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight uppercase">
          {title}
        </h1>
        <p className="mt-3 font-mono text-xs tracking-widest uppercase text-primary/50">
          {tagline}
        </p>

        {items?.length > 0 && (
          <div className="mt-10">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/40 mb-3">
              {listLabel}
            </p>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-mono text-sm text-primary/70"
                >
                  <span className="text-primary/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 border-b border-dotted border-primary/15 pb-2">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthSidePanel;
