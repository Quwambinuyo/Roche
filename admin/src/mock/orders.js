import { PRODUCTS } from "./product";

export const ORDER_STATUSES = [
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export const PAYMENT_STATUSES = [
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
  { label: "Refunded", value: "refunded" },
];

const p = (slug) => PRODUCTS.find((prod) => prod.slug === slug);

export const ORDERS = [
  {
    id: "ORD-1042",
    customer: {
      name: "Tomiwa Adebayo",
      email: "tomiwa.a@gmail.com",
      phone: "+234 803 555 0142",
    },
    items: [
      {
        product: p("ZF-overshirt"),
        size: "M",
        color: "Olive",
        quantity: 1,
        price: "₦48,500",
      },
      {
        product: p("ribbed-tee"),
        size: "L",
        color: "Black",
        quantity: 2,
        price: "₦18,500",
      },
    ],
    shippingAddress: "14 Admiralty Way, Lekki Phase 1, Lagos",
    total: "₦85,500",
    status: "processing",
    paymentStatus: "paid",
    createdAt: "2026-06-02T10:15:00Z",
  },
  {
    id: "ORD-1041",
    customer: {
      name: "Chiamaka Okoye",
      email: "chiamaka.o@yahoo.com",
      phone: "+234 812 444 8891",
    },
    items: [
      {
        product: p("waxed-ZF-jacket"),
        size: "L",
        color: "Forest",
        quantity: 1,
        price: "₦74,000",
      },
    ],
    shippingAddress: "22 Ademola Adetokunbo, Wuse 2, Abuja",
    total: "₦74,000",
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2026-06-01T14:32:00Z",
  },
  {
    id: "ORD-1040",
    customer: {
      name: "Femi Kolawole",
      email: "femi.k@outlook.com",
      phone: "+234 701 222 6634",
    },
    items: [
      {
        product: p("ZF-field-cap"),
        size: "One Size",
        color: "Black",
        quantity: 3,
        price: "₦14,000",
      },
    ],
    shippingAddress: "5 Ikot Ekpene Rd, Uyo, Akwa Ibom",
    total: "₦42,000",
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2026-06-01T09:05:00Z",
  },
  {
    id: "ORD-1039",
    customer: {
      name: "Ngozi Umeh",
      email: "ngozi.umeh@gmail.com",
      phone: "+234 909 333 7712",
    },
    items: [
      {
        product: p("utility-cargo"),
        size: "M",
        color: "Khaki",
        quantity: 1,
        price: "₦52,000",
      },
    ],
    shippingAddress: "9 Aba Rd, Port Harcourt, Rivers",
    total: "₦52,000",
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "2026-05-29T16:48:00Z",
  },
  {
    id: "ORD-1038",
    customer: {
      name: "Kelechi Nwosu",
      email: "kelechi.n@gmail.com",
      phone: "+234 706 888 1290",
    },
    items: [
      {
        product: p("ZF-overshirt"),
        size: "S",
        color: "Sand",
        quantity: 1,
        price: "₦48,500",
      },
      {
        product: p("ZF-field-cap"),
        size: "One Size",
        color: "Olive",
        quantity: 1,
        price: "₦14,000",
      },
    ],
    shippingAddress: "31 Bodija Estate, Ibadan, Oyo",
    total: "₦62,500",
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-05-27T11:20:00Z",
  },
];

export const getOrderById = (id) => ORDERS.find((o) => o.id === id);

export const orderTotalItems = (order) =>
  order.items.reduce((sum, item) => sum + item.quantity, 0);
