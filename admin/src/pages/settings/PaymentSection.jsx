import React, { useState } from "react";
import {
  SectionCard,
  Field,
  TextInput,
  SelectInput,
  Toggle,
  PrimaryButton,
} from "../../components/ui/SettingsUI";
import CustomSelect from "../../components/ui/CustomSelect";

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

const DEFAULT_PAYMENTS = {
  provider: "paystack",
  paystackPublicKey: "",
  paystackSecretKey: "",
  flutterwavePublicKey: "",
  flutterwaveSecretKey: "",
  acceptedMethods: {
    card: true,
    bankTransfer: true,
    ussd: false,
    payOnDelivery: false,
  },
};

const PaymentsSection = ({ initialData, onSave }) => {
  const [form, setForm] = useState(initialData ?? DEFAULT_PAYMENTS);
  const [dirty, setDirty] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setDirty(true);
  };

  const setMethod = (key, value) => {
    setForm((prev) => ({
      ...prev,
      acceptedMethods: {
        ...prev.acceptedMethods,
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
        title="Payment provider"
        description="Configure the payment gateway used to process customer payments."
      >
        <div className="flex flex-col gap-5">
          <Field label="Provider">
            <CustomSelect
              options={PROVIDER_OPTIONS}
              value={form.provider}
              onChange={(val) => setField("provider", val)}
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
        <div className="flex flex-col divide-y divide-primary/10">
          {Object.entries(METHOD_LABELS).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 py-3"
            >
              <span className="text-sm text-primary">{label}</span>

              <Toggle
                checked={form.acceptedMethods[key]}
                onChange={(value) => setMethod(key, value)}
              />
            </div>
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

export default PaymentsSection;
