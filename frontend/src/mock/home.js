import { PRODUCTS } from "./clothing";

export const USER = {
  name: "Quwam",
  ordersCount: 12,
  rewardPoints: 640,
  rewardTier: "Gold",
};

export const ORDERS_SUMMARY = {
  pendingCount: 2,
  completedCount: 10,
};

export const WISHLIST = PRODUCTS.slice(0, 4);
export const RECENTLY_VIEWED = PRODUCTS.slice(0, 6);
export const FOR_YOU = PRODUCTS.slice(2, 8).length
  ? PRODUCTS.slice(2, 8)
  : PRODUCTS;
export const NEW_ARRIVALS = PRODUCTS.slice(0, 6);

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Ada O.",
    rating: 5,
    quote:
      "Delivery was faster than I expected and the quality matched the photos exactly. Already reordering.",
  },
  {
    id: "t2",
    name: "Tunde A.",
    rating: 5,
    quote:
      "Customer support sorted a sizing issue in minutes. Genuinely one of the smoothest checkout experiences I've had.",
  },
  {
    id: "t3",
    name: "Ngozi E.",
    rating: 4,
    quote:
      "Great range of styles and the wishlist feature makes it easy to plan purchases around payday.",
  },
  {
    id: "t4",
    name: "Emeka N.",
    rating: 5,
    quote:
      "Packaging was solid, tracking was accurate down to the hour, and the discount code actually worked.",
  },
];
