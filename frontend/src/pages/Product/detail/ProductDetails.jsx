import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Reveal from "../../Landing/Reveal";
import ProductGallery from "../ProductGallery";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductColorSelector from "./ProductColorSelector";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductActions from "./ProductActions";
import ProductInfoBadges from "./ProductInfoBadges";
import ProductSpecs from "./ProductSpecs";
import ProductItemGrid from "./ProductItemGrid";
import SizeGuide from "../../Shop/SizeGuide";
import PageMeta from "../../../layouts/PageMeta";
import {
  PRODUCTS,
  BUNDLES,
  getProductBySlug,
  getBundleBySlug,
} from "../../../mock/clothing";
import { useCart, buildLineId } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const ALL_ITEMS = [...PRODUCTS, ...BUNDLES];

const ProductDetails = ({ slugOverride, immediate = false }) => {
  const { slug: paramSlug } = useParams();
  const slug = slugOverride || paramSlug;
  const product = getProductBySlug(slug) || getBundleBySlug(slug);
  const isBundle = Boolean(product && !getProductBySlug(slug));
  const { items, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(
    () => product?.colors?.find((c) => c.stock > 0) || product?.colors?.[0],
  );
  const [selectedColorNames, setSelectedColorNames] = useState([]);
  const [selectedSize, setSelectedSize] = useState(
    () =>
      product?.sizes?.find((s) => s.stock > 0) ?? product?.sizes?.[0] ?? null,
  );
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
      <>
        <PageMeta overrideTitle="Product Not Found" />
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
      </>
    );
  }

  const hasSizes = !isBundle && product.sizes?.length > 0;
  const isSizeOutOfStock =
    hasSizes && (!selectedSize || selectedSize.stock === 0);

  const isOutOfStock = isBundle
    ? bundleColors.every((c) => c.stock === 0)
    : !selectedColor || selectedColor.stock === 0 || isSizeOutOfStock;
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
    <div className="w-full">
      <PageMeta
        overrideTitle={product.name}
        overrideDescription={
          isBundle
            ? `${product.name} — wholesale bundle, ${product.price}. Minimum order ${product.minUnits} units.`
            : `${product.name} — ${product.fabric}, ${product.price}`
        }
        overrideImage={product.image}
      />

      <Reveal className="mb-6">
        <ProductBreadcrumb product={product} />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 md:items-stretch w-full">
        <div className="w-full">
          <div className="md:sticky no-scrollbar md:top-24 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto md:no-scrollbar md:pb-2">
            <ProductGallery
              images={product.images || [product.image]}
              alt={product.name}
            />
          </div>
        </div>

        <Reveal delay={50} className="w-full space-y-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
              {isBundle ? "Wholesale Bundle" : product.category}
            </p>
            <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-1">
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
          </div>

          <ProductColorSelector
            isBundle={isBundle}
            colors={isBundle ? bundleColors : product.colors}
            selectedColor={selectedColor}
            selectedColorNames={selectedColorNames}
            onSelectColor={setSelectedColor}
            onToggleBundleColor={toggleBundleColor}
            isOutOfStock={isOutOfStock}
          />

          {hasSizes && (
            <ProductSizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              isBundle={isBundle}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            />
          )}

          <ProductActions
            qty={qty}
            onDecrease={handleQtyDecrease}
            onIncrease={() => setQty((v) => v + 1)}
            onAddToCart={handleAddToCart}
            isOutOfStock={isOutOfStock}
            canAddBundleToCart={canAddBundleToCart}
            currentLineQty={currentLineQty}
            wishlisted={wishlisted}
            onToggleWishlist={() => toggleWishlist(product)}
          />

          <ProductInfoBadges />
        </Reveal>
      </div>

      {isBundle && bundleItems.length > 0 && (
        <Reveal delay={80} className="mt-14">
          <ProductItemGrid title="What's included" items={bundleItems} />
        </Reveal>
      )}

      <Reveal delay={100} className="mt-14">
        <ProductSpecs product={product} />
      </Reveal>

      {related.length > 0 && (
        <Reveal delay={150} className="mt-14">
          <ProductItemGrid title="You may also like" items={related} />
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
