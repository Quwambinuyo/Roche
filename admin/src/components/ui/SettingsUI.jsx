import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import CustomSelect from "./CustomSelect";

export const SectionCard = ({ title, description, children }) => {
  return (
    <section className="overflow-hidden rounded-lg border border-primary/10 bg-secondary transition-all duration-300">
      <div className="border-b border-primary/10 px-5 py-4">
        <h3 className="text-sm font-medium text-primary">{title}</h3>

        {description ? (
          <p className="mt-1 font-mono text-xs text-primary/60">
            {description}
          </p>
        ) : null}
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
};

export const Field = ({ label, children }) => {
  return (
    <label className="flex min-w-0 flex-col gap-2">
      <span className="text-xs font-medium text-primary">{label}</span>
      {children}
    </label>
  );
};

export const TextInput = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-md border border-primary/20 bg-secondary px-3 text-sm text-primary outline-none transition-all duration  focus:ring-2 focus:ring-primary/5 ${className}`}
    />
  );
};

export const SelectInput = ({ options, value, onChange, className = "" }) => {
  return (
    <div
      className={`transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/5 ${className}`}
    >
      <CustomSelect options={options} value={value} onChange={onChange} />
    </div>
  );
};

export const Toggle = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-3">
      {label ? <span className="text-sm text-primary">{label}</span> : null}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-primary/10 p-0.5 transition-all duration-300 ease-out ${
          checked ? "justify-end bg-primary" : "justify-start bg-primary/10"
        }`}
      >
        <span
          className={`h-3.5 w-3.5 rounded-full bg-secondary shadow-sm transition-all duration-300 ease-out ${
            checked ? "scale-100" : "scale-90"
          }`}
        />
      </button>
    </div>
  );
};

export const PrimaryButton = ({
  children,
  disabled,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="rounded-md border border-secondary/30 bg-primary px-5 py-2.5 text-sm font-medium text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
    >
      {children}
    </button>
  );
};

export const SecretField = ({ label, value, onChange, placeholder }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label}>
      <div className="flex w-full">
        <TextInput
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 rounded-r-none border-r-0"
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide value" : "Show value"}
          className="flex w-11 shrink-0 items-center justify-center rounded-r-md border border-primary/20 bg-secondary text-primary transition-all duration-200 hover:bg-primary hover:text-secondary"
        >
          <span
            className={`transition-transform duration-200 ${
              visible ? "rotate-0 scale-100" : "rotate-0 scale-100"
            }`}
          >
            {visible ? <EyeOff size={14} /> : <Eye size={14} />}
          </span>
        </button>
      </div>
    </Field>
  );
};
