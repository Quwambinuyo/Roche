import React from "react";
import { FABRIC_WORDS } from "../../mock/clothing";

const LandingMarquee = () => {
  const words = [...FABRIC_WORDS, ...FABRIC_WORDS];

  return (
    <div // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className="bg-black dark:bg-white overflow-hidden py-2.5 border-y border-secondary/10"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {words.map((word, i) => (
          <span
            key={i}
            className="mx-6 text-xs font-semibold tracking-widest text-white dark:text-black"
          >
            {word} <span className="mx-6 text-tertiary-400">/</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LandingMarquee;
