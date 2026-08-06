import React from "react";
import Reveal from "../Landing/Reveal";
import ActiveOrderBanner from "./ActiveOrderBanner";
import ProductRail from "./ProductRail";
import QuickLinks from "./QuickLinks";
import { useTheme } from "../../context/ThemeContext";
import { useWishlist } from "../../context/WishlistContext";
import {
  USER,
  ACTIVE_ORDER,
  RECENTLY_VIEWED,
  FOR_YOU,
  NEW_ARRIVALS,
} from "../../mock/home";

const Home = () => {
  const { theme } = useTheme();
  const { items: wishlistItems } = useWishlist();

  const wishlistProducts = wishlistItems
    .map((line) => line.product)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      <Reveal className="">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Welcome back
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          {USER.name}
        </h1>
      </Reveal>

      <ActiveOrderBanner order={ACTIVE_ORDER} />

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

      <QuickLinks />
    </div>
  );
};

export default Home;
