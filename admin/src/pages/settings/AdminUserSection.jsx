import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useSettings } from "../../context/SettingContext";
import {
  SectionCard,
  Field,
  TextInput,
  SelectInput,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  Pill,
} from "./shared";

const ROLE_OPTIONS = [
  { value: "orders", label: "Can manage orders" },
  { value: "products", label: "Can manage products & pricing" },
  { value: "full-access", label: "Full access" },
];

const roleLabel = (value) =>
  ROLE_OPTIONS.find((opt) => opt.value === value)?.label || value;

const AdminUsersSection = () => {
  const { settings, updateSection } = useSettings();
  const [profileForm, setProfileForm] = useState(settings.adminProfile);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "orders",
  });

  const handleProfileSave = () => {
    updateSection("adminProfile", profileForm, "Updated admin profile");
  };

  const handlePasswordSave = () => {
    if (!passwordForm.next || passwordForm.next !== passwordForm.confirm)
      return;
    setPasswordForm({ current: "", next: "", confirm: "" });
    updateSection("teamMembers", (prev) => prev, "Changed admin password");
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) return;
    updateSection(
      "teamMembers",
      (prev) => [...prev, { id: `member-${Date.now()}`, ...newMember }],
      `Added team member ${newMember.name}`,
    );
    setNewMember({ name: "", email: "", role: "orders" });
  };

  const handleRemoveMember = (member) => {
    updateSection(
      "teamMembers",
      (prev) => prev.filter((m) => m.id !== member.id),
      `Removed team member ${member.name}`,
    );
  };

  const handleRoleChange = (member, role) => {
    updateSection(
      "teamMembers",
      (prev) => prev.map((m) => (m.id === member.id ? { ...m, role } : m)),
      `Changed role for ${member.name} to ${roleLabel(role)}`,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Admin profile" description="Your account details.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name">
            <TextInput
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Field>
          <Field label="Email">
            <TextInput
              type="email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Field>
        </div>
        <div className="mt-4 flex justify-end">
          <PrimaryButton onClick={handleProfileSave}>
            Save profile
          </PrimaryButton>
        </div>
      </SectionCard>

      <SectionCard title="Change password">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Current password">
            <TextInput
              type="password"
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  current: e.target.value,
                }))
              }
            />
          </Field>
          <Field label="New password">
            <TextInput
              type="password"
              value={passwordForm.next}
              onChange={(e) =>
                setPasswordForm((prev) => ({ ...prev, next: e.target.value }))
              }
            />
          </Field>
          <Field label="Confirm new password">
            <TextInput
              type="password"
              value={passwordForm.confirm}
              onChange={(e) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  confirm: e.target.value,
                }))
              }
            />
          </Field>
        </div>
        <div className="mt-4 flex justify-end">
          <PrimaryButton
            onClick={handlePasswordSave}
            disabled={
              !passwordForm.next || passwordForm.next !== passwordForm.confirm
            }
          >
            Update password
          </PrimaryButton>
        </div>
      </SectionCard>

      <SectionCard
        title="Team members"
        description="Give teammates access to specific parts of the admin panel."
      >
        <div className="flex flex-col gap-4">
          <div className="border border-black">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black bg-neutral-50">
                  <th className="px-4 py-2 text-left font-mono text-xs font-bold uppercase">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left font-mono text-xs font-bold uppercase">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left font-mono text-xs font-bold uppercase">
                    Role
                  </th>
                  <th className="px-4 py-2 text-right font-mono text-xs font-bold uppercase">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {settings.teamMembers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center font-mono text-xs text-neutral-500"
                    >
                      No team members yet
                    </td>
                  </tr>
                ) : (
                  settings.teamMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-black last:border-b-0"
                    >
                      <td className="px-4 py-2 font-mono text-sm">
                        {member.name}
                      </td>
                      <td className="px-4 py-2 font-mono text-sm">
                        {member.email}
                      </td>
                      <td className="px-4 py-2">
                        <SelectInput
                          options={ROLE_OPTIONS}
                          value={member.role}
                          onChange={(e) =>
                            handleRoleChange(member, e.target.value)
                          }
                          className="py-1.5"
                        />
                      </td>
                      <td className="px-4 py-2 text-right">
                        <IconButton onClick={() => handleRemoveMember(member)}>
                          <Trash2 size={14} />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border border-dashed border-black p-4 sm:flex-row sm:items-end">
            <Field label="Name">
              <TextInput
                value={newMember.name}
                onChange={(e) =>
                  setNewMember((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Teammate name"
              />
            </Field>
            <Field label="Email">
              <TextInput
                type="email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="teammate@roche.ng"
              />
            </Field>
            <Field label="Role">
              <SelectInput
                options={ROLE_OPTIONS}
                value={newMember.role}
                onChange={(e) =>
                  setNewMember((prev) => ({ ...prev, role: e.target.value }))
                }
              />
            </Field>
            <SecondaryButton
              onClick={handleAddMember}
              className="flex items-center gap-2"
            >
              <Plus size={14} />
              Add member
            </SecondaryButton>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Activity log"
        description="Who changed what, most recent first."
      >
        {settings.activityLog.length === 0 ? (
          <p className="font-mono text-xs text-neutral-500">
            No activity recorded yet.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-black border border-black">
            {settings.activityLog.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-4 px-4 py-2.5"
              >
                <span className="font-mono text-sm">{entry.message}</span>
                <Pill>{new Date(entry.timestamp).toLocaleString()}</Pill>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
};

export default AdminUsersSection;
