import React from "react";

const DeleteCategoryModal = ({ category, onCancel, onConfirm }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-secondary border border-primary/10 p-6 max-w-sm w-full">
        <h2 className="text-primary font-bold mb-2">Delete category?</h2>
        <p className="text-primary/60 text-sm mb-6">
          This will remove <span className="text-primary">{category.name}</span>{" "}
          from the list. Products already assigned to it won't be deleted, but
          they'll no longer match a valid category.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-primary/60 hover:text-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
