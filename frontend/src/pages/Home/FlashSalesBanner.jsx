import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import Reveal from "../Landing/Reveal";

const getTimeLeft = (endsAt) => {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
};

const pad = (n) => String(n).padStart(2, "0");

const FlashSaleBanner = ({ sale }) => {
  const [timeLeft, setTimeLeft] = useState(
    () => sale && getTimeLeft(sale.endsAt),
  );

  useEffect(() => {
    if (!sale) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(sale.endsAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [sale]);

  if (!sale || !timeLeft) return null;

  return (
    <Reveal className="py-6">
      <Link
        to={sale.href ?? "/deals"}
        className="flex items-center justify-between rounded-2xl bg-tertiary-700 px-6 py-5 text-white"
      >
        <div className="flex items-center gap-3">
          <Zap size={20} className="shrink-0" />
          <div>
            <p className="font-bold text-base md:text-lg">{sale.title}</p>
            <p className="text-xs md:text-sm text-white/80">{sale.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 font-mono text-sm md:text-base font-semibold">
          <span className="bg-white/15 rounded-md px-2 py-1">
            {pad(timeLeft.hours)}
          </span>
          :
          <span className="bg-white/15 rounded-md px-2 py-1">
            {pad(timeLeft.minutes)}
          </span>
          :
          <span className="bg-white/15 rounded-md px-2 py-1">
            {pad(timeLeft.seconds)}
          </span>
        </div>
      </Link>
    </Reveal>
  );
};

export default FlashSaleBanner;
