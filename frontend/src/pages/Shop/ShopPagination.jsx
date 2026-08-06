import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ShopPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-secondary/20 text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:border-secondary transition-colors duration-200"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors duration-200 ${
            p === currentPage
              ? "bg-secondary text-primary font-semibold"
              : "text-secondary/60 hover:text-secondary"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-secondary/20 text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:border-secondary transition-colors duration-200"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default ShopPagination;
