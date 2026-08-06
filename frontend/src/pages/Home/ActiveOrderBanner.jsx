import React from "react";
import { Truck } from "lucide-react";
import Reveal from "../Landing/Reveal";

const ActiveOrderBanner = ({ order }) => {
  if (!order) return null;

  return (
    <Reveal className="pt-8">
      <div className="rounded-2xl border border-secondary/10 bg-secondary/5 p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
              <Truck size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-secondary">
                {order.eta}
              </p>
              <p className="text-xs text-secondary/50 mt-0.5">
                Order #{order.id} · {order.status}
              </p>
            </div>
          </div>
          <a
            href="#"
            className="text-xs font-semibold tracking-widest uppercase text-tertiary-700 self-center"
          >
            Track order
          </a>
        </div>

        <div className="flex items-center mt-5">
          {order.steps.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    i <= order.step ? "bg-secondary" : "bg-secondary/15"
                  }`}
                />
                <span
                  className={`text-[10px] whitespace-nowrap transition-colors duration-300 ${
                    i <= order.step ? "text-secondary" : "text-secondary/30"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < order.steps.length - 1 && (
                <span
                  className={`flex-1 h-px mx-1 mb-4 transition-colors duration-300 ${
                    i < order.step ? "bg-secondary" : "bg-secondary/15"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default ActiveOrderBanner;
