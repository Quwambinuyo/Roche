import React, { useState } from "react";
import { Mail } from "lucide-react";
import Reveal from "../Landing/Reveal";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Reveal className="py-10">
      <div className="rounded-2xl bg-secondary/5 px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <Mail size={22} className="text-tertiary-700 shrink-0" />
          <div>
            <p className="font-bold text-secondary text-base md:text-lg">
              Get 10% off your first order
            </p>
            <p className="text-xs md:text-sm text-secondary/50">
              Sign up for restock alerts, deals, and new arrivals.
            </p>
          </div>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 md:w-64 rounded-full border border-secondary/15 bg-primary px-4 py-2 text-sm text-secondary outline-none"
          />
          <button
            onClick={handleSubmit}
            className="rounded-full bg-tertiary-700 text-white text-sm font-semibold px-5 py-2"
          >
            {submitted ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>
    </Reveal>
  );
};

export default NewsletterSignup;
