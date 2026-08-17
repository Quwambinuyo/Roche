import { PRODUCTS, CATEGORIES } from "../mock/clothing";

const SUGGESTION_POOL = Array.from(
  new Set([
    ...PRODUCTS.map((p) => p.name),
    ...CATEGORIES.map((c) => c.name),
    ...PRODUCTS.map((p) => p.fabric),
  ]),
);

export const getSuggestions = (query, limit = 6) => {
  const q = query.trim().toLowerCase();
  if (!q) return SUGGESTION_POOL.slice(0, limit);

  return SUGGESTION_POOL.filter((term) => term.toLowerCase().includes(q)).slice(
    0,
    limit,
  );
};
