import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import { CATEGORIES, FABRIC_WORDS } from "../../mock/product";
import { SIZE_OPTIONS, SIZE_LABEL_OPTIONS } from "../../mock/sizes";
import CustomSelect from "../../components/ui/CustomSelect";
import ColorPicker from "../../components/ui/ColorPicker";
import ImageInput from "../../components/ui/ImageInput";
import { slugify } from "../../utils/slugify";

const PRODUCT_CATEGORIES = CATEGORIES.filter((c) => c.slug !== "bundles");
const FABRIC_APPLICABLE_CATEGORIES = ["outerwear", "tops", "bottoms", "caps"];

const emptySize = { size: "", stock: "" };

const ProductCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    fabric: "",
    size: "",
    category: PRODUCT_CATEGORIES[0]?.slug || "",
    image: "",
  });

  const [sizes, setSizes] = useState([{ ...emptySize }]);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState("");

  const fabricApplies = FABRIC_APPLICABLE_CATEGORIES.includes(form.category);
  const hasOneSize = sizes.some((s) => s.size === "One Size");

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCategoryChange = (slug) => {
    setForm((prev) => ({
      ...prev,
      category: slug,
      fabric: FABRIC_APPLICABLE_CATEGORIES.includes(slug) ? prev.fabric : "",
    }));
  };

  const updateSize = (index, field, value) => {
    if (field === "size" && value === "One Size") {
      setSizes([{ size: "One Size", stock: sizes[index].stock }]);
      return;
    }
    setSizes((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  };

  const addSize = () => setSizes((prev) => [...prev, { ...emptySize }]);
  const removeSize = (index) =>
    setSizes((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.price.trim() || !form.category) {
      setError("Name, price, and category are required.");
      return;
    }

    if (fabricApplies && !form.fabric) {
      setError("Select a fabric for this category.");
      return;
    }

    if (colors.length === 0) {
      setError("Select at least one color.");
      return;
    }

    if (!form.image) {
      setError("Add a product image.");
      return;
    }

    const newProduct = {
      slug: slugify(form.name),
      name: form.name.trim(),
      price: form.price.trim(),
      discount: Number(form.discount) || 0,
      ...(fabricApplies ? { fabric: form.fabric } : {}),
      size: form.size,
      sizes: sizes
        .filter((s) => s.size)
        .map((s) => ({ size: s.size, stock: Number(s.stock) || 0 })),
      category: form.category,
      image: form.image,
      images: [form.image],
      colors,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    console.log("New product:", newProduct);

    navigate("/products");
  };

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
        <h1 className="text-xl font-bold text-primary">Create Product</h1>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-500 border border-red-500/30 px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="text-sm text-primary/70">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-secondary border border-primary/10 text-primary"
            />
          </div>

          <div>
            <label className="text-sm text-primary/70">Price</label>
            <input
              type="text"
              placeholder="₦48,500"
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-secondary border border-primary/10 text-primary"
            />
          </div>

          <div>
            <label className="text-sm text-primary/70">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="0"
              value={form.discount}
              onChange={(e) => updateField("discount", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-secondary border border-primary/10 text-primary"
            />
          </div>

          <div>
            <label className="text-sm text-primary/70">Size label</label>
            <div className="mt-1">
              <CustomSelect
                value={form.size}
                onChange={(val) => updateField("size", val)}
                options={SIZE_LABEL_OPTIONS}
                placeholder="Select a size label"
              />
            </div>
          </div>

          <div className={fabricApplies ? "" : "md:col-span-3"}>
            <label className="text-sm text-primary/70">Category</label>
            <div className="mt-1">
              <CustomSelect
                value={form.category}
                onChange={handleCategoryChange}
                options={PRODUCT_CATEGORIES.map((c) => ({
                  label: c.name,
                  value: c.slug,
                }))}
                placeholder="Select a category"
              />
            </div>
          </div>

          {fabricApplies && (
            <div className="md:col-span-2">
              <label className="text-sm text-primary/70">Fabric</label>
              <div className="mt-1">
                <CustomSelect
                  value={form.fabric}
                  onChange={(val) => updateField("fabric", val)}
                  options={FABRIC_WORDS}
                  placeholder="Select a fabric"
                />
              </div>
            </div>
          )}

          <div className="md:col-span-3">
            <label className="text-sm text-primary/70 block mb-1">
              Product Image
            </label>
            <ImageInput
              value={form.image}
              onChange={(val) => updateField("image", val)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-primary/70">Sizes & Stock</label>
            {!hasOneSize && (
              <button
                type="button"
                onClick={addSize}
                className="text-primary/60 hover:text-primary"
              >
                <FiPlus size={16} />
              </button>
            )}
          </div>
          {sizes.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2 items-center">
              <div className="flex-1">
                <CustomSelect
                  value={s.size}
                  onChange={(val) => updateSize(i, "size", val)}
                  options={SIZE_OPTIONS}
                  placeholder="Size"
                />
              </div>
              <input
                type="number"
                placeholder="Stock"
                value={s.stock}
                onChange={(e) => updateSize(i, "stock", e.target.value)}
                className="w-24 px-3 py-2 bg-secondary border border-primary/10 text-primary"
              />
              <button
                type="button"
                onClick={() => removeSize(i)}
                className="text-primary/40 hover:text-red-500"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="text-sm text-primary/70 block mb-2">Colors</label>
          <ColorPicker value={colors} onChange={setColors} />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-primary text-secondary font-medium"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
