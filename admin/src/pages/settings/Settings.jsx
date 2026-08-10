import React, { useState } from "react";
import PaymentsSection from "./PaymentSection";
import StaffSection from "./StaffSection";
import OrderSettingsSection from "./OrderSettingsSection";
import StoreProfileSection from "./StoreProfileSection";
import TaxCurrencySection from "./TaxCurrencySection";
import NotificationsSection from "./NotificationSection";

const TABS = [
  { key: "payments", label: "Payments" },
  { key: "staff", label: "Staff" },
  { key: "orders", label: "Orders" },
  { key: "profile", label: "Store profile" },
  { key: "tax", label: "Tax & currency" },
  { key: "notifications", label: "Notifications" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("payments");

  const renderTab = () => {
    switch (activeTab) {
      case "payments":
        return (
          <PaymentsSection
            onSave={(data) => console.log("save payments", data)}
          />
        );
      case "staff":
        return (
          <StaffSection
            onChange={(staff) => console.log("staff changed", staff)}
          />
        );
      case "orders":
        return (
          <OrderSettingsSection
            onSave={(data) => console.log("save order settings", data)}
          />
        );
      case "profile":
        return (
          <StoreProfileSection
            onSave={(data) => console.log("save store profile", data)}
          />
        );
      case "tax":
        return (
          <TaxCurrencySection
            onSave={(data) => console.log("save tax & currency", data)}
          />
        );
      case "notifications":
        return (
          <NotificationsSection
            onSave={(data) => console.log("save notifications", data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-8 bg-secondary ">
      <div className="flex gap-6 overflow-x-auto border-b border-primary/20 [-ms-overflow-style:none] [scrollbar-width:none] ">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-primary text-primary"
                : "text-primary hover:text-primary/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderTab()}
    </div>
  );
};

export default Settings;
