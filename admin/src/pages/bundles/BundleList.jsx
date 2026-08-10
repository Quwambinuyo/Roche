import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { BUNDLES, PRODUCTS } from "../../mock/product";
import RevealImage from "../../components/ui/RevealImage";
import SearchInput from "../../components/ui/SearchInput";
import AddButton from "../../components/ui/AddButton";
import StatusBadge from "../../components/ui/StatusBadge";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import DataTable from "../../components/ui/DataTable";
import { formatDateTime } from "../../utils/format";

const BUNDLE_STATUS_STYLES = {
  active: "bg-green-500/10 text-green-500",
  "out-of-stock": "bg-red-500/10 text-red-500",
  draft: "bg-primary/10 text-primary/60",
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

  const columns = [
    {
      key: "bundle",
      header: "Bundle",
      headerClassName: "min-w-[220px]",
      cellClassName: "whitespace-nowrap",
      render: (bundle, index) => (
        <div className="flex items-center gap-3">
          <RevealImage
            src={bundle.image}
            alt={bundle.name}
            className="w-10 h-10 bg-primary/5 flex-shrink-0"
            delay={index * 40}
          />
          <span className="font-medium">{bundle.name}</span>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items Included",
      headerClassName: "min-w-[240px]",
      cellClassName: "text-primary/70",
      render: (bundle) => (
        <span className="line-clamp-1">
          {getItemNames(bundle).join(", ") || "No items"}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      headerClassName: "min-w-[100px]",
      cellClassName: "whitespace-nowrap",
      render: (bundle) => bundle.price,
    },
    {
      key: "discount",
      header: "Discount",
      headerClassName: "min-w-[100px]",
      cellClassName: "whitespace-nowrap",
      render: (bundle) => (bundle.discount > 0 ? `${bundle.discount}%` : "—"),
    },
    {
      key: "minUnits",
      header: "Min Units",
      headerClassName: "min-w-[100px]",
      cellClassName: "whitespace-nowrap",
      render: (bundle) => bundle.minUnits,
    },
    {
      key: "status",
      header: "Status",
      headerClassName: "min-w-[110px]",
      render: (bundle) => (
        <StatusBadge
          status={bundle.status}
          styles={BUNDLE_STATUS_STYLES}
          fallbackKey="draft"
        />
      ),
    },
    {
      key: "dateAdded",
      header: "Date Added",
      headerClassName: "min-w-[170px]",
      cellClassName: "text-primary/60 whitespace-nowrap",
      render: (bundle) => formatDateTime(bundle.createdAt),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right min-w-[90px]",
      cellClassName: "whitespace-nowrap",
      render: (bundle) => (
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
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <AddButton label="Add Bundle" to="/bundles/create" />
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search bundles..."
        className="mb-4 max-w-sm"
      />

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(bundle) => bundle.slug}
        emptyMessage="No bundles match your search."
      />

      <ConfirmDeleteModal
        open={!!bundleToDelete}
        title="Delete bundle?"
        message={
          <>
            This will remove{" "}
            <span className="text-primary">{bundleToDelete?.name}</span> from
            the list. This can't be undone.
          </>
        }
        onCancel={() => setBundleToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default BundleList;
