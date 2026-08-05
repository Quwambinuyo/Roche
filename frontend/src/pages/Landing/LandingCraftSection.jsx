import React from "react";
import Reveal from "./Reveal";
import RevealImage from "../../components/UI/RevealImage";
import Counter from "../../components/UI/Counter";

const LandingCraftSection = () => {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
        <RevealImage
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80"
          alt="Fabric close up"
          className="relative rounded-2xl aspect-[4/3]"
        />

        <Reveal delay={100}>
          <p className="text-xs font-semibold tracking-widest text-secondary">
            THE MATERIAL
          </p>
          <h2 className="font-bold text-3xl text-secondary mt-3 leading-tight">
            Fabric first, everything else follows.
          </h2>
          <p className="text-secondary/60 mt-4 max-w-md leading-relaxed">
            We source heavyweight cottons and waxed canvas from mills that weave
            for durability, not just texture. Every cut is tested against wear
            before it reaches a rack.
          </p>
          <div className="flex gap-8 mt-6">
            <div>
              <p className="font-bold text-2xl text-secondary">
                <Counter to={12} suffix="oz" />
              </p>
              <p className="text-xs text-secondary/50 mt-1">Canvas weight</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-secondary">
                <Counter to={40} suffix="+" />
              </p>
              <p className="text-xs text-secondary/50 mt-1">
                Wash cycles tested
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LandingCraftSection;
