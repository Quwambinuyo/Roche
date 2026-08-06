import React from "react";
import { Truck } from "lucide-react";
import OptionCard from "./OptionCard";
import { DELIVERY_METHODS } from "../constant";
import { formatNaira } from "../utils";

const DeliveryMethodSection = ({ deliveryMethod, onChange }) => (
  <section>
    <div className="flex items-center gap-2 mb-4">
      <Truck size={16} className="text-secondary/50" />
      <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
        Delivery Method
      </p>
    </div>

    <div className="space-y-3">
      {DELIVERY_METHODS.map((method) => (
        <OptionCard
          key={method.id}
          active={deliveryMethod === method.id}
          onClick={() => onChange(method.id)}
          icon={method.icon}
          label={method.label}
          detail={method.detail}
          trailing={
            <span className="text-sm font-semibold text-secondary shrink-0">
              {formatNaira(method.price)}
            </span>
          }
        />
      ))}
    </div>
  </section>
);

export default DeliveryMethodSection;
