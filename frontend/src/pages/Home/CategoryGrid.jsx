import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../Landing/Reveal";

const CategoryGrid = ({ categories }) => {
  const safeCategories = (categories || []).filter(Boolean);
  if (safeCategories.length === 0) return null;

  return (
    <Reveal className="py-8">
      <div className="flex items-end justify-between mb-5">
        <h2 className="font-bold text-xl md:text-2xl text-secondary">
          Shop By Category
        </h2>
        <Link
          to="/categories"
          className="text-sm font-semibold text-tertiary-700"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {safeCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/shop?category=${category.slug}`}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-secondary/5 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-secondary text-center">
              {category.name}
            </span>
            {typeof category.count === "number" && (
              <span className="text-[11px] text-secondary/40">
                {category.count} items
              </span>
            )}
          </Link>
        ))}
      </div>
    </Reveal>
  );
};

export default CategoryGrid;
