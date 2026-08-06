import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import Reveal from "../Landing/Reveal";
import RevealImage from "../../components/UI/RevealImage";
import RailEmptyState from "../Home/RailEmptyState";
import { PRODUCTS } from "../../mock/clothing";

const buildMockCart = () => [
  {
    product: PRODUCTS[3],
    color: PRODUCTS[3].colors[0],
    size: "M",
    qty: 1,
  },
  {
    product: PRODUCTS[1],
    color: PRODUCTS[1].colors[0],
    size: "L",
    qty: 2,
  },
  {
    product: PRODUCTS[15],
    color: PRODUCTS[15].colors[0],
    size: "M",
    qty: 1,
  },
];

const parsePrice = (price) => Number(price.replace(/[₦,]/g, ""));

const formatNaira = (value) => `₦${value.toLocaleString("en-NG")}`;

const SHIPPING_FLAT = 3500;

const CartLine = ({ line, onQtyChange, onRemove }) => {
  const { product, color, size, qty } = line;
  const lineTotal = parsePrice(product.price) * qty;

  return (
    <div className="flex gap-4 py-5 border-b border-secondary/10">
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
            onClick={() => onRemove(product.slug)}
            aria-label="Remove item"
            className="text-secondary/40 hover:text-secondary transition-colors shrink-0"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <p className="text-xs text-secondary/50 mt-1">
          {color?.name} · Size {size}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center rounded-full border border-secondary/15">
            <button
              onClick={() => onQtyChange(product.slug, Math.max(1, qty - 1))}
              className="w-7 h-7 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center text-xs font-semibold text-secondary">
              {qty}
            </span>
            <button
              onClick={() => onQtyChange(product.slug, qty + 1)}
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
  );
};

const Cart = () => {
  const [items, setItems] = useState(buildMockCart);

  const handleQtyChange = (slug, qty) => {
    setItems((prev) =>
      prev.map((line) =>
        line.product.slug === slug ? { ...line, qty } : line,
      ),
    );
  };

  const handleRemove = (slug) => {
    setItems((prev) => prev.filter((line) => line.product.slug !== slug));
  };

  const subtotal = items.reduce(
    (sum, line) => sum + parsePrice(line.product.price) * line.qty,
    0,
  );
  const shipping = items.length > 0 ? SHIPPING_FLAT : 0;
  const total = subtotal + shipping;

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
            {items.map((line) => (
              <CartLine
                key={line.product.slug}
                line={line}
                onQtyChange={handleQtyChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="rounded-lg border border-secondary/10 p-5 sticky top-6">
            <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-4">
              Order Summary
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary/60">Subtotal</span>
                <span className="text-secondary">{formatNaira(subtotal)}</span>
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

            <Link
              to="/checkout"
              className="block text-center h-11 leading-[44px] rounded-full text-sm font-semibold bg-secondary text-primary hover:bg-tertiary-800 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
