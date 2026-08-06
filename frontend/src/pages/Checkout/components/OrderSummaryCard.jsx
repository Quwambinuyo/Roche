import React from "react";
import { formatNaira, parsePrice } from "../utils";

const OrderSummaryCard = ({
  checkoutLines,
  subtotal,
  deliveryFee,
  total,
  isAddressValid,
  paymentMethod,
  canPlaceOrder,
  placing,
  onPlaceOrder,
}) => (
  <div className="rounded-lg border border-secondary/10 p-5 sticky top-6">
    <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-4">
      Order Summary
    </p>

    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
      {checkoutLines.map((line) => (
        <div key={line.id} className="flex gap-3">
          <img
            src={line.product.image}
            alt={line.product.name}
            className="w-12 h-12 rounded-md object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-secondary truncate">
              {line.product.name}
            </p>
            <p className="text-[11px] text-secondary/50">
              {line.color?.name}
              {line.size ? ` · ${line.size}` : ""} · Qty {line.qty}
            </p>
          </div>
          <p className="text-xs font-semibold text-secondary shrink-0">
            {formatNaira(parsePrice(line.product.price) * line.qty)}
          </p>
        </div>
      ))}
    </div>

    <div className="h-px bg-secondary/10 my-4" />

    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-secondary/60">Subtotal</span>
        <span className="text-secondary">{formatNaira(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-secondary/60">Delivery</span>
        <span className="text-secondary">{formatNaira(deliveryFee)}</span>
      </div>
    </div>

    <div className="h-px bg-secondary/10 my-4" />

    <div className="flex items-center justify-between mb-5">
      <span className="text-sm font-semibold text-secondary">Total</span>
      <span className="text-lg font-bold text-secondary">
        {formatNaira(total)}
      </span>
    </div>

    <button
      onClick={onPlaceOrder}
      disabled={!canPlaceOrder}
      className={`w-full h-11 rounded-full text-sm font-semibold transition-colors ${
        canPlaceOrder
          ? "bg-secondary text-primary hover:bg-tertiary-800"
          : "bg-secondary/10 text-secondary/40 cursor-not-allowed"
      }`}
    >
      {placing ? "Placing Order..." : "Place Order"}
    </button>

    {!isAddressValid && (
      <p className="text-[11px] text-secondary/40 text-center mt-2">
        Fill in your delivery details to continue
      </p>
    )}
    {isAddressValid && !paymentMethod && (
      <p className="text-[11px] text-secondary/40 text-center mt-2">
        Select a payment method to continue
      </p>
    )}
  </div>
);

export default OrderSummaryCard;
