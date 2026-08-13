import React, { useState } from "react";
import {
  FiInstagram,
  FiTwitter,
  FiChevronDown,
  FiMessageCircle,
  FiHelpCircle,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiFileText,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import CountryPicker from "../../components/UI/CountryPicker";
import CurrencyPicker from "../../components/UI/CurrencyPicker";
import Reveal from "./Reveal";
import MagneticButton from "../../components/UI/MagneticButton";
import { useCountry } from "../../context/CountryContext";

const RESOURCE_LINKS = [
  { label: "FAQ", icon: FiHelpCircle },
  { label: "Shipping Policy", icon: FiTruck },
  { label: "Privacy Policy", icon: FiShield },
  { label: "Refund Policy", icon: FiRefreshCw },
  { label: "Terms Of Service", icon: FiFileText },
];

const EXAMPLE_ADDRESS = "12 Example Street, Victoria Island, Lagos, Nigeria";

const AccordionRow = ({ label, open, onToggle, children }) => (
  <div className="border-t border-secondary/10">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-sm font-bold tracking-widest uppercase group"
    >
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {label}
      </span>
      <FiChevronDown
        size={16}
        className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      />
    </button>
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <p className="text-sm text-secondary/70 pb-5">{children}</p>
      </div>
    </div>
  </div>
);

const LandingFooter = () => {
  const [supportOpen, setSupportOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const { country, setCountry, currency, setCurrency } = useCountry();

  const socials = [
    { icon: FiInstagram, label: "Instagram", size: 16 },
    { icon: FiTwitter, label: "X", size: 16 },
    { icon: FaTiktok, label: "TikTok", size: 14 },
  ];

  return (
    <footer className="bg-primary text-secondary pt-14 pb-20 md:pb-6 overflow-hidden">
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(0,0,0,0); }
        }
        .animate-dropdownIn { animation: dropdownIn 0.18s ease-out; }
        .animate-pulseGlow { animation: pulseGlow 2.4s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal delay={0}>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4">
              Socials
            </h3>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, size }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-secondary/20 hover:border-secondary hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon size={size} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4">
              Resources
            </h3>
            <div className="flex flex-col divide-y divide-secondary/10">
              {RESOURCE_LINKS.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  className="group flex items-center gap-3 py-2.5 text-sm text-secondary/70 hover:text-secondary transition-colors duration-300"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border border-secondary/15 shrink-0 group-hover:border-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                    <Icon size={13} />
                  </span>
                  <span className="flex-1">{label}</span>
                  <FiArrowUpRight
                    size={14}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <AccordionRow
            label="Support"
            open={supportOpen}
            onToggle={() => setSupportOpen((o) => !o)}
          >
            Reach us any day between 9am and 6pm WAT for order help, sizing
            questions, or returns.
          </AccordionRow>

          <AccordionRow
            label="Store Address"
            open={addressOpen}
            onToggle={() => setAddressOpen((o) => !o)}
          >
            {EXAMPLE_ADDRESS}
          </AccordionRow>
        </Reveal>

        <Reveal
          delay={200}
          className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6 border-t border-secondary/10"
        >
          <div className="flex items-center gap-3 relative z-[60]">
            <CountryPicker value={country} onChange={setCountry} />
            <CurrencyPicker
              value={currency}
              onChange={setCurrency}
              currencies={["GBP", "EUR", "USD", "CAD", "NGN"]}
            />
          </div>
          <p className="text-xs text-secondary/40">© 2026 ZFZ </p>
        </Reveal>
      </div>

      <MagneticButton
        as="a"
        href="#"
        strength={0.25}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-secondary text-primary text-xs font-semibold px-4 py-3 rounded-full shadow-xl hover:opacity-90 transition-opacity duration-300 animate-pulseGlow"
      >
        <FiMessageCircle size={16} />
        Chat With Us
      </MagneticButton>
    </footer>
  );
};

export default LandingFooter;
