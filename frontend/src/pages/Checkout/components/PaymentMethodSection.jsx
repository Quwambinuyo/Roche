import React from "react";
import { CreditCard } from "lucide-react";
import OptionCard from "./OptionCard";
import { PAYMENT_METHODS } from "../constant";

const PaymentMethodSection = ({ paymentMethod, onChange }) => (
  <section>
    <div className="flex items-center gap-2 mb-4">
      <CreditCard size={16} className="text-secondary/50" />
      <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
        Payment Method
      </p>
    </div>

    <div className="space-y-3">
      {PAYMENT_METHODS.map((method) => (
        <OptionCard
          key={method.id}
          active={paymentMethod === method.id}
          onClick={() => onChange(method.id)}
          icon={method.icon}
          label={method.label}
          detail={method.detail}
        />
      ))}
    </div>
  </section>
);

export default PaymentMethodSection;
