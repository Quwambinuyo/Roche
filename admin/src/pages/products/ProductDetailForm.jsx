import React from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import CustomSelect from "../../components/ui/CustomSelect";
import ColorPicker from "../../components/ui/ColorPicker";

const ProductDetailsForm = ({
  form,
  categoryOptions,
  onUpdateField,
  onUpdateColors,
  onUpdateSizeStock,
  onRemoveSize,
  onAddSize,
}) => {
  return (
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
            onChange={(e) => onUpdateField("name", e.target.value)}
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
              onChange={(val) => onUpdateField("category", val)}
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
              onChange={(e) => onUpdateField("price", e.target.value)}
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
            onChange={(e) => onUpdateField("description", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm resize-none"
          />
        </div>
      </div>

      <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-primary">Colors</h2>
        <ColorPicker value={form.colors} onChange={onUpdateColors} />
      </div>

      <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-primary">Sizes & Stock</h2>
          <button
            type="button"
            onClick={onAddSize}
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
                onChange={(e) => onUpdateSizeStock(s.size, e.target.value)}
                className="w-24 px-3 py-1.5 bg-secondary border border-primary/10 text-primary text-sm"
              />
              <button
                type="button"
                onClick={() => onRemoveSize(s.size)}
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
  );
};

export default ProductDetailsForm;
