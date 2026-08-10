import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  getOrderById,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
} from "../../mock/orders";
import CustomSelect from "../../components/ui/CustomSelect";
import RevealImage from "../../components/ui/RevealImage";

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-primary/10 text-primary/60",
    processing: "bg-blue-500/10 text-blue-500",
    shipped: "bg-purple-500/10 text-purple-500",
    delivered: "bg-green-500/10 text-green-500",
    cancelled: "bg-red-500/10 text-red-500",
  };

  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
  const styles = {
    paid: "text-green-500",
    pending: "text-primary/50",
    failed: "text-red-500",
    refunded: "text-primary/40",
  };

  return (
    <span className={`text-xs font-medium capitalize ${styles[status] || ""}`}>
      {status}
    </span>
  );
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const parseNaira = (str) => Number(str.replace(/[₦,]/g, "")) || 0;

const OrderDetail = () => {
  const { id } = useParams();
  const order = useMemo(() => getOrderById(id), [id]);

  const [status, setStatus] = useState(order?.status || "pending");
  const [paymentStatus, setPaymentStatus] = useState(
    order?.paymentStatus || "pending",
  );

  const subtotal = useMemo(() => {
    if (!order) return 0;
    return order.items.reduce(
      (sum, item) => sum + parseNaira(item.price) * item.quantity,
      0,
    );
  }, [order]);

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-primary/50 mb-4">Order not found.</p>
        <Link
          to="/orders"
          className="text-primary underline underline-offset-4 text-sm"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/orders"
          className="text-primary/50 hover:text-primary"
          aria-label="Back to orders"
        >
          <FiArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-primary">{order.id}</h1>
          <p className="text-xs text-primary/40 mt-0.5">
            Placed {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-primary">
                Items ({order.items.length})
              </h2>
              <PaymentBadge status={paymentStatus} />
            </div>

            <div className="divide-y divide-primary/10">
              {order.items.map((item, index) => (
                <div
                  key={`${item.product?.slug}-${index}`}
                  className="flex items-center gap-3 py-3"
                >
                  <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-primary/5">
                    <RevealImage
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-full h-full"
                      delay={index * 40}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">
                      {item.product?.name || "Unknown product"}
                    </p>
                    <p className="text-xs text-primary/50">
                      {item.size} · {item.color} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm text-primary flex-shrink-0">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-primary/10 space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary/60">Subtotal</span>
                <span className="text-primary">
                  ₦{subtotal.toLocaleString("en-NG")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-primary">Total</span>
                <span className="text-primary">{order.total}</span>
              </div>
            </div>
          </div>

          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-primary">
              Shipping Address
            </h2>
            <div className="flex items-start gap-2 text-sm text-primary/70">
              <FiMapPin size={14} className="mt-0.5 flex-shrink-0" />
              <span>{order.shippingAddress}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-primary">Order Status</h2>
            <div className="flex items-center gap-2">
              <StatusBadge status={status} />
            </div>
            <CustomSelect
              value={status}
              onChange={setStatus}
              options={ORDER_STATUSES}
              position="down"
            />
          </div>

          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-primary">
              Payment Status
            </h2>
            <CustomSelect
              value={paymentStatus}
              onChange={setPaymentStatus}
              options={PAYMENT_STATUSES}
              position="down"
            />
          </div>

          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-primary">Customer</h2>
            <div className="space-y-2 text-sm">
              <p className="text-primary font-medium">{order.customer.name}</p>
              <div className="flex items-center gap-2 text-primary/60">
                <FiMail size={13} className="flex-shrink-0" />
                <span className="truncate">{order.customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-primary/60">
                <FiPhone size={13} className="flex-shrink-0" />
                <span>{order.customer.phone}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full px-4 py-2.5 bg-primary text-secondary text-sm font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
