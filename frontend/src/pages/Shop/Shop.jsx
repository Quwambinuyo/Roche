import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ShopFilters from "./ShopFilters";
import ShopSortDropdown from "./ShopSortDropdown";
import ShopActiveFilters from "./ShopActiveFilters";
import ShopProductGrid from "./ShopProductGrid";
import ShopPagination from "./ShopPagination";
import { PRODUCTS } from "../../mock/clothing";
import {
  PRICE_RANGES,
  PRODUCTS_PER_PAGE,
  parsePrice,
} from "./shopFilterConfig";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const size = searchParams.get("size") || "";
  const priceRange = searchParams.get("price") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete("page");
    setSearchParams(next);
  };

  const setPage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (size) {
      result = result.filter((p) => p.sizes?.includes(size));
    }

    if (priceRange) {
      const range = PRICE_RANGES.find((r) => r.value === priceRange);
      if (range) {
        result = result.filter((p) => {
          const value = parsePrice(p.price);
          return value >= range.min && value < range.max;
        });
      }
    }

    if (sort === "price-asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sort === "price-desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return result;
  }, [category, size, priceRange, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PRODUCTS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const hasActiveFilters = Boolean(category || size || priceRange);

  return (
    <div className="">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Shop
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "All Products"}
        </h1>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-sm text-secondary/50">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>
        <ShopSortDropdown
          value={sort}
          onChange={(v) => updateParam("sort", v)}
        />
      </div>

      {hasActiveFilters && (
        <ShopActiveFilters
          category={category}
          size={size}
          priceRange={priceRange}
          onRemove={updateParam}
          onClearAll={clearFilters}
        />
      )}

      <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
        <ShopFilters
          category={category}
          size={size}
          priceRange={priceRange}
          onChange={updateParam}
        />

        <div>
          <ShopProductGrid products={paginated} onClearFilters={clearFilters} />

          {filtered.length > 0 && (
            <ShopPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
