export const totalStock = (item) =>
  item.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || 0;
