import React, { useState } from "react";
import { SettingsProvider } from "../../context/SettingContext";
import StoreProfileSection from "./StoreProfileSection";
import AdminUsersSection from "./AdminUserSection";
import OrdersFulfillmentSection from "./OrdersFulfilment";
import PaymentsSection from "./PaymentSection";
import NotificationsSection from "./NotificationSetting";
import ProductsCatalogSection from "./ProductCatalogSection";
import AppearanceSection from "./AppearanceSection";

const TABS = [
  {
    id: "store-profile",
    label: "Store profile",
    Component: StoreProfileSection,
  },
  { id: "admin-users", label: "Admin & users", Component: AdminUsersSection },
  {
    id: "orders-fulfillment",
    label: "Orders & fulfillment",
    Component: OrdersFulfillmentSection,
  },
  { id: "payments", label: "Payments", Component: PaymentsSection },
  {
    id: "notifications",
    label: "Notifications",
    Component: NotificationsSection,
  },
  {
    id: "products-catalog",
    label: "Products & catalog",
    Component: ProductsCatalogSection,
  },
  { id: "appearance", label: "Appearance", Component: AppearanceSection },
];

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const ActiveComponent = TABS.find((tab) => tab.id === activeTab).Component;

  return (
    <div className="">
      <div className="">
        <div className="mb-8 border-b border-black pb-4">
          <h1 className="font-mono text-xl font-bold uppercase tracking-wide text-black">
            Settings
          </h1>
          <p className="mt-1 font-mono text-xs text-neutral-500">
            Store configuration, access, and integrations
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <nav className="lg:w-56 lg:shrink-0">
            <ul className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border lg:border-black">
              {TABS.map((tab, index) => (
                <li
                  key={tab.id}
                  className="lg:border-b lg:border-black lg:last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full border border-black px-4 py-2.5 text-left font-mono text-xs font-bold uppercase tracking-wide transition-colors lg:border-0 ${
                      activeTab === tab.id
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-neutral-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-1">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = () => (
  <SettingsProvider>
    <SettingsContent />
  </SettingsProvider>
);

export default Settings;
