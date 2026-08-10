import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const AddButton = ({ label, to, onClick }) => {
  const className =
    "flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-secondary font-medium text-sm";

  if (to) {
    return (
      <Link to={to} className={className}>
        <FiPlus size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <FiPlus size={16} />
      {label}
    </button>
  );
};

export default AddButton;
