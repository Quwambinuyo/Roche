import React, { useState } from "react";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import RevealImage from "../../components/UI/RevealImage";

const LOOKS = [
  {
    name: "The Waterfront Layer",
    pieces: [
      {
        id: 1,
        name: "Waxed Canvas Jacket",
        price: "₦68,000",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 2,
        name: "Heavyweight Tee",
        price: "₦21,500",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 3,
        name: "Straight Fit Chino",
        price: "₦39,000",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
];

const parsePrice = (price) => Number(price.replace(/[^\d]/g, ""));

const formatNaira = (amount) => `₦${amount.toLocaleString("en-NG")}`;

const LandingShopTheLook = () => {
  const look = LOOKS[0];
  const [selected, setSelected] = useState(
    new Set(look.pieces.map((p) => p.id)),
  );

  const togglePiece = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const total = look.pieces
    .filter((p) => selected.has(p.id))
    .reduce((sum, p) => sum + parsePrice(p.price), 0);

  const flatlayStyles = [
    "w-[70%] top-[6%] left-1/2 -translate-x-1/2 z-10",
    "w-[46%] top-[38%] left-[54%] -translate-x-1/2 z-20",
    "w-[54%] top-[62%] left-[46%] -translate-x-1/2 z-30",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <Reveal className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Shop The Look
        </p>
        <h2 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          {look.name}
        </h2>
        <p className="text-sm text-secondary/50 mt-2">
          Tap a piece to build your own version of the look.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-[1fr_0.9fr] gap-10 items-stretch">
        <Reveal className="relative rounded-2xl overflow-hidden h-full min-h-[500px] max-h-[550px] bg-secondary/5">
          {look.pieces.map((piece, i) => {
            const isOn = selected.has(piece.id);
            return (
              <div
                key={piece.id}
                className={`absolute rounded-xl overflow-hidden shadow-xl transition-all duration-500 ease-out aspect-[4/3] ${flatlayStyles[i]} ${
                  isOn
                    ? "opacity-100 scale-100 grayscale-0"
                    : "opacity-40 scale-90 grayscale"
                }`}
              >
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={100} className="h-full flex flex-col">
          <div className="flex flex-col divide-y divide-secondary/10">
            {look.pieces.map((piece) => {
              const isOn = selected.has(piece.id);
              return (
                <button
                  key={piece.id}
                  onClick={() => togglePiece(piece.id)}
                  className={`group flex items-center gap-4 py-4 px-3 -mx-3 rounded-xl transition-colors duration-300 text-left ${
                    isOn ? "bg-secondary/5" : ""
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOn
                        ? "bg-secondary border-secondary text-primary"
                        : "border-secondary/20 text-transparent"
                    }`}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-secondary/5">
                    <img
                      src={piece.image}
                      alt={piece.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isOn ? "" : "grayscale opacity-50"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isOn ? "text-secondary" : "text-secondary/40"
                      }`}
                    >
                      {piece.name}
                    </p>
                    <p className="text-xs text-secondary/50 mt-0.5">
                      {piece.price}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-secondary/50">
                {selected.size} of {look.pieces.length} pieces
              </span>
              <span className="font-semibold text-secondary">
                {formatNaira(total)}
              </span>
            </div>
            <button className="w-full bg-secondary text-primary text-sm font-semibold tracking-widest uppercase py-3.5 rounded-full hover:opacity-90 transition-opacity duration-300">
              Add Look to Cart
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LandingShopTheLook;
