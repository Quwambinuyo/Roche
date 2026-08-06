import React, { useEffect, useRef, useState } from "react";
import { FiSend, FiChevronDown, FiCheck } from "react-icons/fi";
import Reveal from "../Landing/Reveal";

const CONTACT_REASONS = [
  "Order Support",
  "Returns & Exchanges",
  "Wholesale Inquiry",
  "General Question",
];

const initialFormState = {
  name: "",
  email: "",
  reason: CONTACT_REASONS[0],
  message: "",
};

const ReasonDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (reason) => {
    onChange(reason);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-11 px-4 rounded-full text-sm text-secondary bg-secondary/5 outline-none ring-1 ring-transparent focus:ring-secondary/20 transition-colors flex items-center justify-between"
      >
        <span>{value}</span>
        <FiChevronDown
          size={15}
          className={`text-secondary/50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-2xl border border-secondary/10 bg-primary shadow-lg overflow-hidden py-1">
          {CONTACT_REASONS.map((reason) => {
            const isSelected = reason === value;
            return (
              <button
                type="button"
                key={reason}
                onClick={() => handleSelect(reason)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                  isSelected
                    ? "text-secondary font-semibold bg-secondary/5"
                    : "text-secondary/70 hover:bg-secondary/5"
                }`}
              >
                {reason}
                {isSelected && <FiCheck size={14} className="text-secondary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleReasonChange = (reason) => {
    setForm((prev) => ({ ...prev, reason }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please enter a message";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitted(true);
    setForm(initialFormState);
  };

  return (
    <Reveal>
      {isSubmitted ? (
        <div className="rounded-2xl border border-secondary/10 p-8 text-center">
          <p className="text-sm font-semibold text-secondary">Message sent</p>
          <p className="text-sm text-secondary/60 mt-2">
            Thanks for reaching out — we'll get back to you shortly.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 text-xs font-semibold text-secondary underline underline-offset-2 hover:text-tertiary-600 transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-2 block"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              className={`w-full h-11 px-4 rounded-full text-sm text-secondary bg-secondary/5 outline-none ring-1 transition-colors ${
                errors.name
                  ? "ring-red-400"
                  : "ring-transparent focus:ring-secondary/20"
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-2 block"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              className={`w-full h-11 px-4 rounded-full text-sm text-secondary bg-secondary/5 outline-none ring-1 transition-colors ${
                errors.email
                  ? "ring-red-400"
                  : "ring-transparent focus:ring-secondary/20"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-2 block">
              Reason
            </label>
            <ReasonDropdown value={form.reason} onChange={handleReasonChange} />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-2 block"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={handleChange("message")}
              className={`w-full px-4 py-3 rounded-2xl text-sm text-secondary bg-secondary/5 outline-none ring-1 transition-colors resize-none ${
                errors.message
                  ? "ring-red-400"
                  : "ring-transparent focus:ring-secondary/20"
              }`}
              placeholder="Tell us how we can help"
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1.5 ml-1">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-full text-sm font-semibold bg-secondary text-primary hover:bg-tertiary-800 transition-colors flex items-center justify-center gap-2"
          >
            <FiSend size={15} />
            Send message
          </button>
        </form>
      )}
    </Reveal>
  );
};

export default ContactForm;
