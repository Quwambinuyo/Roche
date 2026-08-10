import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { ORDERS, ORDER_STATUSES, orderTotalItems } from "../../mock/orders";
import CustomSelect from "../../components/ui/CustomSelect";

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
  });

const OrderList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const statusOptions = useMemo(
    () => [{ label: "All Statuses", value: "all" }, ...ORDER_STATUSES],
    [],
  );

  const filtered = useMemo(() => {
    return ORDERS.filter((order) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query);
      const matchesStatus = status === "all" || order.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-primary">Orders</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
          />
          <input
            type="text"
            placeholder="Search by order ID, customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
          />
        </div>

        <div className="sm:w-56">
          <CustomSelect
            value={status}
            onChange={setStatus}
            options={statusOptions}
            position="down"
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-primary/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/10 text-left text-primary/50">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr
                key={order.id}
                className="border-b border-primary/10 last:border-b-0 text-primary hover:bg-primary/5"
              >
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-primary">{order.customer.name}</p>
                    <p className="text-xs text-primary/40">
                      {order.customer.email}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-primary/70">
                  {orderTotalItems(order)} item
                  {orderTotalItems(order) > 1 ? "s" : ""}
                </td>
                <td className="px-4 py-3">{order.total}</td>
                <td className="px-4 py-3">
                  <PaymentBadge status={order.paymentStatus} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-primary/60">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-primary/50 hover:text-primary text-xs font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-primary/40"
                >
                  No orders match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
