import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { getItem, setItem } from "../utils/localStorage";
import { useToast } from "./ToastContext";

const CartContext = createContext(undefined);

const CART_STORAGE_KEY = "cart";
const SELECTED_STORAGE_KEY = "cartSelectedIds";

export const buildLineId = (product, color, size) =>
  [product.slug, color?.name ?? "no-color", size ?? "no-size"].join("::");

const parsePrice = (price) => Number(price.replace(/[₦,]/g, ""));

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => getItem(CART_STORAGE_KEY, []));
  const [selectedIds, setSelectedIds] = useState(() => {
    const saved = getItem(SELECTED_STORAGE_KEY, null);
    if (saved) return new Set(saved);
    const initialItems = getItem(CART_STORAGE_KEY, []);
    return new Set(initialItems.map((line) => line.id));
  });
  const { showToast } = useToast();

  const knownItemIdsRef = useRef(new Set(items.map((line) => line.id)));

  useEffect(() => {
    setItem(CART_STORAGE_KEY, items);
  }, [items]);

  useEffect(() => {
    setItem(SELECTED_STORAGE_KEY, [...selectedIds]);
  }, [selectedIds]);

  useEffect(() => {
    const currentIds = new Set(items.map((line) => line.id));
    const knownIds = knownItemIdsRef.current;

    setSelectedIds((prev) => {
      const next = new Set([...prev].filter((id) => currentIds.has(id)));

      items.forEach((line) => {
        if (!knownIds.has(line.id)) {
          next.add(line.id);
        }
      });

      if (next.size === prev.size && [...next].every((id) => prev.has(id))) {
        return prev;
      }
      return next;
    });

    knownItemIdsRef.current = currentIds;
  }, [items]);

  const addToCart = ({ product, color = null, size = null, qty = 1 }) => {
    const lineId = buildLineId(product, color, size);

    setItems((prev) => {
      const existing = prev.find((line) => line.id === lineId);

      if (existing) {
        return prev.map((line) =>
          line.id === lineId ? { ...line, qty: line.qty + qty } : line,
        );
      }

      return [...prev, { id: lineId, product, color, size, qty }];
    });

    showToast(`${product.name} added to cart`, { type: "success" });
  };

  const removeFromCart = (lineId) => {
    const line = items.find((l) => l.id === lineId);

    setItems((prev) => prev.filter((l) => l.id !== lineId));

    if (line) {
      showToast(`${line.product.name} removed from cart`, { type: "info" });
    }
  };

  const removeItems = (lineIds) => {
    const idSet = new Set(lineIds);
    const removedCount = items.filter((l) => idSet.has(l.id)).length;

    if (removedCount === 0) return;

    setItems((prev) => prev.filter((l) => !idSet.has(l.id)));

    showToast(
      `${removedCount} item${removedCount > 1 ? "s" : ""} removed from cart`,
      { type: "info" },
    );
  };

  const updateQty = (lineId, qty) => {
    if (qty <= 0) {
      removeFromCart(lineId);
      return;
    }

    setItems((prev) =>
      prev.map((line) => (line.id === lineId ? { ...line, qty } : line)),
    );
  };

  const clearCart = () => setItems([]);

  const toggleSelect = (lineId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(lineId)) {
        next.delete(lineId);
      } else {
        next.add(lineId);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const currentlyAllSelected =
        items.length > 0 && items.every((line) => prev.has(line.id));

      return currentlyAllSelected
        ? new Set()
        : new Set(items.map((line) => line.id));
    });
  };

  const removeSelected = () => {
    if (selectedIds.size === 0) return;
    removeItems([...selectedIds]);
    setSelectedIds(new Set());
  };

  const itemCount = items.reduce((sum, line) => sum + line.qty, 0);

  const subtotal = items.reduce(
    (sum, line) => sum + parsePrice(line.product.price) * line.qty,
    0,
  );

  const selectedLines = items.filter((line) => selectedIds.has(line.id));

  const selectedSubtotal = selectedLines.reduce(
    (sum, line) => sum + parsePrice(line.product.price) * line.qty,
    0,
  );

  const selectedItemCount = selectedLines.reduce(
    (sum, line) => sum + line.qty,
    0,
  );

  const allSelected =
    items.length > 0 && items.every((line) => selectedIds.has(line.id));

  const value = {
    items,
    addToCart,
    removeFromCart,
    removeItems,
    updateQty,
    clearCart,
    itemCount,
    subtotal,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    removeSelected,
    selectedLines,
    selectedSubtotal,
    selectedItemCount,
    allSelected,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
