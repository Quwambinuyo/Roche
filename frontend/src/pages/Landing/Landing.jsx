import React from "react";
import LandingNavbar from "./LandingNavbar";
import LandingMarquee from "./LandingMarquee";
import LandingHero from "./LandingHero";
import LandingTrustBar from "./LandingTrustBar";
import LandingCategoryGrid from "./LandingCategoryGrid";
import LandingProductGrid from "./LandingProductGrid";
import LandingShopTheLook from "./LandingShopTheLook";
import LandingLookBook from "./LandingLookBook";
import LandingCraftSection from "./LandingCraftSection";
import LandingTestimonials from "./LandingTestimonials";
import LandingFAQPreview from "./LandingFAQPreview";
import LandingNewsletter from "./LandingNewsletter";
import LandingFooter from "./LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      <LandingNavbar />
      <LandingMarquee />
      <LandingHero />
      <LandingTrustBar />
      <LandingCategoryGrid />
      <LandingProductGrid />
      <LandingShopTheLook />
      <LandingLookBook />
      <LandingCraftSection />
      <LandingTestimonials />
      <LandingFAQPreview />
      <LandingNewsletter />
      <LandingFooter />
    </div>
  );
};

export default Landing;
