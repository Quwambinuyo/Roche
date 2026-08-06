export const parsePrice = (price) => Number(price.replace(/[₦,]/g, ""));

export const formatNaira = (value) => `₦${value.toLocaleString("en-NG")}`;
