import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import Reveal from "../Landing/Reveal";

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: "Email",
    value: "hello@bstrt.com",
    href: "mailto:hello@bstrt.com",
  },
  {
    icon: FiPhone,
    label: "Phone / WhatsApp",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: FiMapPin,
    label: "Studio",
    value: "12 Admiralty Way, Lekki, Lagos",
    href: null,
  },
  {
    icon: FiClock,
    label: "Hours",
    value: "Mon – Sat, 9am – 6pm WAT",
    href: null,
  },
];

const SOCIAL_LINKS = [
  { icon: FiInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FiTwitter, label: "Twitter", href: "https://twitter.com" },
  { icon: FiFacebook, label: "Facebook", href: "https://facebook.com" },
];

const ContactInfo = () => {
  return (
    <Reveal delay={50}>
      <div className="space-y-4">
        {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-secondary/10">
              <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center shrink-0 text-secondary">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-xs text-secondary/50">{label}</p>
                <p className="text-sm font-semibold text-secondary mt-0.5">
                  {value}
                </p>
              </div>
            </div>
          );

          return href ? (
            <a
              key={label}
              href={href}
              className="block hover:opacity-70 transition-opacity"
            >
              {content}
            </a>
          ) : (
            <div key={label}>{content}</div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-secondary/10">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-3">
          Follow us
        </p>
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-secondary/15 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default ContactInfo;
