import React, { useState } from "react";
import PaymentsSection from "./PaymentSection";
import StaffSection from "./StaffSection";

const TABS = [
  { key: "payments", label: "Payments" },
  { key: "staff", label: "Staff" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("payments");

  return (
    <div className="flex min-h-screen flex-col gap-8 bg-secondary ">
      <div className="flex gap-6 border-b border-primary">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-primary text-primary"
                : "text-primary hover:text-primary/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "payments" ? (
        <PaymentsSection
          onSave={(data) => console.log("save payments", data)}
        />
      ) : (
        <StaffSection
          onChange={(staff) => console.log("staff changed", staff)}
        />
      )}
    </div>
  );
};

export default Settings;
