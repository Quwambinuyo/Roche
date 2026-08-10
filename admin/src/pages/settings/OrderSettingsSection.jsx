import React, { useState } from "react";
import {
  SectionCard,
  Field,
  TextInput,
  Toggle,
  PrimaryButton,
} from "../../components/ui/SettingsUI";

const DEFAULT_ORDER_SETTINGS = {
  autoCancelEnabled: true,
  autoCancelHours: 24,
  minimumOrderValue: 0,
  returnPolicyText: "",
};

const OrderSettingsSection = ({ initialData, onSave }) => {
  const [form, setForm] = useState(initialData ?? DEFAULT_ORDER_SETTINGS);
  const [dirty, setDirty] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
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
        title="Unpaid orders"
        description="Automatically cancel orders that are never paid for."
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-primary">
              Auto-cancel unpaid orders
            </span>

            <Toggle
              checked={form.autoCancelEnabled}
              onChange={(value) => setField("autoCancelEnabled", value)}
            />
          </div>

          {form.autoCancelEnabled ? (
            <Field label="Cancel after (hours)">
              <TextInput
                type="number"
                min={1}
                value={form.autoCancelHours}
                onChange={(e) =>
                  setField("autoCancelHours", Number(e.target.value))
                }
                className="max-w-[160px]"
              />
            </Field>
          ) : null}
        </div>
      </SectionCard>

      <SectionCard
        title="Minimum order value"
        description="Customers must meet this amount to check out."
      >
        <Field label="Minimum order value (₦)">
          <TextInput
            type="number"
            min={0}
            value={form.minimumOrderValue}
            onChange={(e) =>
              setField("minimumOrderValue", Number(e.target.value))
            }
            className="max-w-[220px]"
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="Return & refund policy"
        description="Shown to customers at checkout and on your policy page."
      >
        <Field label="Policy text">
          <textarea
            value={form.returnPolicyText}
            onChange={(e) => setField("returnPolicyText", e.target.value)}
            placeholder="Items can be returned within 7 days of delivery, provided they are unworn and in their original packaging..."
            rows={6}
            className="w-full resize-y border border-primary/20 bg-transparent p-3 font-mono text-sm text-primary placeholder:text-primary/40 focus:border-primary/40 focus:outline-none"
          />
        </Field>
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

export default OrderSettingsSection;
