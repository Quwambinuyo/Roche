import React, { useMemo, useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { CUSTOMERS } from "../../mock/customers";
import { formatNaira, formatDate } from "../../utils/format";
import SearchInput from "../../components/ui/SearchInput";
import CustomSelect from "../../components/ui/CustomSelect";
import DataTable from "../../components/ui/DataTable";

const SORT_OPTIONS = [
  { label: "Highest Spent", value: "spent-desc" },
  { label: "Lowest Spent", value: "spent-asc" },
];

const CustomerList = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("spent-desc");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = !query
      ? CUSTOMERS
      : CUSTOMERS.filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            c.email.toLowerCase().includes(query),
        );

    return [...base].sort((a, b) =>
      sort === "spent-asc"
        ? a.totalSpent - b.totalSpent
        : b.totalSpent - a.totalSpent,
    );
  }, [search, sort]);

  const columns = [
    {
      key: "customer",
      header: "Customer",
      render: (customer) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary/70">
            {customer.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <span className="font-medium">{customer.name}</span>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (customer) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-primary/60">
            <FiMail size={12} className="flex-shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-primary/60">
            <FiPhone size={12} className="flex-shrink-0" />
            <span>{customer.phone}</span>
          </div>
        </div>
      ),
    },
    {
      key: "orders",
      header: "Orders",
      render: (customer) => customer.orderCount,
    },
    {
      key: "totalSpent",
      header: "Total Spent",
      render: (customer) => formatNaira(customer.totalSpent),
    },
    {
      key: "lastOrder",
      header: "Last Order",
      cellClassName: "text-primary/60",
      render: (customer) => formatDate(customer.lastOrderAt),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email..."
          className="flex-1 sm:max-w-sm"
        />

        <div className="sm:w-52">
          <CustomSelect
            value={sort}
            onChange={setSort}
            options={SORT_OPTIONS}
            position="down"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(customer) => customer.email}
        emptyMessage="No customers match your search."
      />
    </div>
  );
};

export default CustomerList;
