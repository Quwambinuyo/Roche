import React, { createContext, useContext, useEffect, useState } from "react";

import { getItem, setItem } from "../utils/localStorage";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(undefined);

const WISHLIST_STORAGE_KEY = "wishlist";

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => getItem(WISHLIST_STORAGE_KEY, []));
  const { showToast } = useToast();

  useEffect(() => {
    setItem(WISHLIST_STORAGE_KEY, items);
  }, [items]);

  const isInWishlist = (slug) => items.some((line) => line.id === slug);

  const addToWishlist = (product) => {
    setItems((prev) => {
      if (prev.some((line) => line.id === product.slug)) return prev;
      return [...prev, { id: product.slug, product }];
    });

    showToast(`${product.name} added to wishlist`, { type: "success" });
  };

  const removeFromWishlist = (product) => {
    setItems((prev) => prev.filter((line) => line.id !== product.slug));

    showToast(`${product.name} removed from wishlist`, { type: "info" });
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => setItems([]);

  const itemCount = items.length;

  const value = {
    items,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    itemCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export default WishlistContext;
