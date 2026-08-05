import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const LandingHero = () => {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/videos/9512048/pexels-photo-9512048.jpeg?auto=compress&w=1260&h=750&dpr=1"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/9512048/9512048-uhd_1440_2732_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-secondary/5" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <Reveal>
          <h1 className="text-primary font-extrabold text-4xl md:text-6xl tracking-tight uppercase">
            Roche Rue
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <button className="mt-8 inline-flex items-center gap-2 border border-primary text-primary text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-primary hover:text-secondary transition-colors duration-300">
            View
            <ArrowRight size={14} />
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export default LandingHero;
