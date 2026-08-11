import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import ProductDetails from "./ProductDetails";

const ProductDetailsDrawer = ({ isOpen, onClose, slug }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      const timeout = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        onClick={onClose}
        className={`absolute inset-0 backdrop-blur-sm bg-black/40 transition-opacity duration-500 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 h-[88vh] max-h-[88vh] bg-primary rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <span className="w-10 h-1 rounded-full bg-secondary/20" />
        </div>

        <div className="flex items-center justify-end px-4 shrink-0">
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-secondary/60 hover:text-secondary hover:bg-secondary/5 transition-colors duration-200"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {slug && <ProductDetails slugOverride={slug} />}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProductDetailsDrawer;
