export const TRANSACTION_STATUSES = [
  { label: "Success", value: "success" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
  { label: "Reversed", value: "reversed" },
];

export const FAILURE_REASONS = [
  { label: "Insufficient Funds", value: "insufficient_funds" },
  { label: "Card Declined", value: "card_declined" },
  { label: "Timeout", value: "timeout" },
  { label: "Gateway Error", value: "gateway_error" },
  { label: "Invalid Card", value: "invalid_card" },
];

export const GATEWAYS = ["Paystack", "Flutterwave", "Monnify"];

export const TRANSACTIONS = [
  {
    id: "TXN-98213",
    orderId: "ORD-10021",
    gateway: "Paystack",
    gatewayRef: "ps_ref_8ab21c",
    amount: "₦45,000.00",
    status: "failed",
    failureReason: "card_declined",
    reconciled: false,
    createdAt: "2026-08-01T09:14:00Z",
  },
  {
    id: "TXN-98214",
    orderId: "ORD-10021",
    gateway: "Paystack",
    gatewayRef: "ps_ref_8ab22d",
    amount: "₦45,000.00",
    status: "success",
    failureReason: null,
    reconciled: true,
    createdAt: "2026-08-01T09:17:00Z",
  },
  {
    id: "TXN-98220",
    orderId: "ORD-10034",
    gateway: "Flutterwave",
    gatewayRef: "flw_ref_112ab9",
    amount: "₦12,500.00",
    status: "pending",
    failureReason: null,
    reconciled: false,
    createdAt: "2026-08-03T13:42:00Z",
  },
  {
    id: "TXN-98231",
    orderId: "ORD-10041",
    gateway: "Monnify",
    gatewayRef: "mnfy_ref_55cd10",
    amount: "₦8,200.00",
    status: "failed",
    failureReason: "timeout",
    reconciled: false,
    createdAt: "2026-08-04T18:05:00Z",
  },
  {
    id: "TXN-98240",
    orderId: "ORD-10052",
    gateway: "Paystack",
    gatewayRef: "ps_ref_9fe310",
    amount: "₦67,000.00",
    status: "reversed",
    failureReason: null,
    reconciled: true,
    createdAt: "2026-08-06T11:29:00Z",
  },
  {
    id: "TXN-98255",
    orderId: "ORD-10058",
    gateway: "Flutterwave",
    gatewayRef: "flw_ref_78bd44",
    amount: "₦21,300.00",
    status: "failed",
    failureReason: "gateway_error",
    reconciled: false,
    createdAt: "2026-08-07T08:51:00Z",
  },
  {
    id: "TXN-98261",
    orderId: "ORD-10063",
    gateway: "Paystack",
    gatewayRef: "ps_ref_3cd902",
    amount: "₦15,750.00",
    status: "success",
    failureReason: null,
    reconciled: true,
    createdAt: "2026-08-08T15:12:00Z",
  },
];

export const transactionFailureLabel = (value) =>
  FAILURE_REASONS.find((reason) => reason.value === value)?.label || "—";
