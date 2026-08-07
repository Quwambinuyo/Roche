import React from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiCheck } from "react-icons/fi";
import RevealImage from "../../components/UI/RevealImage";
import { useCart } from "../../context/CartContext";

const formatNaira = (value) => `₦${value.toLocaleString("en-NG")}`;

export const SelectCircle = ({ checked, onClick, ariaLabel }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    aria-pressed={checked}
    className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${
      checked
        ? "bg-secondary border-secondary"
        : "border-secondary/25 hover:border-secondary/50"
    }`}
  >
    {checked && <FiCheck size={12} className="text-primary" />}
  </button>
);

const CartLine = ({
  line,
  onQtyChange,
  onRemove,
  isSelected,
  onToggleSelect,
}) => {
  const { getUnitPrice } = useCart();
  const { id, product, color, colors, size, qty } = line;
  const unitPrice = getUnitPrice(product);
  const lineTotal = unitPrice * qty;
  const hasDiscount = (product.discount ?? 0) > 0;

  const colorLabel =
    colors && colors.length > 0
      ? colors.map((c) => c.name).join(", ")
      : color?.name;

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
              <FiTrash2 size={15} />
            </button>
          </div>

          {colors && colors.length > 0 ? (
            <div className="flex items-center gap-1.5 mt-1.5">
              {colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-3.5 h-3.5 rounded-full ring-1 ring-secondary/15"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-xs text-secondary/50">
                {colorLabel}
                {size ? ` · Size ${size}` : ""}
              </span>
            </div>
          ) : (
            <p className="text-xs text-secondary/50 mt-1">
              {colorLabel}
              {size ? ` · Size ${size}` : ""}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center rounded-full border border-secondary/15">
              <button
                onClick={() => onQtyChange(id, Math.max(1, qty - 1))}
                className="w-7 h-7 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
              >
                <FiMinus size={12} />
              </button>
              <span className="w-6 text-center text-xs font-semibold text-secondary">
                {qty}
              </span>
              <button
                onClick={() => onQtyChange(id, qty + 1)}
                className="w-7 h-7 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
              >
                <FiPlus size={12} />
              </button>
            </div>

            {/* Price & Discount container converted to vertical stack */}
            <div className="flex flex-col items-end">
              {hasDiscount && (
                <span className="text-xs text-secondary/40 line-through">
                  {formatNaira(parsePriceOriginal(product.price) * qty)}
                </span>
              )}
              <p className="text-sm font-semibold text-secondary">
                {formatNaira(lineTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const parsePriceOriginal = (price) => Number(price.replace(/[₦,]/g, ""));

export default CartLine;
