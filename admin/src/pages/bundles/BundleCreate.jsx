import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import BundleDetailsForm from "./BundleDetailForm";
import ProductMediaPanel from "../../pages/products/ProductMediaPanel";

const BundleCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: 0,
    minUnits: 1,
    items: [],
    image: "",
    images: [],
    status: "draft",
  });

  const updateField = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const updateItems = (items) => {
    updateField("items", items);
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
    navigate("/bundles");
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/bundles"
          className="text-primary/50 hover:text-primary"
          aria-label="Back to bundles"
        >
          <FiArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-bold text-primary">Create Bundle</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BundleDetailsForm
          form={form}
          onUpdateField={updateField}
          onUpdateItems={updateItems}
        />

        <ProductMediaPanel
          form={form}
          onUpdateField={updateField}
          onImagesChange={handleImagesChange}
          onRemoveImage={removeImage}
          onSetCover={setAsCover}
          onSave={handleSave}
          saveLabel="Create Bundle"
          cancelTo="/bundles"
        />
      </div>
    </div>
  );
};

export default BundleCreate;
