import React, { useState } from "react";
import {
  SectionCard,
  Field,
  TextInput,
  Toggle,
  PrimaryButton,
} from "../../components/ui/SettingsUI";
import CurrencyPicker from "../../components/ui/CurrencyPicker";

const DEFAULT_TAX_CURRENCY = {
  vatEnabled: false,
  vatRate: 7.5,
  vatInclusive: true,
  defaultCurrency: "NGN",
  acceptedPaymentCurrencies: ["NGN"],
};

const TaxCurrencySection = ({ initialData, onSave }) => {
  const [form, setForm] = useState(initialData ?? DEFAULT_TAX_CURRENCY);
  const [dirty, setDirty] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setDirty(true);
  };

  const setDefaultCurrency = (code) => {
    setForm((prev) => ({
      ...prev,
      defaultCurrency: code,
      acceptedPaymentCurrencies: prev.acceptedPaymentCurrencies.includes(code)
        ? prev.acceptedPaymentCurrencies
        : [...prev.acceptedPaymentCurrencies, code],
    }));

    setDirty(true);
  };

  const addPaymentCurrency = (code) => {
    if (form.acceptedPaymentCurrencies.includes(code)) return;

    setForm((prev) => ({
      ...prev,
      acceptedPaymentCurrencies: [...prev.acceptedPaymentCurrencies, code],
    }));

    setDirty(true);
  };

  const removePaymentCurrency = (code) => {
    if (code === form.defaultCurrency) return;

    setForm((prev) => ({
      ...prev,
      acceptedPaymentCurrencies: prev.acceptedPaymentCurrencies.filter(
        (c) => c !== code,
      ),
    }));

    setDirty(true);
  };

  const handleSave = () => {
    onSave?.(form);
    setDirty(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="VAT" description="Applied to orders at checkout.">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-primary">Charge VAT</span>

            <Toggle
              checked={form.vatEnabled}
              onChange={(value) => setField("vatEnabled", value)}
            />
          </div>

          {form.vatEnabled ? (
            <>
              <Field label="VAT rate (%)">
                <TextInput
                  type="number"
                  min={0}
                  step={0.1}
                  value={form.vatRate}
                  onChange={(e) => setField("vatRate", Number(e.target.value))}
                  className="max-w-[160px]"
                />
              </Field>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-primary">
                    Prices are VAT-inclusive
                  </span>
                  <span className="font-mono text-xs text-primary/60">
                    If off, VAT is added on top of listed prices at checkout.
                  </span>
                </div>

                <Toggle
                  checked={form.vatInclusive}
                  onChange={(value) => setField("vatInclusive", value)}
                />
              </div>
            </>
          ) : null}
        </div>
      </SectionCard>

      <SectionCard
        title="Default currency"
        description="The currency your store prices and charges in by default."
      >
        <Field label="Default currency">
          <CurrencyPicker
            value={form.defaultCurrency}
            onChange={(code) => setDefaultCurrency(code)}
            currencies={[
              "NGN",
              "USD",
              "GBP",
              "EUR",
              "CAD",
              "GHS",
              "KES",
              "ZAR",
            ]}
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="Accepted payment currencies"
        description="Currencies customers can actually pay with at checkout, subject to what your payment provider supports."
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {form.acceptedPaymentCurrencies.map((code) => (
              <span
                key={code}
                className="flex items-center gap-2 border border-primary/20 px-3 py-1 font-mono text-xs text-primary"
              >
                {code}
                {code !== form.defaultCurrency ? (
                  <button
                    type="button"
                    onClick={() => removePaymentCurrency(code)}
                    className="text-primary/50 hover:text-primary"
                  >
                    ×
                  </button>
                ) : (
                  <span className="text-primary/30">default</span>
                )}
              </span>
            ))}
          </div>

          <Field label="Add a currency">
            <CurrencyPicker
              value={null}
              onChange={(code) => addPaymentCurrency(code)}
              currencies={[
                "NGN",
                "USD",
                "GBP",
                "EUR",
                "CAD",
                "GHS",
                "KES",
                "ZAR",
              ]}
            />
          </Field>
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

export default TaxCurrencySection;
