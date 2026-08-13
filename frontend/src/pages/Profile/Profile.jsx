import React, { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-10">
      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <p className="text-sm font-medium text-secondary">Profile Details</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile((p) => ({ ...p, name: e.target.value }))
            }
            placeholder="Full name"
            className="border border-secondary/15 rounded-md px-4 py-2.5 text-sm bg-transparent text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-secondary/40"
          />
          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile((p) => ({ ...p, email: e.target.value }))
            }
            placeholder="Email"
            className="border border-secondary/15 rounded-md px-4 py-2.5 text-sm bg-transparent text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-secondary/40"
          />
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) =>
              setProfile((p) => ({ ...p, phone: e.target.value }))
            }
            placeholder="Phone"
            className="border border-secondary/15 rounded-md px-4 py-2.5 text-sm bg-transparent text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-secondary/40"
          />
        </div>

        <button
          type="submit"
          className="bg-secondary text-primary text-sm font-medium px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
        >
          Save Changes
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <p className="text-sm font-medium text-secondary">Change Password</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords((p) => ({ ...p, current: e.target.value }))
            }
            placeholder="Current password"
            className="border border-secondary/15 rounded-md px-4 py-2.5 text-sm bg-transparent text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-secondary/40"
          />
          <input
            type="password"
            value={passwords.next}
            onChange={(e) =>
              setPasswords((p) => ({ ...p, next: e.target.value }))
            }
            placeholder="New password"
            className="border border-secondary/15 rounded-md px-4 py-2.5 text-sm bg-transparent text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-secondary/40"
          />
          <input
            type="password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords((p) => ({ ...p, confirm: e.target.value }))
            }
            placeholder="Confirm new password"
            className="border border-secondary/15 rounded-md px-4 py-2.5 text-sm bg-transparent text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-secondary/40"
          />
        </div>

        <button
          type="submit"
          className="bg-secondary text-primary text-sm font-medium px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
        >
          Update Password
        </button>
      </form>

      <div className="space-y-4">
        <p className="text-sm font-medium text-secondary">Notifications</p>

        <label className="flex items-center justify-between border border-secondary/10 rounded-lg px-5 py-3.5">
          <span className="text-sm text-secondary">Order updates</span>
          <input
            type="checkbox"
            checked={notifications.orderUpdates}
            onChange={(e) =>
              setNotifications((n) => ({
                ...n,
                orderUpdates: e.target.checked,
              }))
            }
            className="w-4 h-4 accent-secondary"
          />
        </label>

        <label className="flex items-center justify-between border border-secondary/10 rounded-lg px-5 py-3.5">
          <span className="text-sm text-secondary">Promotions and offers</span>
          <input
            type="checkbox"
            checked={notifications.promotions}
            onChange={(e) =>
              setNotifications((n) => ({
                ...n,
                promotions: e.target.checked,
              }))
            }
            className="w-4 h-4 accent-secondary"
          />
        </label>
      </div>
    </div>
  );
};

export default Profile;
