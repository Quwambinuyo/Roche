import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, PackageCheck } from "lucide-react";
import Reveal from "../Landing/Reveal";
import RevealImage from "../../components/UI/RevealImage";
import { PRODUCTS } from "../../mock/clothing";

const STATUS_STYLES = {
  Delivered: "bg-green-800 text-white",
  Dispatched: "bg-orange-500 text-white",
  "In Transit": "bg-red-500 text-white",
  Delayed: "bg-secondary/10 text-secondary border border-secondary/20",
};

const ORDERS = [
  {
    id: "RC-88213",
    date: "Jul 29, 2026",
    status: "Delivered",
    tracking: "NGX 4471 0092",
    items: [
      { product: PRODUCTS[3], color: "Rust", qty: 1 },
      { product: PRODUCTS[9], color: "Black", qty: 1 },
    ],
  },
  {
    id: "RC-88190",
    date: "Jul 12, 2026",
    status: "In Transit",
    tracking: "NGX 4470 8814",
    items: [{ product: PRODUCTS[15], color: "Steel", qty: 1 }],
  },
  {
    id: "RC-88104",
    date: "Jun 24, 2026",
    status: "Dispatched",
    tracking: "NGX 4469 2207",
    items: [
      { product: PRODUCTS[5], color: "Olive", qty: 2 },
      { product: PRODUCTS[18], color: "Sand", qty: 1 },
    ],
  },
];

const parsePrice = (price) => Number(price.replace(/[₦,]/g, ""));

const getOrderTotal = (items) =>
  items.reduce(
    (sum, { product, qty }) => sum + parsePrice(product.price) * qty,
    0,
  );

const formatNaira = (value) => `₦${value.toLocaleString("en-NG")}`;

const OrderCard = ({ order, delay }) => {
  const [expanded, setExpanded] = useState(true);
  const total = getOrderTotal(order.items);

  return (
    <Reveal delay={delay}>
      <div className="rounded-2xl border border-secondary/10 bg-primary-50 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 md:p-6">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
                Order
              </p>
              <p className="text-sm font-semibold text-secondary mt-1">
                {order.id}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
                Placed
              </p>
              <p className="text-sm font-semibold text-secondary mt-1">
                {order.date}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${STATUS_STYLES[order.status]}`}
          >
            {order.status}
          </span>
        </div>

        {expanded && (
          <div className="border-t border-secondary/10 px-5 md:px-6 py-5 space-y-4">
            {order.items.map(({ product, color, qty }, i) => (
              <div key={i} className="flex items-center gap-4">
                <RevealImage
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl shrink-0"
                  imgClassName="object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-secondary truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-secondary/50 mt-0.5">
                    {color} · Qty {qty}
                  </p>
                </div>
                <p className="text-sm font-semibold text-secondary">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-secondary/10 flex items-center justify-between px-5 md:px-6 py-4">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs font-semibold tracking-wide text-secondary/50 hover:text-secondary transition-colors"
          >
            {expanded ? "Hide items" : "Show items"}
            <ChevronDown
              size={14}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
          <p className="text-sm font-bold text-secondary">
            {formatNaira(total)}
          </p>
        </div>

        <div className="border-t border-secondary/10 bg-secondary/[0.03] px-5 md:px-6 py-3 flex items-center justify-between">
          <p className="text-xs text-secondary/50">Tracking {order.tracking}</p>
          <Link
            to={`/track/${order.tracking.replace(/\s/g, "")}`}
            className="group flex items-center gap-1 text-xs font-semibold text-secondary hover:text-tertiary-600 transition-colors"
          >
            Track shipment
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </Reveal>
  );
};

const EmptyState = () => (
  <Reveal>
    <div className="rounded-2xl border border-dashed border-secondary/20 py-16 text-center">
      <PackageCheck size={28} className="mx-auto text-secondary/30" />
      <p className="text-sm text-secondary/50 mt-3">
        No orders yet. Everything you buy will show up here.
      </p>
    </div>
  </Reveal>
);

const OrderHistory = () => {
  return (
    <div className="">
      <Reveal className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Account
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          Order History
        </h1>
        <p className="text-sm text-secondary/50 mt-2 max-w-md">
          Every order you've placed, from dispatch to delivery.
        </p>
      </Reveal>

      {ORDERS.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-5">
          {ORDERS.map((order, i) => (
            <OrderCard key={order.id} order={order} delay={i * 50} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
