export const parsePrice = (price) =>
  Number(String(price).replace(/[^\d]/g, ""));

export const formatNaira = (value) =>
  `₦${Math.round(value).toLocaleString("en-NG")}`;

export const getDiscountPricing = (product) => {
  const hasDiscount = product.discount > 0;
  const basePrice = parsePrice(product.price);
  const discountedPrice = hasDiscount
    ? basePrice - (basePrice * product.discount) / 100
    : basePrice;

  return { hasDiscount, basePrice, discountedPrice };
};
