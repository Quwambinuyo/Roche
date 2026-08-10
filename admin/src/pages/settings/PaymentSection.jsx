import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSettings } from "../../context/SettingContext";
import {
  SectionCard,
  Field,
  TextInput,
  SelectInput,
  Toggle,
  PrimaryButton,
} from "./shared";

const PROVIDER_OPTIONS = [
  { value: "paystack", label: "Paystack" },
  { value: "flutterwave", label: "Flutterwave" },
];

const METHOD_LABELS = {
  card: "Card payments",
  bankTransfer: "Bank transfer",
  ussd: "USSD",
  payOnDelivery: "Pay on delivery",
};

const SecretField = ({ label, value, onChange, placeholder }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Field label={label}>
      <div className="flex items-stretch">
        <TextInput
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 border-r-0"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="flex items-center justify-center border border-black bg-white px-3 hover:bg-neutral-100"
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </Field>
  );
};

const PaymentsSection = () => {
  const { settings, updateSection } = useSettings();
  const [form, setForm] = useState(settings.payments);
  const [dirty, setDirty] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const setMethod = (key, value) => {
    setForm((prev) => ({
      ...prev,
      acceptedMethods: { ...prev.acceptedMethods, [key]: value },
    }));
    setDirty(true);
  };

  const handleSave = () => {
    updateSection("payments", form, "Updated payment settings");
    setDirty(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Payment provider"
        description="Connect the provider used to process checkout payments."
      >
        <div className="flex flex-col gap-5">
          <Field label="Active provider">
            <SelectInput
              options={PROVIDER_OPTIONS}
              value={form.provider}
              onChange={(e) => setField("provider", e.target.value)}
              className="max-w-xs"
            />
          </Field>

          {form.provider === "paystack" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Paystack public key">
                <TextInput
                  value={form.paystackPublicKey}
                  onChange={(e) =>
                    setField("paystackPublicKey", e.target.value)
                  }
                  placeholder="pk_live_xxxxxxxx"
                />
              </Field>
              <SecretField
                label="Paystack secret key"
                value={form.paystackSecretKey}
                onChange={(e) => setField("paystackSecretKey", e.target.value)}
                placeholder="sk_live_xxxxxxxx"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Flutterwave public key">
                <TextInput
                  value={form.flutterwavePublicKey}
                  onChange={(e) =>
                    setField("flutterwavePublicKey", e.target.value)
                  }
                  placeholder="FLWPUBK-xxxxxxxx"
                />
              </Field>
              <SecretField
                label="Flutterwave secret key"
                value={form.flutterwaveSecretKey}
                onChange={(e) =>
                  setField("flutterwaveSecretKey", e.target.value)
                }
                placeholder="FLWSECK-xxxxxxxx"
              />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Accepted payment methods"
        description="Shown to customers at checkout."
      >
        <div className="flex flex-col gap-3">
          {Object.entries(METHOD_LABELS).map(([key, label]) => (
            <Toggle
              key={key}
              checked={form.acceptedMethods[key]}
              onChange={(value) => setMethod(key, value)}
              label={label}
            />
          ))}
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

export default PaymentsSection;
