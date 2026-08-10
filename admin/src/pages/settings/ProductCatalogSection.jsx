import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useSettings } from "../../context/SettingContext";
import {
  SectionCard,
  Field,
  TextInput,
  SecondaryButton,
  IconButton,
} from "./shared";

const TagList = ({ items, onAdd, onRemove, placeholder }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed || items.includes(trimmed)) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="flex items-center gap-2 border border-black px-3 py-1.5 font-mono text-xs"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="text-neutral-500 hover:text-black"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        {items.length === 0 ? (
          <span className="font-mono text-xs text-neutral-500">
            None added yet
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={placeholder}
          className="max-w-xs"
        />
        <SecondaryButton
          onClick={handleAdd}
          className="flex items-center gap-2"
        >
          <Plus size={14} />
          Add
        </SecondaryButton>
      </div>
    </div>
  );
};

const ProductsCatalogSection = () => {
  const { settings, updateSection } = useSettings();
  const pc = settings.productsCatalog;
  const [newTier, setNewTier] = useState({ minQty: "", discountPercent: "" });

  const handleAddCategory = (value) => {
    updateSection(
      "productsCatalog",
      (prev) => ({ ...prev, categories: [...prev.categories, value] }),
      `Added category ${value}`,
    );
  };

  const handleRemoveCategory = (value) => {
    updateSection(
      "productsCatalog",
      (prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== value),
      }),
      `Removed category ${value}`,
    );
  };

  const handleAddFabric = (value) => {
    updateSection(
      "productsCatalog",
      (prev) => ({ ...prev, fabricTypes: [...prev.fabricTypes, value] }),
      `Added fabric type ${value}`,
    );
  };

  const handleRemoveFabric = (value) => {
    updateSection(
      "productsCatalog",
      (prev) => ({
        ...prev,
        fabricTypes: prev.fabricTypes.filter((f) => f !== value),
      }),
      `Removed fabric type ${value}`,
    );
  };

  const handleAddTier = () => {
    const minQty = Number(newTier.minQty);
    const discountPercent = Number(newTier.discountPercent);
    if (Number.isNaN(minQty) || Number.isNaN(discountPercent)) return;
    updateSection(
      "productsCatalog",
      (prev) => ({
        ...prev,
        discountTiers: [
          ...prev.discountTiers,
          { id: `tier-${Date.now()}`, minQty, discountPercent },
        ],
      }),
      `Added discount tier: ${minQty}+ units at ${discountPercent}% off`,
    );
    setNewTier({ minQty: "", discountPercent: "" });
  };

  const handleRemoveTier = (tier) => {
    updateSection(
      "productsCatalog",
      (prev) => ({
        ...prev,
        discountTiers: prev.discountTiers.filter((t) => t.id !== tier.id),
      }),
      `Removed discount tier: ${tier.minQty}+ units at ${tier.discountPercent}% off`,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Categories"
        description="Used across product creation and storefront filters."
      >
        <TagList
          items={pc.categories}
          onAdd={handleAddCategory}
          onRemove={handleRemoveCategory}
          placeholder="New category"
        />
      </SectionCard>

      <SectionCard
        title="Fabric types"
        description="Used on product detail pages and the size guide."
      >
        <TagList
          items={pc.fabricTypes}
          onAdd={handleAddFabric}
          onRemove={handleRemoveFabric}
          placeholder="New fabric type"
        />
      </SectionCard>

      <SectionCard
        title="Bulk-pricing discount tiers"
        description="Applied automatically at checkout when a bundle quantity is reached."
      >
        <div className="flex flex-col gap-4">
          <div className="border border-black">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black bg-neutral-50">
                  <th className="px-4 py-2 text-left font-mono text-xs font-bold uppercase">
                    Minimum quantity
                  </th>
                  <th className="px-4 py-2 text-left font-mono text-xs font-bold uppercase">
                    Discount
                  </th>
                  <th className="px-4 py-2 text-right font-mono text-xs font-bold uppercase">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {pc.discountTiers.map((tier) => (
                  <tr
                    key={tier.id}
                    className="border-b border-black last:border-b-0"
                  >
                    <td className="px-4 py-2 font-mono text-sm">
                      {tier.minQty}+ units
                    </td>
                    <td className="px-4 py-2 font-mono text-sm">
                      {tier.discountPercent}% off
                    </td>
                    <td className="px-4 py-2 text-right">
                      <IconButton onClick={() => handleRemoveTier(tier)}>
                        <Trash2 size={14} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border border-dashed border-black p-4 sm:flex-row sm:items-end">
            <Field label="Minimum quantity">
              <TextInput
                type="number"
                min={1}
                value={newTier.minQty}
                onChange={(e) =>
                  setNewTier((prev) => ({ ...prev, minQty: e.target.value }))
                }
                placeholder="5"
                className="w-32"
              />
            </Field>
            <Field label="Discount %">
              <TextInput
                type="number"
                min={0}
                max={100}
                value={newTier.discountPercent}
                onChange={(e) =>
                  setNewTier((prev) => ({
                    ...prev,
                    discountPercent: e.target.value,
                  }))
                }
                placeholder="10"
                className="w-32"
              />
            </Field>
            <SecondaryButton
              onClick={handleAddTier}
              className="flex items-center gap-2"
            >
              <Plus size={14} />
              Add tier
            </SecondaryButton>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default ProductsCatalogSection;
