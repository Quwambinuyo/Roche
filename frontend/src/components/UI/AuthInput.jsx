import React from "react";

const AuthInput = ({
  id,
  label,
  labelExtra,
  icon: Icon,
  error,
  rightElement,
  registration,
  ...inputProps
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={id}
          className="block font-mono text-[10px] tracking-[0.2em] uppercase text-secondary/50"
        >
          {label}
        </label>
        {labelExtra}
      </div>
      <div className="flex items-center gap-2.5 border-b border-secondary/20 focus-within transition-colors duration-200 pb-2.5">
        <Icon size={16} className="text-secondary/40 shrink-0" />
        <input
          id={id}
          className="w-full bg-transparent outline-none text-sm text-secondary "
          {...registration}
          {...inputProps}
        />
        {rightElement}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default AuthInput;
