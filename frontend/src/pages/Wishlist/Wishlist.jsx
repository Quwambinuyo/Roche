import React, { useState } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import Reveal from "../Landing/Reveal";
import RevealImage from "../../components/UI/RevealImage";
import RailEmptyState from "../Home/RailEmptyState";
import { PRODUCTS } from "../../mock/clothing";

const MOCK_WISHLIST = PRODUCTS.slice(0, 4);

const WishlistCard = ({ product, onRemove, onAddToCart }) => {
  const hasColors = product.colors && product.colors.length > 0;
  const totalStock = hasColors
    ? product.colors.reduce((sum, c) => sum + c.stock, 0)
    : (product.stock ?? 1);
  const isOutOfStock = totalStock <= 0;

  return (
    <div className="group relative">
      <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-secondary/5">
        <RevealImage
          src={product.image}
          alt={product.name}
          className={`w-full h-full transition-opacity duration-300 ${
            isOutOfStock ? "opacity-60" : ""
          }`}
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />

        {isOutOfStock && (
          <span className="absolute top-3 left-3 bg-secondary text-primary text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
            Out of Stock
          </span>
        )}

        <button
          onClick={() => onRemove(product)}
          aria-label="Remove from wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-secondary/60 hover:text-secondary hover:bg-primary transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <div className="h-px w-10 bg-secondary mt-3" />

      <p className="text-sm font-medium text-secondary mt-3">{product.name}</p>

      <div className="flex items-center justify-between mt-1">
        <span className="text-sm text-secondary/70">
          {isOutOfStock ? "Out of Stock" : product.price}
        </span>

        {!isOutOfStock && (
          <button
            onClick={() => onAddToCart(product)}
            aria-label="Add to cart"
            className="flex items-center gap-1.5 text-xs font-semibold text-secondary/70 hover:text-secondary transition-colors duration-200"
          >
            <ShoppingBag size={13} />
            Add
          </button>
        )}
      </div>
    </div>
  );
};

const Wishlist = () => {
  const [items, setItems] = useState(MOCK_WISHLIST);

  const handleRemove = (product) => {
    setItems((prev) => prev.filter((p) => p.name !== product.name));
  };

  const handleAddToCart = (product) => {
    console.log("add to cart", product);
  };

  return (
    <div className="">
      <Reveal className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Saved
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          Your Wishlist
        </h1>
        {items.length > 0 && (
          <p className="text-sm text-secondary/50 mt-2">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        )}
      </Reveal>

      {items.length === 0 ? (
        <RailEmptyState
          message="Nothing saved yet. Tap the heart on any product to add it here."
          ctaLabel="Discover Products"
          ctaHref="/shop"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {items.map((product) => (
            <WishlistCard
              key={product.name}
              product={product}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
