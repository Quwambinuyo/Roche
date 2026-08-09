import React from "react";
import { FiX, FiUpload } from "react-icons/fi";

const CategoryFormModal = ({
  open,
  editingCategory,
  form,
  error,
  onNameChange,
  onSlugChange,
  onImageChange,
  onSave,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-secondary border border-primary/10 max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-primary font-bold">
            {editingCategory ? "Edit Category" : "Add Category"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-primary/50 hover:text-primary"
          >
            <FiX size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 border border-red-500/30 px-3 py-2">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-primary/50 mb-1.5">
              Category Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-primary/50 mb-1.5">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-primary/50 mb-1.5">
              Image
            </label>
            <div className="w-full aspect-video bg-secondary border border-primary/10 overflow-hidden flex items-center justify-center mb-2">
              {form.image ? (
                <img
                  src={form.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary/30 text-sm">No image</span>
              )}
            </div>
            <label className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-primary/10 text-primary/70 text-sm cursor-pointer hover:border-primary/30">
              <FiUpload size={14} />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={onSave}
          className="mt-6 w-full px-4 py-2 bg-primary text-secondary text-sm font-medium"
        >
          {editingCategory ? "Save Changes" : "Add Category"}
        </button>
      </div>
    </div>
  );
};

export default CategoryFormModal;
