import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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

const SectionCard = ({ title, description, children }) => (
  <div className="flex flex-col gap-4 border border-secondary/10 bg-primary p-5 sm:p-6 dark:border-primary/10 dark:bg-secondary">
    <div className="flex flex-col gap-1">
      <h2 className="text-sm font-medium text-secondary dark:text-primary">
        {title}
      </h2>

      {description ? (
        <p className="font-mono text-xs text-secondary/60 dark:text-primary/60">
          {description}
        </p>
      ) : null}
    </div>

    {children}
  </div>
);

const Field = ({ label, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="font-mono text-xs text-secondary/60 dark:text-primary/60">
      {label}
    </span>
    {children}
  </label>
);

const TextInput = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`h-10 w-full border border-secondary/10 bg-primary px-3 text-sm text-secondary placeholder:text-secondary/30 outline-none focus:border-tertiary-500 dark:border-primary/10 dark:bg-secondary dark:text-primary dark:placeholder:text-primary/30 dark:focus:border-tertiary-600 ${className}`}
  />
);

const SelectInput = ({ options, value, onChange, className = "" }) => (
  <div className={className}>
    <CustomSelect
      value={value}
      onChange={(val) => onChange({ target: { value: val } })}
      options={options}
    />
  </div>
);

const Toggle = ({ checked, onChange, label }) => (
  <label className="flex cursor-pointer items-center justify-between gap-4">
    {label ? (
      <span className="text-sm text-secondary dark:text-primary">{label}</span>
    ) : null}

    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-secondary/15 p-0.5 transition-colors dark:border-primary/15 ${
        checked
          ? "justify-end bg-secondary dark:bg-primary"
          : "justify-start bg-secondary/10 dark:bg-primary/10"
      }`}
    >
      <span
        className={`h-3.5 w-3.5 rounded-full shadow-sm ${
          checked
            ? "bg-primary dark:bg-secondary"
            : "bg-secondary/40 dark:bg-primary/40"
        }`}
      />
    </button>
  </label>
);

const PrimaryButton = ({ children, disabled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="bg-secondary px-5 py-2.5 text-sm font-medium text-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-primary dark:text-secondary"
  >
    {children}
  </button>
);

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
          className="flex items-center justify-center border border-secondary/10 bg-primary px-3 text-secondary/40 transition-colors hover:bg-secondary hover:text-primary dark:border-primary/10 dark:bg-secondary dark:text-primary/40 dark:hover:bg-primary dark:hover:text-secondary"
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </Field>
  );
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
        <div className="flex flex-col divide-y divide-secondary/10 dark:divide-primary/10">
          {Object.entries(METHOD_LABELS).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 py-3"
            >
              <span className="text-sm text-secondary dark:text-primary">
                {label}
              </span>

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
          <span className="font-mono text-xs text-secondary/50 dark:text-primary/50">
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
