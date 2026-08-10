import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ORDERS, ORDER_STATUSES, orderTotalItems } from "../../mock/orders";
import { formatDate } from "../../utils/format";
import CustomSelect from "../../components/ui/CustomSelect";
import SearchInput from "../../components/ui/SearchInput";
import StatusBadge from "../../components/ui/StatusBadge";
import DataTable from "../../components/ui/DataTable";

const ORDER_STATUS_STYLES = {
  pending: "bg-primary/10 text-primary/60",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
};

const PAYMENT_STATUS_STYLES = {
  paid: "text-green-500",
  pending: "text-primary/50",
  failed: "text-red-500",
  refunded: "text-primary/40",
};

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

  const columns = [
    {
      key: "order",
      header: "Order",
      cellClassName: "font-medium",
      render: (order) => order.id,
    },
    {
      key: "customer",
      header: "Customer",
      render: (order) => (
        <div>
          <p className="text-primary">{order.customer.name}</p>
          <p className="text-xs text-primary/40">{order.customer.email}</p>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      cellClassName: "text-primary/70",
      render: (order) =>
        `${orderTotalItems(order)} item${orderTotalItems(order) > 1 ? "s" : ""}`,
    },
    {
      key: "total",
      header: "Total",
      render: (order) => order.total,
    },
    {
      key: "payment",
      header: "Payment",
      render: (order) => (
        <span
          className={`text-xs font-medium capitalize ${
            PAYMENT_STATUS_STYLES[order.paymentStatus] || ""
          }`}
        >
          {order.paymentStatus}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (order) => (
        <StatusBadge
          status={order.status}
          styles={ORDER_STATUS_STYLES}
          fallbackKey="pending"
        />
      ),
    },
    {
      key: "date",
      header: "Date",
      cellClassName: "text-primary/60",
      render: (order) => formatDate(order.createdAt),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (order) => (
        <Link
          to={`/orders/${order.id}`}
          className="text-primary/50 hover:text-primary text-xs font-medium"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by order ID, customer name or email..."
          className="flex-1"
        />

        <div className="sm:w-56">
          <CustomSelect
            value={status}
            onChange={setStatus}
            options={statusOptions}
            position="down"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(order) => order.id}
        emptyMessage="No orders match your search."
      />
    </div>
  );
};

export default OrderList;
