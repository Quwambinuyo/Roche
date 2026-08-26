import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import Reveal from "../Landing/Reveal";
import RevealImage from "../../components/UI/RevealImage";
import RailEmptyState from "../Home/RailEmptyState";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const WishlistCard = ({ product, onRemove, onAddToCart }) => {
  const hasColors = product.colors && product.colors.length > 0;
  const totalStock = hasColors
    ? product.colors.reduce((sum, c) => sum + c.stock, 0)
    : (product.stock ?? 1);
  const isOutOfStock = totalStock <= 0;

  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(product);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Link to={`/shop/${product.slug}`} className="group relative block">
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
          onClick={handleRemoveClick}
          aria-label="Remove from wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center text-secondary/60 hover:text-secondary hover:bg-primary transition-colors duration-200"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <div className="h-px w-10 bg-secondary mt-3" />

      <p className="text-sm font-medium text-secondary mt-3">{product.name}</p>

      <div className="flex items-center justify-between mt-1">
        <span className="text-sm text-secondary/70 quicksand">
          {isOutOfStock ? "Out of Stock" : product.price}
        </span>

        {!isOutOfStock && (
          <button
            onClick={handleAddClick}
            aria-label="Add to cart"
            className="flex items-center gap-1.5 text-xs font-semibold text-secondary/70 hover:text-secondary transition-colors duration-200"
          >
            <ShoppingCart size={13} />
            Add
          </button>
        )}
      </div>
    </Link>
  );
};

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const products = items.map((line) => line.product);

  const handleRemove = (product) => {
    removeFromWishlist(product);
  };

  const handleAddToCart = (product) => {
    const color = product.colors?.find((c) => c.stock > 0) || null;
    addToCart({ product, color });
    removeFromWishlist(product);
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
        {products.length > 0 && (
          <p className="text-sm text-secondary/50 mt-2">
            {products.length} {products.length === 1 ? "item" : "items"} saved
          </p>
        )}
      </Reveal>

      {products.length === 0 ? (
        <RailEmptyState
          message="Nothing saved yet. Tap the heart on any product to add it here."
          ctaLabel="Discover Products"
          ctaHref="/shop"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products.map((product) => (
            <WishlistCard
              key={product.slug}
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
