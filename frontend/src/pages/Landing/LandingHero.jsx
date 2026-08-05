import React from "react";
import { ArrowRight } from "lucide-react";
import SplitText from "../../components/UI/SplitText";
import MagneticButton from "../../components/UI/MagneticButton";

const LandingHero = () => {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/videos/9512045/pexels-photo-9512045.jpeg?auto=compress&w=1260&h=750&dpr=1"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/9512045/9512045-uhd_2732_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-secondary/5" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-primary font-extrabold text-4xl md:text-6xl tracking-tight uppercase">
          <SplitText text="Roche Rue" />
        </h1>

        <div
          className="mt-8"
          style={{
            opacity: 0,
            animation:
              "heroCtaIn 600ms cubic-bezier(0.22,1,0.36,1) 550ms forwards",
          }}
        >
          <style>{`
            @keyframes heroCtaIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <MagneticButton className="inline-flex items-center gap-2 border border-primary text-primary text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-primary hover:text-secondary transition-colors duration-300">
            View
            <ArrowRight size={14} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
