import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { PRODUCTS, CATEGORIES } from "../../mock/product";
import { totalStock } from "../../utils/stock";
import { formatDate } from "../../utils/format";
import CustomSelect from "../../components/ui/CustomSelect";
import RevealImage from "../../components/ui/RevealImage";
import SearchInput from "../../components/ui/SearchInput";
import AddButton from "../../components/ui/AddButton";
import StatusBadge from "../../components/ui/StatusBadge";
import ConfirmDeleteModal from "../../components/ui/ConfirmdeleteModal";
import DataTable from "../../components/ui/DataTable";

const PRODUCT_STATUS_STYLES = {
  active: "bg-green-500/10 text-green-500",
  "out-of-stock": "bg-red-500/10 text-red-500",
  draft: "bg-primary/10 text-primary/60",
};

const STATUS_FILTER_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Active", value: "active" },
  { label: "Out of Stock", value: "out-of-stock" },
  { label: "Draft", value: "draft" },
];

const ProductList = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [productToDelete, setProductToDelete] = useState(null);

  const categoryOptions = useMemo(
    () => [
      { label: "All Categories", value: "all" },
      ...CATEGORIES.filter((c) => c.slug !== "bundles").map((c) => ({
        label: c.name,
        value: c.slug,
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      const matchesStatus = status === "all" || p.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.slug !== productToDelete.slug));
    setProductToDelete(null);
  };

  const columns = [
    {
      key: "product",
      header: "Product",
      render: (product, index) => (
        <div className="flex items-center gap-3">
          <RevealImage
            src={product.image}
            alt={product.name}
            className="w-10 h-10 bg-primary/5 flex-shrink-0"
            delay={index * 40}
          />
          <span className="font-medium">{product.name}</span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cellClassName: "capitalize text-primary/70",
      render: (product) => product.category,
    },
    {
      key: "price",
      header: "Price",
      render: (product) => product.price,
    },
    {
      key: "stock",
      header: "Stock",
      render: (product) =>
        totalStock(product) === 0 ? (
          <span className="text-red-500">0</span>
        ) : (
          totalStock(product)
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (product) => (
        <StatusBadge
          status={product.status}
          styles={PRODUCT_STATUS_STYLES}
          fallbackKey="draft"
        />
      ),
    },
    {
      key: "dateAdded",
      header: "Date Added",
      cellClassName: "text-primary/60",
      render: (product) =>
        product.createdAt ? formatDate(product.createdAt) : "—",
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      render: (product) => (
        <div className="flex items-center justify-end gap-3">
          <Link
            to={`/products/${product.slug}/edit`}
            className="text-primary/50 hover:text-primary"
            aria-label={`Edit ${product.name}`}
          >
            <FiEdit2 size={15} />
          </Link>
          <button
            type="button"
            onClick={() => setProductToDelete(product)}
            className="text-primary/50 hover:text-red-500"
            aria-label={`Delete ${product.name}`}
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
        <AddButton label="Add Product" to="/products/create" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search products..."
          className="flex-1"
        />

        <div className="sm:w-56">
          <CustomSelect
            value={category}
            onChange={setCategory}
            options={categoryOptions}
            position="down"
          />
        </div>

        <div className="sm:w-48">
          <CustomSelect
            value={status}
            onChange={setStatus}
            options={STATUS_FILTER_OPTIONS}
            position="down"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(product) => product.slug}
        emptyMessage="No products match your search."
      />

      <ConfirmDeleteModal
        open={!!productToDelete}
        title="Delete product?"
        message={
          <>
            This will remove{" "}
            <span className="text-primary">{productToDelete?.name}</span> from
            the list. This can't be undone.
          </>
        }
        onCancel={() => setProductToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProductList;
