import React, { createContext, useContext, useMemo, useState } from "react";
import countryList from "react-select-country-list";
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

export const getCurrencyForCountry = (countryInput) => {
  let isoCode = countryInput;
  if (countryInput && countryInput.length > 2) {
    const found = countryList()
      .getData()
      .find((c) => c.label === countryInput);
    isoCode = found ? found.value : countryInput;
  }

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
    const savedCurrency = getItem(STORAGE_KEY_CURRENCY, null);
    if (savedCurrency) return savedCurrency;

    const initialCountry = getItem(STORAGE_KEY_COUNTRY, DEFAULT_COUNTRY);
    return getCurrencyForCountry(initialCountry);
  });

  const setCountry = (isoCode, name) => {
    const derivedCurrency = getCurrencyForCountry(isoCode || name);
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
