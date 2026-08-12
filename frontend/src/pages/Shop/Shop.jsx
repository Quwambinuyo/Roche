import React, { useMemo, useState, useCallback } from "react";
import ShopFilters from "./ShopFilters";
import ShopSortDropdown from "./ShopSortDropdown";
import ShopActiveFilters from "./ShopActiveFilters";
import ShopProductGrid from "./ShopProductGrid";
import ShopPagination from "./ShopPagination";
import ProductDetailsDrawer from "../../pages/Product/detail/ProductDetailsDrawer";
import PageMeta from "../../layouts/PageMeta";
import { PRODUCTS, BUNDLES } from "../../mock/clothing";
import { PRICE_RANGES, PRODUCTS_PER_PAGE } from "./shopFilterConfig";
import { parsePrice } from "../../utils/price";
import { filterProducts, sortProducts, paginate } from "../../utils/shopQuery";
import { useSearchParamState } from "../../hooks/useSearchParamState";

const ALL_ITEMS = [...PRODUCTS, ...BUNDLES];

const Shop = () => {
  const { searchParams, setParam, clearParams } = useSearchParamState();
  const [drawerSlug, setDrawerSlug] = useState(null);

  const category = searchParams.get("category") || "";
  const size = searchParams.get("size") || "";
  const priceRange = searchParams.get("price") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  const setPage = (nextPage) => {
    setParam("page", String(nextPage), { resetPage: false });
  };

  const closeDrawer = useCallback(() => setDrawerSlug(null), []);

  const filtered = useMemo(() => {
    const byFilters = filterProducts(
      ALL_ITEMS,
      { category, size, priceRange, priceRanges: PRICE_RANGES },
      parsePrice,
    );

    return sortProducts(byFilters, sort, parsePrice);
  }, [category, size, priceRange, sort]);

  const { totalPages, currentPage, paginated } = paginate(
    filtered,
    page,
    PRODUCTS_PER_PAGE,
  );

  const hasActiveFilters = Boolean(category || size || priceRange);

  return (
    <div className="">
      <PageMeta
        overrideTitle={category ? categoryLabel : "Shop"}
        overrideDescription={`Browse ${categoryLabel.toLowerCase()} from BODE S.T.R.T.`}
      />

      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase">
          Shop
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-secondary mt-2">
          {categoryLabel}
        </h1>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-sm text-secondary/50">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>
        <ShopSortDropdown value={sort} onChange={(v) => setParam("sort", v)} />
      </div>

      {hasActiveFilters && (
        <ShopActiveFilters
          category={category}
          size={size}
          priceRange={priceRange}
          onRemove={setParam}
          onClearAll={clearParams}
        />
      )}

      <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
        <ShopFilters
          category={category}
          size={size}
          priceRange={priceRange}
          onChange={setParam}
        />

        <div>
          <ShopProductGrid
            products={paginated}
            onClearFilters={clearParams}
            onOpenSizeDrawer={setDrawerSlug}
          />

          {filtered.length > 0 && (
            <ShopPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      <ProductDetailsDrawer
        isOpen={Boolean(drawerSlug)}
        onClose={closeDrawer}
        slug={drawerSlug}
      />
    </div>
  );
};

export default Shop;
