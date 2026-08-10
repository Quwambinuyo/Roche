import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useNavigate } from "react-router-dom";

const SectionHeader = ({ title, ctaLabel = "Shop Now", link }) => {
  const navigate = useNavigate();

  return (
    <Reveal className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary uppercase">
        {title}
      </h2>
      <button
        onClick={() => navigate(link)}
        className="mt-4 inline-flex items-center gap-2 border border-secondary/30 rounded-full px-4 py-2 text-xs font-semibold tracking-widest text-secondary hover:border-secondary hover:bg-secondary hover:text-primary transition-colors duration-300 uppercase"
      >
        {ctaLabel}
        <ArrowRight size={13} />
      </button>
    </Reveal>
  );
};

export default SectionHeader;
