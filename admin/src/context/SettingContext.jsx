import React, { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

const STORAGE_KEY = "roche_admin_settings";

const DEFAULT_SETTINGS = {
  storeProfile: {
    storeName: "Roche",
    logoUrl: "",
    contactEmail: "",
    contactPhone: "",
    currency: "NGN",
    address: {
      street: "",
      city: "",
      state: "",
      country: "Nigeria",
    },
  },
  adminProfile: {
    name: "",
    email: "",
  },
  teamMembers: [],
  activityLog: [],
  ordersFulfillment: {
    autoMarkProcessingOnPayment: true,
    defaultOrderStatus: "pending",
    lowStockThreshold: 5,
    shippingZones: [
      { id: "zone-lagos", name: "Lagos", rate: 2000 },
      { id: "zone-other-states", name: "Other States", rate: 3500 },
    ],
  },
  payments: {
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
  },
  notifications: {
    channels: {
      email: true,
      sms: false,
    },
    events: {
      newOrder: true,
      lowStock: true,
      failedPayment: true,
    },
    recipients: [],
  },
  productsCatalog: {
    categories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"],
    fabricTypes: ["Ankara", "Cotton", "Linen", "Silk", "Lace"],
    discountTiers: [
      { id: "tier-1", minQty: 3, discountPercent: 5 },
      { id: "tier-2", minQty: 5, discountPercent: 10 },
    ],
  },
  appearance: {
    accentColor: "#111111",
    density: "comfortable",
  },
};

function mergeDefaults(stored) {
  if (!stored) return DEFAULT_SETTINGS;
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    storeProfile: {
      ...DEFAULT_SETTINGS.storeProfile,
      ...stored.storeProfile,
      address: {
        ...DEFAULT_SETTINGS.storeProfile.address,
        ...(stored.storeProfile && stored.storeProfile.address),
      },
    },
    adminProfile: { ...DEFAULT_SETTINGS.adminProfile, ...stored.adminProfile },
    ordersFulfillment: {
      ...DEFAULT_SETTINGS.ordersFulfillment,
      ...stored.ordersFulfillment,
    },
    payments: {
      ...DEFAULT_SETTINGS.payments,
      ...stored.payments,
      acceptedMethods: {
        ...DEFAULT_SETTINGS.payments.acceptedMethods,
        ...(stored.payments && stored.payments.acceptedMethods),
      },
    },
    notifications: {
      ...DEFAULT_SETTINGS.notifications,
      ...stored.notifications,
      channels: {
        ...DEFAULT_SETTINGS.notifications.channels,
        ...(stored.notifications && stored.notifications.channels),
      },
      events: {
        ...DEFAULT_SETTINGS.notifications.events,
        ...(stored.notifications && stored.notifications.events),
      },
    },
    productsCatalog: {
      ...DEFAULT_SETTINGS.productsCatalog,
      ...stored.productsCatalog,
    },
    appearance: { ...DEFAULT_SETTINGS.appearance, ...stored.appearance },
  };
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return mergeDefaults(raw ? JSON.parse(raw) : null);
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      return;
    }
  }, [settings]);

  const logActivity = (message) => {
    setSettings((prev) => ({
      ...prev,
      activityLog: [
        {
          id: `log-${Date.now()}`,
          message,
          timestamp: new Date().toISOString(),
        },
        ...prev.activityLog,
      ].slice(0, 50),
    }));
  };

  const updateSection = (section, updater, logMessage) => {
    setSettings((prev) => ({
      ...prev,
      [section]:
        typeof updater === "function" ? updater(prev[section]) : updater,
    }));
    if (logMessage) logActivity(logMessage);
  };

  const value = {
    settings,
    updateSection,
    logActivity,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
};
