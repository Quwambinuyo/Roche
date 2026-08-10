import React, { useState } from "react";
import { useSettings } from "../../context/SettingContext";
import {
  SectionCard,
  Field,
  TextInput,
  SelectInput,
  PrimaryButton,
} from "./shared";

const CURRENCY_OPTIONS = [
  { value: "NGN", label: "NGN — Nigerian Naira (₦)" },
  { value: "USD", label: "USD — US Dollar ($)" },
  { value: "GBP", label: "GBP — British Pound (£)" },
];

const StoreProfileSection = () => {
  const { settings, updateSection } = useSettings();
  const [form, setForm] = useState(settings.storeProfile);
  const [logoPreview, setLogoPreview] = useState(settings.storeProfile.logoUrl);
  const [dirty, setDirty] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const setAddressField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
    setDirty(true);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setLogoPreview(result);
      setField("logoUrl", result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateSection("storeProfile", form, "Updated store profile");
    setDirty(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Store identity"
        description="How your store name and logo appear across the admin panel and customer storefront."
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-black bg-white overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Store logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-mono text-[10px] text-neutral-400">
                  NO LOGO
                </span>
              )}
            </div>
            <label className="cursor-pointer border border-black bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-black hover:bg-neutral-100">
              Upload logo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Store name">
              <TextInput
                value={form.storeName}
                onChange={(e) => setField("storeName", e.target.value)}
                placeholder="Roche"
              />
            </Field>
            <Field label="Currency">
              <SelectInput
                options={CURRENCY_OPTIONS}
                value={form.currency}
                onChange={(e) => setField("currency", e.target.value)}
              />
            </Field>
            <Field label="Contact email">
              <TextInput
                type="email"
                value={form.contactEmail}
                onChange={(e) => setField("contactEmail", e.target.value)}
                placeholder="hello@roche.ng"
              />
            </Field>
            <Field label="Contact phone">
              <TextInput
                type="tel"
                value={form.contactPhone}
                onChange={(e) => setField("contactPhone", e.target.value)}
                placeholder="+234 800 000 0000"
              />
            </Field>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Business address"
        description="Used on invoices and shipping labels."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Street address" className="sm:col-span-2">
            <TextInput
              value={form.address.street}
              onChange={(e) => setAddressField("street", e.target.value)}
              placeholder="12 Adeola Odeku Street"
            />
          </Field>
          <Field label="City">
            <TextInput
              value={form.address.city}
              onChange={(e) => setAddressField("city", e.target.value)}
              placeholder="Lagos"
            />
          </Field>
          <Field label="State">
            <TextInput
              value={form.address.state}
              onChange={(e) => setAddressField("state", e.target.value)}
              placeholder="Lagos State"
            />
          </Field>
          <Field label="Country">
            <TextInput
              value={form.address.country}
              onChange={(e) => setAddressField("country", e.target.value)}
              placeholder="Nigeria"
            />
          </Field>
        </div>
      </SectionCard>

      <div className="flex items-center justify-end gap-3">
        {dirty ? (
          <span className="font-mono text-xs text-neutral-500">
            Unsaved changes
          </span>
        ) : null}
        <PrimaryButton onClick={handleSave} disabled={!dirty}>
          Save changes
        </PrimaryButton>
      </div>
    </div>
  );
};

export default StoreProfileSection;
