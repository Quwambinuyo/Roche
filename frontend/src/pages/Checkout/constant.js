import { Truck, Zap, CreditCard, Landmark, Banknote } from "lucide-react";

export const DELIVERY_METHODS = [
  {
    id: "standard",
    label: "Standard Delivery",
    detail: "2–4 business days",
    price: 3500,
    icon: Truck,
  },
  {
    id: "express",
    label: "Express Delivery",
    detail: "1–2 business days",
    price: 6000,
    icon: Zap,
  },
];

export const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Debit / Credit Card",
    detail: "Pay securely with your card",
    icon: CreditCard,
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    detail: "Pay via direct bank transfer",
    icon: Landmark,
  },
  {
    id: "pay_on_delivery",
    label: "Pay on Delivery",
    detail: "Pay cash when your order arrives",
    icon: Banknote,
  },
];

export const NIGERIAN_STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Ogun",
  "Oyo",
  "Rivers",
  "Kano",
  "Kaduna",
  "Enugu",
  "Delta",
  "Edo",
  "Anambra",
  "Other",
];
