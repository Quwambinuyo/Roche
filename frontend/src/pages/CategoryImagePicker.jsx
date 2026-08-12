import React, { useState } from "react";
import { usePexelsImages } from "../hooks/useFetchProduct";

const CATEGORY_QUERIES = [
  { slug: "outerwear", query: "outerwear jacket flatlay fashion" },
  { slug: "tops", query: "shirt tshirt flatlay fashion" },
  { slug: "bottoms", query: "jeans trousers flatlay fashion" },
  { slug: "accessories", query: "fashion accessories flatlay" },
  { slug: "watches", query: "wrist watch product photo" },
  { slug: "footwear", query: "sneakers shoes product photo" },
  { slug: "caps", query: "baseball cap product photo" },
  { slug: "glasses", query: "sunglasses product photo" },
  { slug: "bundles", query: "clothing bundle flatlay fashion" },
];

const CategoryImagePicker = () => {
  const [activeSlug, setActiveSlug] = useState(CATEGORY_QUERIES[0].slug);
  const active = CATEGORY_QUERIES.find((c) => c.slug === activeSlug);
  const { images, loading, error } = usePexelsImages(active.query);

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORY_QUERIES.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActiveSlug(c.slug)}
            className={`px-3 py-1.5 text-sm rounded-full border ${
              c.slug === activeSlug
                ? "bg-secondary text-primary border-secondary"
                : "border-secondary/20 text-secondary/70"
            }`}
          >
            {c.slug}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-secondary/50">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative">
            <img
              src={img.src.medium}
              alt={img.alt || active.slug}
              className="w-full aspect-square object-cover rounded"
            />
            <button
              onClick={() => copyUrl(img.src.large)}
              className="absolute inset-0 bg-black/0 group-hover:bg-black/40 text-white text-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
            >
              Copy URL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryImagePicker;
