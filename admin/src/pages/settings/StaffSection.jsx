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
  <div className="flex flex-col gap-4 border border-primary/20 rounded-md bg-secondary p-5 sm:p-6">
    <div className="flex flex-col gap-1">
      <h2 className="text-sm font-medium text-primary">{title}</h2>

      {description ? (
        <p className="font-mono text-xs text-primary">{description}</p>
      ) : null}
    </div>

    {children}
  </div>
);

const Field = ({ label, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="font-mono text-xs text-primary">{label}</span>
    {children}
  </label>
);

const TextInput = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`h-10 w-full border border-primary/20 bg-secondary px-3 text-sm outline-none text-primary ${className}`}
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
    {label ? <span className="text-sm text-primary">{label}</span> : null}

    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors border-primary/15 ${
        checked ? "justify-end bg-primary" : "justify-start bg-primary/10"
      }`}
    >
      <span
        className={`h-3.5 w-3.5 rounded-full shadow-sm ${
          checked ? "bg-secondary" : "bg-secondary"
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
    className="bg-primary px-5 py-2.5 text-sm font-medium text-secondary transition-opacity hover:opacity-90 [disabled]:cursor-not-allowed disabled:opacity-30 rounded-md border-secondary/30"
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
          className="flex items-center justify-center border border-primary bg-secondary px-3 text-primary transition-colors hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary"
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </Field>
  );
};

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
    setForm(emptyMember);
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
    <div className="flex flex-col gap-6">
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

        <div className="flex justify-end pt-2">
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
                className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
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
                    className="font-mono text-xs text-primary/60 transition-colors hover:text-primary"
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
