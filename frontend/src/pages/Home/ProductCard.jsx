import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import {
  FiPlus,
  FiMinus,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import RevealImage from "../../components/UI/RevealImage";
import { useCart, buildLineId } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useControllableState } from "../../hooks/useControllableState";
import { formatNaira, getDiscountPricing } from "../../utils/price";
import { getStockStatus } from "../../utils/productStock";

const SIZE_DRAWER_THRESHOLD = 1;

const SWATCH_DELAYS = [
  "motion-delay-0",
  "motion-delay-50",
  "motion-delay-100",
  "motion-delay-150",
  "motion-delay-200",
];

const ProductCard = ({
  product,
  selectedColor,
  onColorChange,
  onOpenSizeDrawer,
}) => {
  const { items, addToCart, updateQty } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeColorName, handleSelectColor] = useControllableState(
    selectedColor,
    onColorChange,
    product?.colors?.find((c) => c.stock > 0)?.name ??
      product?.colors?.[0]?.name ??
      null,
  );

  const [isHovering, setIsHovering] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [wishlistPulse, setWishlistPulse] = useState(false);

  if (!product) return null;

  const { hasColors, hasSizes, activeColorData, showOutOfStock } =
    getStockStatus(product, activeColorName);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const hasMultipleImages = images.length > 1;

  const needsSizeDrawer =
    hasSizes && product.sizes.length > SIZE_DRAWER_THRESHOLD;

  const quickAddSize =
    hasSizes && !needsSizeDrawer
      ? (product.sizes.find((s) => s.stock > 0) ?? product.sizes[0])
      : null;

  const canAddToCart =
    !showOutOfStock &&
    (!hasColors || activeColorName) &&
    (!quickAddSize || quickAddSize.stock > 0);

  const { hasDiscount, basePrice, discountedPrice } =
    getDiscountPricing(product);

  const lineId = buildLineId(product, activeColorData ?? null, quickAddSize);
  const cartLine = items.find((line) => line.id === lineId);
  const cartCount = cartLine?.qty ?? 0;

  const wishlisted = isInWishlist(product.slug);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (needsSizeDrawer) {
      onOpenSizeDrawer?.(product.slug);
      return;
    }

    if (!canAddToCart) return;

    addToCart({
      product,
      color: activeColorData ?? null,
      size: quickAddSize,
    });
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
    setWishlistPulse(true);
    setTimeout(() => setWishlistPulse(false), 250);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (images.length > 1) setImageIndex(1);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setImageIndex(0);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-secondary/5">
        <RevealImage
          src={images[0]}
          alt={product.name}
          className={`w-full h-full transition-opacity duration-150 ${
            showOutOfStock ? "opacity-60" : ""
          }`}
          imgClassName="transition-transform duration-200 ease-out group-hover:scale-105"
        />

        {hasMultipleImages &&
          images.slice(1).map((src, idx) => {
            const actualIndex = idx + 1;
            const isActive = imageIndex === actualIndex;

            return (
              <img
                key={src}
                src={src}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
                  isActive ? "opacity-100" : "opacity-0"
                } ${showOutOfStock ? "opacity-60" : ""}`}
              />
            );
          })}

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg bg-primary text-secondary hover:bg-secondary hover:text-primary transition-colors duration-150 ${
            wishlistPulse
              ? "motion-scale-in-125 motion-duration-200 motion-ease-spring-snappy"
              : ""
          }`}
        >
          <FiHeart size={15} className={wishlisted ? "fill-current" : ""} />
        </button>

        {showOutOfStock ? (
          <>
            <div className="absolute top-3 right-3 flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-secondary bg-primary -mb-px z-10" />
              <span className="bg-primary text-secondary text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-md border border-dashed border-secondary/40 shadow-sm">
                Sold Out
              </span>
            </div>
            <div className="absolute inset-0 bg-primary/10" />
          </>
        ) : (
          hasDiscount && (
            <span className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary/95 backdrop-blur-sm border border-secondary/15 text-secondary text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 rounded-full shadow-sm motion-preset-pop motion-duration-200 motion-ease-spring-snappy">
              −{product.discount}%
            </span>
          )
        )}

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-primary/90 text-secondary shadow-md ${
                isHovering
                  ? "motion-opacity-in-0 motion-duration-150"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-primary/90 text-secondary shadow-md ${
                isHovering
                  ? "motion-opacity-in-0 motion-duration-150"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <FiChevronRight size={16} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-150 ${
                    idx === imageIndex ? "w-4 bg-primary" : "w-1 bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {!showOutOfStock && (
          <div className="absolute bottom-3 right-3 opacity-0 translate-x-3 pointer-events-none transition-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto group-hover:motion-opacity-in-0 group-hover:motion-translate-x-in-25 group-hover:motion-duration-150 group-hover:motion-ease-spring-snappy">
            {cartCount === 0 || needsSizeDrawer ? (
              <button
                type="button"
                onClick={handleAdd}
                disabled={!needsSizeDrawer && !canAddToCart}
                aria-label={needsSizeDrawer ? "Choose size" : "Add to cart"}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-primary text-secondary hover:bg-secondary hover:text-primary transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-90"
              >
                <BsCart4 size={16} />
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-primary rounded-full shadow-lg px-1 py-1">
                <button
                  type="button"
                  onClick={handleRemove}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors duration-150 active:scale-90"
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
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors duration-150 active:scale-90"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-px w-10 bg-secondary mt-3 transition-all duration-150 group-hover:w-full" />

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
          className={`quicksand text-sm ${
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
          {product.colors.map((color, idx) => {
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
                className={`relative w-4 h-4 rounded-full border transition-transform duration-150 active:scale-90 group-hover:motion-opacity-in-0 group-hover:motion-duration-150 ${
                  SWATCH_DELAYS[idx % SWATCH_DELAYS.length]
                } ${
                  isActive
                    ? "ring-2 ring-secondary ring-offset-2 ring-offset-primary scale-110"
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
