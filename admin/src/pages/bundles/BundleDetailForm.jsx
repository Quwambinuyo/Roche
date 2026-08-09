import React from "react";
import BundleItemPicker from "./BundleItemPicker";

const BundleDetailsForm = ({ form, onUpdateField, onUpdateItems }) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-primary">
          Basic Information
        </h2>

        <div>
          <label className="block text-xs text-primary/50 mb-1.5">
            Bundle Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onUpdateField("name", e.target.value)}
            className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          <div>
            <label className="block text-xs text-primary/50 mb-1.5">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.discount}
              onChange={(e) =>
                onUpdateField("discount", Number(e.target.value) || 0)
              }
              className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-primary/50 mb-1.5">
              Min Units
            </label>
            <input
              type="number"
              min="1"
              value={form.minUnits}
              onChange={(e) =>
                onUpdateField("minUnits", Number(e.target.value) || 1)
              }
              className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
            />
          </div>
        </div>
      </div>

      <div className="border border-primary/10 bg-secondary/40 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-primary">
          Products in Bundle
        </h2>
        <BundleItemPicker value={form.items} onChange={onUpdateItems} />
      </div>
    </div>
  );
};

export default BundleDetailsForm;
