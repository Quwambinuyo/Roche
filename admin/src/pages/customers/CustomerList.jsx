import React, { useMemo, useState } from "react";
import { FiSearch, FiMail, FiPhone } from "react-icons/fi";
import { CUSTOMERS } from "../../mock/customers";

const formatNaira = (n) => `₦${n.toLocaleString("en-NG")}`;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const CustomerList = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return CUSTOMERS;
    return CUSTOMERS.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-primary">Customers</h1>
      </div>

      <div className="relative mb-4 max-w-sm">
        <FiSearch
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
        />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
        />
      </div>

      <div className="overflow-x-auto border border-primary/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/10 text-left text-primary/50">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Total Spent</th>
              <th className="px-4 py-3 font-medium">Last Order</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr
                key={customer.email}
                className="border-b border-primary/10 last:border-b-0 text-primary hover:bg-primary/5"
              >
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3">{customer.orderCount}</td>
                <td className="px-4 py-3">
                  {formatNaira(customer.totalSpent)}
                </td>
                <td className="px-4 py-3 text-primary/60">
                  {formatDate(customer.lastOrderAt)}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-primary/40"
                >
                  No customers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
