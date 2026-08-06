import React, { useEffect } from "react";
import { X } from "lucide-react";

const SIZE_CHARTS = {
  tops: {
    unit: "cm",
    columns: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
    rows: [
      ["XS", "86-91", "66", "42", "60"],
      ["S", "92-97", "68", "44", "61"],
      ["M", "98-103", "70", "46", "62"],
      ["L", "104-109", "72", "48", "63"],
      ["XL", "110-115", "74", "50", "64"],
      ["2XL", "116-121", "76", "52", "65"],
      ["3XL", "122-127", "78", "54", "66"],
    ],
  },
  outerwear: {
    unit: "cm",
    columns: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
    rows: [
      ["S", "100-105", "70", "45", "62"],
      ["M", "106-111", "72", "47", "63"],
      ["L", "112-117", "74", "49", "64"],
      ["XL", "118-123", "76", "51", "65"],
      ["2XL", "124-129", "78", "53", "66"],
      ["3XL", "130-135", "80", "55", "67"],
    ],
  },
  bottoms: {
    unit: "cm",
    columns: ["Size", "Waist", "Hip", "Inseam"],
    rows: [
      ["S", "76-81", "94-99", "78"],
      ["M", "82-87", "100-105", "79"],
      ["L", "88-93", "106-111", "80"],
      ["XL", "94-99", "112-117", "81"],
      ["2XL", "100-105", "118-123", "82"],
      ["3XL", "106-111", "124-129", "83"],
    ],
  },
  footwear: {
    unit: "",
    columns: ["EU", "UK", "US", "Foot length (cm)"],
    rows: [
      ["40", "6.5", "7", "25.4"],
      ["41", "7.5", "8", "26.0"],
      ["42", "8", "8.5", "26.7"],
      ["43", "9", "9.5", "27.3"],
      ["44", "9.5", "10", "27.9"],
      ["45", "10.5", "11", "28.6"],
    ],
  },
};

const SizeGuide = ({ category, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  const chart = SIZE_CHARTS[category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-secondary/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-primary rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-semibold tracking-widest text-secondary uppercase">
            Size Guide
          </p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary/5 text-secondary/60 hover:text-secondary transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {chart ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-secondary/10">
                    {chart.columns.map((col) => (
                      <th
                        key={col}
                        className="text-left py-2 pr-4 font-semibold text-secondary/50 uppercase text-xs tracking-wider whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chart.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-secondary/5">
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={`py-2.5 pr-4 whitespace-nowrap ${
                            i === 0
                              ? "font-semibold text-secondary"
                              : "text-secondary/70"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {chart.unit && (
              <p className="text-xs text-secondary/40 mt-3">
                All measurements in {chart.unit}, garment measured flat.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-secondary/60">
            This item is one size and fits most.
          </p>
        )}
      </div>
    </div>
  );
};

export default SizeGuide;
