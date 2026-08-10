import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordToggleButton = ({ visible, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? "Hide password" : "Show password"}
      className="text-secondary/40 hover:text-secondary transition-colors duration-200 shrink-0"
    >
      {visible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
    </button>
  );
};

export default PasswordToggleButton;
