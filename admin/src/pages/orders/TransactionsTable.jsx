import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  TRANSACTIONS,
  TRANSACTION_STATUSES,
  FAILURE_REASONS,
  transactionFailureLabel,
} from "../../mock/transaction";
import CustomSelect from "../../components/ui/CustomSelect";
import SearchInput from "../../components/ui/SearchInput";
import StatusBadge from "../../components/ui/StatusBadge";
import DataTable from "../../components/ui/DataTable";

const TRANSACTION_STATUS_STYLES = {
  success: "bg-green-500/10 text-green-500",
  pending: "bg-primary/10 text-primary/60",
  failed: "bg-red-500/10 text-red-500",
  reversed: "bg-orange-500/10 text-orange-500",
};

const formatDateTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  const datePart = date.toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart}, ${timePart}`;
};

const TransactionsTable = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [failureReason, setFailureReason] = useState("all");
  const [requeryingId, setRequeryingId] = useState(null);
  const [transactions, setTransactions] = useState(TRANSACTIONS);

  const statusOptions = useMemo(
    () => [{ label: "All Statuses", value: "all" }, ...TRANSACTION_STATUSES],
    [],
  );

  const failureReasonOptions = useMemo(
    () => [{ label: "All Failure Reasons", value: "all" }, ...FAILURE_REASONS],
    [],
  );

  const filtered = useMemo(() => {
    return transactions.filter((txn) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        txn.id.toLowerCase().includes(query) ||
        txn.orderId.toLowerCase().includes(query) ||
        txn.gatewayRef.toLowerCase().includes(query);
      const matchesStatus = status === "all" || txn.status === status;
      const matchesFailureReason =
        failureReason === "all" || txn.failureReason === failureReason;
      return matchesSearch && matchesStatus && matchesFailureReason;
    });
  }, [transactions, search, status, failureReason]);

  const handleRequery = async (txnId) => {
    setRequeryingId(txnId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setTransactions((prev) =>
        prev.map((txn) =>
          txn.id === txnId
            ? {
                ...txn,
                status: "success",
                failureReason: null,
                reconciled: true,
              }
            : txn,
        ),
      );
    } finally {
      setRequeryingId(null);
    }
  };

  const columns = [
    {
      key: "transaction",
      header: "Transaction",
      headerClassName: "min-w-[160px]",
      cellClassName: "font-medium whitespace-nowrap",
      render: (txn) => (
        <div>
          <p className="text-primary">{txn.id}</p>
          <p className="text-xs text-primary/40">{txn.gatewayRef}</p>
        </div>
      ),
    },
    {
      key: "order",
      header: "Order",
      headerClassName: "min-w-[110px]",
      cellClassName: "whitespace-nowrap",
      render: (txn) => (
        <Link
          to={`/orders/${txn.orderId}`}
          className="text-primary/70 hover:text-primary text-xs font-medium"
        >
          {txn.orderId}
        </Link>
      ),
    },
    {
      key: "gateway",
      header: "Gateway",
      headerClassName: "min-w-[110px]",
      cellClassName: "text-primary/60 whitespace-nowrap",
      render: (txn) => txn.gateway,
    },
    {
      key: "amount",
      header: "Amount",
      headerClassName: "min-w-[120px]",
      cellClassName: "whitespace-nowrap",
      render: (txn) => txn.amount,
    },
    {
      key: "status",
      header: "Status",
      headerClassName: "min-w-[100px]",
      render: (txn) => (
        <StatusBadge
          status={txn.status}
          styles={TRANSACTION_STATUS_STYLES}
          fallbackKey="pending"
        />
      ),
    },
    {
      key: "failureReason",
      header: "Failure Reason",
      headerClassName: "min-w-[140px]",
      cellClassName: "text-primary/60 text-xs whitespace-nowrap",
      render: (txn) => transactionFailureLabel(txn.failureReason),
    },
    {
      key: "reconciled",
      header: "Reconciled",
      headerClassName: "min-w-[100px]",
      render: (txn) => (
        <span
          className={`text-xs font-medium ${
            txn.reconciled ? "text-green-500" : "text-red-500"
          }`}
        >
          {txn.reconciled ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      headerClassName: "min-w-[170px]",
      cellClassName: "text-primary/60 whitespace-nowrap",
      render: (txn) => formatDateTime(txn.createdAt),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right min-w-[130px]",
      cellClassName: "text-right whitespace-nowrap",
      render: (txn) => (
        <button
          onClick={() => handleRequery(txn.id)}
          disabled={requeryingId === txn.id || txn.status === "success"}
          className="text-primary/50 hover:text-primary text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {requeryingId === txn.id ? "Querying..." : "Re-query Gateway"}
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by transaction ID, order ID or gateway ref..."
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

        <div className="sm:w-56">
          <CustomSelect
            value={failureReason}
            onChange={setFailureReason}
            options={failureReasonOptions}
            position="down"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(txn) => txn.id}
        emptyMessage="No transactions match your search."
      />
    </div>
  );
};

export default TransactionsTable;
