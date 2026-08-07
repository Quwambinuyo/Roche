export const isColorAvailable = (color) => (color?.stock ?? 0) > 0;

export const getStockStatus = (product, activeColorName) => {
  const hasColors = Boolean(product?.colors?.length);
  const hasSizes = Boolean(product?.sizes?.length);

  const activeColorData = hasColors
    ? product.colors.find((c) => c.name === activeColorName)
    : null;

  const totalStock = hasColors
    ? product.colors.reduce((sum, c) => sum + c.stock, 0)
    : (product?.stock ?? 1);

  const isFullyOutOfStock = totalStock <= 0;
  const isSelectedColorOutOfStock = hasColors
    ? !isColorAvailable(activeColorData)
    : false;

  const showOutOfStock = isFullyOutOfStock || isSelectedColorOutOfStock;

  return {
    hasColors,
    hasSizes,
    activeColorData,
    isFullyOutOfStock,
    isSelectedColorOutOfStock,
    showOutOfStock,
  };
};
