import React, { useState } from "react";
import {
  SectionCard,
  Field,
  TextInput,
  SelectInput,
  Toggle,
  PrimaryButton,
} from "../../components/ui/SettingsUI";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "staff", label: "Staff" },
];

const emptyMember = {
  name: "",
  email: "",
  role: "staff",
  active: true,
};

const StaffSection = ({ initialStaff = [], onChange }) => {
  const [staff, setStaff] = useState(initialStaff);
  const [form, setForm] = useState(emptyMember);

  const updateStaff = (next) => {
    setStaff(next);
    onChange?.(next);
  };

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAdd = () => {
    const newMember = {
      ...form,
      id: Date.now().toString(),
    };

    updateStaff([...staff, newMember]);
    setForm({ ...emptyMember });
  };

  const handleRemove = (id) => {
    updateStaff(staff.filter((member) => member.id !== id));
  };

  const handleToggleActive = (id, value) => {
    updateStaff(
      staff.map((member) =>
        member.id === id ? { ...member, active: value } : member,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard
        title="Add staff member"
        description="Give another person access to manage this account."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <TextInput
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Jane Doe"
            />
          </Field>

          <Field label="Email address">
            <TextInput
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="jane@company.com"
            />
          </Field>

          <Field label="Role">
            <SelectInput
              options={ROLE_OPTIONS}
              value={form.role}
              onChange={(e) => setField("role", e.target.value)}
              className="max-w-xs"
            />
          </Field>

          <div className="flex items-end pb-1">
            <Toggle
              checked={form.active}
              onChange={(value) => setField("active", value)}
              label="Member can sign in immediately"
            />
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <PrimaryButton
            onClick={handleAdd}
            disabled={!form.name.trim() || !form.email.trim()}
          >
            Add staff member
          </PrimaryButton>
        </div>
      </SectionCard>

      <SectionCard
        title="Team"
        description="Everyone with access to this account."
      >
        {staff.length === 0 ? (
          <p className="font-mono text-xs text-primary/60">
            No staff members yet.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-primary/10">
            {staff.map((member) => (
              <div
                key={member.id}
                className="flex flex-col gap-4 py-4 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm text-primary">
                    {member.name}
                  </span>

                  <span className="truncate font-mono text-xs text-primary/60">
                    {member.email}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="rounded-full border border-primary/20 px-3 py-1 text-xs capitalize text-primary">
                    {member.role}
                  </span>

                  <Toggle
                    checked={member.active}
                    onChange={(value) => handleToggleActive(member.id, value)}
                  />

                  <button
                    type="button"
                    onClick={() => handleRemove(member.id)}
                    className="font-mono text-xs text-primary/60 transition-all duration-200 hover:-translate-y-0.5 hover:text-primary"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default StaffSection;
