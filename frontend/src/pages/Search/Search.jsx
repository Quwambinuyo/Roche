import React, { useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import ProductDetailsDrawer from "../Product/detail/ProductDetailsDrawer";
import { PRODUCTS } from "../../mock/clothing";

const searchProducts = (products, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.category,
      product.fabric,
      ...(product.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => searchProducts(PRODUCTS, query), [query]);

  const [selectedColors, setSelectedColors] = useState({});
  const [drawerSlug, setDrawerSlug] = useState(null);

  const closeDrawer = useCallback(() => setDrawerSlug(null), []);

  const handleColorChange = (slug, colorName) => {
    setSelectedColors((prev) => ({ ...prev, [slug]: colorName }));
  };

  return (
    <div className="">
      <div className="mb-8">
        <p className="text-sm text-tertiary-500">
          {query
            ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`
            : "Enter a search term to see results"}
        </p>
      </div>

      {query && results.length === 0 && (
        <p className="text-sm text-tertiary-500">
          No products matched your search.
        </p>
      )}

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        {results.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            selectedColor={selectedColors[product.slug]}
            onColorChange={(colorName) =>
              handleColorChange(product.slug, colorName)
            }
            onOpenSizeDrawer={setDrawerSlug}
          />
        ))}
      </div>

      <ProductDetailsDrawer
        isOpen={Boolean(drawerSlug)}
        onClose={closeDrawer}
        slug={drawerSlug}
      />
    </div>
  );
};

export default Search;
