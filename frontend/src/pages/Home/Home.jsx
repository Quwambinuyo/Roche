import React from "react";
import Reveal from "../Landing/Reveal";
import WelcomePanel from "./WelcomePannel";
import OrdersSummary from "./OrderSummary";
import CategoryGrid from "./CategoryGrid";
import ProductRail from "./ProductRail";
import TrustBadges from "./TrustBadges";
import TestimonialStrip from "./TestimonialStrip";
import NewsletterSignup from "./NewsletterSignup";
import Footer from "./Footer";
import { useTheme } from "../../context/ThemeContext";
import { useWishlist } from "../../context/WishlistContext";
import { CATEGORIES } from "../../mock/clothing";
import {
  USER,
  ORDERS_SUMMARY,
  RECENTLY_VIEWED,
  FOR_YOU,
  NEW_ARRIVALS,
  TESTIMONIALS,
} from "../../mock/home";

const Home = () => {
  const { theme } = useTheme();
  const { items: wishlistItems } = useWishlist();

  const wishlistProducts = wishlistItems
    .map((line) => line.product)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      <WelcomePanel user={USER} />

      <OrdersSummary
        pendingCount={ORDERS_SUMMARY.pendingCount}
        completedCount={ORDERS_SUMMARY.completedCount}
      />

      <CategoryGrid categories={CATEGORIES} />

      <ProductRail
        title="Continue Where You Left Off"
        subtitle="Recently Viewed"
        products={RECENTLY_VIEWED}
        emptyMessage="You haven't viewed anything yet. Start browsing to see items here."
        emptyCtaLabel="Browse Products"
        viewAllHref="/recently-viewed"
      />

      <ProductRail
        title="Picked For You"
        subtitle="For You"
        products={FOR_YOU}
        emptyMessage="We're still learning your style. Explore a few pieces so we can tailor this for you."
        emptyCtaLabel="Explore Products"
        viewAllHref="/for-you"
      />

      <TrustBadges />

      <ProductRail
        title="Saved For Later"
        subtitle="Your Wishlist"
        products={wishlistProducts}
        emptyMessage="Nothing saved yet. Tap the heart on any product to add it here."
        emptyCtaLabel="Discover Products"
        viewAllHref="/wishlist"
      />

      <ProductRail
        title="Just Landed"
        subtitle="New Arrivals"
        products={NEW_ARRIVALS}
        emptyMessage="New arrivals will show up here soon."
        viewAllHref="/new-arrivals"
      />

      <TestimonialStrip testimonials={TESTIMONIALS} />

      <NewsletterSignup />

      <Footer />
    </div>
  );
};

export default Home;
