import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useSettings } from "../../context/SettingContext";
import { formatNaira } from "../../utils/format";
import {
  SectionCard,
  Field,
  TextInput,
  SelectInput,
  Toggle,
  PrimaryButton,
  SecondaryButton,
  IconButton,
} from "./shared";

const ORDER_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "awaiting-payment", label: "Awaiting payment" },
];

const OrdersFulfillmentSection = () => {
  const { settings, updateSection } = useSettings();
  const of = settings.ordersFulfillment;
  const [threshold, setThreshold] = useState(of.lowStockThreshold);
  const [newZone, setNewZone] = useState({ name: "", rate: "" });

  const handleToggleAutoProcessing = (value) => {
    updateSection(
      "ordersFulfillment",
      (prev) => ({ ...prev, autoMarkProcessingOnPayment: value }),
      `${value ? "Enabled" : "Disabled"} auto-mark processing on payment`,
    );
  };

  const handleDefaultStatusChange = (value) => {
    updateSection(
      "ordersFulfillment",
      (prev) => ({ ...prev, defaultOrderStatus: value }),
      `Changed default order status to ${value}`,
    );
  };

  const handleThresholdSave = () => {
    const parsed = Number(threshold);
    if (Number.isNaN(parsed) || parsed < 0) return;
    updateSection(
      "ordersFulfillment",
      (prev) => ({ ...prev, lowStockThreshold: parsed }),
      `Changed low-stock threshold to ${parsed}`,
    );
  };

  const handleAddZone = () => {
    const rate = Number(newZone.rate);
    if (!newZone.name || Number.isNaN(rate)) return;
    updateSection(
      "ordersFulfillment",
      (prev) => ({
        ...prev,
        shippingZones: [
          ...prev.shippingZones,
          { id: `zone-${Date.now()}`, name: newZone.name, rate },
        ],
      }),
      `Added shipping zone ${newZone.name}`,
    );
    setNewZone({ name: "", rate: "" });
  };

  const handleRemoveZone = (zone) => {
    updateSection(
      "ordersFulfillment",
      (prev) => ({
        ...prev,
        shippingZones: prev.shippingZones.filter((z) => z.id !== zone.id),
      }),
      `Removed shipping zone ${zone.name}`,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Order defaults"
        description="Control what happens automatically when an order comes in."
      >
        <div className="flex flex-col gap-5">
          <Toggle
            checked={of.autoMarkProcessingOnPayment}
            onChange={handleToggleAutoProcessing}
            label="Automatically mark orders as processing once payment is confirmed"
          />
          <Field
            label="Default order status"
            hint="Applied to new orders before payment confirmation."
          >
            <SelectInput
              options={ORDER_STATUS_OPTIONS}
              value={of.defaultOrderStatus}
              onChange={(e) => handleDefaultStatusChange(e.target.value)}
              className="max-w-xs"
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="Low-stock threshold"
        description="Products at or below this quantity trigger a low-stock alert on the dashboard."
      >
        <div className="flex items-end gap-3">
          <Field label="Threshold (units)">
            <TextInput
              type="number"
              min={0}
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-32"
            />
          </Field>
          <PrimaryButton onClick={handleThresholdSave}>Save</PrimaryButton>
        </div>
      </SectionCard>

      <SectionCard
        title="Shipping zones"
        description="Flat shipping rates by zone, used at checkout."
      >
        <div className="flex flex-col gap-4">
          <div className="border border-black">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black bg-neutral-50">
                  <th className="px-4 py-2 text-left font-mono text-xs font-bold uppercase">
                    Zone
                  </th>
                  <th className="px-4 py-2 text-left font-mono text-xs font-bold uppercase">
                    Flat rate
                  </th>
                  <th className="px-4 py-2 text-right font-mono text-xs font-bold uppercase">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {of.shippingZones.map((zone) => (
                  <tr
                    key={zone.id}
                    className="border-b border-black last:border-b-0"
                  >
                    <td className="px-4 py-2 font-mono text-sm">{zone.name}</td>
                    <td className="px-4 py-2 font-mono text-sm">
                      {formatNaira(zone.rate)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <IconButton onClick={() => handleRemoveZone(zone)}>
                        <Trash2 size={14} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border border-dashed border-black p-4 sm:flex-row sm:items-end">
            <Field label="Zone name">
              <TextInput
                value={newZone.name}
                onChange={(e) =>
                  setNewZone((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="South-West"
              />
            </Field>
            <Field label="Flat rate (₦)">
              <TextInput
                type="number"
                min={0}
                value={newZone.rate}
                onChange={(e) =>
                  setNewZone((prev) => ({ ...prev, rate: e.target.value }))
                }
                placeholder="2500"
              />
            </Field>
            <SecondaryButton
              onClick={handleAddZone}
              className="flex items-center gap-2"
            >
              <Plus size={14} />
              Add zone
            </SecondaryButton>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default OrdersFulfillmentSection;
