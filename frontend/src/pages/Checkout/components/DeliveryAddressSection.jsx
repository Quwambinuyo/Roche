import React from "react";
import { MapPin } from "lucide-react";
import Field, { inputClass } from "./Field";
import CountryPicker from "../../../components/UI/CountryPicker";
import StatePicker from "../../../components/UI/StatePicker";

const DeliveryAddressSection = ({
  form,
  updateField,
  onCountryChange,
  onStateChange,
}) => (
  <section>
    <div className="flex items-center gap-2 mb-4">
      <MapPin size={16} className="text-secondary/50" />
      <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
        Delivery Address
      </p>
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Full Name">
        <input
          type="text"
          value={form.fullName}
          onChange={updateField("fullName")}
          placeholder="Quwam Bode Binuyo"
          className={inputClass}
        />
      </Field>

      <Field label="Phone Number">
        <input
          type="tel"
          value={form.phone}
          onChange={updateField("phone")}
          placeholder="080 000 0000"
          className={inputClass}
        />
      </Field>

      <Field label="Delivery Address">
        <input
          type="text"
          value={form.address}
          onChange={updateField("address")}
          placeholder="Street, house number, landmark"
          className={inputClass}
        />
      </Field>

      <Field label="City">
        <input
          type="text"
          value={form.city}
          onChange={updateField("city")}
          placeholder="Ikorodu"
          className={inputClass}
        />
      </Field>

      <Field label="Country">
        <CountryPicker value={form.country} onChange={onCountryChange} />
      </Field>

      <Field label="State">
        <StatePicker
          countryCode={form.country}
          value={form.state}
          onChange={onStateChange}
        />
      </Field>
    </div>
  </section>
);

export default DeliveryAddressSection;
