import React from "react";
import { useSettings } from "../../context/SettingContext";
import { SectionCard, Field } from "./shared";

const DENSITY_OPTIONS = [
  {
    value: "comfortable",
    label: "Comfortable",
    description: "More whitespace, easier to scan",
  },
  {
    value: "compact",
    label: "Compact",
    description: "Tighter rows, more data per screen",
  },
];

const AppearanceSection = () => {
  const { settings, updateSection } = useSettings();
  const a = settings.appearance;

  const handleColorChange = (value) => {
    updateSection(
      "appearance",
      (prev) => ({ ...prev, accentColor: value }),
      `Changed accent color to ${value}`,
    );
  };

  const handleDensityChange = (value) => {
    updateSection(
      "appearance",
      (prev) => ({ ...prev, density: value }),
      `Changed dashboard density to ${value}`,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Branding color"
        description="Used for buttons, links, and highlights. Only relevant if this instance is white-labeled."
      >
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={a.accentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-10 w-10 cursor-pointer border border-black p-0"
          />
          <span className="font-mono text-sm uppercase">{a.accentColor}</span>
        </div>
      </SectionCard>

      <SectionCard
        title="Dashboard density"
        description="Controls spacing in tables and lists."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DENSITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleDensityChange(option.value)}
              className={`flex flex-col items-start gap-1 border px-4 py-3 text-left transition-colors ${
                a.density === option.value
                  ? "border-black bg-black text-white"
                  : "border-black bg-white text-black hover:bg-neutral-100"
              }`}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wide">
                {option.label}
              </span>
              <span className="font-mono text-[11px] opacity-80">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default AppearanceSection;
