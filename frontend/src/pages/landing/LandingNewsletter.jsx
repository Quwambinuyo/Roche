import React from "react";
import Reveal from "./Reveal";

const LandingNewsletter = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
      <Reveal className="bg-secondary rounded-2xl px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-primary">
            Get first access to new drops.
          </h2>
          <p className="text-primary/70 text-sm mt-2">
            One email a month. No noise, just new arrivals and restocks.
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input
            type="email"
            placeholder="you@email.com"
            className="bg-primary/10 text-primary placeholder-primary/40 text-sm rounded-full px-5 py-3 w-full md:w-64 outline-none border border-primary/10 focus:border-tertiary-400 transition-colors duration-300"
          />
          <button className="bg-tertiary-400 text-secondary font-semibold text-sm px-5 py-3 rounded-full hover:bg-tertiary-300 transition-colors duration-300 whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </Reveal>
    </section>
  );
};

export default LandingNewsletter;
