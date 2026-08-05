import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "./Reveal";
import RevealImage from "../../components/UI/RevealImage";

const LOOKS = [
  {
    name: "The Waterfront Layer",
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=900&q=80",
    pieces: [
      {
        id: 1,
        name: "Waxed Canvas Jacket",
        price: "₦68,000",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80",
        x: 44,
        y: 26,
      },
      {
        id: 2,
        name: "Heavyweight Tee",
        price: "₦21,500",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80",
        x: 50,
        y: 52,
      },
      {
        id: 3,
        name: "Straight Fit Chino",
        price: "₦39,000",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=300&q=80",
        x: 46,
        y: 80,
      },
    ],
  },
];

const LandingShopTheLook = () => {
  const look = LOOKS[0];
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <Reveal className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Shop The Look
        </p>
        <h2 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          {look.name}
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
        <Reveal className="relative rounded-2xl overflow-hidden h-full min-h-[420px]">
          <RevealImage
            src={look.image}
            alt={look.name}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
          {look.pieces.map((piece) => (
            <button
              key={piece.id}
              onClick={() =>
                setActiveId(activeId === piece.id ? null : piece.id)
              }
              style={{ left: `${piece.x}%`, top: `${piece.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur flex items-center justify-center shadow-lg transition-all duration-300 ${
                activeId === piece.id
                  ? "bg-secondary text-primary scale-110"
                  : "bg-primary/90 text-secondary hover:scale-110"
              }`}
            >
              {activeId === piece.id ? <X size={14} /> : <Plus size={14} />}
            </button>
          ))}
        </Reveal>

        <Reveal delay={100} className="h-full flex flex-col">
          <div className="flex flex-col divide-y divide-secondary/10">
            {look.pieces.map((piece) => (
              <a
                key={piece.id}
                href="#"
                onMouseEnter={() => setActiveId(piece.id)}
                onMouseLeave={() => setActiveId(null)}
                className={`group flex items-center gap-4 py-4 px-3 -mx-3 rounded-xl transition-colors duration-300 ${
                  activeId === piece.id ? "bg-secondary/5" : ""
                }`}
              >
                <span className="w-6 h-6 rounded-full border border-secondary/20 flex items-center justify-center text-[11px] font-semibold text-secondary/60 shrink-0">
                  {piece.id}
                </span>
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-secondary/5">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary">
                    {piece.name}
                  </p>
                  <p className="text-xs text-secondary/50 mt-0.5">
                    {piece.price}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <button className="w-full bg-secondary text-primary text-sm font-semibold tracking-widest uppercase py-3.5 rounded-full mt-auto hover:opacity-90 transition-opacity duration-300">
            Shop This Look
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export default LandingShopTheLook;
