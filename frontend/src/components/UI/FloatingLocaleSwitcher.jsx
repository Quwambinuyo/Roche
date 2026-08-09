import React from "react";
// import CountryPicker from "./CountryPicker";
import CurrencyPicker from "./CurrencyPicker";
import { useCountry } from "../../context/CountryContext";

const FloatingLocaleSwitcher = () => {
  const { country, setCountry, currency, setCurrency } = useCountry();

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-primary border border-secondary/15 rounded-full shadow-xl px-2 py-2">
      {/* <div className="w-40">
        <CountryPicker value={country} onChange={setCountry} />
      </div> */}
      <CurrencyPicker
        value={currency}
        onChange={setCurrency}
        currencies={["GBP", "EUR", "USD", "CAD", "NGN"]}
        searchThreshold={10}
      />
    </div>
  );
};

export default FloatingLocaleSwitcher;
