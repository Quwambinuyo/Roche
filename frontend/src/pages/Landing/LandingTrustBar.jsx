import React from "react";
import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";

const USPS = [
  {
    icon: Truck,
    title: "Free Shipping",
    copy: "On orders over ₦50,000",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    copy: "14 days, no questions asked",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    copy: "Encrypted payment processing",
  },
  {
    icon: BadgeCheck,
    title: "Made to Last",
    copy: "Tested across 40+ wash cycles",
  },
];

const LandingTrustBar = () => {
  return (
    <section className="border-y border-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {USPS.map((usp, i) => (
          <Reveal
            key={usp.title}
            delay={i * 80}
            className="flex items-center gap-3"
          >
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/5 shrink-0">
              <usp.icon size={18} className="text-secondary" />
            </span>
            <div>
              <p className="text-sm font-semibold text-secondary">
                {usp.title}
              </p>
              <p className="text-xs text-secondary/50 mt-0.5">{usp.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default LandingTrustBar;
