import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Reveal from "../Landing/Reveal";
import RevealImage from "../../components/UI/RevealImage";
import { PRODUCTS, getProductBySlug } from "../../mock/clothing";
import { useCart, buildLineId } from "../../context/CartContext";

const ProductDetails = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { items, addToCart, updateQty } = useCart();

  const [selectedColor, setSelectedColor] = useState(
    () => product?.colors?.find((c) => c.stock > 0) || product?.colors?.[0],
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [qty, setQty] = useState(1);

  const related = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
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
          <ArrowLeft size={14} />
          Back to shop
        </Link>
      </div>
    );
  }

  const isOutOfStock = !selectedColor || selectedColor.stock === 0;

  const currentLineId = buildLineId(
    product,
    selectedColor ?? null,
    selectedSize || null,
  );
  const currentLineQty =
    items.find((line) => line.id === currentLineId)?.qty ?? 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart({
      product,
      color: selectedColor ?? null,
      size: selectedSize || null,
      qty,
    });

    setQty(1);
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

      <div className="grid md:grid-cols-2 gap-10 md:gap-14">
        <Reveal>
          <RevealImage
            src={product.image}
            alt={product.name}
            className="w-full aspect-square rounded-2xl"
            imgClassName="object-cover"
          />
        </Reveal>

        <Reveal delay={50}>
          <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
            {product.category}
          </p>
          <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
            {product.name}
          </h1>
          <p className="text-xl font-semibold text-secondary mt-2">
            {product.price}
          </p>

          <div className="mt-8">
            <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-3">
              Color — {selectedColor?.name || "Select"}
            </p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor?.name === color.name;
                const outOfStock = color.stock === 0;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
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
                      <Check
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
                );
              })}
            </div>
          </div>

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-3">
                Size — {selectedSize || "Select"}
              </p>
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
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="w-9 h-9 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-secondary">
                {qty}
              </span>
              <button
                onClick={() => setQty((v) => v + 1)}
                className="w-9 h-9 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 h-11 rounded-full text-sm font-semibold transition-colors ${
                isOutOfStock
                  ? "bg-secondary/10 text-secondary/40 cursor-not-allowed"
                  : "bg-secondary text-primary hover:bg-tertiary-800"
              }`}
            >
              {isOutOfStock
                ? "Out of stock"
                : currentLineQty > 0
                  ? `Add more (${currentLineQty} in cart)`
                  : "Add to cart"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-secondary/10 space-y-3">
            <div className="flex items-center gap-2 text-sm text-secondary/60">
              <Truck size={16} className="text-secondary/40" />
              Delivered in 2–4 business days
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary/60">
              <ShieldCheck size={16} className="text-secondary/40" />
              7-day return on unworn items
            </div>
          </div>
        </Reveal>
      </div>

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
    </div>
  );
};

export default ProductDetails;
