import React from "react";
import { FiArrowRight } from "react-icons/fi";

const AuthSubmitButton = ({ isSubmitting, submittingText, idleText }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-2 w-full flex items-center justify-center gap-2 bg-secondary text-primary text-sm font-semibold py-3.5 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? submittingText : idleText}
      {!isSubmitting && <FiArrowRight size={15} />}
    </button>
  );
};

export default AuthSubmitButton;
