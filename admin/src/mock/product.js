import overshirt from "../assets/shop/overshirt.jfif";
import overshirt1 from "../assets/shop/overshirt1.jfif";
import ribbedtee from "../assets/shop/ribbedtee.jfif";
import tops from "../assets/shop/tops.jfif";
import bottom from "../assets/shop/bottom.jfif";
import topbottomshop from "../assets/shop/topbottomshop.jfif";
import jacket from "../assets/shop/jacket.jfif";
import jacketshop from "../assets/shop/jacketshop.jfif";
import capshop from "../assets/shop/capshop.jfif";
import capshop1 from "../assets/shop/capshop1.jfif";
import fullkitshop from "../assets/shop/fullkitshop.jfif";
import wearshop from "../assets/shop/wearshop.jfif";
import accessory from "../assets/shop/accessory.jfif";
import watch from "../assets/shop/watch.jfif";
import footwear from "../assets/shop/footwear.jfif";
import glasses from "../assets/shop/glasses.jfif";

export const CATEGORIES = [
  { name: "Outerwear", slug: "outerwear", count: 18, image: jacket },
  { name: "Tops", slug: "tops", count: 32, image: tops },
  { name: "Bottoms", slug: "bottoms", count: 21, image: bottom },
  { name: "Accessories", slug: "accessories", count: 14, image: accessory },
  { name: "Watches", slug: "watches", count: 9, image: watch },
  { name: "Foot wear", slug: "footwear", count: 26, image: footwear },
  { name: "Caps", slug: "caps", count: 17, image: capshop },
  { name: "Glasses", slug: "glasses", count: 12, image: glasses },
  { name: "Bundles", slug: "bundles", count: 4, image: fullkitshop },
];

export const FABRIC_WORDS = [
  "COTTON TWILL",
  "HEAVY COTTON",
  "RIPSTOP CANVAS",
  "WAXED CANVAS",
  "MIXED",
];

export const PRODUCTS = [
  {
    slug: "ZF-overshirt",
    name: "ZF Overshirt",
    price: "₦48,500",
    discount: 10,
    fabric: "COTTON TWILL",
    size: "S — XL",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 6 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 3 },
    ],
    category: "outerwear",
    image: overshirt,
    images: [overshirt, overshirt1],
    colors: [
      { name: "Olive", hex: "#4a4f36", stock: 12 },
      { name: "Black", hex: "#0a0a0a", stock: 0 },
      { name: "Sand", hex: "#c8b89e", stock: 5 },
    ],
    status: "active",
    createdAt: "2026-01-12",
  },
  {
    slug: "ribbed-tee",
    name: "Ribbed Tee",
    price: "₦18,500",
    discount: 0,
    fabric: "HEAVY COTTON",
    size: "S — XL",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 12 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 },
    ],
    category: "tops",
    image: ribbedtee,
    images: [ribbedtee, tops],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 20 },
      { name: "White", hex: "#f5f5f0", stock: 14 },
    ],
    status: "active",
    createdAt: "2026-02-03",
  },
  {
    slug: "utility-cargo",
    name: "Utility Cargo",
    price: "₦52,000",
    discount: 15,
    fabric: "RIPSTOP CANVAS",
    size: "28 — 36",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
    category: "bottoms",
    image: bottom,
    images: [bottom, topbottomshop],
    colors: [
      { name: "Khaki", hex: "#a89a72", stock: 0 },
      { name: "Black", hex: "#0a0a0a", stock: 0 },
    ],
    status: "out-of-stock",
    createdAt: "2026-01-28",
  },
  {
    slug: "waxed-ZF-jacket",
    name: "Waxed ZF Jacket",
    price: "₦74,000",
    discount: 0,
    fabric: "WAXED CANVAS",
    size: "S — XXL",
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 7 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 },
    ],
    category: "outerwear",
    image: jacket,
    images: [jacket, jacketshop],
    colors: [
      { name: "Rust", hex: "#8a3b23", stock: 6 },
      { name: "Forest", hex: "#2e3b2c", stock: 3 },
      { name: "Black", hex: "#0a0a0a", stock: 9 },
    ],
    status: "active",
    createdAt: "2026-03-10",
  },
  {
    slug: "ZF-field-cap",
    name: "ZF Field Cap",
    price: "₦14,000",
    discount: 0,
    fabric: "COTTON TWILL",
    size: "One Size",
    sizes: [{ size: "M", stock: 22 }],
    category: "caps",
    image: capshop,
    images: [capshop, capshop1],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 22 },
      { name: "Olive", hex: "#4a4f36", stock: 9 },
    ],
    status: "active",
    createdAt: "2026-04-02",
  },
];

export const BUNDLES = [
  {
    slug: "starter-wholesale-kit",
    name: "Starter Wholesale Kit",
    price: "₦420,000",
    discount: 25,
    fabric: "MIXED",
    size: "Assorted",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 12 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 },
    ],
    category: "bundles",
    minUnits: 10,
    items: ["ribbed-tee", "utility-cargo", "ZF-field-cap"],
    image: fullkitshop,
    images: [fullkitshop, wearshop],
    status: "active",
    createdAt: "2026-01-20",
  },
];

export const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const getBundleBySlug = (slug) => BUNDLES.find((b) => b.slug === slug);

export const getCategoryBySlug = (slug) =>
  CATEGORIES.find((c) => c.slug === slug);

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
