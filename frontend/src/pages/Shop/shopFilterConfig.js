export const CATEGORIES = [
  { label: "Outerwear", value: "outerwear" },
  { label: "Tops", value: "tops" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Footwear", value: "footwear" },
  { label: "Accessories", value: "accessories" },
  { label: "Watches", value: "watches" },
  { label: "Caps", value: "caps" },
  { label: "Glasses", value: "glasses" },
];

export const SIZES = ["XS", "S", "M", "L", "XL"];

export const PRICE_RANGES = [
  { label: "Under ₦20,000", value: "under-20000", min: 0, max: 20000 },
  { label: "₦20,000 – ₦50,000", value: "20000-50000", min: 20000, max: 50000 },
  {
    label: "₦50,000 – ₦100,000",
    value: "50000-100000",
    min: 50000,
    max: 100000,
  },
  { label: "Over ₦100,000", value: "over-100000", min: 100000, max: Infinity },
];

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export const PRODUCTS_PER_PAGE = 8;

export const parsePrice = (price) =>
  Number(String(price).replace(/[^\d]/g, ""));
