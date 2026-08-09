// pages/ProductList.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { PRODUCTS, CATEGORIES } from "../../mock/product"; // adjust path

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

const totalStock = (product) =>
  product.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || 0;

const ProductList = () => {
  // Local state seeded from mock data. Swap for context/API data later —
  // deleting here won't persist since PRODUCTS is a static import.
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [productToDelete, setProductToDelete] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.slug !== productToDelete.slug));
    setProductToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-primary">Products</h1>
        <Link
          to="/products/create"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-secondary font-medium text-sm"
        >
          <FiPlus size={16} />
          Add Product
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.filter((c) => c.slug !== "bundles").map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border border-primary/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/10 text-left text-primary/50">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.slug}
                className="border-b border-primary/10 last:border-b-0 text-primary hover:bg-primary/5"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover bg-primary/5"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-primary/70">
                  {product.category}
                </td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3">
                  {totalStock(product) === 0 ? (
                    <span className="text-red-500">0</span>
                  ) : (
                    totalStock(product)
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-4 py-3">
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
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-primary/40"
                >
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {productToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-secondary border border-primary/10 p-6 max-w-sm w-full">
            <h2 className="text-primary font-bold mb-2">Delete product?</h2>
            <p className="text-primary/60 text-sm mb-6">
              This will remove{" "}
              <span className="text-primary">{productToDelete.name}</span> from
              the list. This can't be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
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

export default ProductList;
