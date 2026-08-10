import React, { useMemo, useState } from "react";
import { getProductSalesData } from "../../mock/orderSales";
import DataTable from "../../components/ui/DataTable";

const PAGE_SIZE = 25;

const OrderSalesTable = () => {
  const allData = useMemo(() => getProductSalesData(), []);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("unitsSold");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = q
      ? allData.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q),
        )
      : allData;

    const sorted = [...rows].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (typeof a[sortKey] === "string") {
        return a[sortKey].localeCompare(b[sortKey]) * dir;
      }
      return (a[sortKey] - b[sortKey]) * dir;
    });

    return sorted;
  }, [allData, query, sortKey, sortDir]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);

  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  };

  const SortableHeader = ({ label, sortColumnKey }) => (
    <button
      onClick={() => toggleSort(sortColumnKey)}
      className="flex items-center gap-1 hover:text-primary select-none"
    >
      {label}
      {sortKey === sortColumnKey && (sortDir === "asc" ? "↑" : "↓")}
    </button>
  );

  const columns = [
    {
      key: "name",
      header: <SortableHeader label="Product" sortColumnKey="name" />,
      render: (product) => (
        <div className="flex items-center gap-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-7 h-7 object-cover flex-shrink-0"
          />
          <span className="text-primary truncate">{product.name}</span>
        </div>
      ),
    },
    {
      key: "category",
      header: <SortableHeader label="Category" sortColumnKey="category" />,
      cellClassName: "text-primary/60 capitalize",
      render: (product) => product.category,
    },
    {
      key: "unitsSold",
      header: <SortableHeader label="Units Sold" sortColumnKey="unitsSold" />,
      render: (product) => product.unitsSold,
    },
    {
      key: "orderCount",
      header: <SortableHeader label="Orders" sortColumnKey="orderCount" />,
      render: (product) => product.orderCount ?? "—",
    },
    {
      key: "revenue",
      header: <SortableHeader label="Revenue" sortColumnKey="revenue" />,
      render: (product) =>
        product.revenue ? `₦${product.revenue.toLocaleString()}` : "—",
    },
  ];

  return (
    <div className="bg-secondary/10 p-5">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="text-sm font-bold text-primary tracking-tight uppercase">
          All Products Sales
        </h2>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search products..."
          className="text-xs bg-secondary border border-primary/10 px-3 py-1.5 w-56 text-primary  focus:outline-none "
        />
      </div>

      <DataTable
        columns={columns}
        data={pageRows}
        rowKey={(product) => product.slug}
        emptyMessage="No products match your search."
      />

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-primary/40">
          Showing{" "}
          {pageRows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
          {(currentPage - 1) * PAGE_SIZE + pageRows.length} of {filtered.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="text-xs text-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-xs text-primary/50">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-xs text-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSalesTable;
