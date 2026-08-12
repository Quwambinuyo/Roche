import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import Reveal from "../Landing/Reveal";
import RailEmptyState from "../Home/RailEmptyState";
import { useCart } from "../../context/CartContext";
import CartLine, { SelectCircle } from "./CartLine";

const formatNaira = (value) => `₦${value.toLocaleString("en-NG")}`;

const Cart = () => {
  const {
    items,
    updateQty,
    removeFromCart,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    removeSelected,
    selectedSubtotal,
    selectedItemCount,
    allSelected,
  } = useCart();

  return (
    <div className="">
      <Reveal className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Cart
        </p>

        {items.length > 0 && (
          <p className="text-sm text-secondary/50 mt-2">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        )}
      </Reveal>

      {items.length === 0 ? (
        <RailEmptyState
          message="Your cart is empty. Add something you like to see it here."
          ctaLabel="Browse Shop"
          ctaHref="/shop"
        />
      ) : (
        <div className="grid md:grid-cols-[1fr_300px] gap-10 items-start">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-secondary/10">
              <div
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-sm font-medium text-secondary cursor-pointer"
              >
                <SelectCircle
                  checked={allSelected}
                  ariaLabel="Select all items"
                />
                Select all
              </div>

              {selectedIds.size > 0 && (
                <button
                  type="button"
                  onClick={removeSelected}
                  aria-label="Delete selected items"
                  className="flex items-center gap-1.5 text-sm font-medium text-secondary/60 hover:text-secondary transition-colors cursor-pointer"
                >
                  <FiTrash2 size={15} />
                  Delete ({selectedIds.size})
                </button>
              )}
            </div>

            {items.map((line) => (
              <CartLine
                key={line.id}
                line={line}
                onQtyChange={updateQty}
                onRemove={removeFromCart}
                isSelected={selectedIds.has(line.id)}
                onToggleSelect={toggleSelect}
              />
            ))}
          </div>

          <div className="rounded-lg border border-secondary/10 p-5 sticky top-6">
            <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-4">
              Order Summary
            </p>

            <p className="text-xs text-secondary/50 mb-3">
              {selectedItemCount > 0
                ? `${selectedItemCount} item${selectedItemCount === 1 ? "" : "s"} selected`
                : "No items selected"}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary/60">Subtotal</span>
              <span className="text-secondary">
                {formatNaira(selectedSubtotal)}
              </span>
            </div>

            <div className="h-px bg-secondary/10 my-4" />

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-secondary">
                Total
              </span>
              <span className="text-lg font-bold text-secondary">
                {formatNaira(selectedSubtotal)}
              </span>
            </div>

            {selectedItemCount > 0 ? (
              <Link
                to="/checkout"
                state={{ selectedIds: [...selectedIds] }}
                className="block text-center h-11 leading-[44px] rounded-full text-sm font-semibold bg-secondary text-primary hover:bg-tertiary-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <button
                disabled
                className="block w-full text-center h-11 leading-[44px] rounded-full text-sm font-semibold bg-secondary/10 text-secondary/40 cursor-not-allowed"
              >
                Select items to checkout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
