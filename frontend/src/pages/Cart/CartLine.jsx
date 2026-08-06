import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Check } from "lucide-react";
import RevealImage from "../../components/UI/RevealImage";

const parsePrice = (price) => Number(price.replace(/[₦,]/g, ""));
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

export default CartLine;
