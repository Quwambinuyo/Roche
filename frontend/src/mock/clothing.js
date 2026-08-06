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

export const NAV_LINKS = ["New Arrivals", "Collections", "Fabric", "Journal"];

export const CATEGORIES = [
  { name: "Outerwear", count: 18, image: outwear },
  { name: "Tops", count: 32, image: tops },
  { name: "Bottoms", count: 21, image: bottoms },
  { name: "Accessories", count: 14, image: accessories },
  { name: "Watches", count: 9, image: watches },
  { name: "Foot wear", count: 26, image: footwear },
  { name: "Caps", count: 17, image: caps },
  { name: "Glasses", count: 12, image: glasses },
];

export const PRODUCTS = [
  {
    name: "Roche Overshirt",
    price: "₦48,500",
    fabric: "COTTON TWILL",
    size: "S — XL",
    image: overshirt,
    colors: [
      { name: "Olive", hex: "#4a4f36", stock: 12 },
      { name: "Black", hex: "#0a0a0a", stock: 0 },
      { name: "Sand", hex: "#c8b89e", stock: 5 },
    ],
  },
  {
    name: "Ribbed Tee",
    price: "₦18,500",
    fabric: "HEAVY COTTON",
    size: "S — XL",
    image: ribbedTee,
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 20 },
      { name: "White", hex: "#f5f5f0", stock: 14 },
    ],
  },
  {
    name: "Utility Cargo",
    price: "₦52,000",
    fabric: "RIPSTOP CANVAS",
    size: "28 — 36",
    image: overshirt1,
    colors: [
      { name: "Khaki", hex: "#a89a72", stock: 0 },
      { name: "Black", hex: "#0a0a0a", stock: 0 },
    ],
  },
  {
    name: "Waxed Roche Jacket",
    price: "₦74,000",
    fabric: "WAXED CANVAS",
    size: "S — XXL",
    image: jacket,
    colors: [
      { name: "Rust", hex: "#8a3b23", stock: 6 },
      { name: "Forest", hex: "#2e3b2c", stock: 3 },
      { name: "Black", hex: "#0a0a0a", stock: 9 },
    ],
  },
  {
    name: "Ribbed Tee",
    price: "₦18,500",
    fabric: "HEAVY COTTON",
    size: "S — XL",
    image: ribbedTee,
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 20 },
      { name: "White", hex: "#f5f5f0", stock: 14 },
    ],
  },
  {
    name: "Roche Field Cap",
    price: "₦14,000",
    fabric: "COTTON TWILL",
    size: "One Size",
    image: capshop,
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 22 },
      { name: "Olive", hex: "#4a4f36", stock: 9 },
    ],
  },
  {
    name: "Waxed Trail Cap",
    price: "₦15,500",
    fabric: "WAXED CANVAS",
    size: "One Size",
    image: capshop1,
    colors: [{ name: "Rust", hex: "#8a3b23", stock: 7 }],
  },
  {
    name: "Ribbed Beanie",
    price: "₦12,000",
    fabric: "HEAVY JERSEY",
    size: "One Size",
    image: capshop2,
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 15 },
      { name: "Sand", hex: "#c8b89e", stock: 0 },
    ],
  },
  {
    name: "Utility Bucket Hat",
    price: "₦13,500",
    fabric: "RIPSTOP CANVAS",
    size: "One Size",
    image: capshop3,
    colors: [{ name: "Khaki", hex: "#a89a72", stock: 11 }],
  },
  {
    name: "The Full Kit Bundle",
    price: "₦128,000",
    fabric: "MIXED",
    size: "S — XL",
    image: fullkitshop,
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 4 },
      { name: "Olive", hex: "#4a4f36", stock: 2 },
    ],
  },
  {
    name: "Roche Aviators",
    price: "₦22,000",
    fabric: "ACETATE",
    size: "One Size",
    image: glassesshop,
    colors: [{ name: "Black", hex: "#0a0a0a", stock: 18 }],
  },
  {
    name: "Studio Round Frames",
    price: "₦24,500",
    fabric: "ACETATE",
    size: "One Size",
    image: glassesshop1,
    colors: [
      { name: "Tortoise", hex: "#6b4a2c", stock: 6 },
      { name: "Black", hex: "#0a0a0a", stock: 10 },
    ],
  },
  {
    name: "Waxed Field Jacket",
    price: "₦81,000",
    fabric: "WAXED CANVAS",
    size: "S — XXL",
    image: jacketshop,
    colors: [
      { name: "Forest", hex: "#2e3b2c", stock: 5 },
      { name: "Black", hex: "#0a0a0a", stock: 3 },
    ],
  },
  {
    name: "Loading Dock Boot",
    price: "₦63,500",
    fabric: "FULL GRAIN LEATHER",
    size: "40 — 45",
    image: shoeshop,
    colors: [{ name: "Black", hex: "#0a0a0a", stock: 8 }],
  },
  {
    name: "Rooftop Set",
    price: "₦59,000",
    fabric: "COTTON TWILL",
    size: "S — XL",
    image: topbottomshop,
    colors: [
      { name: "Sand", hex: "#c8b89e", stock: 9 },
      { name: "Olive", hex: "#4a4f36", stock: 6 },
    ],
  },
  {
    name: "Dockside Field Watch",
    price: "₦96,000",
    fabric: "STAINLESS STEEL",
    size: "One Size",
    image: watchshop,
    colors: [{ name: "Steel", hex: "#7a7f85", stock: 5 }],
  },
  {
    name: "Roche Chrono",
    price: "₦112,000",
    fabric: "STAINLESS STEEL",
    size: "One Size",
    image: watchshop1,
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 3 },
      { name: "Steel", hex: "#7a7f85", stock: 0 },
    ],
  },
  {
    name: "Waterfront Windbreaker",
    price: "₦45,000",
    fabric: "RIPSTOP",
    size: "S — XXL",
    image: wearshop,
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 12 },
      { name: "Rust", hex: "#8a3b23", stock: 7 },
    ],
  },
  {
    name: "Canvas Tote",
    price: "₦16,500",
    fabric: "CANVAS",
    size: "One Size",
    image: accessoryshop,
    colors: [{ name: "Sand", hex: "#c8b89e", stock: 20 }],
  },
  {
    name: "Waxed Belt",
    price: "₦11,000",
    fabric: "WAXED LEATHER",
    size: "One Size",
    image: accessoryshop1,
    colors: [
      { name: "Black", hex: "#0a0a0a", stock: 25 },
      { name: "Brown", hex: "#5a4634", stock: 14 },
    ],
  },
];

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
