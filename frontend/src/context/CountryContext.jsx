import React, { createContext, useContext, useMemo, useState } from "react";
import { getItem, setItem } from "../utils/localStorage";

const STORAGE_KEY_COUNTRY = "selectedCountry";
const STORAGE_KEY_CURRENCY = "selectedCurrency";

const DEFAULT_COUNTRY = "NG";
const DEFAULT_CURRENCY = "NGN";

const EUROZONE = new Set([
  "AT",
  "BE",
  "HR",
  "CY",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PT",
  "SK",
  "SI",
  "ES",
]);

export const CURRENCY_OPTIONS = [
  { code: "NGN", label: "NGN ₦" },
  { code: "USD", label: "USD $" },
  { code: "GBP", label: "GBP £" },
  { code: "EUR", label: "EUR €" },
];

export const getCurrencyForCountry = (isoCode) => {
  switch (isoCode) {
    case "NG":
      return "NGN";
    case "US":
      return "USD";
    case "GB":
      return "GBP";
    default:
      return EUROZONE.has(isoCode) ? "EUR" : DEFAULT_CURRENCY;
  }
};

const CountryContext = createContext(undefined);

export const CountryProvider = ({ children }) => {
  const [country, setCountryState] = useState(() =>
    getItem(STORAGE_KEY_COUNTRY, DEFAULT_COUNTRY),
  );

  const [currency, setCurrencyState] = useState(() => {
    // Check if user manually saved a currency preference first
    const savedCurrency = getItem(STORAGE_KEY_CURRENCY, null);
    if (savedCurrency) return savedCurrency;

    // Otherwise derive from saved/default country
    const initialCountry = getItem(STORAGE_KEY_COUNTRY, DEFAULT_COUNTRY);
    return getCurrencyForCountry(initialCountry);
  });

  const setCountry = (isoCode) => {
    const derivedCurrency = getCurrencyForCountry(isoCode);
    setCountryState(isoCode);
    setCurrencyState(derivedCurrency);

    setItem(STORAGE_KEY_COUNTRY, isoCode);
    setItem(STORAGE_KEY_CURRENCY, derivedCurrency);
  };

  const setCurrencyManually = (code) => {
    setCurrencyState(code);
    setItem(STORAGE_KEY_CURRENCY, code);
  };

  const value = useMemo(
    () => ({
      country,
      currency,
      setCountry,
      setCurrency: setCurrencyManually,
    }),
    [country, currency],
  );

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};

export const useCountry = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return ctx;
};
