import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ORDERS, ORDER_STATUSES, orderTotalItems } from "../../mock/orders";
import CustomSelect from "../../components/ui/CustomSelect";
import SearchInput from "../../components/ui/SearchInput";
import StatusBadge from "../../components/ui/StatusBadge";
import DataTable from "../../components/ui/DataTable";
import OrderSalesTable from "./OrderSalesTable";
import TransactionsTable from "./TransactionsTable";
import { formatDateTime } from "../../utils/format";

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

const TABS = [
  { key: "orders", label: "Orders" },
  { key: "sales", label: "Product Sales" },
  { key: "transactions", label: "Transactions" },
];

const TAB_KEYS = TABS.map((t) => t.key);

const formatOrderItems = (order) => {
  return order.items
    .map((item) => `${item.product?.name || "Unknown"} x${item.quantity}`)
    .join(", ");
};

const OrderList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab");
  const tab = TAB_KEYS.includes(rawTab) ? rawTab : "orders";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const setTab = (key) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (key === "orders") {
          next.delete("tab");
        } else {
          next.set("tab", key);
        }
        return next;
      },
      { replace: false },
    );
  };

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
      headerClassName: "min-w-[120px]",
      cellClassName: "font-medium whitespace-nowrap",
      render: (order) => order.id,
    },
    {
      key: "customer",
      header: "Customer",
      headerClassName: "min-w-[200px]",
      cellClassName: "whitespace-nowrap",
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
      headerClassName: "min-w-[220px]",
      render: (order) => (
        <div>
          <p className="text-primary/70">
            {orderTotalItems(order)} item
            {orderTotalItems(order) > 1 ? "s" : ""}
          </p>
          <p className="text-xs text-primary/40">{formatOrderItems(order)}</p>
        </div>
      ),
    },
    {
      key: "total",
      header: "Total",
      headerClassName: "min-w-[110px]",
      cellClassName: "whitespace-nowrap",
      render: (order) => order.total,
    },
    {
      key: "payment",
      header: "Payment",
      headerClassName: "min-w-[110px]",
      cellClassName: "whitespace-nowrap",
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
      headerClassName: "min-w-[110px]",
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
      headerClassName: "min-w-[170px]",
      cellClassName: "text-primary/60 whitespace-nowrap",
      render: (order) => formatDateTime(order.createdAt),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right min-w-[90px]",
      cellClassName: "text-right whitespace-nowrap",
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
      <div className="flex items-center gap-1 mb-4 border-b border-primary/10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`text-xs font-medium px-4 py-2 -mb-px border-b-2 transition-colors ${
              tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-primary/40 hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <>
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
        </>
      )}

      {tab === "sales" && <OrderSalesTable />}

      {tab === "transactions" && <TransactionsTable />}
    </div>
  );
};

export default OrderList;
