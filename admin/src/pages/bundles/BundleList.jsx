import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { BUNDLES, PRODUCTS } from "../../mock/product";

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-500/10 text-green-500",
    "out-of-stock": "bg-red-500/10 text-red-500",
    draft: "bg-primary/10 text-primary/60",
  };

  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
        styles[status] || styles.draft
      }`}
    >
      {status?.replace("-", " ") || "draft"}
    </span>
  );
};

const getItemNames = (bundle) =>
  bundle.items
    .map((slug) => PRODUCTS.find((p) => p.slug === slug)?.name)
    .filter(Boolean);

const BundleList = () => {
  const [bundles, setBundles] = useState(BUNDLES);
  const [search, setSearch] = useState("");
  const [bundleToDelete, setBundleToDelete] = useState(null);

  const filtered = useMemo(() => {
    return bundles.filter((b) =>
      b.name.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }, [bundles, search]);

  const confirmDelete = () => {
    setBundles((prev) => prev.filter((b) => b.slug !== bundleToDelete.slug));
    setBundleToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center  mb-6">
        <Link
          to="/bundles/create"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-secondary font-medium text-sm"
        >
          <FiPlus size={16} />
          Add Bundle
        </Link>
      </div>

      <div className="relative mb-4 max-w-sm">
        <FiSearch
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
        />
        <input
          type="text"
          placeholder="Search bundles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
        />
      </div>

      <div className="overflow-x-auto border border-primary/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/10 text-left text-primary/50">
              <th className="px-4 py-3 font-medium">Bundle</th>
              <th className="px-4 py-3 font-medium">Items Included</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Discount</th>
              <th className="px-4 py-3 font-medium">Min Units</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((bundle) => {
              const itemNames = getItemNames(bundle);
              return (
                <tr
                  key={bundle.slug}
                  className="border-b border-primary/10 last:border-b-0 text-primary hover:bg-primary/5"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={bundle.image}
                        alt={bundle.name}
                        className="w-10 h-10 object-cover bg-primary/5"
                      />
                      <span className="font-medium">{bundle.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-primary/70">
                    <span className="line-clamp-1">
                      {itemNames.join(", ") || "No items"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{bundle.price}</td>
                  <td className="px-4 py-3">
                    {bundle.discount > 0 ? `${bundle.discount}%` : "—"}
                  </td>
                  <td className="px-4 py-3">{bundle.minUnits}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={bundle.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        to={`/bundles/${bundle.slug}/edit`}
                        className="text-primary/50 hover:text-primary"
                        aria-label={`Edit ${bundle.name}`}
                      >
                        <FiEdit2 size={15} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setBundleToDelete(bundle)}
                        className="text-primary/50 hover:text-red-500"
                        aria-label={`Delete ${bundle.name}`}
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-primary/40"
                >
                  No bundles match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {bundleToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-secondary border border-primary/10 p-6 max-w-sm w-full">
            <h2 className="text-primary font-bold mb-2">Delete bundle?</h2>
            <p className="text-primary/60 text-sm mb-6">
              This will remove{" "}
              <span className="text-primary">{bundleToDelete.name}</span> from
              the list. This can't be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setBundleToDelete(null)}
                className="px-4 py-2 text-sm text-primary/60 hover:text-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BundleList;
