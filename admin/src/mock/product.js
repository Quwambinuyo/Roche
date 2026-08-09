export const CATEGORIES = [
  { name: "Outerwear", slug: "outerwear", count: 18 },
  { name: "Tops", slug: "tops", count: 32 },
  { name: "Bottoms", slug: "bottoms", count: 21 },
  { name: "Accessories", slug: "accessories", count: 14 },
  { name: "Watches", slug: "watches", count: 9 },
  { name: "Foot wear", slug: "footwear", count: 26 },
  { name: "Caps", slug: "caps", count: 17 },
  { name: "Glasses", slug: "glasses", count: 12 },
  { name: "Bundles", slug: "bundles", count: 4 },
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
    slug: "bstrt-overshirt",
    name: "BSTRT Overshirt",
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
    image: "/placeholder/overshirt.jpg",
    images: ["/placeholder/overshirt.jpg", "/placeholder/overshirt1.jpg"],
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
    image: "/placeholder/ribbedtee.jpg",
    images: ["/placeholder/ribbedtee.jpg", "/placeholder/tops.jpg"],
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
    image: "/placeholder/overshirt1.jpg",
    images: ["/placeholder/overshirt1.jpg", "/placeholder/bottoms.jpg"],
    colors: [
      { name: "Khaki", hex: "#a89a72", stock: 0 },
      { name: "Black", hex: "#0a0a0a", stock: 0 },
    ],
    status: "out-of-stock",
    createdAt: "2026-01-28",
  },
  {
    slug: "waxed-bstrt-jacket",
    name: "Waxed BSTRT Jacket",
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
    image: "/placeholder/jacket.jpg",
    images: ["/placeholder/jacket.jpg", "/placeholder/jacketshop.jpg"],
    colors: [
      { name: "Rust", hex: "#8a3b23", stock: 6 },
      { name: "Forest", hex: "#2e3b2c", stock: 3 },
      { name: "Black", hex: "#0a0a0a", stock: 9 },
    ],
    status: "active",
    createdAt: "2026-03-10",
  },
  {
    slug: "bstrt-field-cap",
    name: "BSTRT Field Cap",
    price: "₦14,000",
    discount: 0,
    fabric: "COTTON TWILL",
    size: "One Size",
    sizes: [{ size: "M", stock: 22 }],
    category: "caps",
    image: "/placeholder/capshop.jpg",
    images: ["/placeholder/capshop.jpg", "/placeholder/capshop1.jpg"],
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
    items: ["ribbed-tee", "utility-cargo", "bstrt-field-cap"],
    image: "/placeholder/fullkitshop.jpg",
    images: ["/placeholder/fullkitshop.jpg", "/placeholder/wearshop.jpg"],
    status: "active",
    createdAt: "2026-01-20",
  },
];

// ── Helpers ──────────────────────────────────────────────

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
