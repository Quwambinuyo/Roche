import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useSettings } from "../../context/SettingContext";
import {
  SectionCard,
  Field,
  TextInput,
  Toggle,
  SecondaryButton,
  IconButton,
} from "./shared";

const EVENT_LABELS = {
  newOrder: "New order placed",
  lowStock: "Product low on stock",
  failedPayment: "Payment failed",
};

const NotificationsSection = () => {
  const { settings, updateSection } = useSettings();
  const n = settings.notifications;
  const [newRecipient, setNewRecipient] = useState("");

  const setChannel = (key, value) => {
    updateSection(
      "notifications",
      (prev) => ({ ...prev, channels: { ...prev.channels, [key]: value } }),
      `${value ? "Enabled" : "Disabled"} ${key} notifications`,
    );
  };

  const setEvent = (key, value) => {
    updateSection(
      "notifications",
      (prev) => ({ ...prev, events: { ...prev.events, [key]: value } }),
      `${value ? "Enabled" : "Disabled"} alerts for ${EVENT_LABELS[key]}`,
    );
  };

  const handleAddRecipient = () => {
    if (!newRecipient) return;
    updateSection(
      "notifications",
      (prev) => ({
        ...prev,
        recipients: [...prev.recipients, newRecipient],
      }),
      `Added notification recipient ${newRecipient}`,
    );
    setNewRecipient("");
  };

  const handleRemoveRecipient = (email) => {
    updateSection(
      "notifications",
      (prev) => ({
        ...prev,
        recipients: prev.recipients.filter((r) => r !== email),
      }),
      `Removed notification recipient ${email}`,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Channels" description="How alerts reach your team.">
        <div className="flex flex-col gap-3">
          <Toggle
            checked={n.channels.email}
            onChange={(v) => setChannel("email", v)}
            label="Email alerts"
          />
          <Toggle
            checked={n.channels.sms}
            onChange={(v) => setChannel("sms", v)}
            label="SMS alerts"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Alert events"
        description="Choose what triggers a notification."
      >
        <div className="flex flex-col gap-3">
          {Object.entries(EVENT_LABELS).map(([key, label]) => (
            <Toggle
              key={key}
              checked={n.events[key]}
              onChange={(v) => setEvent(key, v)}
              label={label}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Recipients"
        description="Who receives alerts, in addition to the primary admin."
      >
        <div className="flex flex-col gap-4">
          {n.recipients.length === 0 ? (
            <p className="font-mono text-xs text-neutral-500">
              No additional recipients yet.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-black border border-black">
              {n.recipients.map((email) => (
                <li
                  key={email}
                  className="flex items-center justify-between gap-4 px-4 py-2.5"
                >
                  <span className="font-mono text-sm">{email}</span>
                  <IconButton onClick={() => handleRemoveRecipient(email)}>
                    <Trash2 size={14} />
                  </IconButton>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-end gap-3">
            <Field label="Add recipient email">
              <TextInput
                type="email"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                placeholder="teammate@roche.ng"
                className="w-72"
              />
            </Field>
            <SecondaryButton
              onClick={handleAddRecipient}
              className="flex items-center gap-2"
            >
              <Plus size={14} />
              Add
            </SecondaryButton>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default NotificationsSection;
