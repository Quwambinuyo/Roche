import React, { useRef, useState } from "react";
import {
  SectionCard,
  Field,
  TextInput,
  PrimaryButton,
} from "../../components/ui/SettingsUI";
import CountryPicker from "../../components/ui/CountryPicker";

const SOCIAL_LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/yourbrand",
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "https://tiktok.com/@yourbrand",
  },
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/yourbrand",
  },
  {
    key: "twitter",
    label: "X (Twitter)",
    placeholder: "https://x.com/yourbrand",
  },
];

const DEFAULT_PROFILE = {
  storeName: "",
  contactEmail: "",
  contactPhone: "",
  businessAddress: "",
  businessCountry: "NG",
  logoUrl: "",
  faviconUrl: "",
  socialLinks: {
    instagram: "",
    tiktok: "",
    facebook: "",
    twitter: "",
  },
};

const ImageUploadField = ({ label, value, onChange, hint }) => {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(URL.createObjectURL(file), file);
  };

  return (
    <Field label={label}>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-primary/20 bg-primary/5">
          {value ? (
            <img
              src={value}
              alt={label}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-mono text-[10px] text-primary/40">None</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="border border-primary/20 px-3 py-1.5 font-mono text-xs text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
          >
            Upload
          </button>

          {hint ? (
            <span className="font-mono text-[10px] text-primary/40">
              {hint}
            </span>
          ) : null}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>
    </Field>
  );
};

const StoreProfileSection = ({ initialData, onSave }) => {
  const [form, setForm] = useState(initialData ?? DEFAULT_PROFILE);
  const [dirty, setDirty] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setDirty(true);
  };

  const setSocialLink = (key, value) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [key]: value,
      },
    }));

    setDirty(true);
  };

  const handleSave = () => {
    onSave?.(form);
    setDirty(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard
        title="Store identity"
        description="How your store name and branding appear across the site."
      >
        <div className="flex flex-col gap-5">
          <Field label="Store name">
            <TextInput
              value={form.storeName}
              onChange={(e) => setField("storeName", e.target.value)}
              placeholder="Roche"
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <ImageUploadField
              label="Logo"
              value={form.logoUrl}
              hint="PNG or SVG, transparent background recommended"
              onChange={(url) => setField("logoUrl", url)}
            />

            <ImageUploadField
              label="Favicon"
              value={form.faviconUrl}
              hint="Square image, at least 64x64"
              onChange={(url) => setField("faviconUrl", url)}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Contact details"
        description="Used on invoices, order emails, and your contact page."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Contact email">
            <TextInput
              type="email"
              value={form.contactEmail}
              onChange={(e) => setField("contactEmail", e.target.value)}
              placeholder="hello@yourbrand.com"
            />
          </Field>

          <Field label="Contact phone">
            <TextInput
              value={form.contactPhone}
              onChange={(e) => setField("contactPhone", e.target.value)}
              placeholder="+234 800 000 0000"
            />
          </Field>

          <Field label="Business country">
            <CountryPicker
              value={form.businessCountry}
              onChange={(code) => setField("businessCountry", code)}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Business address">
              <textarea
                value={form.businessAddress}
                onChange={(e) => setField("businessAddress", e.target.value)}
                rows={3}
                placeholder="12 Admiralty Way, Lekki Phase 1, Lagos"
                className="w-full resize-y border border-primary/20 bg-transparent p-3 font-mono text-sm text-primary placeholder:text-primary/40 focus:border-primary/40 focus:outline-none"
              />
            </Field>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Social links"
        description="Shown in your storefront footer and header."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SOCIAL_LINKS.map(({ key, label, placeholder }) => (
            <Field key={key} label={label}>
              <TextInput
                value={form.socialLinks[key]}
                onChange={(e) => setSocialLink(key, e.target.value)}
                placeholder={placeholder}
              />
            </Field>
          ))}
        </div>
      </SectionCard>

      <div className="flex items-center justify-end gap-3">
        {dirty ? (
          <span className="font-mono text-xs text-primary/60">
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
