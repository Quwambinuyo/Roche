import { useState } from "react";

export const useControllableState = (
  controlledValue,
  onChange,
  defaultValue,
) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = (next) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  return [value, setValue];
};
