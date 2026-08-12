import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiCheck } from "react-icons/fi";
import RevealImage from "../../components/UI/RevealImage";
import BottomSheetSelect from "../../components/UI/BottomSheetSelect";
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
  const { getUnitPrice, updateVariant } = useCart();
  const { id, product, color, colors, size, qty } = line;
  const unitPrice = getUnitPrice(product);
  const lineTotal = unitPrice * qty;
  const hasDiscount = (product.discount ?? 0) > 0;

  const isMultiColor = Boolean(colors && colors.length > 0);

  const colorLabel = isMultiColor
    ? colors.map((c) => c.name).join(", ")
    : color?.name;

  const sizeStock = size
    ? product.sizes?.find((s) => s.size === size)?.stock
    : null;
  const maxQty = Math.max(sizeStock ?? 10, qty, 10);
  const qtyOptions = Array.from({ length: maxQty }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  }));

  const sizeOptions =
    product.sizes?.map((s) => ({
      label: s.size,
      value: s.size,
      disabled: s.stock === 0 && s.size !== size,
    })) ?? [];

  const colorOptions =
    product.colors?.map((c) => ({
      label: c.name,
      value: c.name,
      hex: c.hex,
      disabled: c.stock === 0 && c.name !== color?.name,
    })) ?? [];

  const handleSizeChange = (nextSize) => {
    updateVariant(id, { size: nextSize });
  };

  const handleColorChange = (nextColorName) => {
    const nextColor = product.colors?.find((c) => c.name === nextColorName);
    updateVariant(id, { color: nextColor });
  };

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

          {isMultiColor ? (
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
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {colorOptions.length > 0 && (
                <BottomSheetSelect
                  title="Select color"
                  value={color?.name}
                  onChange={handleColorChange}
                  options={colorOptions}
                  renderOption={(opt) => (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full ring-1 ring-secondary/15 shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      />
                      {opt.label}
                      {opt.disabled ? " (out of stock)" : ""}
                    </span>
                  )}
                  renderTrigger={(selected) => (
                    <button
                      type="button"
                      className="flex items-center gap-1.5 h-8 min-w-[80px] w-full px-2.5  border border-secondary/15 text-xs font-medium text-secondary hover:border-secondary/30 transition-colors"
                    >
                      {selected && (
                        <span
                          className="w-3 h-3 rounded-full ring-1 ring-secondary/15"
                          style={{ backgroundColor: selected.hex }}
                        />
                      )}
                      {selected?.label ?? "Color"}
                    </button>
                  )}
                />
              )}
              {sizeOptions.length > 0 && (
                <BottomSheetSelect
                  title="Select size"
                  value={size}
                  onChange={handleSizeChange}
                  options={sizeOptions}
                  renderOption={(opt) =>
                    `${opt.label}${opt.disabled ? " (out of stock)" : ""}`
                  }
                  triggerClassName="h-7"
                  placeholder="Size"
                />
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <BottomSheetSelect
              title="Select quantity"
              value={String(qty)}
              onChange={(val) => onQtyChange(id, Number(val))}
              options={qtyOptions}
              searchable
              searchLabel="Quantity"
              triggerClassName="h-7"
            />

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
