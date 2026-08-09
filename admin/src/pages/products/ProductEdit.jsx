// pages/ProductEdit.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiUpload,
  FiPlus,
  FiTrash2,
  FiStar,
} from "react-icons/fi";
import { PRODUCTS, CATEGORIES } from "../../mock/product";
import CustomSelect from "../../components/ui/CustomSelect";
import ColorPicker from "../../components/ui/ColorPicker";

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Out of Stock", value: "out-of-stock" },
  { label: "Draft", value: "draft" },
];

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(() => PRODUCTS.find((p) => p.slug === id), [id]);

  const categoryOptions = useMemo(
    () =>
      CATEGORIES.filter((c) => c.slug !== "bundles").map((c) => ({
        label: c.name,
        value: c.slug,
      })),
    [],
  );

  const [form, setForm] = useState(
    product || {
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      images: [],
      status: "draft",
      sizes: [],
      colors: [],
    },
  );

  const updateField = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const updateSizeStock = (size, stock) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s) =>
        s.size === size ? { ...s, stock: Number(stock) || 0 } : s,
      ),
    }));
  };

  const removeSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s.size !== size),
    }));
  };

  const addSize = () => {
    const nextLabel = `Size ${form.sizes.length + 1}`;
    setForm((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: nextLabel, stock: 0 }],
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const urls = files.map((file) => URL.createObjectURL(file));

    setForm((prev) => {
      const nextImages = [...prev.images, ...urls];
      return {
        ...prev,
        images: nextImages,
        image: prev.image || nextImages[0],
      };
    });

    e.target.value = "";
  };

  const removeImage = (url) => {
    setForm((prev) => {
      const nextImages = prev.images.filter((img) => img !== url);
      return {
        ...prev,
        images: nextImages,
        image: prev.image === url ? nextImages[0] || "" : prev.image,
      };
    });
  };

  const setAsCover = (url) => {
    updateField("image", url);
  };

  const handleSave = () => {
    navigate("/products");
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-primary/50 mb-4">Product not found.</p>
        <Link
          to="/products"
          className="text-primary underline underline-offset-4 text-sm"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/products"
          className="text-primary/50 hover:text-primary"
          aria-label="Back to products"
        >
          <FiArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-bold text-primary">Edit Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-primary">
              Basic Information
            </h2>

            <div>
              <label className="block text-xs text-primary/50 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-primary/50 mb-1.5">
                  Category
                </label>
                <CustomSelect
                  value={form.category}
                  onChange={(val) => updateField("category", val)}
                  options={categoryOptions}
                  position="down"
                />
              </div>

              <div>
                <label className="block text-xs text-primary/50 mb-1.5">
                  Price
                </label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-primary/50 mb-1.5">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm resize-none"
              />
            </div>
          </div>

          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-primary">Colors</h2>
            <ColorPicker
              value={form.colors}
              onChange={(val) => updateField("colors", val)}
            />
          </div>

          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-primary">
                Sizes & Stock
              </h2>
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-1.5 text-xs text-primary/60 hover:text-primary"
              >
                <FiPlus size={13} />
                Add Size
              </button>
            </div>

            <div className="space-y-2">
              {form.sizes.map((s) => (
                <div key={s.size} className="flex items-center gap-3">
                  <span className="text-sm text-primary/70 w-20 flex-shrink-0">
                    {s.size}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={s.stock}
                    onChange={(e) => updateSizeStock(s.size, e.target.value)}
                    className="w-24 px-3 py-1.5 bg-secondary border border-primary/10 text-primary text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(s.size)}
                    className="text-primary/40 hover:text-red-500"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}

              {form.sizes.length === 0 && (
                <p className="text-sm text-primary/40">No sizes added.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-primary">Images</h2>
              <span className="text-xs text-primary/40">
                {form.images.length} added
              </span>
            </div>

            <div className="w-full aspect-square bg-secondary border border-primary/10 overflow-hidden flex items-center justify-center">
              {form.image ? (
                <img
                  src={form.image}
                  alt={form.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary/30 text-sm">No cover image</span>
              )}
            </div>

            {form.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {form.images.map((img) => (
                  <div
                    key={img}
                    className={`relative group aspect-square border overflow-hidden ${
                      form.image === img
                        ? "border-primary"
                        : "border-primary/10"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setAsCover(img)}
                        aria-label="Set as cover image"
                        className={`w-6 h-6 flex items-center justify-center ${
                          form.image === img
                            ? "text-yellow-400"
                            : "text-white hover:text-yellow-400"
                        }`}
                      >
                        <FiStar size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        aria-label="Remove image"
                        className="w-6 h-6 flex items-center justify-center text-white hover:text-red-400"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <label className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-primary/10 text-primary/70 text-sm cursor-pointer hover:border-primary/30">
              <FiUpload size={14} />
              Add Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-primary">Status</h2>
            <CustomSelect
              value={form.status}
              onChange={(val) => updateField("status", val)}
              options={STATUS_OPTIONS}
              position="down"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="w-full px-4 py-2.5 bg-primary text-secondary text-sm font-medium"
            >
              Save Changes
            </button>
            <Link
              to="/products"
              className="w-full text-center px-4 py-2.5 border border-primary/10 text-primary/60 text-sm hover:text-primary"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
