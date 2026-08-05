import React, { useState } from "react";
import { FiChevronDown, FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";

const FAQS = [
  {
    question: "How long does shipping take?",
    answer:
      "Lagos orders arrive in 1-2 business days. Other states in Nigeria typically take 3-5 business days.",
  },
  {
    question: "What's your return policy?",
    answer:
      "Unworn items in original condition can be returned within 14 days of delivery for a full refund.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Not yet. We currently ship within Nigeria only, with international shipping planned for later this year.",
  },
];

const FAQRow = ({ question, answer, open, onToggle }) => (
  <div className="border-t border-secondary/10">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left"
    >
      <span className="text-sm font-medium text-secondary">{question}</span>
      <FiChevronDown
        size={16}
        className={`shrink-0 ml-4 transition-transform duration-300 ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <p className="text-sm text-secondary/60 leading-relaxed pb-5 pr-8">
          {answer}
        </p>
      </div>
    </div>
  </div>
);

const LandingFAQPreview = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <Reveal className="flex items-end justify-between mb-4">
        <h2 className="font-bold text-2xl md:text-3xl text-secondary">
          Questions, Answered
        </h2>
        <a
          href="#"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-tertiary-700"
        >
          View all FAQ <FiArrowUpRight size={14} />
        </a>
      </Reveal>

      <Reveal delay={80}>
        {FAQS.map((faq, i) => (
          <FAQRow
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </Reveal>
    </section>
  );
};

export default LandingFAQPreview;
