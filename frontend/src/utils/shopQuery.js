export const filterProducts = (
  items,
  { category, size, priceRange, priceRanges },
  parsePrice,
) => {
  let result = items;

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  if (size) {
    result = result.filter((p) => p.sizes?.includes(size));
  }

  if (priceRange) {
    const range = priceRanges.find((r) => r.value === priceRange);
    if (range) {
      result = result.filter((p) => {
        const value = parsePrice(p.price);
        return value >= range.min && value < range.max;
      });
    }
  }

  return result;
};

export const sortProducts = (items, sort, parsePrice) => {
  if (sort === "price-asc") {
    return [...items].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  }

  if (sort === "price-desc") {
    return [...items].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  return items;
};

export const paginate = (items, page, perPage) => {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paginated = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return { totalPages, currentPage, paginated };
};
