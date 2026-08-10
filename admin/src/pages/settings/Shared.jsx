import React from "react";

export const SectionCard = ({ title, description, action, children }) => (
  <div className="border border-black bg-white">
    <div className="flex items-start justify-between gap-4 border-b border-black px-5 py-4">
      <div>
        <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-black">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 font-mono text-xs text-neutral-500">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
    <div className="px-5 py-5">{children}</div>
  </div>
);

export const Field = ({ label, hint, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="font-mono text-xs font-bold uppercase tracking-wide text-black">
      {label}
    </span>
    {children}
    {hint ? (
      <span className="font-mono text-[11px] text-neutral-500">{hint}</span>
    ) : null}
  </label>
);

export const TextInput = (props) => (
  <input
    {...props}
    className={`border border-black bg-white px-3 py-2 font-mono text-sm text-black outline-none focus:bg-neutral-50 ${
      props.className || ""
    }`}
  />
);

export const TextArea = (props) => (
  <textarea
    {...props}
    className={`border border-black bg-white px-3 py-2 font-mono text-sm text-black outline-none focus:bg-neutral-50 ${
      props.className || ""
    }`}
  />
);

export const SelectInput = ({ options, className, ...rest }) => (
  <select
    {...rest}
    className={`border border-black bg-white px-3 py-2 font-mono text-sm text-black outline-none focus:bg-neutral-50 ${
      className || ""
    }`}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const Toggle = ({ checked, onChange, label }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex items-center gap-3 font-mono text-sm text-black"
  >
    <span
      className={`relative h-5 w-9 border border-black transition-colors ${
        checked ? "bg-black" : "bg-white"
      }`}
    >
      <span
        className={`absolute top-0.5 h-3 w-3 border border-black bg-white transition-transform ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </span>
    {label ? <span>{label}</span> : null}
  </button>
);

export const PrimaryButton = ({ children, className, ...rest }) => (
  <button
    {...rest}
    className={`border border-black bg-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80 ${
      className || ""
    }`}
  >
    {children}
  </button>
);

export const SecondaryButton = ({ children, className, ...rest }) => (
  <button
    {...rest}
    className={`border border-black bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-black transition-colors hover:bg-neutral-100 ${
      className || ""
    }`}
  >
    {children}
  </button>
);

export const IconButton = ({ children, className, ...rest }) => (
  <button
    {...rest}
    className={`flex h-8 w-8 items-center justify-center border border-black bg-white text-black transition-colors hover:bg-neutral-100 ${
      className || ""
    }`}
  >
    {children}
  </button>
);

export const Pill = ({ children, tone = "default" }) => {
  const toneClass =
    tone === "success"
      ? "border-black bg-black text-white"
      : "border-black bg-white text-black";
  return (
    <span
      className={`border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${toneClass}`}
    >
      {children}
    </span>
  );
};
