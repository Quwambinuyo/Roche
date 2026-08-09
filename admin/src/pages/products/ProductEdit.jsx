import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { PRODUCTS, CATEGORIES } from "../../mock/product";
import ProductDetailsForm from "./ProductDetailForm";
import ProductMediaPanel from "./ProductMediaPanel";

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

  const updateColors = (colors) => {
    updateField("colors", colors);
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
        <ProductDetailsForm
          form={form}
          categoryOptions={categoryOptions}
          onUpdateField={updateField}
          onUpdateColors={updateColors}
          onUpdateSizeStock={updateSizeStock}
          onRemoveSize={removeSize}
          onAddSize={addSize}
        />

        <ProductMediaPanel
          form={form}
          onUpdateField={updateField}
          onImagesChange={handleImagesChange}
          onRemoveImage={removeImage}
          onSetCover={setAsCover}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default ProductEdit;
