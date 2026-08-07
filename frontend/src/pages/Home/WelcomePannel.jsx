import React from "react";
import Reveal from "../Landing/Reveal";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const getInitial = (name) => name?.trim()?.charAt(0)?.toUpperCase() ?? "?";

const WelcomePanel = ({ user }) => {
  return (
    <Reveal className="py-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-base shrink-0">
          {getInitial(user?.name)}
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
            {getGreeting()}
          </p>
          <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-1">
            {user?.name}
          </h1>
        </div>
      </div>
    </Reveal>
  );
};

export default WelcomePanel;
