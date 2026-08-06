import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Check } from "lucide-react";
import Reveal from "../Landing/Reveal";
import RevealImage from "../../components/UI/RevealImage";
import RailEmptyState from "../Home/RailEmptyState";
import { useCart } from "../../context/CartContext";

const parsePrice = (price) => Number(price.replace(/[₦,]/g, ""));

const formatNaira = (value) => `₦${value.toLocaleString("en-NG")}`;

const SHIPPING_FLAT = 3500;

const SelectCircle = ({ checked, onClick, ariaLabel }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    aria-pressed={checked}
    className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
      checked
        ? "bg-secondary border-secondary"
        : "border-secondary/25 hover:border-secondary/50"
    }`}
  >
    {checked && <Check size={12} className="text-primary" />}
  </button>
);

const CartLine = ({
  line,
  onQtyChange,
  onRemove,
  isSelected,
  onToggleSelect,
}) => {
  const { id, product, color, size, qty } = line;
  const lineTotal = parsePrice(product.price) * qty;

  return (
    <div className="flex items-start gap-3 py-5 border-b border-secondary/10">
      <div className="pt-7">
        <SelectCircle
          checked={isSelected}
          onClick={() => onToggleSelect(id)}
          ariaLabel={`Select ${product.name}`}
        />
      </div>

      <div className="flex gap-4 flex-1 min-w-0">
        <Link to={`/shop/${product.slug}`} className="shrink-0">
          <RevealImage
            src={product.image}
            alt={product.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-lg"
            imgClassName="object-cover"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              to={`/shop/${product.slug}`}
              className="text-sm font-medium text-secondary hover:text-tertiary-600 transition-colors"
            >
              {product.name}
            </Link>
            <button
              onClick={() => onRemove(id)}
              aria-label="Remove item"
              className="text-secondary/40 hover:text-secondary transition-colors shrink-0"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <p className="text-xs text-secondary/50 mt-1">
            {color?.name}
            {size ? ` · Size ${size}` : ""}
          </p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center rounded-full border border-secondary/15">
              <button
                onClick={() => onQtyChange(id, Math.max(1, qty - 1))}
                className="w-7 h-7 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 text-center text-xs font-semibold text-secondary">
                {qty}
              </span>
              <button
                onClick={() => onQtyChange(id, qty + 1)}
                className="w-7 h-7 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>

            <p className="text-sm font-semibold text-secondary">
              {formatNaira(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { items, updateQty, removeFromCart, removeItems } = useCart();
  const [selectedIds, setSelectedIds] = useState(
    () => new Set(items.map((line) => line.id)),
  );

  useEffect(() => {
    setSelectedIds((prev) => {
      const validIds = new Set(items.map((line) => line.id));
      const next = new Set([...prev].filter((id) => validIds.has(id)));

      items.forEach((line) => {
        if (!prev.has(line.id)) {
          next.add(line.id);
        }
      });

      if (next.size === prev.size && [...next].every((id) => prev.has(id))) {
        return prev;
      }
      return next;
    });
  }, [items]);

  const allSelected = items.length > 0 && selectedIds.size === items.length;

  const selectedLines = items.filter((line) => selectedIds.has(line.id));

  const selectedSubtotal = selectedLines.reduce(
    (sum, line) => sum + parsePrice(line.product.price) * line.qty,
    0,
  );

  const selectedItemCount = selectedLines.reduce(
    (sum, line) => sum + line.qty,
    0,
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(items.map((l) => l.id)));
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    removeItems([...selectedIds]);
    setSelectedIds(new Set());
  };

  const shipping = selectedLines.length > 0 ? SHIPPING_FLAT : 0;
  const total = selectedSubtotal + shipping;

  return (
    <div className="">
      <Reveal className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Cart
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          Your Cart
        </h1>
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
              <button
                type="button"
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-sm font-medium text-secondary"
              >
                <SelectCircle
                  checked={allSelected}
                  onClick={toggleSelectAll}
                  ariaLabel="Select all items"
                />
                Select all
              </button>

              {selectedIds.size > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  aria-label="Delete selected items"
                  className="flex items-center gap-1.5 text-sm font-medium text-secondary/60 hover:text-secondary transition-colors"
                >
                  <Trash2 size={15} />
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

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary/60">Subtotal</span>
                <span className="text-secondary">
                  {formatNaira(selectedSubtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary/60">Shipping</span>
                <span className="text-secondary">{formatNaira(shipping)}</span>
              </div>
            </div>

            <div className="h-px bg-secondary/10 my-4" />

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-secondary">
                Total
              </span>
              <span className="text-lg font-bold text-secondary">
                {formatNaira(total)}
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
