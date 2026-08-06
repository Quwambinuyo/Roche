import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import Reveal from "../Landing/Reveal";
import ProductGallery from "./ProductGallery";
import SizeGuide from "../../pages/Shop/SizeGuide";
import RevealImage from "../../components/UI/RevealImage";
import {
  PRODUCTS,
  BUNDLES,
  getProductBySlug,
  getBundleBySlug,
} from "../../mock/clothing";
import { useCart, buildLineId } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ALL_ITEMS = [...PRODUCTS, ...BUNDLES];

const ProductDetails = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug) || getBundleBySlug(slug);
  const isBundle = Boolean(product && !getProductBySlug(slug));
  const { items, addToCart, updateQty } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(
    () => product?.colors?.find((c) => c.stock > 0) || product?.colors?.[0],
  );
  const [selectedColorNames, setSelectedColorNames] = useState([]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [qty, setQty] = useState(isBundle ? product?.minUnits || 1 : 1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const bundleItems = useMemo(() => {
    if (!isBundle || !product?.items) return [];
    return product.items
      .map((itemSlug) => getProductBySlug(itemSlug))
      .filter(Boolean);
  }, [isBundle, product]);

  const bundleColors = useMemo(() => {
    if (!isBundle) return [];
    const seen = new Map();
    bundleItems.forEach((item) => {
      item.colors?.forEach((c) => {
        const existing = seen.get(c.name);
        if (existing) {
          existing.stock += c.stock;
        } else {
          seen.set(c.name, { ...c });
        }
      });
    });
    return Array.from(seen.values());
  }, [isBundle, bundleItems]);

  const toggleBundleColor = (colorName) => {
    setSelectedColorNames((prev) =>
      prev.includes(colorName)
        ? prev.filter((name) => name !== colorName)
        : [...prev, colorName],
    );
  };

  const related = useMemo(() => {
    if (!product) return [];
    return ALL_ITEMS.filter(
      (p) => p.category === product.category && p.slug !== product.slug,
    ).slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-md mx-auto text-center py-24">
        <p className="text-sm text-secondary/50">
          We couldn't find that product.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-secondary hover:text-tertiary-600 transition-colors"
        >
          <FiArrowLeft size={14} />
          Back to shop
        </Link>
      </div>
    );
  }

  const isOutOfStock = isBundle
    ? bundleColors.every((c) => c.stock === 0)
    : !selectedColor || selectedColor.stock === 0;
  const canAddBundleToCart = !isBundle || selectedColorNames.length > 0;
  const wishlisted = isInWishlist(product.slug);

  const selectedBundleColors = isBundle
    ? bundleColors.filter((c) => selectedColorNames.includes(c.name))
    : null;

  const currentLineId = buildLineId(
    product,
    isBundle ? null : (selectedColor ?? null),
    selectedSize || null,
    selectedBundleColors,
  );
  const currentLineQty =
    items.find((line) => line.id === currentLineId)?.qty ?? 0;

  const handleAddToCart = () => {
    if (isOutOfStock || !canAddBundleToCart) return;

    addToCart({
      product,
      color: isBundle ? null : (selectedColor ?? null),
      colors: selectedBundleColors,
      size: selectedSize || null,
      qty,
    });

    setQty(isBundle ? product?.minUnits || 1 : 1);
    if (isBundle) setSelectedColorNames([]);
  };

  const handleQtyDecrease = () => {
    const floor = isBundle ? product?.minUnits || 1 : 1;
    setQty((v) => Math.max(floor, v - 1));
  };

  return (
    <div className="">
      <Reveal className="mb-6">
        <div className="flex items-center gap-2 text-xs text-secondary/50">
          <Link to="/shop" className="hover:text-secondary transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/shop?category=${product.category}`}
            className="capitalize hover:text-secondary transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-secondary">{product.name}</span>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 md:gap-14 ">
        <Reveal>
          <ProductGallery
            images={product.images || [product.image]}
            alt={product.name}
          />
        </Reveal>

        <Reveal delay={50}>
          <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
            {isBundle ? "Wholesale Bundle" : product.category}
          </p>
          <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
            {product.name}
          </h1>
          <p className="text-xl font-semibold text-secondary mt-2">
            {product.price}
          </p>
          {isBundle && product.minUnits && (
            <p className="text-sm text-secondary/60 mt-1">
              Minimum order: {product.minUnits} units
            </p>
          )}

          <div className="mt-8">
            <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-3">
              {isBundle
                ? `Colors — ${
                    selectedColorNames.length > 0
                      ? `${selectedColorNames.length} selected`
                      : "Select one or more"
                  }`
                : `Color — ${selectedColor?.name || "Select"}`}
              {!isBundle && isOutOfStock && (
                <span className="normal-case tracking-normal text-secondary/40 font-normal">
                  {" "}
                  (out of stock)
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              {(isBundle ? bundleColors : product.colors).map((color) => {
                const isSelected = isBundle
                  ? selectedColorNames.includes(color.name)
                  : selectedColor?.name === color.name;
                const outOfStock = color.stock === 0;
                return (
                  <div
                    key={color.name}
                    className="flex flex-col items-center gap-1"
                  >
                    <button
                      onClick={() =>
                        isBundle
                          ? toggleBundleColor(color.name)
                          : setSelectedColor(color)
                      }
                      disabled={outOfStock}
                      title={
                        outOfStock ? `${color.name} — out of stock` : color.name
                      }
                      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "ring-2 ring-offset-2 ring-secondary ring-offset-primary"
                          : "ring-1 ring-secondary/15"
                      } ${outOfStock ? "opacity-30 cursor-not-allowed" : ""}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && !outOfStock && (
                        <FiCheck
                          size={14}
                          className={
                            color.hex === "#f5f5f0" || color.hex === "#90EE90"
                              ? "text-secondary"
                              : "text-white"
                          }
                        />
                      )}
                      {outOfStock && (
                        <span className="absolute inset-0 rounded-full overflow-hidden">
                          <span className="absolute top-1/2 left-0 w-full h-px bg-secondary/60 -rotate-45" />
                        </span>
                      )}
                    </button>
                    {outOfStock && (
                      <span className="text-[9px] leading-none text-secondary/40 whitespace-nowrap">
                        Sold out
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
                  Size — {selectedSize || "Select"}
                </p>
                {!isBundle && (
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs font-semibold text-secondary underline underline-offset-2 hover:text-tertiary-600 transition-colors"
                  >
                    Size guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      selectedSize === size
                        ? "bg-secondary text-primary"
                        : "bg-secondary/5 text-secondary hover:bg-secondary/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-secondary/15">
              <button
                onClick={handleQtyDecrease}
                className="w-9 h-9 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
              >
                <FiMinus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-secondary">
                {qty}
              </span>
              <button
                onClick={() => setQty((v) => v + 1)}
                className="w-9 h-9 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
              >
                <FiPlus size={14} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || !canAddBundleToCart}
              className={`flex-1 h-11 rounded-full text-sm font-semibold transition-colors ${
                isOutOfStock || !canAddBundleToCart
                  ? "bg-secondary/10 text-secondary/40 cursor-not-allowed"
                  : "bg-secondary text-primary hover:bg-tertiary-800"
              }`}
            >
              {isOutOfStock
                ? "Out of stock"
                : !canAddBundleToCart
                  ? "Select a color"
                  : currentLineQty > 0
                    ? `Add more (${currentLineQty} in cart)`
                    : "Add to cart"}
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center border transition-colors ${
                wishlisted
                  ? "bg-secondary text-primary border-secondary"
                  : "border-secondary/15 text-secondary hover:bg-secondary/5"
              }`}
            >
              <FiHeart size={18} className={wishlisted ? "fill-current" : ""} />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-secondary/10 space-y-3">
            <div className="flex items-center gap-2 text-sm text-secondary/60">
              <FiTruck size={16} className="text-secondary/40" />
              Delivered in 2–4 business days
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary/60">
              <FiShield size={16} className="text-secondary/40" />
              7-day return on unworn items
            </div>
          </div>
        </Reveal>
      </div>

      {isBundle && bundleItems.length > 0 && (
        <Reveal delay={80} className="mt-14">
          <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-4">
            What's included
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {bundleItems.map((item) => (
              <Link
                key={item.slug}
                to={`/shop/${item.slug}`}
                className="group block"
              >
                <RevealImage
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[3/4] rounded-2xl"
                  imgClassName="transition-transform duration-500 group-hover:scale-110"
                />
                <p className="text-sm font-semibold text-secondary mt-3">
                  {item.name}
                </p>
                <p className="text-sm text-secondary/60">{item.price}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal delay={100} className="mt-14">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-4">
          Specs
        </p>
        <div className="grid sm:grid-cols-3 gap-px bg-secondary/10 rounded-2xl overflow-hidden">
          <div className="bg-primary p-5">
            <p className="text-xs text-secondary/50">Fabric</p>
            <p className="text-sm font-semibold text-secondary mt-1">
              {product.fabric}
            </p>
          </div>
          <div className="bg-primary p-5">
            <p className="text-xs text-secondary/50">Size range</p>
            <p className="text-sm font-semibold text-secondary mt-1">
              {product.size}
            </p>
          </div>
          <div className="bg-primary p-5">
            <p className="text-xs text-secondary/50">Category</p>
            <p className="text-sm font-semibold text-secondary mt-1 capitalize">
              {product.category}
            </p>
          </div>
        </div>
      </Reveal>

      {related.length > 0 && (
        <Reveal delay={150} className="mt-14">
          <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-4">
            You may also like
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/shop/${item.slug}`}
                className="group block"
              >
                <RevealImage
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[3/4] rounded-2xl"
                  imgClassName="transition-transform duration-500 group-hover:scale-110"
                />
                <p className="text-sm font-semibold text-secondary mt-3">
                  {item.name}
                </p>
                <p className="text-sm text-secondary/60">{item.price}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

      <SizeGuide
        category={product.category}
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};

export default ProductDetails;
