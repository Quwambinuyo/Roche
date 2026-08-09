import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BUNDLES } from "../../mock/product";
import BundleDetailsForm from "./BundleDetailForm";
import ProductMediaPanel from "../../pages/products/ProductMediaPanel";

const BundleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bundle = useMemo(() => BUNDLES.find((b) => b.slug === id), [id]);

  const [form, setForm] = useState(
    bundle || {
      name: "",
      price: "",
      discount: 0,
      minUnits: 1,
      items: [],
      image: "",
      images: [],
      status: "draft",
    },
  );

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

  if (!bundle) {
    return (
      <div className="text-center py-20">
        <p className="text-primary/50 mb-4">Bundle not found.</p>
        <Link
          to="/bundles"
          className="text-primary underline underline-offset-4 text-sm"
        >
          Back to bundles
        </Link>
      </div>
    );
  }

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
        <h1 className="text-xl font-bold text-primary">Edit Bundle</h1>
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
          cancelTo="/bundles"
        />
      </div>
    </div>
  );
};

export default BundleEdit;
