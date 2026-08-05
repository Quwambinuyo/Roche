import React from "react";

const LandingFooter = () => {
  return (
    <footer className="border-t border-secondary/10 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-secondary">
          Roche&nbsp;<span className="text-tertiary-700">CO.</span>
        </span>
        <p className="text-xs text-secondary/40">
          © 2026 Roche Co. Cut and finished in Lagos.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
