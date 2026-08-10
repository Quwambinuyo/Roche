export const formatNaira = (n) => `₦${n.toLocaleString("en-NG")}`;

export const parseNaira = (str) => Number(str.replace(/[₦,]/g, "")) || 0;

export const formatDate = (iso, options) =>
  new Date(iso).toLocaleDateString(
    "en-NG",
    options || { day: "2-digit", month: "short", year: "numeric" },
  );
