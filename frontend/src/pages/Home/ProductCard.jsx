import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import RevealImage from "../../components/UI/RevealImage";
import { useCart, buildLineId } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const parsePrice = (price) => Number(String(price).replace(/[^\d]/g, ""));
const formatNaira = (value) => `₦${Math.round(value).toLocaleString("en-NG")}`;

const ProductCard = ({ product, selectedColor, onColorChange }) => {
  const { items, addToCart, updateQty } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [internalColor, setInternalColor] = useState(
    product?.colors?.find((c) => c.stock > 0)?.name ??
      product?.colors?.[0]?.name ??
      null,
  );

  if (!product) return null;

  const isControlled = selectedColor !== undefined;
  const activeColorName = isControlled ? selectedColor : internalColor;

  const handleSelectColor = (colorName) => {
    if (!isControlled) {
      setInternalColor(colorName);
    }
    onColorChange?.(colorName);
  };

  const activeColorData = product.colors?.find(
    (c) => c.name === activeColorName,
  );

  const hasColors = product.colors && product.colors.length > 0;
  const totalStock = hasColors
    ? product.colors.reduce((sum, c) => sum + c.stock, 0)
    : (product.stock ?? 1);
  const isFullyOutOfStock = totalStock <= 0;
  const isSelectedColorOutOfStock = hasColors
    ? activeColorData?.stock <= 0
    : false;
  const showOutOfStock = isFullyOutOfStock || isSelectedColorOutOfStock;

  const canAddToCart = !showOutOfStock && (!hasColors || activeColorName);

  const hasDiscount = product.discount > 0;
  const basePrice = parsePrice(product.price);
  const discountedPrice = hasDiscount
    ? basePrice - (basePrice * product.discount) / 100
    : basePrice;

  const lineId = buildLineId(product, activeColorData ?? null, null);
  const cartLine = items.find((line) => line.id === lineId);
  const cartCount = cartLine?.qty ?? 0;

  const wishlisted = isInWishlist(product.slug);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canAddToCart) return;

    addToCart({ product, color: activeColorData ?? null });
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartCount === 0) return;

    updateQty(lineId, cartCount - 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link to={`/shop/${product.slug}`} className="group block">
      <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-secondary/5">
        <RevealImage
          src={product.image}
          alt={product.name}
          className={`w-full h-full transition-opacity duration-300 ${
            showOutOfStock ? "opacity-60" : ""
          }`}
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg bg-primary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
        >
          <FiHeart size={15} className={wishlisted ? "fill-current" : ""} />
        </button>

        {showOutOfStock ? (
          <>
            <span className="absolute top-3 right-3 bg-secondary text-primary text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
            <div className="absolute inset-0 bg-primary/10" />
          </>
        ) : (
          hasDiscount && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
              -{product.discount}%
            </span>
          )
        )}

        {!showOutOfStock && (
          <div className="absolute bottom-3 right-3">
            {cartCount === 0 ? (
              <button
                type="button"
                onClick={handleAdd}
                aria-label="Add to cart"
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-primary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
              >
                <BsCart4 size={16} />
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-primary rounded-full shadow-lg px-1 py-1">
                <button
                  type="button"
                  onClick={handleRemove}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors duration-200"
                >
                  <FiMinus size={14} />
                </button>
                <span className="text-xs font-semibold text-secondary w-4 text-center">
                  {cartCount}
                </span>
                <button
                  type="button"
                  onClick={handleAdd}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors duration-200"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-px w-10 bg-secondary mt-3" />

      <p
        className={`text-sm font-medium mt-3 ${
          showOutOfStock ? "text-secondary/40" : "text-secondary"
        }`}
      >
        {product.name}
      </p>

      <div className="flex items-center gap-2 mt-1">
        {hasDiscount && !showOutOfStock && (
          <span className="text-xs text-secondary/40 line-through">
            {formatNaira(basePrice)}
          </span>
        )}
        <span
          className={`text-sm ${
            showOutOfStock ? "text-secondary/40" : "text-secondary/70"
          }`}
        >
          {showOutOfStock
            ? "Out of Stock"
            : hasDiscount
              ? formatNaira(discountedPrice)
              : product.price}
        </span>
      </div>

      {hasColors && (
        <div className="flex items-center gap-1.5 my-2">
          {product.colors.map((color) => {
            const colorOutOfStock = color.stock <= 0;
            const isActive = activeColorName === color.name;

            return (
              <button
                key={color.name}
                type="button"
                disabled={colorOutOfStock}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelectColor(color.name);
                }}
                title={
                  colorOutOfStock ? `${color.name} — out of stock` : color.name
                }
                aria-label={color.name}
                className={`relative w-4 h-4 rounded-full border transition-all duration-200 ${
                  isActive
                    ? "ring-2 ring-secondary ring-offset-2 ring-offset-primary"
                    : "border-secondary/20"
                } ${
                  colorOutOfStock
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {colorOutOfStock && (
                  <span className="absolute inset-0 rounded-full overflow-hidden">
                    <span className="absolute top-1/2 left-0 w-full h-px bg-secondary/70 -rotate-45" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
