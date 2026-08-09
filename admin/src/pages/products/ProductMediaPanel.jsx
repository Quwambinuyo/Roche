import React from "react";
import { Link } from "react-router-dom";
import { FiUpload, FiTrash2, FiStar } from "react-icons/fi";
import CustomSelect from "../../components/ui/CustomSelect";
import RevealImage from "../../components/ui/RevealImage";

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Out of Stock", value: "out-of-stock" },
  { label: "Draft", value: "draft" },
];

const ProductMediaPanel = ({
  form,
  onUpdateField,
  onImagesChange,
  onRemoveImage,
  onSetCover,
  onSave,
  saveLabel = "Save Changes",
  cancelTo = "/products",
}) => {
  return (
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
            <RevealImage
              key={form.image}
              src={form.image}
              alt={form.name}
              className="w-full h-full"
            />
          ) : (
            <span className="text-primary/30 text-sm">No cover image</span>
          )}
        </div>

        {form.images.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {form.images.map((img, index) => (
              <div
                key={img}
                className={`relative group aspect-square border overflow-hidden ${
                  form.image === img ? "border-primary" : "border-primary/10"
                }`}
              >
                <RevealImage
                  src={img}
                  alt=""
                  className="w-full h-full"
                  delay={index * 60}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onSetCover(img)}
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
                    onClick={() => onRemoveImage(img)}
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
            onChange={onImagesChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-primary">Status</h2>
        <CustomSelect
          value={form.status}
          onChange={(val) => onUpdateField("status", val)}
          options={STATUS_OPTIONS}
          position="down"
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onSave}
          className="w-full px-4 py-2.5 bg-primary text-secondary text-sm font-medium"
        >
          {saveLabel}
        </button>
        <Link
          to={cancelTo}
          className="w-full text-center px-4 py-2.5 border border-primary/10 text-primary/60 text-sm hover:text-primary"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default ProductMediaPanel;
