import { PRODUCTS } from "./clothing";

export const USER = {
  name: "Quwam",
};

export const ACTIVE_ORDER = {
  id: "RC-48213",
  status: "Out for delivery",
  eta: "Arrives today",
  step: 3,
  steps: ["Placed", "Packed", "Shipped", "Out for delivery", "Delivered"],
};

export const WISHLIST = PRODUCTS.slice(0, 4);
export const RECENTLY_VIEWED = PRODUCTS.slice(0, 6);
export const FOR_YOU = PRODUCTS.slice(2, 8).length
  ? PRODUCTS.slice(2, 8)
  : PRODUCTS;
export const NEW_ARRIVALS = PRODUCTS.slice(0, 6);
