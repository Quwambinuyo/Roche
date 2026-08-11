import React from "react";
import LandingNavbar from "./LandingNavbar";
import LandingHero from "./LandingHero";
import LandingMarquee from "./LandingMarquee";
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
import Divider from "../../components/UI/Divider";

const Landing = () => {
  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      <LandingNavbar />
      <LandingHero />
      <LandingMarquee />
      <LandingTrustBar />
      <Divider />
      <div id="collections" className="scroll-mt-24">
        <LandingCategoryGrid />
      </div>
      <Divider />
      <div id="new-arrivals" className="scroll-mt-24">
        <LandingProductGrid />
      </div>
      <Divider />
      <LandingShopTheLook />
      <Divider />
      <div id="journal" className="scroll-mt-24">
        <LandingLookBook />
      </div>
      <Divider />
      <div id="fabric" className="scroll-mt-24">
        <LandingCraftSection />
      </div>
      <Divider />
      <LandingTestimonials />
      <Divider />
      <LandingFAQPreview />
      <LandingNewsletter />
      <LandingFooter />
    </div>
  );
};

export default Landing;
