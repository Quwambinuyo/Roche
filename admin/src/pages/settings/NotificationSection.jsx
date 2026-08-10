import React, { useState } from "react";
import {
  SectionCard,
  Field,
  TextInput,
  Toggle,
  PrimaryButton,
} from "../../components/ui/SettingsUI";

const EVENT_LABELS = {
  newOrder: "New order placed",
  lowStock: "Low stock warning",
  paymentFailed: "Payment failed",
};

const DEFAULT_NOTIFICATIONS = {
  events: {
    newOrder: { email: true, sms: false },
    lowStock: { email: true, sms: false },
    paymentFailed: { email: true, sms: true },
  },
  recipientStaffIds: [],
  extraRecipientEmails: [],
};

const NotificationsSection = ({ initialData, staffOptions = [], onSave }) => {
  const [form, setForm] = useState(initialData ?? DEFAULT_NOTIFICATIONS);
  const [newEmail, setNewEmail] = useState("");
  const [dirty, setDirty] = useState(false);

  const setEventChannel = (eventKey, channel, value) => {
    setForm((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        [eventKey]: {
          ...prev.events[eventKey],
          [channel]: value,
        },
      },
    }));

    setDirty(true);
  };

  const toggleStaffRecipient = (staffId) => {
    setForm((prev) => {
      const isSelected = prev.recipientStaffIds.includes(staffId);

      return {
        ...prev,
        recipientStaffIds: isSelected
          ? prev.recipientStaffIds.filter((id) => id !== staffId)
          : [...prev.recipientStaffIds, staffId],
      };
    });

    setDirty(true);
  };

  const handleAddEmail = () => {
    const trimmed = newEmail.trim();
    if (!trimmed || form.extraRecipientEmails.includes(trimmed)) return;

    setForm((prev) => ({
      ...prev,
      extraRecipientEmails: [...prev.extraRecipientEmails, trimmed],
    }));

    setNewEmail("");
    setDirty(true);
  };

  const handleRemoveEmail = (email) => {
    setForm((prev) => ({
      ...prev,
      extraRecipientEmails: prev.extraRecipientEmails.filter(
        (item) => item !== email,
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
      <SectionCard
        title="Alert triggers"
        description="Choose which events send a notification, and through which channel."
      >
        <div className="flex flex-col">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 pb-3">
            <span></span>
            <span className="text-center font-mono text-xs text-primary/60">
              Email
            </span>
            <span className="text-center font-mono text-xs text-primary/60">
              SMS
            </span>
          </div>

          <div className="flex flex-col divide-y divide-primary/10">
            {Object.entries(EVENT_LABELS).map(([key, label]) => (
              <div
                key={key}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-3"
              >
                <span className="text-sm text-primary">{label}</span>

                <div className="flex justify-center">
                  <Toggle
                    checked={form.events[key].email}
                    onChange={(value) => setEventChannel(key, "email", value)}
                  />
                </div>

                <div className="flex justify-center">
                  <Toggle
                    checked={form.events[key].sms}
                    onChange={(value) => setEventChannel(key, "sms", value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Recipients" description="Who receives these alerts.">
        <div className="flex flex-col gap-5">
          {staffOptions.length > 0 ? (
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-primary/60">Staff</span>

              <div className="flex flex-col divide-y divide-primary/10">
                {staffOptions.map((member) => (
                  <label
                    key={member.id}
                    className="flex cursor-pointer items-center justify-between gap-4 py-2.5"
                  >
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm text-primary">
                        {member.name}
                      </span>
                      <span className="truncate font-mono text-xs text-primary/60">
                        {member.email}
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={form.recipientStaffIds.includes(member.id)}
                      onChange={() => toggleStaffRecipient(member.id)}
                      className="h-4 w-4 border border-primary/30 accent-primary"
                    />
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-primary/60">
              Additional emails
            </span>

            <div className="flex flex-wrap gap-2">
              {form.extraRecipientEmails.map((email) => (
                <span
                  key={email}
                  className="flex items-center gap-2 border border-primary/20 px-3 py-1 font-mono text-xs text-primary"
                >
                  {email}
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-primary/50 hover:text-primary"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <TextInput
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="ops@yourbrand.com"
                className="max-w-xs"
              />

              <button
                type="button"
                onClick={handleAddEmail}
                disabled={!newEmail.trim()}
                className="border border-primary/20 px-4 py-2 font-mono text-xs text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add
              </button>
            </div>
          </div>
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

export default NotificationsSection;
