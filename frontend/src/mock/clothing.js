import outwear from "../assets/images/landing/outwear.jfif";
import tops from "../assets/images/landing/tops.jfif";
import bottoms from "../assets/images/landing/bottom.jfif";
import accessories from "../assets/images/landing/accessory.jfif";
import watches from "../assets/images/landing/watch.jfif";
import footwear from "../assets/images/landing/footwear.jfif";
import caps from "../assets/images/landing/cap.jfif";
import glasses from "../assets/images/landing/glasses.jfif";
import overshirt from "../assets/images/landing/overshirt.jfif";
import overshirt1 from "../assets/images/landing/overshirt1.jfif";
import ribbedTee from "../assets/images/landing/ribbedtee.jfif";
import jacket from "../assets/images/landing/jacket.jfif";
import capshop from "../assets/images/shop/capshop.jfif";
import capshop1 from "../assets/images/shop/capshop1.jfif";
import capshop2 from "../assets/images/shop/capshop2.jfif";
import capshop3 from "../assets/images/shop/capshop3.jfif";
import fullkitshop from "../assets/images/shop/fullkitshop.jfif";
import glassesshop from "../assets/images/shop/glassesshop.jfif";
import glassesshop1 from "../assets/images/shop/glassesshop1.jfif";
import jacketshop from "../assets/images/shop/jacketshop.jfif";
import shoeshop from "../assets/images/shop/shoeshop.jfif";
import topbottomshop from "../assets/images/shop/topbottomshop.jfif";
import watchshop from "../assets/images/shop/watchshop.jfif";
import watchshop1 from "../assets/images/shop/watchshop1.jfif";
import wearshop from "../assets/images/shop/wearshop.jfif";
import accessoryshop from "../assets/images/shop/accessoryshop.jfif";
import accessoryshop1 from "../assets/images/shop/accessoryshop1.jfif";
import accessoryshop2 from "../assets/images/shop/accessoryshop2.jfif";

export const NAV_LINKS = [
  { label: "New Arrivals", id: "new-arrivals" },
  { label: "Collections", id: "collections" },
  { label: "Fabric", id: "fabric" },
  { label: "Journal", id: "journal" },
];

export const CATEGORIES = [
  { name: "Outerwear", slug: "outerwear", count: 18, image: outwear },
  { name: "Tops", slug: "tops", count: 32, image: tops },
  { name: "Bottoms", slug: "bottoms", count: 21, image: bottoms },
  { name: "Accessories", slug: "accessories", count: 14, image: accessories },
  { name: "Watches", slug: "watches", count: 9, image: watches },
  { name: "Foot wear", slug: "footwear", count: 26, image: footwear },
  { name: "Caps", slug: "caps", count: 17, image: caps },
  { name: "Glasses", slug: "glasses", count: 12, image: glasses },
  { name: "Bundles", slug: "bundles", count: 4, image: fullkitshop },
];

export const PRODUCTS = [
  {
    slug: "roche-overshirt",
    name: "Roche Overshirt",
    price: "₦48,500",
    discount: 10,
    fabric: "COTTON TWILL",
    size: "S — XL",
    sizes: ["S", "M", "L", "XL"],
    category: "outerwear",
    image: overshirt,
    images: [overshirt, overshirt1],
    colors: [
      { name: "Olive", hex: "#4a4f36", stock: 12 },
      { name: "Black", hex: "#0a0a0a", stock: 0 },
      { name: "Sand", hex: "#c8b89e", stock: 5 },
    ],
  },
  {
    slug: "ribbed-tee",
    name: "Ribbed Tee",
    price: "₦18,500",
    discount: 0,
    fabric: "HEAVY COTTON",
    size: "S — XL",
    sizes: ["S", "M", "L", "XL"],
    category: "tops",
    image: ribbedTee,
    images: [ribbedTee, tops],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 20 },
      { name: "White", hex: "#f5f5f0", stock: 14 },
    ],
  },
  {
    slug: "utility-cargo",
    name: "Utility Cargo",
    price: "₦52,000",
    discount: 15,
    fabric: "RIPSTOP CANVAS",
    size: "28 — 36",
    sizes: ["S", "M", "L", "XL"],
    category: "bottoms",
    image: overshirt1,
    images: [overshirt1, bottoms],
    colors: [
      { name: "Khaki", hex: "#a89a72", stock: 0 },
      { name: "Black", hex: "#0a0a0a", stock: 0 },
    ],
  },
  {
    slug: "waxed-roche-jacket",
    name: "Waxed Roche Jacket",
    price: "₦74,000",
    discount: 0,
    fabric: "WAXED CANVAS",
    size: "S — XXL",
    sizes: ["S", "M", "L", "XL"],
    category: "outerwear",
    image: jacket,
    images: [jacket, jacketshop],
    colors: [
      { name: "Rust", hex: "#8a3b23", stock: 6 },
      { name: "Forest", hex: "#2e3b2c", stock: 3 },
      { name: "Black", hex: "#0a0a0a", stock: 9 },
    ],
  },
  {
    slug: "heavyweight-ribbed-tee",
    name: "Heavyweight Ribbed Tee",
    price: "₦18,500",
    discount: 5,
    fabric: "HEAVY COTTON",
    size: "S — XL",
    sizes: ["XS", "S", "M", "L"],
    category: "tops",
    image: ribbedTee,
    images: [ribbedTee, tops],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 20 },
      { name: "White", hex: "#f5f5f0", stock: 14 },
    ],
  },
  {
    slug: "roche-field-cap",
    name: "Roche Field Cap",
    price: "₦14,000",
    discount: 0,
    fabric: "COTTON TWILL",
    size: "One Size",
    sizes: ["M"],
    category: "caps",
    image: capshop,
    images: [capshop, capshop1],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 22 },
      { name: "Olive", hex: "#4a4f36", stock: 9 },
    ],
  },
  {
    slug: "waxed-trail-cap",
    name: "Waxed Trail Cap",
    price: "₦15,500",
    discount: 12,
    fabric: "WAXED CANVAS",
    size: "One Size",
    sizes: ["M"],
    category: "caps",
    image: capshop1,
    images: [capshop1, capshop2],
    colors: [{ name: "Rust", hex: "#8a3b23", stock: 7 }],
  },
  {
    slug: "ribbed-beanie",
    name: "Ribbed Beanie",
    price: "₦12,000",
    discount: 0,
    fabric: "HEAVY JERSEY",
    size: "One Size",
    sizes: ["M"],
    category: "caps",
    image: capshop2,
    images: [capshop2, capshop3],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 15 },
      { name: "Sand", hex: "#c8b89e", stock: 0 },
    ],
  },
  {
    slug: "utility-bucket-hat",
    name: "Utility Bucket Hat",
    price: "₦13,500",
    discount: 8,
    fabric: "RIPSTOP CANVAS",
    size: "One Size",
    sizes: ["M"],
    category: "caps",
    image: capshop3,
    images: [capshop3, caps],
    colors: [{ name: "Khaki", hex: "#a89a72", stock: 11 }],
  },
  {
    slug: "the-full-kit-bundle",
    name: "The Full Kit Bundle",
    price: "₦128,000",
    discount: 20,
    fabric: "MIXED",
    size: "S — XL",
    sizes: ["S", "M", "L", "XL"],
    category: "outerwear",
    image: fullkitshop,
    images: [fullkitshop, outwear],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 4 },
      { name: "Olive", hex: "#4a4f36", stock: 2 },
    ],
  },
  {
    slug: "roche-aviators",
    name: "Roche Aviators",
    price: "₦22,000",
    discount: 0,
    fabric: "ACETATE",
    size: "One Size",
    sizes: ["M"],
    category: "glasses",
    image: glassesshop,
    images: [glassesshop, glassesshop1],
    colors: [{ name: "Black", hex: "#0a0a0a", stock: 18 }],
  },
  {
    slug: "studio-round-frames",
    name: "Studio Round Frames",
    price: "₦24,500",
    discount: 10,
    fabric: "ACETATE",
    size: "One Size",
    sizes: ["M"],
    category: "glasses",
    image: glassesshop1,
    images: [glassesshop1, glasses],
    colors: [
      { name: "Tortoise", hex: "#6b4a2c", stock: 6 },
      { name: "Black", hex: "#0a0a0a", stock: 10 },
    ],
  },
  {
    slug: "waxed-field-jacket",
    name: "Waxed Field Jacket",
    price: "₦81,000",
    discount: 0,
    fabric: "WAXED CANVAS",
    size: "S — XXL",
    sizes: ["S", "M", "L", "XL"],
    category: "outerwear",
    image: jacketshop,
    images: [jacketshop, jacket],
    colors: [
      { name: "Forest", hex: "#2e3b2c", stock: 5 },
      { name: "Black", hex: "#0a0a0a", stock: 3 },
    ],
  },
  {
    slug: "loading-dock-boot",
    name: "Loading Dock Boot",
    price: "₦63,500",
    discount: 18,
    fabric: "FULL GRAIN LEATHER",
    size: "40 — 45",
    sizes: ["M", "L", "XL"],
    category: "footwear",
    image: shoeshop,
    images: [shoeshop, footwear],
    colors: [{ name: "Black", hex: "#0a0a0a", stock: 8 }],
  },
  {
    slug: "rooftop-set",
    name: "Rooftop Set",
    price: "₦59,000",
    discount: 0,
    fabric: "COTTON TWILL",
    size: "S — XL",
    sizes: ["S", "M", "L", "XL"],
    category: "tops",
    image: topbottomshop,
    images: [topbottomshop, tops],
    colors: [
      { name: "Sand", hex: "#c8b89e", stock: 9 },
      { name: "Olive", hex: "#4a4f36", stock: 6 },
    ],
  },
  {
    slug: "dockside-field-watch",
    name: "Dockside Field Watch",
    price: "₦96,000",
    discount: 0,
    fabric: "STAINLESS STEEL",
    size: "One Size",
    sizes: ["M"],
    category: "watches",
    image: watchshop,
    images: [watchshop, watchshop1],
    colors: [{ name: "Steel", hex: "#7a7f85", stock: 5 }],
  },
  {
    slug: "roche-chrono",
    name: "Roche Chrono",
    price: "₦112,000",
    discount: 7,
    fabric: "STAINLESS STEEL",
    size: "One Size",
    sizes: ["M"],
    category: "watches",
    image: watchshop1,
    images: [watchshop1, watches],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 3 },
      { name: "Steel", hex: "#7a7f85", stock: 0 },
    ],
  },
  {
    slug: "waterfront-windbreaker",
    name: "Waterfront Windbreaker",
    price: "₦45,000",
    discount: 0,
    fabric: "RIPSTOP",
    size: "S — XXL",
    sizes: ["S", "M", "L", "XL"],
    category: "outerwear",
    image: wearshop,
    images: [wearshop, outwear],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 12 },
      { name: "Rust", hex: "#8a3b23", stock: 7 },
    ],
  },
  {
    slug: "canvas-tote",
    name: "Canvas Tote",
    price: "₦16,500",
    discount: 0,
    fabric: "CANVAS",
    size: "One Size",
    sizes: ["M"],
    category: "accessories",
    image: accessoryshop,
    images: [accessoryshop, accessoryshop1],
    colors: [{ name: "Sand", hex: "#c8b89e", stock: 20 }],
  },
  {
    slug: "waxed-belt",
    name: "Waxed Belt",
    price: "₦11,000",
    discount: 10,
    fabric: "WAXED LEATHER",
    size: "One Size",
    sizes: ["S", "M", "L"],
    category: "accessories",
    image: accessoryshop1,
    images: [accessoryshop1, accessoryshop2],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 25 },
      { name: "Brown", hex: "#5a4634", stock: 14 },
    ],
  },
  {
    slug: "ring",
    name: "Ring",
    price: "₦11,000",
    discount: 0,
    fabric: "WAXED LEATHER",
    size: "One Size",
    sizes: ["S", "M", "L"],
    category: "accessories",
    image: accessoryshop2,
    images: [accessoryshop2, accessories],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 25 },
      { name: "Green", hex: "#90EE90", stock: 14 },
    ],
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
    sizes: ["S", "M", "L", "XL"],
    category: "bundles",
    minUnits: 10,
    items: ["ribbed-tee", "utility-cargo", "roche-field-cap"],
    image: fullkitshop,
    images: [fullkitshop, wearshop],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 42 },
      { name: "White", hex: "#f5f5f0", stock: 14 },
      { name: "Khaki", hex: "#a89a72", stock: 0 },
      { name: "Olive", hex: "#4a4f36", stock: 9 },
    ],
  },
  {
    slug: "outerwear-wholesale-crate",
    name: "Outerwear Wholesale Crate",
    price: "₦960,000",
    discount: 30,
    fabric: "MIXED",
    size: "Assorted",
    sizes: ["S", "M", "L", "XL"],
    category: "bundles",
    minUnits: 20,
    items: ["roche-overshirt", "waxed-roche-jacket", "waterfront-windbreaker"],
    image: jacketshop,
    images: [jacketshop, outwear],
    colors: [
      { name: "Olive", hex: "#4a4f36", stock: 12 },
      { name: "Black", hex: "#0a0a0a", stock: 21 },
      { name: "Sand", hex: "#c8b89e", stock: 5 },
      { name: "Rust", hex: "#8a3b23", stock: 13 },
      { name: "Forest", hex: "#2e3b2c", stock: 3 },
    ],
  },
  {
    slug: "accessories-wholesale-box",
    name: "Accessories Wholesale Box",
    price: "₦310,000",
    discount: 20,
    fabric: "MIXED",
    size: "One Size",
    sizes: ["M"],
    category: "bundles",
    minUnits: 25,
    items: ["canvas-tote", "waxed-belt", "roche-field-cap", "roche-aviators"],
    image: accessoryshop,
    images: [accessoryshop, accessoryshop1],
    colors: [
      { name: "Sand", hex: "#c8b89e", stock: 20 },
      { name: "Black", hex: "#0a0a0a", stock: 65 },
      { name: "Brown", hex: "#5a4634", stock: 14 },
      { name: "Olive", hex: "#4a4f36", stock: 9 },
    ],
  },
  {
    slug: "footwear-watch-wholesale-set",
    name: "Footwear & Watch Wholesale Set",
    price: "₦1,240,000",
    discount: 22,
    fabric: "MIXED",
    size: "Assorted",
    sizes: ["M", "L", "XL"],
    category: "bundles",
    minUnits: 15,
    items: ["loading-dock-boot", "dockside-field-watch", "roche-chrono"],
    image: shoeshop,
    images: [shoeshop, watchshop],
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 11 },
      { name: "Steel", hex: "#7a7f85", stock: 5 },
    ],
  },
];

export const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const getBundleBySlug = (slug) => BUNDLES.find((b) => b.slug === slug);

export const getBundleColors = (bundle) => {
  const seen = new Map();

  bundle.items?.forEach((itemSlug) => {
    const item = getProductBySlug(itemSlug);
    item?.colors?.forEach((c) => {
      const existing = seen.get(c.name);
      if (existing) {
        existing.stock += c.stock;
      } else {
        seen.set(c.name, { ...c });
      }
    });
  });

  return Array.from(seen.values());
};

export const FABRIC_WORDS = [
  "COTTON TWILL",
  "RIPSTOP",
  "WAXED CANVAS",
  "DENIM",
  "MOLESKIN",
  "HEAVY JERSEY",
];

export const TESTIMONIALS = [
  {
    quote:
      "Fit like it was cut for me. The overshirt has become a daily uniform.",
    name: "Tomiwa A.",
  },
  {
    quote:
      "Stitching and fabric weight are a different tier from anything else I've bought locally.",
    name: "Chiamaka O.",
  },
  {
    quote:
      "Ordered in the morning, it was on my doorstep by evening. Quality held up after a dozen washes.",
    name: "Femi K.",
  },
];
