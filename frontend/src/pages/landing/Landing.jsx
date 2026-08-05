import React from "react";
import LandingNavbar from "./LandingNavbar";
import LandingMarquee from "./LandingMarquee";
import LandingHero from "./LandingHero";
import LandingCategoryGrid from "./LandingCategoryGrid";
import LandingProductGrid from "./LandingProductGrid";
import LandingCraftSection from "./LandingCraftSection";
import LandingTestimonials from "./LandingTestimonials";
import LandingNewsletter from "./LandingNewsletter";
import LandingFooter from "./LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      <LandingNavbar />
      <LandingMarquee />
      <LandingHero />
      <LandingCategoryGrid />
      <LandingProductGrid />
      <LandingCraftSection />
      <LandingTestimonials />
      <LandingNewsletter />
      <LandingFooter />
    </div>
  );
};

export default Landing;
